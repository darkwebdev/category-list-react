import sinon from 'sinon';
import _ from 'lodash';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import App from '../src/App';

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
    remove: sinon.spy()
};

const storage = {
    getItem: _.constant(JSON.stringify(catList)),
    setItem: _.noop
};

class Renderer {
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
    getCatList() {
        return this.renderer.getRenderOutput().props.children[2];
    }
}

export default {
    catItem: catItem,
    catList: catList,
    increasedCatList: increasedCatList,
    decreasedCatList: decreasedCatList,
    catModel: catModel,
    storage: storage,
    Renderer: Renderer
};