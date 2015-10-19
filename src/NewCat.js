import React from 'react';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = { value: '' };

        this.cat = {
            id: '20',
            number: '0'
        };
    }

    changeHandler(e) {
        this.cat.name = e.target.value;
        this.setState({ value: e.target.value });
    }
    submitHandler(e) {
        e.preventDefault();

        this.props.onSubmit(this.cat);

        //e.target.reset();
        this.setState({ value: '' });
    }

    render() {
        return (
            <form onSubmit={ this.submitHandler.bind(this) }>
                <input className="new-cat-input"
                       placeholder="New category name"
                       onClick={ this.props.onClick }
                       onChange={ this.changeHandler.bind(this) }
                       //defaultValue=''
                       value={ this.state.value }
                />
                <span className="new-cat-hint" visible={ this.props.active }>Press <i>Enter</i> to confirm</span>
            </form>
        );
    }
}