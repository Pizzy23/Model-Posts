import {
  Body,
  Controller,
  Delete,
  Get,
  Params,
  Patch,
  Post,
  Response,
} from "@decorators/express";
import { BaseService } from "../../services/base/baseServices";

@Controller("/Base")
export class BaseController {
  req: any;
  res: any;
  service = new BaseService();
  constructor() {}

  @Post("/")
  async postUser(@Response() res: any, @Body() body: any) {
    try {
      await this.service.createUser(body, res);
    } catch (err) {
      res.send(err.message);
    }
  }

  @Post("/post")
  async addPost(@Response() res: any, @Body() body: any) {
    try {
      await this.service.createPost(body, res);
    } catch (err) {
      res.send(err.message);
    }
  }
  @Delete("/")
  deleteUser(@Response() res: any) {
    try {
      res.send("Delete Funcionando!");
    } catch (err) {
      res.send(err.message);
    }
  }
  @Get("/one")
  async getPostAll(@Response() res: any, @Body() body: any) {
    try {
      await this.service.getPost(body, res);
    } catch (err) {
      res.send(err.message);
    }
  }
  @Get("/")
  async getPostOne(@Response() res: any, @Body() body: any) {
    try {
      await this.service.getAllPost(body, res);
    } catch (err) {
      res.send(err.message);
    }
  }
}
