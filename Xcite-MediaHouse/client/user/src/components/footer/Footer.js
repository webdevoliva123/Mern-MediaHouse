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
                            <a href='/home' className='nav-link'>Home</a>
                            <a href='/news' className='nav-link'>News</a>
                            <a href='/business' className='nav-link'>Business</a>
                            <a href='/sociology' className='nav-link'>Sociology</a>
                            <a href='/tech' className='nav-link'>Tech</a>
                            <a href='/economic' className='nav-link'>Economic</a>
                        </li>
                    </ul>
                </div>
                <div className="icon-social footer-social">
                    <FacebookIcon sx={{marginRight: '10px', color: '#20b2aa', cursor: 'pointer'}}/>
                    <InstagramIcon sx={{marginRight: '10px', color: '#20b2aa', cursor: 'pointer'}}/>
                    <GitHubIcon sx={{color: '#20b2aa', cursor: 'pointer'}}/>
                </div>
                <div className='call-to-action'>
                    <p>Register as</p>
                    <Button style={{background: '#dc143c',padding:"10px 10px"}} variant="contained">Journalist</Button>
                </div>
                <div className="mh-cc">
                    <p>Copyright All rights reserved | <span className='logo'>MediaHouse.com</span></p>
                </div>
            </div>
        </Box>
    )
}

export default Footer