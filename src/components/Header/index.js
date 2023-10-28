import React from 'react';
import {
  FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaCircle,
  FaPowerOff,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';
import { Nav } from './styled';

export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.loginFailure());
    history.push('/');
  };

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} title="Página inicial" />
      </Link>
      <div>
        {isLoggedIn ? (
          <>
            <Link to="/edit">
              <FaUserAlt size={24} title="Editar dados" />
            </Link>
            <Link onClick={handleLogout} to="/logout">
              <FaPowerOff size={24} title="Desconectar" />
            </Link>
          </>
        ) : (
          <Link to="/login">
            <FaSignInAlt size={24} title="Criar conta ou fazer login" />
          </Link>
        )}
      </div>
    </Nav>
  );
}
