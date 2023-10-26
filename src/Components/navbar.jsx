import  { React, useState, useEffect } from 'react';
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
    var user = auth.currentUser;

    const [openMenu, setOpenMenu] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isStudent, setIsStudent] = useState(false);
    const [isLecturer, setIsLecturer] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
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
            setSuccessMessage("Successfully Signed Out!");
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
                    console.error(`No user data found for email: ${userEmail}`);
                    return;
                }
    
                const userDoc = userSnapshot.docs[0];
                const userData = userDoc.data();
    
                if (userData.role == 'student') {
                    setIsStudent(true)
                }

                if (userData.role == 'lecturer') {
                    setIsLecturer(true)
                }

                if (userData.role == 'admin') {
                    setIsAdmin(true)
                }
            } catch (error) {
                console.error("Error fetching user role:", error);
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
                {user && isStudent && <Link to="/studenthome">Student</Link>}
                {user && isLecturer && <Link to="/lecturehome">Lecture</Link>}
                {user && isAdmin && <Link to="/adminhome">Admin</Link>}
                {user ? <Link onClick={signout}>Logout</Link> :<Link to='/signup'>Log In</Link>}
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