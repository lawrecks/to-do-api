import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Base } from 'src/shared/database/entities/base';
import { ToDoList } from 'src/shared/database/entities/to-do-list.entity';

@Entity({ name: 'users' })
export class User extends Base {
  @Column({ length: 20, name: 'first_name' })
  firstName: string;

  @Column({ length: 20, name: 'last_name' })
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => ToDoList, (toDoList) => toDoList.user)
  toDoLists: ToDoList[];

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeInsert()
  beforeCreate() {
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
    if (this.hashPassword) {
      this.hashPassword();
    }
  }
}
