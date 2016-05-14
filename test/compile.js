import React from 'react';
import ngReact from 'ngreact';

import {compile} from '../src/index';

const ShoppingListItem = (props) => (
    <li className="shopping-list-item">
        <div className="shopping-list-item__item">{props.item}</div>
        <div className="shopping-list-item__qty">{props.qty}</div>
    </li>
);

ShoppingListItem.propTypes = {
    item: React.PropTypes.string.isRequired,
    qty: React.PropTypes.number
};

const ShoppingList = (props) => (
    <ul className="shopping-list">
        {props.items.map(item => <ShoppingListItem key={item.item} item={item.item} qty={item.qty} />)}
    </ul>
);

ShoppingList.propTypes = {
    items: React.PropTypes.array
};

const app = angular.module('compileApp', [ngReact.name]);
app.directive('shoppingList', (reactDirective) => reactDirective(ShoppingList));
app.directive('shoppingListItem', (reactDirective) => reactDirective(ShoppingListItem));

describe ('compile', function () {

    beforeEach(angular.mock.module(app.name));

    beforeEach(function () {
        this.items = [{
            item: 'Apples',
            qty: 3
        },{
            item: 'Cheese',
            qty: 1
        },{
            item: 'Butter',
            qty: 1
        }]
    });

    afterEach(function () {
        this.component.destroy()
    });
    
    it ('should compile an ngReact directive', function () {
        this.component = compile('<shopping-list items="items"></shopping-list>', {
            items: this.items
        });

        let items = this.component.el[0].querySelectorAll('.shopping-list-item');
        expect(items.length).toEqual(3);

        let item1Item = items[0].querySelector('.shopping-list-item__item');
        let item1Qty = items[0].querySelector('.shopping-list-item__qty');

        expect(item1Item.innerHTML).toContain('Apples');
        expect(item1Qty.innerHTML).toContain('3');
    });

    it ('should update the scope on a directive', function () {
        this.component = compile('<shopping-list items="items"></shopping-list>', {
            items: this.items
        });

        this.items[0].item = 'Bananas';
        this.items[0].qty = 2;

        this.component.update();

        let item1Item = this.component.el[0].querySelector('.shopping-list-item__item');
        let item1Qty = this.component.el[0].querySelector('.shopping-list-item__qty');

        expect(item1Item.innerHTML).toContain('Bananas');
        expect(item1Qty.innerHTML).toContain('2');
    });

    it ('should update the scope on a directive by passing in new scope via update()', function () {
        this.component = compile('<shopping-list items="items"></shopping-list>', {
            items: this.items
        });

        this.component.update({items: [
            {item: 'Oranges', qty: 5}
        ]});

        let items = this.component.el[0].querySelectorAll('.shopping-list-item');
        expect(items.length).toEqual(1);

        let item1Item = items[0].querySelector('.shopping-list-item__item');
        let item1Qty = items[0].querySelector('.shopping-list-item__qty');

        expect(item1Item.innerHTML).toContain('Oranges');
        expect(item1Qty.innerHTML).toContain('5');
    });

    it ('should destroy a directive', function () {
        this.component = compile('<shopping-list items="items"></shopping-list>', {
            items: this.items
        });

        this.component.destroy();

        expect(this.component.el[0].innerHTML).toEqual('');
        expect(this.component.scope.$$destroyed).toEqual(true);
    });

});