import React, { useHistory } from 'react';
import { withRouter } from 'react-router-dom';
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarMenu,
  BtnRegister,
  BtnLogin,
  BtnLogout,
  BtnAdmin,
  Point,
} from './SidebarElements';
import LocalStorageService from '../../services/LocalStorageService';

const Sidebar = ({ isOpen, toggle, history, user, role, setRole }) => {
  console.log(role);
  const renderTab = () => {
    let result = [];

    if (role === 'USER' || role === 'ADMIN') {
      result.push(
        <>
          <Point>Your Point {user ? user.point : null}</Point>

          <BtnLogout
            onClick={() => {
              LocalStorageService.removeToken();
              setRole('GUEST');
              history.push('/home');
            }}
          >
            Logout
          </BtnLogout>
        </>
      );
    }
    if (role === 'ADMIN') {
      console.log('object');
      result.push(
        <BtnAdmin
          onClick={() => {
            history.push('/admin');
          }}
        >
          Customers Data
        </BtnAdmin>
      );
    }
    return result;
  };

  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarMenu>
        {role === 'GUEST' && (
          <>
            <BtnRegister
              onClick={() => {
                history.push('/register');
              }}
            >
              Register
            </BtnRegister>

            <BtnLogin
              onClick={() => {
                history.push('/login');
              }}
            >
              Login
            </BtnLogin>
          </>
        )}
        {renderTab()}
      </SidebarMenu>
    </SidebarContainer>
  );
};

export default withRouter(Sidebar);
