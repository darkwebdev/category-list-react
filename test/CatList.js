import $ from 'teaspoon';

import { default as chai, expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import CatList from '../src/CatList';
import CatItem from '../src/CatItem';

describe('Category list', () => {
    'use strict';

    const fakeCatList = [
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

    const fakeRemoveHandler = sinon.spy();

    const createComp = () => {
        const catList = new CatList({
            list: fakeCatList,
            onRemove: fakeRemoveHandler
        });
        return $(catList.render()).shallowRender();
    };

    it('should show all Categories', () => {
        expect(createComp().find(CatItem).length).to.equal(fakeCatList.length);
    });

    describe('on each child Remove Handler call', () => {
        it('should call parent Remove Handler', () => {
            sinon.spy(dispatcher, 'dispatch');

            createComp().find(CatItem).each((catItem, i) => {
                catItem.props.onRemove();

                expect(fakeRemoveHandler).to.be.calledWith(fakeCatList[i].id);
            });
        });
    });
});
