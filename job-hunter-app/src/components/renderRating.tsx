import { FrownTwoTone, MehTwoTone, SmileTwoTone } from "@ant-design/icons";
import { Space } from "antd";

const classifyRating = (indexOf: number, length: number): 'low' | 'median' | 'high' => {
  if (indexOf < length / 3) return 'low';
  if (indexOf < (length * 2) / 3) return 'median';
  return 'high'
}

export const renderRating = (rating: number, indexOf: number, length: number) => {
  const classification = classifyRating(indexOf, length);
  const color = classification === 'low' ? "red" : classification === 'median' ? "orange" : "green";
  const icon = classification === 'low' ? <FrownTwoTone twoToneColor={color} /> : classification === 'median' ? <MehTwoTone twoToneColor={color} /> : <SmileTwoTone twoToneColor={color} />;

  return <Space>
    {icon}
    <span style={{ color }}>
      {rating}
    </span>
  </Space>
}