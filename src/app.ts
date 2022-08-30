import { attachControllers } from "@decorators/express";
import express  from "express";
export const app = express();

import {BaseController} from "./"

app.use(express.json());
attachControllers(app, [BaseController]);


app.get('/', function (req, res) {
  res.send('Teste');
});

app.use((req, res, next) => {
  const erro = new Error("Não encontrado");
  erro.message = "Não foi encontrado a rota.";
  next(erro);
});
app.use(
  (
    erro: { status: any; mensagem: any },
    req: any,
    res: {
      status: (arg0: any) => void;
      send: (arg0: { erro: { mensagem: any } }) => void;
    },
    next: any
  ) => {
    res.status(erro.status || 500);
    return res.send({
      erro: {
        mensagem: erro.mensagem,
      },
    });
  }
);

