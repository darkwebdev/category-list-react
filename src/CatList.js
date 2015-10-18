import React from 'react';

import dispatcher from './dispatcher';
import CatItem from './CatItem';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: props.list
        };
    }

    removeHandler(cat) {
        dispatcher.dispatch({
            actionType: 'remove-cat',
            cat: cat
        });
    }

    render() {
        return (
            <ul>
                {this.state.list.map(cat =>
                    <CatItem
                        key={ cat.id }
                        name={ cat.name }
                        number={ cat.number }
                        onRemove={ this.removeHandler.bind(this, cat) }
                    />
                )}
            </ul>
        );
    }
}
