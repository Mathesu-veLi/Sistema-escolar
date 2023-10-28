import styled from 'styled-components';
import { primaryColor } from '../../config/colors';

export const Nav = styled.nav`
  background-color: ${primaryColor};
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    flex-direction: row;
  }

  a {
    color: #ccc;
    position: relative;
    transition: color .3s ease-in-out;
    margin: 0 10px 0;
    font-weight: bold;

    &::before {
      content: '';
      position: absolute;
      top: 100%;
      width: 100%;
      height: 3px;
      background-color: #ddd;
      transform: scaleX(0);
      transition: transform .3s ease-in-out;
    }

    &:hover {
      color: #fff;
    }

    &:hover::before {
      transform: scaleX(1);
    }
  }

  a * {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
