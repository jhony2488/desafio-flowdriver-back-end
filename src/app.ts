import express from 'express';
import {useExpressApp} from './useApp';
import {connectionDB} from './database/index';

export const app = express();

export function server() {
  useExpressApp(app);
  connectionDB();
  app.listen(80, () => {
    console.log('servidor rodando');
  });
}
