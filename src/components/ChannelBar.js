import ChannelName from './ChannelName';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';

function ChannelBar(props) {
    const currentChannel = props.currentChan.name;
    const channelList = props.chanList;

    return (
        <List
            className="channelBar"
            subheader={<ListSubheader sx={{bgcolor:"#8395a7", color:'white'}}>Canaux</ListSubheader>}
        >
            {
            channelList.public.map((chan,index) => 
            <ChannelName isPublic={true} name={chan} key={index} isSelected={chan === currentChannel} chanHandler={props.chanHandler}/>
            )
            }
            <ListSubheader sx={{bgcolor:"#8395a7", color:'white'}}>Messages privés</ListSubheader>
            {
                channelList.private.map((chan,index) =>
                <ChannelName isPublic={false} name={chan} key={index} isSelected={chan === currentChannel} chanHandler={props.chanHandler}/>
                )
            }
        </List>
    );
}
  
export default ChannelBar;
  