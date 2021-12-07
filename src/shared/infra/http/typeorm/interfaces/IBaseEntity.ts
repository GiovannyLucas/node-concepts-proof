import { CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

export class IBaseEntity {
  @CreateDateColumn()
  created_at?: Date;
  
  @UpdateDateColumn()
  updated_at?: Date;
  
  @VersionColumn()
  version?: number;
}