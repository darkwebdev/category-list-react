import _ from 'lodash';
import React from 'react';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = { value: '' };
    }

    changeHandler(e) {
        this.catName = e.target.value;
        this.setState({ value: e.target.value });
    }
    submitHandler(e) {
        e.preventDefault();

        const cat = {
            id: String(_.random(1000)), //ok for now
            name: this.catName,
            number: '0'
        };
        this.props.onSubmit(cat);

        this.setState({ value: '' });
    }

    render() {
        return (
            <form onSubmit={ this.submitHandler.bind(this) } className="new-cat">
                <input className="new-cat-input"
                       placeholder="New category name"
                       onClick={ this.props.onClick }
                       onChange={ this.changeHandler.bind(this) }
                       value={ this.state.value }
                />
                <span className={ 'new-cat-hint' + (this.state.value ? ' visible' : '') }>
                    Press <i>Enter</i> to confirm
                </span>
            </form>
        );
    }
}