import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BmiAssessment } from './BmiAssessment';
import { BmiClassificationEnum } from '../../users/enums';

@Entity('bmi_classification')
export class BmiClassification {
  @PrimaryGeneratedColumn() id!: number;

  @Column({
    type: 'text',
    unique: true,
  })
  label!: BmiClassificationEnum;

  @Column({ type: 'text', nullable: true }) description!: string;

  @OneToMany(() => BmiAssessment, (assessment: BmiAssessment) => assessment.classification)
  assessments!: BmiAssessment[];
}
