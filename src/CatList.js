import _ from 'lodash';
import React from 'react';

import CatItem from './CatItem';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: props.list
        };
        this.removeHandler = props.onRemove || _.noop;
    }

    render() {
        return (
            <ul>
                {this.state.list.map(cat =>
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
