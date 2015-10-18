import $ from 'teaspoon';

import { default as chai, expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import CatList from '../src/CatList';
import CatItem from '../src/CatItem';

import fake from './fake';

describe('Category list', () => {
    'use strict';

    const fakeRemoveHandler = sinon.spy();

    const createComp = () => {
        const catList = new CatList({
            list: fake.catList,
            onRemove: fakeRemoveHandler
        });
        return $(catList.render()).shallowRender();
    };

    it('should show all Categories', () => {
        expect(createComp().find(CatItem).length).to.equal(fake.catList.length);
    });

    describe('on each child Remove Handler call', () => {
        it('should call parent Remove Handler', () => {
            createComp().find(CatItem).each((catItem, i) => {
                catItem.props.onRemove();

                expect(fakeRemoveHandler).to.be.calledWith(fake.catList[i].id);
            });
        });
    });
});
