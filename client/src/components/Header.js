// Header.js
import React, { useContext, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import './header.css';
import { LoginContext } from './ContextProvider/Context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, NavLink } from 'react-router-dom';

const Header = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  const history = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (logindata.ValidUserOne) {
      setAvatar(logindata.ValidUserOne.fname[0].toUpperCase());
    } else {
      setAvatar('');
    }
  }, [logindata.ValidUserOne]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutuser = async () => {
    let token = localStorage.getItem('usersdatatoken');

    const res = await fetch('/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
        Accept: 'application/json',
      },
      credentials: 'include',
    });

    const data = await res.json();
    console.log(data);

    if (data.status === 201) {
      console.log('user logout');
      localStorage.removeItem('usersdatatoken');
      setLoginData(false);
      history('/');
    } else {
      console.log('error');
    }
  };

  const goDash = () => {
    history('/dash');
  };

  const goError = () => {
    history('*');
  };

  

  return (
    <>
      <header className="bg-gradient-to-r from-orange-500 to-purple-500 p-4">
      <nav className="container mx-auto flex items-center justify-between">
        
          <h1 className="text-2xl lg:text-3xl font-bold text-blue-900">Naresh kumhar</h1>
       
        <div className="avtar">
          {localStorage.getItem('usersdatatoken') ? (
            <Avatar
              style={{ background: 'salmon', fontWeight: 'bold', textTransform: 'capitalize' }}
              onClick={handleClick}
            >
              {avatar}
            </Avatar>
          ) : (
            <Avatar style={{ background: 'blue' }} onClick={handleClick} />
          )}
        </div>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {logindata.ValidUserOne ? (
            <>
              <MenuItem
                onClick={() => {
                  goDash();
                  handleClose();
                }}
              >
                Dashboard
              </MenuItem>
              <MenuItem
                onClick={() => {
                  logoutuser();
                  handleClose();
                }}
              >
                Logout
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem
                onClick={() => {
                  goError();
                  handleClose();
                }}
              >
                Dashboard
              </MenuItem>
            </>
          )}
        </Menu>
      </nav>
      </header>
    </>
  );
};

export default Header;
