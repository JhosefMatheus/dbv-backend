import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Role } from "./role.entity";
import { Endpoint } from "./endpoint.entity";

@Entity({
  name: 'role_endpoint'
})
@Unique(['roleId', 'endpointId'])
export class RoleEndpoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'role_id',
    nullable: false
  })
  roleId: number;

  @ManyToOne(() => Role, role => role.endpoints)
  @JoinColumn({ name: 'role_id' })
  role: Role

  @Column({
    name: 'endpoint_id',
    nullable: false
  })
  endpointId: number;
  
  @ManyToOne(() => Endpoint, endpoint => endpoint.roles)
  @JoinColumn({ name: 'endpoint_id' })
  endpoint: Endpoint
}