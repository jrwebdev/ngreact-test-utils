import {Simulate} from 'react-addons-test-utils';
import extend from 'lodash/extend';

const reactEventMap = {
    mousedown: 'mouseDown',
    mouseup: 'mouseUp',
    mouseover: 'mouseOver',
    mouseout: 'mouseOut',
    mouseenter: 'mouseEnter',
    mouseleave: 'mouseLeave',
    mousemove: 'mouseMove',
    keypress: 'keyPress',
    keydown: 'keyDown',
    keyup: 'keyUp',
    doubleclick: 'doubleClick',
    dragend: 'dragEnd',
    dragenter: 'dragEnter',
    dragleave: 'dragLeave',
    dragover: 'dragOver',
    dragstart: 'dragStart',
    dragexit: 'dragExit',
    contextmenu: 'contextMenu',
    touchcancel: 'touchCancel',
    touchend: 'touchEnd',
    touchmove: 'touchMove',
    touchstart: 'touchStart',
    animationstart: 'animationStart',
    animationend: 'animationEnd',
    animationiteration: 'animationIteration',
    transitionend: 'transitionEnd',
    compositionstart: 'compositionStart',
    compositionupdate: 'compositionUpdate',
    compositionend: 'compositionEnd',
    canplay: 'canPlay',
    canplaythrough: 'canPlayThrough',
    durationchange: 'durationChange',
    loadeddata: 'loadedData',
    loadedmetadata: 'loadedMetadata',
    loadstart: 'loadStart',
    ratechange: 'rateChange',
    timeupdate: 'timeUpdate',
    volumechange: 'volumeChange'
};

const getDOMNode = (el) => el && !el.nodeName ? el[0] : el;
const keyEventData = (keyCode, eventData = {}) => extend(eventData, {keyCode, which: keyCode, charCode: keyCode});

const simulate = (el, event, eventData = {}) => {

    if (!el) {
        throw new Error('No element specified');
    } else {
        el = getDOMNode(el);
    }

    if (!event) {
        throw new Error ('No event specified');
    }

    // TODO: Should really determine if element is Angular or React

    // Angular event
    angular.element(el).triggerHandler({...eventData, type: event.toLowerCase()});

    // React event
    let reactEvent = reactEventMap[event] || event;
    Simulate[reactEvent](el, {...eventData, type: reactEvent});

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
    simulate(el, 'change', eventData);
};

export {simulate};