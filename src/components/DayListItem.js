import React from "react";

import "components/DayListItem.scss";

const classNames = require('classnames')

export default function DayListItem(props) {

  const dayList = classNames("day-list__item",props.className, {
    "day-list__item--selected" : props.selected,
    "day-list__item--full" : props.spots === 0
  });
  return (
    <li className= {dayList} data-testid="day" onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}


function formatSpots(spots) {
  if (spots === 1) {
    return spots + " spot remaining";
  } else {
    return spots ? spots + " spots remaining" : "no spots remaining";
  }
};
