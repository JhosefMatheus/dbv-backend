import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { RoleEndpoint } from "./role-endpoint.entity";

@Entity()
@Unique(['url', 'method'])
export class Endpoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  method: string;

  @Column({
    nullable: true
  })
  description: string;

  @Column({
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
    type: "datetime"
  })
  createdAt: Date;

  @Column({
    name: "updated_at",
    nullable: true,
    type: "datetime"
  })
  updatedAt: Date;

  @Column({
    name: "deleted_at",
    nullable: true,
    type: "datetime"
  })
  deletedAt: Date;

  @OneToMany(() => RoleEndpoint, roleEndpoint => roleEndpoint.endpoint)
  roles: RoleEndpoint[];
}