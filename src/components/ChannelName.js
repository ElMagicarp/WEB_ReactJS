import { useContext } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import TagIcon from '@mui/icons-material/Tag';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItem from '@mui/material/ListItem';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import { UserContext } from '../App';


function ChannelName(props){
    const user = useContext(UserContext);

    const changeChannel = () => {
        props.chanHandler({
            name: props.name,
            type: props.isPublic ? "public" : "private"
        })
    }

    const deleteChannel = () => {
        props.chanHandler({
            name: "general",
            type: "public"
        })
        axios.post('//localhost:'+ process.env.REACT_APP_BACK_PORT +'/api/deleteChannel', {
            name: props.name,
            type: props.isPublic ? "public" : "private"
        }, {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        })
        .then((res) => {
            
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <ListItem
        secondaryAction={
            (!props.isPublic) ? <IconButton edge="end" aria-label="delete" onClick={deleteChannel}> <DeleteIcon sx={{color:"white"}}/></IconButton>: <></>
        }
        disablePadding    
        >
            <ListItemButton
                selected = {props.isSelected}
                onClick={changeChannel}
                >
            
                <ListItemIcon style={{ color: "white" }}>
                    {
                        (props.isPublic) ? <TagIcon /> : <PersonIcon />
                    }
                
                </ListItemIcon>
                <ListItemText primary={props.name}/>
            </ListItemButton>

        </ListItem>
    )
}

export default ChannelName;