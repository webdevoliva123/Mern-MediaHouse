import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const pages = [
    {pageName:'Home',pageLink:"/home"},{pageName:'News',pageLink:"/news"},{pageName:'Business',pageLink:"/business"},{pageName:'Sociology',pageLink:"/sociology"},{pageName:'Tech',pageLink:"/tech"},{pageName:"Economic",pageLink:"/economic"},{pageName:"Others",pageLink:"/others"}];
const settings = [{pageName:'profile',pageLink:"/profile"},{pageName:"Account",pageLink:"/account"},{pageName:"Dashboard",pageLink:"/dashboard"},{pageName:"Logout",pageLink:"/logout"}];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Getting User Avatar From Redux
  const userAvatar = useSelector((state) =>  state.userInfo.userInfoInitial.avatar);
  return (
    <AppBar position="static" style={{background:"#111"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            MediaHouse
          </Typography>

          <Box sx={{ flexGrow: 2, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {React.Children.toArray(pages.map((page) => (
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Link to={page.pageLink}><Typography textAlign="center">{page.pageName}</Typography></Link>
                </MenuItem>
              )))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 50, display: { xs: 'flex', md: 'none' } }}
          >
            MediaHouse
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex',justifyContent:"flex-end",marginRight:"20px" }}}>
            {React.Children.toArray(pages.map((page) => (
             <Link to={page.pageLink}> <Typography
             onClick={handleCloseNavMenu}
             sx={{ my: 2, color: 'white', display: 'block',margin:"0 10px"}}
           >
             {page.pageName}
           </Typography></Link>
            )))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={userAvatar} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {React.Children.toArray(settings.map((setting) => (
                <MenuItem onClick={handleCloseUserMenu} >
                  <Link to={setting.pageLink}><Typography textAlign="center">{setting.pageName}</Typography></Link>
                </MenuItem>
              )))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
