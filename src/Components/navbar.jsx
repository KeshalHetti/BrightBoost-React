import { React, useState, useEffect } from 'react';
import Logo from "../Assets/logo.png";
import { HiOutlineBars3 } from 'react-icons/hi2';
import { Box, Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText, } from "@mui/material";
import List from "@mui/material/List";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../config/firebase'
import { signOut } from 'firebase/auth';
import { collection, addDoc, getDoc, doc, where, query, getDocs } from 'firebase/firestore';


const Navbar = () => {

    const [openMenu, setOpenMenu] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [userRole, setUserRole] = useState("");
    const [authLoading, setAuthLoading] = useState(true);


    const navigate = useNavigate();

    const menuOptions = [
        {
            text: "Home",
            icon: <HomeIcon />,
        },
        {
            text: "Timetable",
            icon: <InfoIcon />,
        },
        {
            text: "Subjects",
            icon: <CommentRoundedIcon />,
        },
        {
            text: "Contact",
            icon: <PhoneRoundedIcon />,
        },
        {
            text: "Cart",
            icon: <ShoppingCartRoundedIcon />,
        },
    ];

    const signout = async () => {
        try {
            await signOut(auth);
            setSuccessMessage("Signed Out Successfully!");
            setErrorMessage("");
            navigate('/signup');
        } catch (err) {
            setSuccessMessage("");
            console.error(err);
        }
    };
    useEffect(() => {
        const handleAuth = async () => {
            try {
                const userEmail = auth.currentUser.email;
                const userSnapshot = await getDocs(query(collection(db, 'users'), where('email', '==', userEmail)));

                if (userSnapshot.empty) {
                    console.error(`Email not found in user data: ${userEmail}`);
                    return;
                }

                const userDoc = userSnapshot.docs[0];
                const userData = userDoc.data();

                if (userData.role) {
                    setUserRole(userData.role);
                }

            } catch (error) {
                console.error("Error! Fetching user role failed:", error);
            }
        }
        handleAuth()
    }, [auth.currentUser]
    );

    return (
        <nav>
            <div className="nav-logo-container">
                <img src={Logo} alt="" />
            </div>
            <div className="navbar-links-container">
                <Link to="/">Home</Link>
                {auth.currentUser && userRole === "student" && <Link to="/studenthome">Student</Link>}
                {auth.currentUser && userRole === "lecturer" && <Link to="/lecturehome">Lecture</Link>}
                {auth.currentUser && userRole === "admin" && <Link to="/adminhome">Admin</Link>}
                {auth.currentUser ? <Link onClick={signout}>Logout</Link> : <Link to='/signup'>Log In</Link>}
            </div>

            <div className='navbar-menu-container'>
                <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
            </div>
            <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor='right'>
                <Box sx={{ width: 250 }} role='presentation' onClick={() => setOpenMenu(false)} onKeyDown={() => setOpenMenu(false)}>
                    <List>
                        {menuOptions.map((item) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </nav>
    );
};

export default Navbar