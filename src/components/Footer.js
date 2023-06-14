import React from 'react';
import { Link } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import "../index.css";

function Footer() {
  return (
    <div className='footer'>
        <div className='socialMedia'> 
            <a href="https://www.instagram.com/tcinsalyon/"><InstagramIcon /></a>
            <a href="https://www.youtube.com/@InsalyonFr69"><YouTubeIcon /></a>
        </div>
        <p> &copy; 2023 <Link to ="/">TC-Chat</Link></p>
    </div>
  )
}

export default Footer