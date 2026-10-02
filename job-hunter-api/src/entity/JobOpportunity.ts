import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UnwantedReason } from '../@types/types';

@Entity()
export class JobOpportunity {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column({ nullable: true })
  idInPlatform?: string;

  @Column()
  company!: string;

  @Column({
    enum: [
      'GUPY',
      'PROGRAMATHOR',
      'TRAMPOS',
      'VAGAS',
      'REMOTAR',
      'LINKEDIN',
      'DIVULGA_VAGAS',
      'COODESH',
      'STARTUP',
      'SOLIDES',
      'WE_WORK_REMOTELY',
      'REMOTEOK',
      'REMOTIFYEUROPE',
      'INHIRE',
      'FRONTENDBR',
      'REMOTEROCKETSHIP',
      'QUICKIN',
    ],
  })
  platform!: string;

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

  @Column({ enum: ['REMOTE', 'HYBRID', 'FACE_TO_FACE'], nullable: true })
  type?: string;

  @Column({ enum: ['CLT', 'PJ'], nullable: true })
  hiringRegime?: string;

  @Column({ enum: ['JUNIOR', 'MID_LEVEL', 'SENIOR'], nullable: true })
  seniority?: string;

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
