import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class JobOpportunity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string

  @Column({ nullable: true })
  idInPlatform: string

  @Column()
  company: string

  @Column({ enum: ["GUPY", "PROGRAMATHOR", "TRAMPOS", "VAGAS", "REMOTAR", "LINKEDIN", "JOBATUS"] })
  platform: string

  @Column()
  title: string

  @Column()
  description: string

  @Column({ nullable: true })
  skills: string

  @Column({ nullable: true })
  benefits: string

  @Column()
  url: string

  @Column({ enum: ["REMOTE", "HYBRID", "FACE_TO_FACE"], nullable: true })
  type: string

  @Column({ enum: ["CLT", "PJ"], nullable: true })
  hiringRegime: string

  @Column({ enum: ["JUNIOR", "MID_LEVEL", "SENIOR"], nullable: true })
  seniority: string

  @Column({ nullable: true })
  country: string

  @Column({ nullable: true })
  state: string

  @Column({ nullable: true })
  city: string

  @Column({ nullable: true })
  skillsRating: number

  @Column({ nullable: true })
  benefitsRating: number

  @Column({ nullable: true })
  totalRating: number

  @Column({ default: false })
  applied: boolean

  @Column({ nullable: true, default: 0 })
  numberOfInterviews: number

  @Column({ nullable: true, default: 0 })
  numberOfTests: number

  @Column({ default: false })
  discarded: boolean

  @Column({ default: false })
  recused: boolean

  @Column({ default: new Date() })
  createdAt: Date
}
