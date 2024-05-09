import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Base } from './base';
import { ToDoList } from './to-do-list.entity';
import { TaskStatusEnum } from '../../constants';

@Entity({ name: 'tasks' })
export class Task extends Base {
  @Column({ length: 200 })
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatusEnum,
    default: TaskStatusEnum.PENDING,
  })
  status: TaskStatusEnum;

  @Column({ name: 'due_date', type: 'date' })
  dueDate: Date;

  @ManyToOne(() => ToDoList, (list) => list.id, {
    eager: false,
  })
  @JoinColumn({ name: 'to_do_list_id' })
  toDoList: ToDoList | number;

  @BeforeInsert()
  beforeCreate() {
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
  }
}
