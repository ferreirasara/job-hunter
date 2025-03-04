import { green, orange, red } from '@ant-design/colors';
import { FrownTwoTone, MehTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Space } from 'antd';
import { memo, useCallback } from 'react';

const COLOR_LEVEL = 5;

interface RatingProps {
  rating: number;
  indexOf: number;
  length: number;
}

const Rating = ({ indexOf, length, rating }: RatingProps) => {
  const classifyRating = useCallback(
    (indexOf: number, length: number): 'low' | 'median' | 'high' => {
      if (indexOf < length / 3) return 'low';
      if (indexOf < (length * 2) / 3) return 'median';
      return 'high';
    },
    [],
  );

  const classification = classifyRating(indexOf, length);
  const color =
    classification === 'low'
      ? red[COLOR_LEVEL]
      : classification === 'median'
        ? orange[COLOR_LEVEL]
        : green[COLOR_LEVEL];
  const icon =
    classification === 'low' ? (
      <FrownTwoTone twoToneColor={color} />
    ) : classification === 'median' ? (
      <MehTwoTone twoToneColor={color} />
    ) : (
      <SmileTwoTone twoToneColor={color} />
    );

  return (
    <Space>
      {icon}
      <span style={{ color }}>{rating}</span>
    </Space>
  );
};

export default memo(Rating);
