import { Tag } from "antd"

export const renderSkills = (skills: string) => {
  return skills?.split(',')?.map(skill => <Tag>{skill?.trim()}</Tag>)
}