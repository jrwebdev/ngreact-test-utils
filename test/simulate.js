import React from 'react';

import {compile, simulate} from '../src/';

import ngReact from 'ngreact';

const app = angular.module('simulateApp', [ngReact.name]);

const EventComponent = (props) => <input {...props} />;
EventComponent.propTypes = {
    onClick: React.PropTypes.func,
    onKeyPress: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onKeyUp: React.PropTypes.func,
    onMouseOver: React.PropTypes.func,
    onMouseOut: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    value: React.PropTypes.string
};

app.directive('eventComponent', (reactDirective) => reactDirective(EventComponent));

const getEvent = (spy) => spy.calls.mostRecent().args[0];

describe ('simulate', function () {

    beforeEach(angular.mock.module(app.name));

    afterEach(function () {
        this.component.destroy();
    });

    describe ('Angular directive', function () {

        it ('should simulate a click event', function () {
            this.component = compile('<div ng-click="onClick($event)"></div>', {
                onClick: jasmine.createSpy('onClick')
            });
            simulate.click(this.component.el);
            expect(this.component.scope.onClick).toHaveBeenCalled();
        });

        it ('should return the target for the event', function () {
            this.component = compile('<div ng-click="onClick($event)"></div>', {
                onClick: jasmine.createSpy('onClick')
            });
            simulate.click(this.component.el);
            expect(getEvent(this.component.scope.onClick).target).toEqual(this.component.el[0]);
        });

        it ('should simulate a key press event', function () {
            this.component = compile('<div ng-keypress="onKeyPress($event)"></div>', {
                onKeyPress: jasmine.createSpy('onKeyPress')
            });
            simulate.keyPress(this.component.el, 13, {key: 'Enter'});
            expect(this.component.scope.onKeyPress).toHaveBeenCalled();
            let event = getEvent(this.component.scope.onKeyPress);
            expect(event.which).toEqual(13);
            expect(event.keyCode).toEqual(13);
            expect(event.charCode).toEqual(13);
            expect(event.key).toEqual('Enter');
        });

        it ('should simulate a key down event', function () {
            this.component = compile('<div ng-keydown="onKeyDown($event)"></div>', {
                onKeyDown: jasmine.createSpy('onKeyDown')
            });
            simulate.keyDown(this.component.el, 13, {key: 'Enter'});
            let event = getEvent(this.component.scope.onKeyDown);
            expect(event.which).toEqual(13);
            expect(event.keyCode).toEqual(13);
            expect(event.charCode).toEqual(13);
            expect(event.key).toEqual('Enter');
        });

        it ('should simulate a key up event', function () {
            this.component = compile('<div ng-keyup="onKeyUp($event)"></div>', {
                onKeyUp: jasmine.createSpy('onKeyUp')
            });
            simulate.keyUp(this.component.el, 13, {key: 'Enter'});
            let event = getEvent(this.component.scope.onKeyUp);
            expect(event.which).toEqual(13);
            expect(event.keyCode).toEqual(13);
            expect(event.charCode).toEqual(13);
            expect(event.key).toEqual('Enter');
        });

        it ('should simulate a mouse over event', function () {
            this.component = compile('<div ng-mouseover="onMouseOver($event)"></div>', {
                onMouseOver: jasmine.createSpy('onMouseOver')
            });
            simulate.mouseOver(this.component.el);
            expect(this.component.scope.onMouseOver).toHaveBeenCalled();
        });

        it ('should simulate a mouse out event', function () {
            this.component = compile('<div ng-mouseout="onMouseOut($event)"></div>', {
                onMouseOut: jasmine.createSpy('onMouseOut')
            });
            simulate.mouseOut(this.component.el);
            expect(this.component.scope.onMouseOut).toHaveBeenCalled();
        });

        it ('should simulate a focus event', function () {
            this.component = compile('<div ng-focus="onFocus($event)"></div>', {
                onFocus: jasmine.createSpy('onFocus')
            });
            simulate.focus(this.component.el);
            expect(this.component.scope.onFocus).toHaveBeenCalled();
        });

        it ('should simulate a blur event', function () {
            this.component = compile('<div ng-blur="onBlur($event)"></div>', {
                onBlur: jasmine.createSpy('onBlur')
            });
            simulate.blur(this.component.el);
            expect(this.component.scope.onBlur).toHaveBeenCalled();
        });

        it ('should simulate a change event', function () {
            this.component = compile('<input ng-model="value" ng-change="onChange($event)" />', {
                onChange: jasmine.createSpy('onChange'),
                value: 'A Value'
            });
            simulate.change(this.component.el, 'New Value');
            expect(this.component.scope.onChange).toHaveBeenCalled();
        });

    });

    describe ('ngReact directive', function () {

        // Get the element which has the events attached to it
        const getReactEl = (el) => el[0].querySelector('input');

        it ('should simulate a click event', function () {
            this.component = compile('<event-component on-click="onClick"></event-component>', {
                onClick: jasmine.createSpy('onClick')
            });
            simulate.click(getReactEl(this.component.el));
            expect(this.component.scope.onClick).toHaveBeenCalled();
        });

        it ('should return the target for the event', function () {
            this.component = compile('<event-component on-click="onClick"></event-component>', {
                onClick: jasmine.createSpy('onClick')
            });
            simulate.click(getReactEl(this.component.el));
            expect(getEvent(this.component.scope.onClick).target).toEqual(getReactEl(this.component.el));
        });

        it ('should simulate a key press event', function () {
            this.component = compile('<event-component on-key-press="onKeyPress"></event-component>', {
                onKeyPress: jasmine.createSpy('onKeyPress')
            });
            simulate.keyPress(getReactEl(this.component.el), 13, {key: 'Enter'});
            expect(this.component.scope.onKeyPress).toHaveBeenCalled();
            let event = getEvent(this.component.scope.onKeyPress);
            expect(event.which).toEqual(13);
            expect(event.keyCode).toEqual(13);
            expect(event.charCode).toEqual(13);
            expect(event.key).toEqual('Enter');
        });

        it ('should simulate a key down event', function () {
            this.component = compile('<event-component on-key-down="onKeyDown"></event-component>', {
                onKeyDown: jasmine.createSpy('onKeyDown')
            });
            simulate.keyDown(getReactEl(this.component.el), 13, {key: 'Enter'});
            expect(this.component.scope.onKeyDown).toHaveBeenCalled();
            let event = getEvent(this.component.scope.onKeyDown);
            expect(event.which).toEqual(13);
            expect(event.keyCode).toEqual(13);
            expect(event.charCode).toEqual(13);
            expect(event.key).toEqual('Enter');
        });

        it ('should simulate a key up event', function () {
            this.component = compile('<event-component on-key-up="onKeyUp"></event-component>', {
                onKeyUp: jasmine.createSpy('onKeyUp')
            });
            simulate.keyUp(getReactEl(this.component.el), 13, {key: 'Enter'});
            expect(this.component.scope.onKeyUp).toHaveBeenCalled();
            let event = getEvent(this.component.scope.onKeyUp);
            expect(event.which).toEqual(13);
            expect(event.keyCode).toEqual(13);
            expect(event.charCode).toEqual(13);
            expect(event.key).toEqual('Enter');
        });

        it ('should simulate a mouse over event', function () {
            this.component = compile('<event-component on-mouse-over="onMouseOver"></event-component>', {
                onMouseOver: jasmine.createSpy('onMouseOver')
            });
            simulate.mouseOver(getReactEl(this.component.el));
            expect(this.component.scope.onMouseOver).toHaveBeenCalled();
        });

        it ('should simulate a mouse out event', function () {
            this.component = compile('<event-component on-mouse-out="onMouseOut"></event-component>', {
                onMouseOut: jasmine.createSpy('onMouseOut')
            });
            simulate.mouseOut(getReactEl(this.component.el));
            expect(this.component.scope.onMouseOut).toHaveBeenCalled();
        });

        it ('should simulate a focus event', function () {
            this.component = compile('<event-component on-focus="onFocus"></event-component>', {
                onFocus: jasmine.createSpy('onFocus')
            });
            simulate.focus(getReactEl(this.component.el));
            expect(this.component.scope.onFocus).toHaveBeenCalled();
        });

        it ('should simulate a blur event', function () {
            this.component = compile('<event-component on-blur="onBlur"></event-component>', {
                onBlur: jasmine.createSpy('onBlur')
            });
            simulate.blur(getReactEl(this.component.el));
            expect(this.component.scope.onBlur).toHaveBeenCalled();
        });

        it ('should simulate a change event', function () {
            this.component = compile('<event-component on-change="onChange"></event-component>', {
                onChange: jasmine.createSpy('onChange'),
                value: 'A Value'
            });
            simulate.change(getReactEl(this.component.el), 'New Value');
            expect(this.component.scope.onChange).toHaveBeenCalled();
        });

        it ('should update the value for the change event', function () {
            this.component = compile('<event-component on-change="onChange"></event-component>', {
                onChange: jasmine.createSpy('onChange'),
                value: 'A Value'
            });
            simulate.change(getReactEl(this.component.el), 'New Value');
            let event = getEvent(this.component.scope.onChange);
            expect(event.target.value).toEqual('New Value');
        });

    });

});