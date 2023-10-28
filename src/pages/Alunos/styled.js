import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AlunoContainer = styled.div`
  margin-top: 20px;

  table {
    width: 100%;
    border-spacing: 10px;
    border-collapse:collapse
  }

  th {
    padding: 0 10px 15px 10px;
  }

  td {
    padding: 10px 0;
  }

  table tr:not(.thead) + tr {
    border-top: 1px solid #afafaf;
  }

  td *:not(svg) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #name {
    width: 30%;
  }

  .icons {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 56px;
  }

  .icons a {
    padding: 3px;
  }
`;

export const ProfilePicture = styled.div`
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;

export const NovoAluno = styled(Link)`
  display: block;
  padding: 20px 0 10px 0;

  button {
    width: 100%;
    height: 45px;
    font-size: 1.01em;
  }
`;
