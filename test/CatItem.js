import _ from 'lodash';
import $ from 'teaspoon';

import { default as chai, expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import CatItem from '../src/CatItem';

describe('Category', () => {
    'use strict';

    const fakeCat = {
        id: '1',
        name: 'cat1',
        number: '12'
    };

    let $comp;

    const fakeRemoveHandler = sinon.spy();

    const createComp = () => {
        const props = {
            key: fakeCat.id,
            name: fakeCat.name,
            number: fakeCat.number,
            onRemove: fakeRemoveHandler
        };

        return $(CatItem(props)).shallowRender();
    };

    it('should have proper name and number', () => {
        $comp = createComp();

        expect($comp.find('.cat-name').text()).to.equal(fakeCat.name);
        expect($comp.find('.cat-number').text()).to.equal(fakeCat.number);
    });

    describe('on Category Remove Button click', () => {
        it('should call Remove Handler', () => {
            const btn = createComp().find('.cat-remove-btn')[0];
            btn.props.onclick();

            expect(fakeRemoveHandler).to.have.been.called;
        });
    });
});
