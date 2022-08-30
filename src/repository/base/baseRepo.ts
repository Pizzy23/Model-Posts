import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class BaseRepository {
  req: any;
  res: any;
  statusCode: any;
  constructor() {}

  async addUserBase(body: any) {
    try {
      const create = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
        },
      });
      return this._setStatus(200);
    } catch (err) {
      return this._setStatus(500);
    }
  }
  async addPostBase(body: any, date: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: body.email },
      });
      if (user) {
        await prisma.post.create({
          data: {
            text: body.text,
            userId: user.id,
            created_at: date,
          },
        });
        return this._setStatus(200);
      } else {
        return this._setStatus(404);
      }
    } catch (err) {
      return this._setStatus(500);
    }
  }

  async getLastPost(res: any, body: any) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: body.email },
      });
      const post = await prisma.post.findMany({
        where: { userId: user.id },
        take: 1,
        orderBy: {
          id: "desc",
        },
      });
      return post;
    } catch (err) {
      return this._setStatus(404);
    }
  }
  async getAllPost(res: any, body: any) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: body.email },
      });
      const post = await prisma.post.findMany({
        where: { userId: user.id },
        orderBy: {
          id: "asc",
        },
      });
      return post;
    } catch (err) {
      return this._setStatus(404);
    }
  }

  _setStatus(code: number) {
    return (this.statusCode = code);
  }
}
