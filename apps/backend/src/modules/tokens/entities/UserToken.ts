import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/User';

@Entity('user_token')
export class UserToken {
  @PrimaryGeneratedColumn('uuid') id!: string;

  @Column({ name: 'refresh_token', type: 'text' }) refreshToken!: string;

  @Column({ name: 'expires_at', type: 'datetime' }) expiresAt!: Date;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' }) createdAt!: Date;

  @ManyToOne(() => User, (user) => user.tokens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
