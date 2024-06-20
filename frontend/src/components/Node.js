import React, { useState, useEffect } from 'react';

const Node = ({ id, x, y, onDrag, highlighted}) => {
  const [position, setPosition] = useState({ x, y });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMovement = (e) => {
      if (isDragging) {
        const container = document.getElementById('node-container');
        const containerRect = container.getBoundingClientRect();
        const newPosition = {
          x: e.clientX + offset.x,
          y: e.clientY + offset.y,
        };

        newPosition.x = Math.max(0, Math.min(newPosition.x, containerRect.width - 30));
        newPosition.y = Math.max(0, Math.min(newPosition.y, containerRect.height - 30));

        setPosition(newPosition);
        onDrag(id, newPosition);
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMovement);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMovement);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, offset, onDrag, id]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: position.x - e.clientX,
      y: position.y - e.clientY,
    });
    e.stopPropagation();
  };

  return (
    <div
      className={`node ${highlighted ? 'highlighted-node' : ''}`}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: '35px',
        height: '35px',
        backgroundColor: highlighted ? '#1abc9c' : '#354E56',
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
      onMouseDown={handleMouseDown}
    >
      {id}
    </div>
  );
};

export default Node;
