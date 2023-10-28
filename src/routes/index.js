import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './MyRoute';

import Edit from '../pages/Edit';
import Login from '../pages/Login';
import Aluno from '../pages/Aluno';
import Alunos from '../pages/Alunos';
import Photos from '../pages/Photos';
import Page404 from '../pages/Page404';

export default function Router() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Alunos} />
      <MyRoute exact path="/aluno/:id/edit" component={Aluno} isClosed={true} />
      <MyRoute exact path="/aluno/" component={Aluno} isClosed={true} />
      <MyRoute exact path="/fotos/:id" component={Photos} isClosed={true} />
      <MyRoute exact path="/login" component={Login} />
      <MyRoute exact path="/edit" component={Edit} />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
