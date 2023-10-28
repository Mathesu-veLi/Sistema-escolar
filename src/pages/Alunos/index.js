import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { FaUserCircle, FaEdit, FaTrash, FaExclamation } from 'react-icons/fa';

import { Container } from '../../styles/GlobalStyle';
import { AlunoContainer, ProfilePicture, NovoAluno } from './styled';
import axios from '../../services/axios';

import Loading from '../../components/Loading';
import { toast } from 'react-toastify';
import history from '../../services/history';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      const response = await axios.get('/alunos');
      setAlunos(response.data);
      setIsLoading(false);
    })();
  }, []);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const handleDelete = async (e, id, index) => {
    e.persist();
    try {
      setIsLoading(true);
      await axios.delete(`/alunos/${id}`);
      const novosAlunos = [...alunos];
      novosAlunos.splice(index, 1);
      setAlunos(novosAlunos);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      const status = get(e, 'response.status', 0);
      if (status === 401) {
        toast.error('Você precisa fazer login');
        return history.push('/login');
      } else {
        toast.error('Ocorreu um erro ao excluir aluno');
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Alunos</h1>

      <NovoAluno to="/aluno/">
        <button>Cadastrar novo aluno</button>
      </NovoAluno>

      <AlunoContainer>
        <table>
          <tr className="thead">
            <th>Foto</th>
            <th id="name">Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
          {alunos.map((aluno, index) => (
            <tr key={String(aluno.id)}>
              <td>
                <ProfilePicture>
                  {get(aluno, 'Photos[0].url', false) ? (
                    <img src={aluno.Photos[0].url} alt="" />
                  ) : (
                    <FaUserCircle size={36} />
                  )}
                </ProfilePicture>
              </td>
              <td>
                <span>{aluno.nome}</span>
              </td>
              <td>
                <span>{aluno.email}</span>
              </td>

              <td className="icons">
                <Link to={`aluno/${aluno.id}/edit`}>
                  <FaEdit size={16} />
                </Link>
                <Link onClick={handleDeleteAsk} to={`aluno/${aluno.id}/delete`}>
                  <FaTrash />
                </Link>

                <FaExclamation
                  size={16}
                  display="none"
                  cursor="pointer"
                  onClick={(e) => handleDelete(e, aluno.id, index)}
                />
              </td>
            </tr>
          ))}
        </table>
      </AlunoContainer>
    </Container>
  );
}
