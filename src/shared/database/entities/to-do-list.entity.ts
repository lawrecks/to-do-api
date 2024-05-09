import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Base } from './base';
import { Task } from './task.entity';
import { User } from './user.entity';

@Entity('to_do_lists')
export class ToDoList extends Base {
  @Column({ length: 100 })
  name: string;

  @ManyToOne(() => User, (user) => user.id, {
    eager: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User | number;

  @OneToMany(() => Task, (task) => task.toDoList)
  tasks: Task[];

  @BeforeInsert()
  beforeCreate() {
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
  }
}
