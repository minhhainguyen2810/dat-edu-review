'use client';

import { Rate } from 'antd';
import { RATE_COLOR, RATE_RANKS } from 'app/const';

export default function RateInfo({ value }: { value: number }) {
  return (
    <div className="flex items-center space-x-2">
      <span>
        <Rate value={value} />
      </span>{' '}
      <span className={RATE_COLOR[Math.round(value) - 1]}>
        {RATE_RANKS[Math.round(value) - 1]}
      </span>
    </div>
  );
}
