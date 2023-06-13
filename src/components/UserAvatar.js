import { useState, useContext } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import PersonAdd from '@mui/icons-material/PersonAdd';
import ChatIcon from '@mui/icons-material/Chat';
import { UserContext } from '../App.js';


function UserAvatar({picture, author, channelList}) {
    const currentUser = useContext(UserContext);
    const [channelExist, setChannelExist] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const createChat = ({Name,UserList}) => {
      channelList.map((channel)=>{
        if (channel.name === Name){
          setChannelExist(channelExist || true);
        }
        return;
      })
      if (!channelExist) {
          axios.post('//localhost:'+ process.env.REACT_APP_BACK_PORT +'/api/newChannel',{
              name:Name,
              userList:UserList
          })
              .catch((err) => {
                  console.log(err)
              })
      }
    }

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleAddFriends = (userName) => {

    };

    const handleCreatePrivateChannel = (name,userList) => {
      createChat(name,userList);
      console.log(channelExist)
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
                <Avatar alt={author} src={picture} sx={{ width: 50, height: 50}} />
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
        <MenuItem onClick={() => handleAddFriends}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add "{author}" to your Friends
        </MenuItem>
        <MenuItem onClick={() => handleCreatePrivateChannel ("Private "+author+"/"+currentUser.name ,[author,currentUser.name])}>
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