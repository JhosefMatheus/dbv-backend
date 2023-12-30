import { Role } from "@prisma/client";

export type UserSignInData = {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}