import { TaskStatusEnum } from 'src/shared/constants';
import { Base } from 'src/shared/database/entities/base';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ToDoList } from './to-do-list.entity';

@Entity({ name: 'tasks' })
export class Task extends Base {
  @Column({ length: 200 })
  description: string;

  @Column({ type: 'enum', enum: TaskStatusEnum })
  status: TaskStatusEnum;

  @Column({ name: 'due_date', type: 'timestamp' })
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
