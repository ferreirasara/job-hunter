import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class JobOpportunity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string

  @Column({ nullable: true })
  idInPlatform: string

  @Column()
  company: string

  @Column({ enum: ["GUPY", "PROGRAMATHOR", "TRAMPOS", "VAGAS"] })
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

  @Column({ nullable: true })
  salaryRange: string

  @Column({ nullable: true })
  country: string

  @Column({ nullable: true })
  state: string

  @Column({ nullable: true })
  city: string

  @Column({ default: false })
  applied: boolean

  @Column({ default: false })
  discarded: boolean

  @Column({ default: new Date() })
  createdAt: Date
}
