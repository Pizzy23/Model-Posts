import timestamp from "time-stamp";
import { BaseRepository } from "../../repository/base/baseRepo";

export class BaseService {
  req: any;
  res: any;
  baseRepo = new BaseRepository();
  constructor() {}

  async createUser(body: any, res: any) {
    const create = await this.baseRepo.addUserBase(body);
    if (create === 200) {
      res.send("Usuario criado com sucesso!").status(200);
    } else if (create === 500) {
      res.send("Email do usuario ja existe!").status(500);
    }
  }
  async createPost(body: any, res: any) {
    const date = timestamp("[HH:mm DD/MM/YYYY]");
    const create = await this.baseRepo.addPostBase(body, date);
    if (create === 200) {
      res.send("Post criado com sucesso").status(200);
    }
    if (create === 404) {
      res.send("Email não encontrado").status(404);
    } else if (create === 500) {
      res.send("Criação do Post falhou").status(500);
    }
  }
  async getPost(body: any, res: any) {
    const create = await this.baseRepo.getLastPost(res, body);
    const post = create[0];
    if (create) {
      res.send({
        Post: post.text,
        Data: post.created_at,
      });
    } else if (create === 404) {
      res.send("Não existe o e-mail.").status(404);
    }
  }
  async getAllPost(body: any, res: any) {
    try {
      const create = await this.baseRepo.getAllPost(res, body);
      if (create) {
        res.send(create);
      } else if (create === 404) {
        res.send("E-mail não encontrado").status(404);
      }
    } catch (err) {
      res.send("Algo deu errado").status(500);
    }
  }
}
