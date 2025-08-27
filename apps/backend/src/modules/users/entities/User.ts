import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserRole, UserStatus } from '../enums';
import { UserToken } from '../../tokens/entities/UserToken';
import { BmiAssessment } from '../../evaluations/entities/BmiAssessment';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid') id!: string;

  @Column({ length: 60, type: 'varchar' }) name!: string;

  @Column({ unique: true, length: 60, type: 'varchar' }) username!: string;

  @Column({ type: 'text' }) password!: string;

  @Column({ type: 'varchar', enum: UserRole }) role!: UserRole;

  @Column({ type: 'varchar', enum: UserStatus }) status!: UserStatus;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' }) created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' }) updated_at!: Date;

  @OneToMany(() => UserToken, (token: UserToken) => token.user) tokens!: UserToken[];

  @OneToMany(() => BmiAssessment, (assessment) => assessment.evaluator)
  assessmentsGiven!: BmiAssessment[];

  @OneToMany(() => BmiAssessment, (assessment) => assessment.student)
  assessmentsReceived!: BmiAssessment[];
}
