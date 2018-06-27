import React from 'react';

const Menu = (props) => (
  <div>
    <button onClick={props.onDayClick}>Last day</button>
    <button onClick={props.onMonthClick}>Last month</button>
    <button>Last year</button>
  </div>
);

export default Menu;
