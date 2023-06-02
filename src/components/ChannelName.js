import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import TagIcon from '@mui/icons-material/Tag';

function ChannelName(props){
    const changeChannel = () => {
        props.chanHandler(props.name);
    }
    return (
        <ListItemButton 
            selected = {props.isSelected}
            onClick={changeChannel}
        >   
            <ListItemIcon style={{ color: "white" }}>
            <TagIcon />
            </ListItemIcon>
            <ListItemText primary={props.name}/>
        </ListItemButton>
    )
}

export default ChannelName;