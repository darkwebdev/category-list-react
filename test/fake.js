import sinon from 'sinon';
import _ from 'lodash';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import $ from 'teaspoon';

import App from '../src/App';//todo: remove it from here

const catItem = {
    id: '20',
    name: 'new cat',
    number: '0'
};

const catList = [
    {
        id: '1',
        name: 'cat1',
        number: '12'
    },
    {
        id: '2',
        name: 'cat 2',
        number: '45'
    },
    {
        id: '3',
        name: 'cat number three',
        number: '1'
    }
];

const searchText = 'three';

const foundCatList = [{
    id: '3',
    name: 'cat number three',
    number: '1'
}];

const increasedCatList = [
    {
        id: '1',
        name: 'cat1',
        number: '12'
    },
    {
        id: '2',
        name: 'cat 2',
        number: '45'
    },
    {
        id: '3',
        name: 'cat number three',
        number: '1'
    },
    {
        id: '20',
        name: 'new cat',
        number: '0'
    }
];
const decreasedCatList = [
    {
        id: '1',
        name: 'cat1',
        number: '12'
    },
    {
        id: '3',
        name: 'cat number three',
        number: '1'
    }
];

const catModel = {
    collection: catList,
    add: sinon.spy(),
    remove: sinon.spy(),
    search: _.constant(foundCatList)
};

const storage = {
    getItem: _.constant(JSON.stringify(catList)),
    setItem: _.noop
};

class AppRenderer {
    constructor(props) {
        const appProps = _.extend({ catModel: catModel }, App.defaultProps, props);

        this.renderer = TestUtils.createRenderer();
        this.renderer.render(<App { ...appProps } />);
    }

    getApp() {
        return this.renderer.getRenderOutput();
    }
    getNewCat() {
        return this.renderer.getRenderOutput().props.children[0];
    }
    getSearch() {
        return this.renderer.getRenderOutput().props.children[1];
    }
    getCatList() {
        return this.renderer.getRenderOutput().props.children[2];
    }
}

const renderComp = (Comp, props) => {
    const comp = new Comp(_.extend({}, Comp.defaultProps || {}, props));
    return $(comp.render()).shallowRender();
};

export default {
    searchText: searchText,
    foundCatList: foundCatList,
    catItem: catItem,
    catList: catList,
    increasedCatList: increasedCatList,
    decreasedCatList: decreasedCatList,
    catModel: catModel,
    storage: storage,
    AppRenderer: AppRenderer,
    renderComp: renderComp
};