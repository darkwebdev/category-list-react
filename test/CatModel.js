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

    describe('on search', () => {
        it('should return List of Categories that contain searched text in their names', () => {
            const catModel = new CatModel(fake.storage);

            const foundCatList = catModel.search(fake.searchText);

            expect(foundCatList).to.deep.equal(fake.foundCatList);
        });

        it('should return empty list when nothing found', () => {
            const catModel = new CatModel(fake.storage);

            const foundCatList = catModel.search('nonexistent search text');

            expect(foundCatList).to.deep.equal([]);
        });

        it('should return a list with all Categories when searched for empty string', () => {
            const catModel = new CatModel(fake.storage);

            const foundCatList = catModel.search('');

            expect(foundCatList).to.deep.equal(fake.catList);
        });
    });
});

