import { Typography } from "antd"

type JobDescriptionProps = {
  description?: string[]
}
export const JobDescription = ({ description }: JobDescriptionProps) => {
  return <div>
    <Typography.Title level={2}>Descrição</Typography.Title>
    <div style={{ flex: 1, overflowY: 'auto' }}>
      {description?.map(cur => <Typography.Paragraph>{cur}</Typography.Paragraph>)}
    </div>
  </div>
}