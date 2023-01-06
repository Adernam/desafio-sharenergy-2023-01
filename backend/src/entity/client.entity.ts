import { Entity, ObjectIdColumn, Column } from "typeorm";

@Entity()
export class Client {
  @ObjectIdColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  cpf: string;
}
