import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { IconButton } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import { Link } from "react-router-dom";

function Navbar({handleLogout}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="border-isabelline">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowra text-onyx">
            Chiron
          </span>
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-onyx rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-xl text-white bg-current rounded md:bg-transparent md:text-current md:p-0 md:dark:text-current"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-xl text-white bg-current rounded md:bg-transparent md:current-700 md:p-0 md:dark:text-current"
                aria-current="page"
              >
                Charts
              </Link>
            </li>
            <li>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <div>
                    <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                      <Avatar className="w-8" sx={{ width: 30, height: 30 }} />
                    </IconButton>
                  </div>
                </Tooltip>
              </Box>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>
                  Logout
                </MenuItem>
              </Menu>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
