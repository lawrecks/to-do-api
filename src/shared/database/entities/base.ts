import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  DeleteDateColumn,
  BeforeRemove,
} from 'typeorm';

export abstract class Base {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
  })
  deletedAt?: Date;

  @BeforeInsert()
  beforeCreate() {
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date();
  }

  @BeforeRemove()
  beforeDestroy() {
    this.deletedAt = new Date();
  }
}
