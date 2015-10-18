import React from 'react';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.cat = {
            id: '20',
            number: '0'
        };
    }

    changeHandler(e) {
        this.cat.name = e.target.value;
    }

    render() {
        return (
            <form onSubmit={ this.props.onSubmit.bind(this, this.cat) }>
                <input className="new-cat-input"
                       placeholder="New category name"
                       onClick={ this.props.onClick }
                       onChange={ this.changeHandler.bind(this) }
                />
                <span className="new-cat-hint" visible={ this.props.active }>Press <i>Enter</i> to confirm</span>
            </form>
        );
    }
}