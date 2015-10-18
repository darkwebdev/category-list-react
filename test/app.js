import _ from 'lodash';
import { expect } from 'chai';

import NewCat from '../src/NewCat';
import Search from '../src/Search';
import CatList from '../src/CatList';

import App from '../src/App';

import fake from './fake';

describe('App', () => {
    'use strict';

    let $app;

    describe('by default', () => {
        beforeEach(() => {
            $app = fake.renderComp(App, { catModel: fake.catModel });
        });

        it('should show Add Category input in default state', () => {
            expect($app.find(NewCat).length).to.equal(1);
            expect($app.find(NewCat)[0].props.active).to.be.false;
        });

        it('should show Search input in default state', () => {
            expect($app.find(Search).length).to.equal(1);
            expect($app.find(Search)[0].props.active).to.be.false;
        });

        it('should show Category List', () => {
            expect($app.find(CatList).length).to.equal(1);
            expect($app.find(CatList)[0].props.list).to.deep.equal(fake.catList);
        });
    });

});

