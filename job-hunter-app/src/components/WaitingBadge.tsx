import { yellow, orange, red } from '@ant-design/colors';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { memo } from 'react';
import { formatDateHour, calcDaysSince, getWaitingAlertType } from '../utils/utils';

interface WaitingBadgeProps {
  createdAt: string | Date;
}

const WaitingBadge = ({ createdAt }: WaitingBadgeProps) => {
  const COLOR_LEVEL = 5;
  const daysSince = calcDaysSince(createdAt);
  const alertType = getWaitingAlertType(daysSince);

  if (!alertType) return null;

  const getAlertConfig = (type: 'warning' | 'alert' | 'critical') => {
    switch (type) {
      case 'warning':
        return {
          color: yellow[COLOR_LEVEL],
        };
      case 'alert':
        return {
          color: orange[COLOR_LEVEL],
        };
      case 'critical':
        return {
          color: red[COLOR_LEVEL],
        };
      default:
        return {
          color: yellow[COLOR_LEVEL],
        };
    }
  };

  const config = getAlertConfig(alertType);

  return (
    <Tooltip
      title={
        <div>
          <div>Aguardando {daysSince} dias</div>
          <div>Aplicada em: {formatDateHour(createdAt as string)}</div>
        </div>
      }
    >
      <ExclamationCircleOutlined
        style={{
          color: config.color,
          fontSize: 16,
          marginLeft: 8,
          cursor: 'pointer',
        }}
      />
    </Tooltip>
  );
};

export default memo(WaitingBadge);
