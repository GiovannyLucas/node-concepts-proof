import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { IBaseEntity } from '../../../../../shared/infra/http/typeorm/interfaces/IBaseEntity';
import { City } from '../../../../cities/infra/typeorm/entities/City';

@Entity({ schema: 'public', name: 'clients' })
export class Client extends IBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'character varying', length: 255 })
  full_name: string;

  @Column({ type: 'character varying', length: 1 })
  gender: 'M' | 'F';

  @Column({ type: 'date' })
  born_date: 'M' | 'F';

  @Column({ type: 'integer' })
  age: number;

  @Column({ type: 'uuid' })
  city_living_id: string;

  @ManyToOne(() => City, (city) => city.clients)
  @JoinColumn({ name: 'city_id' })
  city: City;

  constructor() {
    super();

    this.id ||= uuid();
  }
}
