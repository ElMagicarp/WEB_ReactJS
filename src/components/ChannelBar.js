import { useState } from 'react';
import ChannelName from './ChannelName';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';

function ChannelBar(props) {
    const [open, setOpen] = useState(true);
    const currentChannel = props.currentChan.name;
    const channelList = props.chanList;

    return (
      <div className="channelBar">
        <List
            sx={{ width: '100%', bgcolor: '#8395a7'}}
            subheader={<ListSubheader sx={{bgcolor:"#8395a7", color:'white'}}>Canaux</ListSubheader>}
            >
            {
            channelList.public.map((chan,index) => 
            <ChannelName isPublic={true} name={chan} key={index} isSelected={chan === currentChannel} chanHandler={props.chanHandler}/>
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
                    {
                    channelList.private.map((chan,index) =>
                    <ChannelName isPublic={false} name={chan} key={index} isSelected={chan === currentChannel} chanHandler={props.chanHandler}/>
                    )
                    }
                </List>
            </Collapse>
        </List>
      </div>
    );
}
  
export default ChannelBar;
  