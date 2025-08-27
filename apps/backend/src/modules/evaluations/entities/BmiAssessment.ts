import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BmiClassification } from './BmiClassification';
import { User } from '../../users/entities/User';

@Entity('bmi_assessment')
export class BmiAssessment {
  @PrimaryGeneratedColumn('uuid') id!: string;

  @Column('decimal', { precision: 5, scale: 2 }) height!: number;

  @Column('decimal', { precision: 6, scale: 2 }) weight!: number;

  @Column('decimal', { precision: 6, scale: 2 }) bmi!: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' }) createdAt!: Date;

  @ManyToOne(() => BmiClassification, (classification) => classification.assessments)
  @JoinColumn({ name: 'classification_id' })
  classification!: BmiClassification;

  @ManyToOne(() => User, (user: User) => user.assessmentsGiven)
  @JoinColumn({ name: 'evaluator_user_id' })
  evaluator!: User;

  @ManyToOne(() => User, (user: User) => user.assessmentsReceived)
  @JoinColumn({ name: 'student_user_id' })
  student!: User;
}
