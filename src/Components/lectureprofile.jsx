import * as React from 'react';
import BannerBackground from "../Assets/home-banner-background.png";
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

const user = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  age: 30,
  gender: 'Male',
  phoneNumber: '123-456-7890',
  address: '123 Main St, City, Country',
  grade: 'A+',
};

function SimpleDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>User Details</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem disableGutters>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={user.name}
            secondary={`Email: ${user.email}, Age: ${user.age}, Gender: ${user.gender}, Phone: ${user.phoneNumber}, Address: ${user.address}, Grade: ${user.grade}`}
          />
        </ListItem>
      </List>
    </Dialog>
  );
}

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (

    <div className="home-container">

      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            BrightBoost Lecture Profile
          </h1>
        </div>
      </div>
      <Button variant="outlined" onClick={handleClickOpen}>
        View Profile
      </Button>
      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
}
