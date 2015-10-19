import React from 'react';

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    changeHandler(e) {
        this.props.onSearch(e.target.value);
    }

    resetHandler() {
        this.changeHandler({ target: { value: '' } });
    }

    render() {
        return (
            <form onReset={ this.resetHandler.bind(this) }>
                <input className="search-input"
                       placeholder="Search"
                       onChange={ this.changeHandler.bind(this) }
                />
            </form>
        );
    }
}