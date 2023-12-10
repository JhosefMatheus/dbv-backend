import { User } from "src/user/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

  @OneToMany(() => User, user => user.roleId)
  users: User[];
}