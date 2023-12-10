import { Role } from "src/role/role.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    name: 'role_id'
  })
  roleId: number;

  @ManyToOne(() => Role, role => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({
    nullable: false,
    type: 'varchar'
  })
  name: string;

  @Column({
    nullable: false,
    type: 'varchar',
    unique: true
  })
  email: string;

  @Column({
    nullable: false,
    type: 'varchar'
  })
  password: string;

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
}