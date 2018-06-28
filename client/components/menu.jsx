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
  marginRight: '240px',
}

const Menu = ({ 
  onDayClick, 
  onMonthClick, 
  onYearClick, 
  onCoinClick, 
  displayCustomDateRange, 
  coin 
}) => (
  <div>
    <span>
    <button style={buttonStyle} onClick={onDayClick}>Past 24 hours</button>
    <button style={buttonStyle} onClick={onMonthClick}>Past month</button>
    <button style={buttonStyle} onClick={onYearClick}>Past year</button>
    <button style={buttonStyle} onClick={onCoinClick}>Switch to {coin === 'ETH' ? 'Bitcoin' : 'Ethereum'}</button>
    </span>
    <span style={inputStyle}>
      <SelectDays displayCustomDateRange={displayCustomDateRange} />
    </span>
  </div>
);

export default Menu;
