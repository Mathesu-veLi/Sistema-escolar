import React, { useEffect, useState } from 'react';

import { Container } from '../../styles/GlobalStyle';
import { Form, LoginRegister } from './styled';

import { useDispatch, useSelector } from 'react-redux';
import { isEmail } from 'validator';
import { toast } from 'react-toastify';
import * as actions from '../../store/modules/auth/actions';
import { get } from 'lodash';
import Loading from '../../components/Loading';
import history from '../../services/history';

export default function Login(props) {
  const dispatch = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/');

  const isLoading = useSelector((state) => state.auth.isLoading);

  const id = useSelector((state) => state.auth.user.id);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (id) history.push('/');
  });

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    let formErros = false;

    if (!isEmail(email)) {
      formErros = true;
      toast.error('Email inválido');
    }

    if (password.length < 6 || password.length > 50) {
      formErros = true;
      toast.error('Senha inválida');
    }

    if (formErros) return;
    dispatch(actions.loginRequest({ email, password, prevPath }));
  };

  async function handleSubmitRegister(e) {
    e.preventDefault();
    let formErros = false;

    if (nome.length < 3 || nome.length > 255) {
      formErros = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
      formErros = true;
      toast.error('Email inválido');
    }

    if (!id && (password.length < 6 || password.length > 50)) {
      formErros = true;
      toast.error('Senha deve ter entre 6 e 50 caracteres');
    }

    if (formErros) return;

    dispatch(actions.registerRequest({ nome, email, password, id }));
  }

  return (
    <LoginRegister>
      <div>
        <Container>
          <Loading isLoading={isLoading} />
          <h1>Login</h1>
          <Form onSubmit={handleSubmitLogin}>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu email"
              />
            </label>
            <label htmlFor="password">
              Senha:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Seu password"
              />
            </label>
            <button type="submit">Acessar</button>
          </Form>
        </Container>

        <Container>
          <Loading isLoading={isLoading} />
          <h1>Criar conta</h1>
          <Form onSubmit={handleSubmitRegister}>
            <label htmlFor="nome">
              Nome:
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome"
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu email"
              />
            </label>
            <label htmlFor="password">
              Senha:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
              />
            </label>
            <button type="submit">Criar minha conta</button>
          </Form>
        </Container>
      </div>
    </LoginRegister>
  );
}
