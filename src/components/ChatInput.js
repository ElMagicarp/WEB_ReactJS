import React from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';

function ChatInput(props) {
  const [value, setValue] = React.useState('');
  const sendMsg = () => {
    axios.post('//localhost:'+ process.env.REACT_APP_BACK_PORT +'/api/send', {
      channel: props.channel,
      author: props.user.name,
      message: value,
      picture: props.user.picture
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
        sx= {{backgroundColor: "rgba(255, 255, 255, 0.7)"}}
        inputProps={{ style: {height: "100px" }}}
        onChange={(e) => setValue((v) => e.target.value)}
        value={value}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            sendMsg();
          }
        }}
      />
  );
}
  
export default ChatInput;