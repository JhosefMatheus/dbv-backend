import { Functionality } from "@prisma/client";

export interface GetFunctionalitiesResponse {
  message: string;
  functionalities: Functionality[];
}