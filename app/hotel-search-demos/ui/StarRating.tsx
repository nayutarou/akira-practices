"use client";

import React from 'react';

interface StarRatingProps {
  rating: number | null;
  maxStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxStars = 5 }) => {
  if (rating === null) {
    return <span>評価なし</span>;
  }

  const stars = [];
  const roundedRating = Math.round(rating * 10) / 10; // 小数点第一位で丸める

  for (let i = 1; i <= maxStars; i++) {
    let fillPercentage = 0;
    if (roundedRating >= i) {
      fillPercentage = 100; // 完全に塗りつぶされた星
    } else if (roundedRating > i - 1) {
      fillPercentage = (roundedRating - (i - 1)) * 100; // 部分的に塗りつぶされた星
    }
    stars.push(<StarIcon key={i} fillPercentage={fillPercentage} />);
  }

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      {/* 数字の評価 */}
      <span style={{ marginRight: '5px' }}>{rating.toFixed(1)}</span>
      {stars}
    </div>
  );
};

interface StarIconProps {
  fillPercentage: number;
}

const StarIcon: React.FC<StarIconProps> = ({ fillPercentage }) => {
  const uniqueId = React.useId(); // SVGのclipPathにユニークなIDを付与
  const clipPathId = `star-clip-${uniqueId}`;

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginRight: '2px' }}
    >
      <defs>
        <clipPath id={clipPathId}>
          <rect x="0" y="0" width={`${fillPercentage}%`} height="100%" />
        </clipPath>
      </defs>
      {/* 背景の空の星 */}
      <path
        d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.62L12 2L9.19 8.62L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
        fill="#ccc" // 空の星の色
      />
      {/* 塗りつぶされた星（クリップパス適用） */}
      <path
        d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.62L12 2L9.19 8.62L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
        fill="#FFD700" // 塗りつぶされた星の色
        clipPath={`url(#${clipPathId})`}
      />
    </svg>
  );
};

export default StarRating;