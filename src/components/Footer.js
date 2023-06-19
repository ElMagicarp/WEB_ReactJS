import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import "../index.css";

function Footer() {
  return (
    <div className='footer'>
        <div className='socialMedia'> 
            <a target="_blank" rel="noreferrer" href="https://twitter.com/tc_insalyon"><TwitterIcon /></a>
            <a target="_blank" rel="noreferrer" href="https://www.instagram.com/tcinsalyon/"><InstagramIcon /></a>
            <a target="_blank" rel="noreferrer" href="https://www.youtube.com/@InsalyonFr69"><YouTubeIcon /></a>
        </div>
        <p>Réalisé avec <b>amour</b> par Cafer DINGIL, Arthur-M. FARWATI et Alpha CISSE</p>
    </div>
  )
}

export default Footer