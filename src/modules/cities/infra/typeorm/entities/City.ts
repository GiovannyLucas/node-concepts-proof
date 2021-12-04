import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { IBaseEntity } from '../../../../../shared/infra/http/typeorm/interfaces/IBaseEntity';

@Entity({ schema: 'public', name: 'cities' })
export class City extends IBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'character varying', length: 255 })
  name: string;

  @Column({ type: 'character varying', length: 255 })
  state: string;

  constructor() {
    super();

    this.id ||= uuid();
  }
}