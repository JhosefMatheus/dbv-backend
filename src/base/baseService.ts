import { IBaseResponse } from "./baseResponse";

export interface IBaseService<FindManyBody = undefined, UpdateByIdBody = undefined, CreateOneBody = undefined> {
  findById?<FindByIdResponse extends IBaseResponse>(id: string): Promise<FindByIdResponse>;
  findMany?<FindManyResponse extends IBaseResponse>(body: FindManyBody): Promise<FindManyResponse[]>;
  updateById?<UpdateByIdResponse extends IBaseResponse>(id: string, body: UpdateByIdBody): Promise<UpdateByIdResponse>;
  deleteById?<DeleteByIdResponse extends IBaseResponse>(id: string): Promise<DeleteByIdResponse>;
  createOne?<CreateOneResponse extends IBaseResponse>(body: CreateOneBody): Promise<CreateOneResponse>;
}