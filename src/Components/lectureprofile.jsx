import * as React from 'react';
import { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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
import { blue } from '@mui/material/colors';
import { Box, Card, CardContent } from '@mui/material';

export default function SimpleDialogDemo() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const usersCol = collection(db, 'users');
        const q = query(usersCol, where('email', '==', currentUser.email), where('role', '==', 'lecturer'));

        getDocs(q).then(querySnapshot => {
          querySnapshot.forEach(doc => {
            setUser(doc.data());
          });
        });
      }
    });
  }, []);

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
      <div className='student-boxcontainer'>
        <div className="student-grid">
          <Box>
            <Card className='student-card'>
              <CardContent>
                <Button variant="outlined" onClick={handleClickOpen}>
                  View Profile
                </Button>
                <SimpleDialog user={user} open={open} onClose={handleClose} />
              </CardContent>
            </Card>
          </Box>
        </div>
      </div>
    </div>
  );
}

function SimpleDialog(props) {
  const { onClose, open, user } = props;

  const handleClose = () => {
    onClose();
  };

  if (!user) return null;

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
          <ListItemText primary={user.name} secondary="Lecturer Information" />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Email: ${user.email}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Age: ${user.age}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Gender: ${user.gender}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Phone: ${user.contact}`} />
        </ListItem>
      </List>
    </Dialog>
  );
}
