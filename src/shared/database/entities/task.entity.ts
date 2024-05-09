import { TaskStatusEnum } from '../../constants';
import { Base } from './base';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ToDoList } from './to-do-list.entity';

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
