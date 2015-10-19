import _ from 'lodash';

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

    it('should show all Categories', () => {
        const $comp = fake.renderComp(CatList, { list: fake.catList });

        expect($comp.find(CatItem).length).to.equal(fake.catList.length);
    });

    describe('on each child Remove Handler call', () => {
        it('should call parent Remove Handler', () => {
            const $comp = fake.renderComp(CatList, {
                list: fake.catList,
                onRemove: fakeRemoveHandler
            });

            $comp.find(CatItem).each((catItem, i) => {
                catItem.props.onRemove();

                expect(fakeRemoveHandler).to.be.calledWith(fake.catList[i].id);
            });
        });

        it('should Remove Category from the model', () => {
            const renderer = new fake.AppRenderer();

            const catList = renderer.getCatList();
            const removalId = '2';
            catList.props.onRemove(removalId);

            expect(fake.catModel.remove).to.be.calledWith(removalId);
        });

        it('should Remove Categoriy from the view', () => {
            const renderer = new fake.AppRenderer({
                catModel: _.extend({}, fake.catModel, {
                    remove: function() {
                        this.collection = fake.decreasedCatList;
                    }
                })
            });

            const catList = renderer.getCatList();
            expect(catList.props.list).to.deep.equal(fake.catList);

            catList.props.onRemove('2');

            const decreasedCatList = renderer.getCatList();

            expect(decreasedCatList.props.list).to.deep.equal(fake.decreasedCatList);
        });
    });
});
