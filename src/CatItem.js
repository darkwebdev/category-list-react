import React from 'react';

export default props =>
    <li>
        <span className="cat-number">{ props.number }</span>
        <span className="cat-name">{ props.name }</span>
        <button className="cat-remove-btn" onclick={ props.onRemove }>X</button>
    </li>
;
