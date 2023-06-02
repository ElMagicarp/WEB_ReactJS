import React from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';

function ChatInput(props) {
  const [value, setValue] = React.useState('');
  const sendMsg = () => {
    axios.post('//localhost:'+ process.env.REACT_APP_BACK_PORT +'/api/send', {
      channel: props.channel,
      author: "me", //props.user,
      message: value
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
          sx = {{width: '80%'}}
          inputProps={{ style: {height: "200px" }}}
          onChange={(e) => setValue(e.target.value)}
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