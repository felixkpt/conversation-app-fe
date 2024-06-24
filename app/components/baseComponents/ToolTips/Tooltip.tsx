import React from 'react';

const Tooltip = ({ children, text }) => {
  return (
    <div className="tooltip" data-tip={text}>
      {children}
    </div>
  );
};

export default Tooltip;
