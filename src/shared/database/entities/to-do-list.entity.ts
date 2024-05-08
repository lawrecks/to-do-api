import { Base } from 'src/shared/database/entities/base';
import { User } from 'src/shared/database/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Task } from './task.entity';

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
}
