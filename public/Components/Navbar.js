import React from 'react';
import Logo from "../Assets/Logo.svg";
import { BsCart2} from "react-icons/hi2";
import { HiOutlineBars2 } from 'react-icons/hi2';
import { Box, Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText,} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommonRoundedIcon from "@mui/icons-material/CommonRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoopingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

const Navbar = () => {

    const [openMenu,setOpenMenu] = useState(false)
    const menuOptions = [
        {
            text:"Home",
            icon:<HomeIcon/>,
        },
        {
            text:"Home",
            icon:<HomeIcon/>,
        },
        {
            text:"Home",
            icon:<HomeIcon/>,
        },
        {
            text:"Home",
            icon:<HomeIcon/>,
        },
        {
            text:"Home",
            icon:<HomeIcon/>,
        },
    ]
    return (
        <div>Navbar</div>
    )
}

export default Navbar