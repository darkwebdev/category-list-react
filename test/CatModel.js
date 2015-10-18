import { expect } from 'chai';
import _ from 'lodash';

import CatModel from '../src/CatModel';

describe('Category Model', () => {
    'use strict';

    const fakeCat = {
        id: '20',
        name: 'new cat',
        number: '0'
    };
    const fakeCatList = [
        {
            id: '76',
            name: 'cat1',
            number: '12'
        },
        {
            id: '98',
            name: 'cat2',
            number: '123'
        }
    ];
    const increasedCatList = [
        {
            id: '76',
            name: 'cat1',
            number: '12'
        },
        {
            id: '98',
            name: 'cat2',
            number: '123'
        },
        {
            id: '20',
            name: 'new cat',
            number: '0'
        }
    ];
    const decreasedCatList = [
        {
            id: '98',
            name: 'cat2',
            number: '123'
        }
    ];
    const fakeStorage = {
        getItem: _.constant(JSON.stringify(fakeCatList)),
        setItem: _.noop
    };

    it('should get saved categories from storage', () => {
        const catList = new CatModel(fakeStorage).collection;

        expect(catList).to.deep.equal(fakeCatList);
    });

    it('should add a new Category', () => {
        const catModel = new CatModel(fakeStorage);

        expect(catModel.collection).to.deep.equal(fakeCatList);

        catModel.add(fakeCat);

        expect(catModel.collection).to.deep.equal(increasedCatList);
    });

    it('should remove a Category', () => {
        const catModel = new CatModel(fakeStorage);

        expect(catModel.collection).to.deep.equal(fakeCatList);

        catModel.remove('76');

        expect(catModel.collection).to.deep.equal(decreasedCatList);
    });
});

