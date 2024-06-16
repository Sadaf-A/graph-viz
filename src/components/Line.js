import React from 'react';

const Line = ({ sourceX, sourceY, destX, destY, highlighted }) => {
  return (
    <svg
      style={{
        position: 'absolute',
        overflow: 'visible',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      <line
        x1={sourceX}
        y1={sourceY}
        x2={destX}
        y2={destY}
        stroke={highlighted ? '#1abc9c' : '#2c3e50'}
        strokeWidth="2"
        style={{
            transition: 'stroke 0.1s ease', 
        }}
      />
    </svg>
  );
};

export default Line;