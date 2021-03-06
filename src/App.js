import React from 'react';

import NewCat from '../src/NewCat';
import Search from '../src/Search';
import CatList from '../src/CatList';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.catModel = props.catModel;

        this.state = {
            newCatActive: props.newCatActive,
            searchActive: props.searchActive,
            catList: this.catModel.get()
        };
    }

    activateNewCat() {
        this.setState({
            newCatActive: true
        });
    }
    disactivateNewCat() {
        this.setState({
            newCatActive: false
        });
    }
    submitForm(cat) {
        this.disactivateNewCat();
        this.addCat(cat);
    }
    addCat(cat) {
        this.catModel.add(cat);
        this.updateCatList();
    }
    removeCat(id) {
        this.catModel.remove(id);
        this.updateCatList();
    }
    searchCat(text) {
        this.updateCatList(this.catModel.search(text));
    }
    updateCatList(list) {
        this.setState({
            catList: list || this.catModel.get()
        });
    }

    render() {
        return (
            <main>
                <NewCat
                    active={ this.state.newCatActive }
                    onClick={ this.activateNewCat.bind(this) }
                    onSubmit={ this.submitForm.bind(this) }
                />
                <Search
                    active={ this.state.searchActive }
                    onSearch={ this.searchCat.bind(this) }
                />
                <CatList
                    list={ this.state.catList }
                    onRemove={ this.removeCat.bind(this) }
                />
            </main>
        );
    }
}
App.propTypes = {
    newCatActive: React.PropTypes.bool,
    searchActive: React.PropTypes.bool,
    catModel: React.PropTypes.object.isRequired
};

App.defaultProps = {
    newCatActive: false,
    searchActive: false
};