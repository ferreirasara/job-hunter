import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class JobOpportunity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string

  @Column({ nullable: true })
  idInPlatform: string

  @Column()
  company: string

  @Column({ enum: ["GUPY", "LINKEDIN", "INDEED"] })
  platform: string

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  url: string

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
