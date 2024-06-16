import React, { useState} from 'react';

const Node = ({ id, x, y}) => {
  const [position] = useState({ x, y });

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: '35px',
        height: '35px',
        backgroundColor: '#354E56',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontSize: '14px',
        fontWeight: 'bold',
        userSelect: 'none',
        cursor: 'pointer',
        zIndex: 10,
      }}
    >
      {id}
    </div>
  );
};

export default Node;
