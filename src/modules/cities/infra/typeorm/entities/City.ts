import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { IBaseEntity } from '../../../../../shared/infra/http/typeorm/interfaces/IBaseEntity';
import { Client } from '../../../../clients/infra/typeorm/entities/Client';

@Entity({ schema: 'public', name: 'cities' })
export class City extends IBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'character varying', length: 255 })
  name: string;

  @Column({ type: 'character varying', length: 255 })
  state: string;

  @OneToMany(() => Client, (client) => client.city)
  clients?: Client[];

  constructor() {
    super();

    this.id ||= uuid();
  }
}
