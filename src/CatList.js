import _ from 'lodash';
import React from 'react';

import CatItem from './CatItem';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.removeHandler = props.onRemove || _.noop;
    }

    render() {
        return (
            <ul className="cat-list">
                {this.props.list.map(cat =>
                    <CatItem
                        key={ cat.id }
                        name={ cat.name }
                        number={ cat.number }
                        onRemove={ this.removeHandler.bind(this, cat.id) }
                    />
                )}
            </ul>
        );
    }
}
