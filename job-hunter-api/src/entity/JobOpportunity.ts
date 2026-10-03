import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { JobHiringRegime, JobType, JobSeniority, UnwantedReason, JobPlatform } from '../@types/types';

@Entity()
export class JobOpportunity {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column({ nullable: true })
  idInPlatform?: string;

  @Column()
  company!: string;

  @Column({ enum: Object.values(JobPlatform) })
  platform!: JobPlatform;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({ nullable: true })
  skills?: string;

  @Column({ nullable: true })
  benefits?: string;

  @Column()
  url!: string;

  @Column({ enum: Object.values(JobType), nullable: true })
  type?: JobType;

  @Column({ enum: Object.values(JobHiringRegime), nullable: true })
  hiringRegime?: JobHiringRegime;

  @Column({ enum: Object.values(JobSeniority), nullable: true })
  seniority?: JobSeniority;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  state?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  skillsRating?: number;

  @Column({ nullable: true })
  benefitsRating?: number;

  @Column({ default: 0 })
  totalRating!: number;

  @Column({ default: false })
  applied!: boolean;

  @Column({ default: 0 })
  numberOfInterviews!: number;

  @Column({ default: 0 })
  numberOfTests!: number;

  @Column({ default: false })
  discarded!: boolean;

  @Column({ default: false })
  recused!: boolean;

  @Column({ default: false })
  unwanted!: boolean;

  @Column({ default: new Date() })
  createdAt!: Date;

  @Column({ enum: Object.values(UnwantedReason), nullable: true })
  unwantedReason?: UnwantedReason;
}
