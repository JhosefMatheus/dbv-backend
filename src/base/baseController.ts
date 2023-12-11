import { Request, Response } from "express";

export interface IBaseController<FindManyBody = undefined, UpdateByIdBody = undefined, CreateOneBody = undefined> {
  findById?(id: string, req: Request, res: Response): Promise<Response>;
  findMany?(body: FindManyBody, req: Request, res: Response): Promise<Response>;
  updateById?(id: string, body: UpdateByIdBody, req: Request, res: Response): Promise<Response>;
  deleteById?(id: string, req: Request, res: Response): Promise<Response>;
  createOne?(body: CreateOneBody, req: Request, res: Response): Promise<Response>;
}