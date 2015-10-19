import React from 'react';

export default props =>
    <li className="cat-item">
        <span className="cat-number">{ props.number }</span>
        <span className="cat-name">{ props.name }</span>
        <button className="cat-remove-btn" onClick={ props.onRemove }>&#10005;</button>
    </li>
;
