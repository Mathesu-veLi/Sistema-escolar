import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { isEmail, isInt, isFloat } from 'validator';
import { toast } from 'react-toastify';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaUserCircle, FaEdit, FaTrash } from 'react-icons/fa';

import { Container } from '../../styles/GlobalStyle';
import { Form, ProfilePicture } from './styled';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Aluno() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [photo, setPhoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [photoChange, setPhotoChange] = useState(false);
  const [prevPhoto, setPrevPhoto] = useState(false);
  const [deletePhoto, setDeletePhoto] = useState(false);
  const [file, setFile] = useState({});

  useEffect(() => {
    if (!id) return;

    (async function () {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const Photo = get(data, 'Photos[0].url', '');
        setPhoto(Photo);
        setName(data.nome);
        setSurname(data.sobrenome);
        setEmail(data.email);
        setAge(data.idade);
        setWeight(data.peso);
        setHeight(data.altura);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        const status = get(error, 'response.status', 0);
        const errors = get(error, 'response.data.errors', []);

        if (status === 400) errors.map((error) => toast.error(error));
        history.push('/');
      }
    })();
  }, [id]);

  const handleChange = (e) => {
    const file1 = e.target.files[0];
    const photoURL = URL.createObjectURL(file1);
    if (photo != '') {
      setPrevPhoto(true);
    }

    setPhoto(photoURL);
    setPhotoChange(true);
    setFile(file1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (name.length < 3 || name.length > 255) {
      formErrors = true;
      toast.error('Nome precisa ter entre 3 e 255 caracteres');
    }

    if (surname.length < 3 || surname.length > 255) {
      formErrors = true;
      toast.error('Sobrenome precisa ter entre 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email inválido');
    }

    if (!isInt(String(age))) {
      toast.error('Idade inválida');
      formErrors = true;
    }

    if (!isFloat(String(weight))) {
      toast.error('Peso inválido');
      formErrors = true;
    }
    if (!isFloat(String(height))) {
      toast.error('Altura inválida');
      formErrors = true;
    }

    if (formErrors) return;

    try {
      setIsLoading(true);
      if (id) {
        await axios.put(`/alunos/${id}`, {
          name,
          surname,
          email,
          age,
          weight,
          height,
        });

        if (photoChange && !deletePhoto) {
          const formData = new FormData();
          formData.append('aluno_id', id);
          formData.append('file', file);

          try {
            if (prevPhoto) {
              await axios.put('/photos/', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
            } else {
              await axios.post('/photos/', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
            }
          } catch (error) {
            setIsLoading(false);
            const { status } = get(error, 'response', '');
            toast.error(error);

            if (status === 401) dispatch(actions.loginFailure());
          }
        } else if (deletePhoto && file) {
          let aluno_id = id;
          await axios.delete('/photos', {
            data: {
              aluno_id,
            },
          });
          setIsLoading(false);
        }
        toast.success('Aluno(a) editado(a) com sucesso');
      } else {
        const { data } = await axios.post('/alunos/', {
          nome: name,
          sobrenome: surname,
          email,
          idade: age,
          peso: weight,
          altura: height,
        });

        toast.success('Aluno(a) criado(a) com sucesso');
        history.push(`/aluno/${data.id}/edit`);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      const status = get(error, 'response.status', 0);
      if (status === 401) {
        dispatch(actions.loginFailure());
        toast.error('Faça login novamente');
        history.push('/login');
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Editar aluno' : 'Novo aluno'}</h1>

      {id && (
        <ProfilePicture>
          {photo ? <img src={photo} alt={name} /> : <FaUserCircle size={180} />}
          <form>
            <FaEdit size={24} />
            <br />
            <input onChange={handleChange} type="file"></input>
          </form>
          <button
            onClick={() => {
              setDeletePhoto(true);
              setPhoto('');
            }}
          >
            <FaTrash size={18} />
          </button>
        </ProfilePicture>
      )}

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
        />
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder="Sobrenome"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Idade"
        />
        <input
          type="text"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Peso"
        />
        <input
          type="text"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Altura"
        />

        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}
