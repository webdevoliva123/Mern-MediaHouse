import { Box } from '@mui/system'
import Button from '@mui/material/Button';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer() {

    return (
        <Box justifyContent="center" sx={{ background: '#272727' }}>
            <div className='footer'>
                <div className="footer-links">
                    <div sx={{}} className="logo center-row-left footer-logo">
                        <a href="#">MediaHouse.com</a>
                    </div>

                </div>
                <div className="footer-links">
                    <ul>
                        <li>
                            <a to='/' className='nav-link'>Home</a>
                            <a to='/' className='nav-link'>News</a>
                            <a to='/' className='nav-link'>Business</a>
                            <a to='/' className='nav-link'>Sociology</a>
                            <a to='/' className='nav-link'>Tech</a>
                            <a to='/' className='nav-link'>Economics</a>
                        </li>
                    </ul>
                </div>
                <div className="icon-social footer-social">
                    <FacebookIcon sx={{marginRight: '10px', color: '#20b2aa', cursor: 'pointer'}}/>
                    <InstagramIcon sx={{marginRight: '10px', color: '#20b2aa', cursor: 'pointer'}}/>
                    <GitHubIcon sx={{color: '#20b2aa', cursor: 'pointer'}}/>
                </div>
                <div className='call-to-action center-column'>
                    <p>Register as</p>
                    <Button sx={{background: '#dc143c',padding:"10px 10px"}} variant="contained">Journalist</Button>
                </div>
                <div className="mh-cc">
                    <p>Copyright All rights reserved | <span className='logo'>MediaHouse.com</span></p>
                </div>
            </div>
        </Box>
    )
}

export default Footer