import { green, orange, red } from '@ant-design/colors';
import { FrownTwoTone, MehTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Space } from 'antd';
import { memo, useCallback } from 'react';

const COLOR_LEVEL = 5;

interface RatingProps {
  rating: number;
  minRating?: number;
  maxRating?: number;
}

const Rating = ({ minRating, maxRating, rating }: RatingProps) => {
  const classifyRating = useCallback(
    (minRating?: number, maxRating?: number): 'low' | 'median' | 'high' => {
      if (rating === undefined || minRating === undefined || maxRating === undefined) return 'low';
      if (rating < (minRating + (maxRating - minRating) / 3)) return 'low';
      if (rating < (minRating + (2 * (maxRating - minRating)) / 3)) return 'median';
      return 'high';
    },
    [],
  );

  const classification = classifyRating(minRating, maxRating);
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
