import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Index, OneToMany } from 'typeorm';
import User from '../users/user.entity';
import Category from '../categories/category.entity';
import Comment from '../comments/comment.entity';

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public title!: string;

  @Column('text', { array: true })
  public paragraphs!: string[];

  @Column({ nullable: true })
  public category?: string;

  @Index('post_authorId_index')
  @ManyToOne(() => User, (author: User) => author.posts)
  public author!: User;

  @ManyToMany(() => Category, (category: Category) => category.posts)
  @JoinTable()
  public categories!: Category[];

  @OneToMany(() => Comment, (comment: Comment) => comment.post)
  public comments!: Comment[];
}

export default Post;