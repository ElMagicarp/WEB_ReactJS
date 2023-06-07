import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ChannelName from './ChannelName';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import { UserContext } from '../App';

function ChannelBar(props) {
    const [channels, setChannels] = useState([]);
    const [open, setOpen] = useState(false);
    const currentChannel = props.currentChan;
    const user = useContext(UserContext);
    useEffect(() => {
        axios.get('//localhost:'+ process.env.REACT_APP_BACK_PORT +'/api/channelList', {
            headers: {
                Authorization: 'Bearer ' + user.token
                }})
            .then((res) => {
                setChannels(res.data.chanList)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [user])
    return (
      <div className="channelBar">
        <div className="header">
            <h1>tc chat</h1>
        </div>
        <List
            sx={{ width: '100%', bgcolor: '#8395a7'}}
            subheader={<ListSubheader sx={{bgcolor:"#8395a7", color:'white'}}>Channels</ListSubheader>}
            >
            {
            channels.map((chan,index) => 
            <ChannelName name={chan} key={index} isSelected={chan === currentChannel} chanHandler={props.chanHandler}/>
            )
            }
            <ListItemButton onClick={()=> setOpen((o)=>!o)}>
                <ListItemIcon sx={{color:"white"}}>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Messages privés" />
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="user1" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="user2" />
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
      </div>
    );
}
  
export default ChannelBar;
  