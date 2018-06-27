import React from 'react';

import SelectDays from './selectDays';

const buttonStyle = {
  backgroundColor: 'white', 
  color: 'black', 
  border: '2px solid rgba(75,192,192,0.4)',
  margin: '4px 2px',
}

const inputStyle = {
  float: 'right',
}

const Menu = ({ onDayClick, onMonthClick, onYearClick }) => (
  <div>
    <span>
    <button style={buttonStyle} onClick={onDayClick}>Past 24 hours</button>
    <button style={buttonStyle} onClick={onMonthClick}>Past month</button>
    <button style={buttonStyle} onClick={onYearClick}>Past year</button>
    </span>
    <span style={inputStyle}>
      <SelectDays />
    </span>
  </div>
);

export default Menu;
