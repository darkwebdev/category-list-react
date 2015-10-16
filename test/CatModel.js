import { expect } from 'chai';
import _ from 'lodash';

import CatModel from '../src/CatModel';

describe('Category Model', () => {
    'use strict';

    var fakeCatList = [{
        name: 'cat1',
        number: '12'
    }];
    var fakeStorage = {
        getItem: _.constant(JSON.stringify(fakeCatList)),
        setItem: _.noop
    };

    it('should get saved categories from storage', () => {
        var catList = new CatModel(fakeStorage).collection;

        expect(catList).to.deep.equal(fakeCatList);
    });
});

