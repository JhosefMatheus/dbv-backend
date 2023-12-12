import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Role } from "./role.entity";

@Entity({
  name: 'role_grant'
})
@Unique(['roleGrantingId', 'roleGrantedId'])
export class RoleGrant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'role_granting_id',
    nullable: false
  })
  roleGrantingId: number;

  @ManyToOne(() => Role, role => role.roleGrantings)
  @JoinColumn({ name: 'role_granting_id' })
  roleGranting: Role

  @Column({
    name: 'role_granted_id',
    nullable: false
  })
  roleGrantedId: number;

  @ManyToOne(() => Role, role => role.roleGranteds)
  @JoinColumn({ name: 'role_granted_id' })
  roleGranted: Role
}