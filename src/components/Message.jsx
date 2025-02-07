import React from 'react';



const Message = ({ text, isMyMessage }) => {
  return (
    <div style={{ textAlign: isMyMessage ? 'right' : 'left', margin: '10px' }}>
      <div
        style={{
          display: 'inline-block',
          padding: '10px',
          borderRadius: '10px',
          backgroundColor: isMyMessage ? '#DCF8C6' : '#ECECEC',
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default Message;