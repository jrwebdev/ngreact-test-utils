import {Simulate} from 'react-addons-test-utils';
import extend from 'lodash/extend';
import isFunction from 'lodash/isFunction';

const reactEventMap = {
    mousedown: 'mouseDown',
    mouseup: 'mouseUp',
    mouseover: 'mouseOver',
    mouseout: 'mouseOut',
    mouseenter: 'mouseEnter',
    mouseleave: 'mouseLeave',
    keypress: 'keyPress',
    keydown: 'keyDown',
    keyup: 'keyUp'
};

const getDOMNode = (el) => el && !el.nodeName ? el[0] : el;
const keyEventData = (keyCode, eventData = {}) => extend(eventData, {keyCode, which: keyCode, charCode: keyCode});
const createEvent = (event, eventData) => {
    // TODO: Do not bubble mouse enter or mouse leave
    eventData.bubbles = (eventData.bubbles !== false);
    let e;
    if (!isFunction(window.Event)) {
        e = document.createEvent('Event');
        e.initEvent(event.toLowerCase(), eventData.bubbles, eventData.cancelable);
    } else {
        e = new Event(event.toLowerCase(), {
            bubbles: eventData.bubbles,
            cancelable: eventData.cancelable
        });
    }
    return e;
};

const simulate = (el, event, eventData = {}) => {

    if (!el) {
        throw new Error('No element specified');
    } else {
        el = getDOMNode(el);
    }

    if (!event) {
        throw new Error ('No event specified');
    }

    eventData.target = eventData.target || el;

    // Angular (native) event
    let e = createEvent(event, eventData);
    e = extend(e, eventData);
    el.dispatchEvent(e);

    // React event
    let reactEvent = reactEventMap[event] || event;
    eventData.type = reactEvent;
    Simulate[reactEvent](el, eventData);

};

simulate.click = (el, eventData) => simulate(el, 'click', eventData);
simulate.mouseOver = (el, eventData) => simulate(el, 'mouseOver', eventData);
simulate.mouseOut = (el, eventData) => simulate(el, 'mouseOut', eventData);
simulate.keyDown = (el, keyCode, eventData) => simulate(el, 'keyDown', keyEventData(keyCode, eventData));
simulate.keyPress = (el, keyCode, eventData) => simulate(el, 'keyPress', keyEventData(keyCode, eventData));
simulate.keyUp = (el, keyCode, eventData) => simulate(el, 'keyUp', keyEventData(keyCode, eventData));
simulate.focus = (el, eventData) => simulate(el, 'focus', eventData);
simulate.blur = (el, eventData) => simulate(el, 'blur', eventData);
simulate.change = (el, value, eventData = {}) => {
    el = getDOMNode(el);
    el.value = value;
    eventData.target = eventData.target || el;
    eventData.target.value = value;
    simulate(el, 'change', eventData);
};

export {simulate};