import { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { UserContext } from "../App";

function ChatInput(props) {
  const [value, setValue] = useState('');
  const user = useContext(UserContext);
  const sendMsg = () => {
    axios.post('//localhost:'+ process.env.REACT_APP_BACK_PORT +'/api/send', 
    {
      channel: { name: props.channel.name, type: props.channel.type },
      message: value,
    }, {
      headers: {
        Authorization: 'Bearer ' + user.token
        }
      })
    .then(() => {
      setValue(() => '');
    })
    .catch((err) => {
      console.log(err)
    });
  }
  return (
    <TextField
        id="outlined-multiline-flexible"
        label="Message"
        multiline
        fullWidth
        fullHight
        sx= {{backgroundColor: "rgba(255, 255, 255, 0.7)"}}
        inputProps={{ style: {height: "100%", width: "100%"}}}
        onChange={(e) => setValue((v) => e.target.value)}
        value={value}
        onKeyDown={(e) => {
          if (e.shiftKey) {
            if (e.key === 'Enter') {
              e.preventDefault();
              setValue((v) => v + '\n');
            }
          }
          else {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (value !== '')
                sendMsg();
            }
          }
        }}
      />
  );
}
  
export default ChatInput;