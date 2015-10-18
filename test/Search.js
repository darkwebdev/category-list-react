import _ from 'lodash';
import React from 'react';
import $ from 'teaspoon';

import { default as chai, expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import Search from '../src/Search';

import fake from './fake';

describe('Search input', () => {
    'use strict';

    const fakeSearchHandler = sinon.spy();

    describe('on change', () => {
        it('should call Search handler', () => {
            const $comp = fake.renderComp(Search, { active: false, onSearch: fakeSearchHandler });
            const input = $comp.find('.search-input')[0];

            input.props.onChange({ target: { value: fake.searchText } });

            expect(fakeSearchHandler).to.be.calledWith(fake.searchText);
        });

        it('should show only Categories with search text', () => {
            const renderer = new fake.AppRenderer({
                catList: fake.catList
            });

            const search = renderer.getSearch();
            const catList = renderer.getCatList();

            expect(catList.props.list).to.deep.equal(fake.catList);

            search.props.onSearch(fake.searchText);

            const foundCatList = renderer.getCatList();

            expect(foundCatList.props.list).to.deep.equal(fake.foundCatList);
        });
    });
});
//'search' input
//  on change
//      on 'cancel' button click
//          should empty input field
//          should show all categories
