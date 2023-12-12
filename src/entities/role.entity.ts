import { User } from "./user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleGrant } from "./role-grant.entity";
import { RoleEndpoint } from "./role-endpoint.entity";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    type: 'varchar',
    nullable: false
  })
  name: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
    name: 'created_at'
  })
  createdAt: Date;

  @Column({
    type: 'datetime',
    nullable: true,
    name: 'updated_at'
  })
  updatedAt: Date;

  @Column({
    type: 'datetime',
    nullable: true,
    name: 'deleted_at'
  })
  deletedAt: Date;

  @OneToMany(() => User, user => user.role)
  users: User[];

  @OneToMany(() => RoleGrant, roleGrant => roleGrant.roleGranting)
  roleGrantings: RoleGrant[];

  @OneToMany(() => RoleGrant, roleGrant => roleGrant.roleGranted)
  roleGranteds: RoleGrant[];

  @OneToMany(() => RoleEndpoint, roleEndpoint => roleEndpoint.role)
  endpoints: RoleEndpoint[];
}