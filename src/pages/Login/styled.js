import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 10px 0 10px 0;
  height: 310px;
    justify-content: space-around;

  label {
    display: flex;
    flex-direction: column;
    margin: 10px 0 10px 0;
  }

  input {
    margin: 5px 0 5px 0;
    padding: 10px;
    font-size: 1.03em;
    border: 1px solid #7e7e7e;
    border-radius: 5px;
  }

  input:focus {
    border: 1px solid #af2f2f;
  }

  button {
    margin-top: 20px;
  }
`;

export const LoginRegister = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
  justify-content: space-around;
  }

  section {
    width: 600px;
    margin: 30px;
  }

  section:nth-child(1) form {
    margin-top: 30px;
  }
`;
