import * as React from 'react';
import Link from "next/link";
import { AppBar, Container, Box, Toolbar, Button, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import logo from '@/public/logo.png'

const pages = [{
  text: 'About',
  href: '/#about'
}, {
  text: 'Rates',
  href: '/#rates'
}, {
  text: 'Attractions',
  href: '/#attractions'
}, {
  text: 'Gallery',
  href: '/gallery',
}, {
  text: 'Contact',
  href: '/#contact'
}];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="absolute" sx={{mt: 8}}>
      <Container>
        <Toolbar disableGutters sx={{minHeight: '64px'}}>
          {/* Logo */}

            <Box sx={{width: "200px", mr: 2}}>
              <Box sx={{position: 'absolute', top: '-40px', width: '200px', zIndex: 9}}>
                <Link href={"/"}>
                  <a>
                    <Image
                      src={logo}
                      alt="Beeline Parks"
                      layout="responsive"
                      priority
                    />
                  </a>
                </Link>
              </Box>
            </Box>


          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, justifyContent: 'flex-end', display: { xs: 'flex', md: 'none' } }}>
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
              {pages.map((page) => (
                <Link key={page.href} href={page.href} onClick={handleCloseNavMenu}>
                  <MenuItem>
                    <Typography textAlign="center">{page.text}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, textAlign: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page.href}
                href={page.href}
                onClick={handleCloseNavMenu}
                sx={{ color: 'white', display: 'block' }}
              >
                {page.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;