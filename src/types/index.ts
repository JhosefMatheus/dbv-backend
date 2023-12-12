import { Role } from "../entities";

export type UserData = {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}