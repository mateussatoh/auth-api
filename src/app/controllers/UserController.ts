import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import User from "../models/User";

class UserController {
  index(req: Request, res: Response) {
    return res.send({ userId: req.userId });
  }

  async delete(req: Request, res: Response) {
    const repository = getRepository(User);
    const { id, password } = req.body;

    const userToDelete = await repository.findOne({ where: { id } });

    if (!userToDelete) {
      return res.sendStatus(401);
    }

    const isValidPassword = await bcrypt.compare(
      password,
      userToDelete.password
    );

    if (isValidPassword) {
      const results = await repository.delete(id);
      return res.send(results);
    }
  }

  async store(req: Request, res: Response) {
    const repository = getRepository(User);
    const { email, password } = req.body;

    const userExists = await repository.findOne({ where: { email } });

    if (userExists) {
      return res.sendStatus(409);
    }

    const user = repository.create({ email, password });

    await repository.save(user);

    return res.json(user);
  }
}

export default new UserController();
