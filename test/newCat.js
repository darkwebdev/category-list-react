import _ from 'lodash';
import React from 'react';
import $ from 'teaspoon';

import { default as chai, expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import NewCat from '../src/NewCat';

import fake from './fake';

describe('Add Category input', () => {
    'use strict';

    const fakeAddHandler = sinon.spy();

    describe('on Enter Key pressed', () => {
        it('should call Add Category handler', () => {
            const $comp = fake.renderComp(NewCat, { active: true, onSubmit: fakeAddHandler });

            const form = $comp.find('form')[0];
            const input = $comp.find('.new-cat-input')[0];

            input.props.onChange({ target: { value: fake.catItem.name } });
            form.props.onSubmit(fake.event);

            expect(fakeAddHandler).to.be.calledWith(fake.catItem);
        });
    });

    describe('on click', () => {
        it('should activate itself', () => {
            const renderer = new fake.AppRenderer();
            const newCat = renderer.getNewCat();

            expect(newCat.props.active).to.be.false;

            newCat.props.onClick();

            const expectedNewCat = renderer.getNewCat();

            expect(expectedNewCat.props.active).to.be.true;
        });

        it('should show a Hint Message', () => {
            const $inactiveComp = $(<NewCat active={ false } onSubmit={ _.noop } />).shallowRender();
            const inactiveHint = $inactiveComp.find('.new-cat-hint')[0];

            expect(inactiveHint.props.visible).to.be.false;

            //$comp.find('.new-cat-input')[0].props.onClick();
            const $activeComp = $(<NewCat active={ true } onSubmit={ _.noop } />).shallowRender();
            const activeHint = $activeComp.find('.new-cat-hint')[0];

            expect(activeHint.props.visible).to.be.true;
        });
    });

    describe('in activated state', () => {
        describe('on Enter Key press', () => {
            let renderer;
            let newCat;
            let expectedNewCat;

            beforeEach(() => {
                renderer = new fake.AppRenderer({
                    newCatActive: true
                });
                newCat = renderer.getNewCat();
            });

            it('should disactivate the input', () => {
                expect(newCat.props.active).to.be.true;

                newCat.props.onSubmit();

                expectedNewCat = renderer.getNewCat();

                expect(expectedNewCat.props.active).to.be.false;
            });

            it('should clear the input', () => {
                renderer = new fake.NewCatRenderer({
                    active: true,
                    onSubmit: _.noop
                });

                const emptyInput = renderer.getInput();
                emptyInput.props.onChange({ target: { value: 'text' } });

                const inputWithText = renderer.getInput();
                expect(inputWithText.props.value).to.equal('text');

                const form = renderer.getForm();
                form.props.onSubmit(fake.event);

                const expectedInput = renderer.getInput();
                expect(expectedInput.props.value).to.equal('');
            });

            it('should Add Category to the model', () => {
                const newCatItem = {
                    id: '10',
                    name: 'new one',
                    number: '11'
                };

                newCat.props.onSubmit(newCatItem);

                expect(fake.catModel.add).to.be.calledWith(newCatItem);
            });

            it('should add Category to the view', () => {
                const renderer = new fake.AppRenderer({
                    catModel: _.extend({}, fake.catModel, {
                        add: function() {
                            this.collection = fake.increasedCatList;
                        }
                    })
                });

                const catList = renderer.getCatList();
                expect(catList.props.list).to.deep.equal(fake.catList);

                const newCat = renderer.getNewCat();
                newCat.props.onSubmit(fake.catItem);

                const increasedCatList = renderer.getCatList();

                expect(increasedCatList.props.list).to.deep.equal(fake.increasedCatList);
            });
        });
    });
});

//'add category' input
//  on click
//      on 'esc' key press ???
//          should empty itself
//          should hide a hint message