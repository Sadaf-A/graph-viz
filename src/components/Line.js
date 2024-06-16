import React from 'react';

const Line = ({ sourceX, sourceY, destX, destY }) => {
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
        stroke={'black'}
        strokeWidth="2"
      />
    </svg>
  );
};

export default Line;