import { expect } from 'chai';
import _ from 'lodash';

import CatModel from '../src/CatModel';

import fake from './fake';

describe('Category Model', () => {
    'use strict';

    it('should get saved categories from storage', () => {
        const catList = new CatModel(fake.storage).collection;

        expect(catList).to.deep.equal(fake.catList);
    });

    it('should add a new Category', () => {
        const catModel = new CatModel(fake.storage);

        expect(catModel.collection).to.deep.equal(fake.catList);

        catModel.add(fake.catItem);

        expect(catModel.collection).to.deep.equal(fake.increasedCatList);
    });

    it('should remove a Category', () => {
        const catModel = new CatModel(fake.storage);

        expect(catModel.collection).to.deep.equal(fake.catList);

        catModel.remove('2');

        expect(catModel.collection).to.deep.equal(fake.decreasedCatList);
    });

    it('should search inside the names of Categories', () => {
        const catModel = new CatModel(fake.storage);

        const foundCatList = catModel.search(fake.searchText);

        expect(foundCatList).to.deep.equal(fake.foundCatList);
    });
});

