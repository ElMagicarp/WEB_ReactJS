import { useState, useContext } from 'react';
import { UserContext } from '../App.js';
import axios from 'axios';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import PersonAdd from '@mui/icons-material/PersonAdd';
import ChatIcon from '@mui/icons-material/Chat';

function UserAvatar(props) {
    const currentUser = useContext(UserContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      if (currentUser.sub !== props.author.sub){
        setAnchorEl(event.currentTarget);
      }
    };

    const handleClose = () => setAnchorEl(null);

    const handlePrivateChan = () => {
      axios.post('//localhost:'+ process.env.REACT_APP_BACK_PORT +'/api/createChannel',
      {
        name: props.author.name,
        sub: props.author.sub
      },{
        headers: {
          authorization: 'Bearer ' + currentUser.token
        }
      })
      .then((res) => {
        console.log("test")
        props.chanHandler(props.author.name);
      }
      )
      .catch((err) => {
        console.log(err)
      }
      );
    };

    return (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <Avatar alt={props.author.name} src={props.author.picture} sx={{ width: 50, height: 50}} />
            </IconButton>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
        {/*<MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add "{props.author.name}" to your Friends
        </MenuItem>*/}
        <MenuItem onClick={() => handlePrivateChan()}>
          <ListItemIcon>
            <ChatIcon fontSize="small" />
          </ListItemIcon>
          Converse with
        </MenuItem>

      </Menu>
    </>
  );
}

export default UserAvatar;