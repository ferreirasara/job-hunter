import { LinkOutlined } from "@ant-design/icons"
import { Typography } from "antd"

type LinkProps = { url?: string }

export const Link = ({ url }: LinkProps) => {
  return <Typography.Link href={url} target="_blank"><LinkOutlined /></Typography.Link>
}