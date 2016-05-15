# ngreact-test-utils
Utilities for testing Angular directives which contain React components with [ngReact](https://github.com/ngReact/ngReact).

These utilities are not for testing React components directly - for that I would recommend using [Enzyme](https://github.com/airbnb/enzyme).

[![Sauce Test Status](https://saucelabs.com/browser-matrix/jrwebdev.svg)](https://saucelabs.com/u/jrwebdev)

`ngreact-test-utils` provides two functions - `compile()` and `simulate()`:
 - `compile()` encapsulates all of the usual bootstrapping to set up Angular directives to test, in addition to flushing
 `$timeout` to allow any `ngReact` components to be added to the DOM. This function can also be used for Angular directives which do not use ngReact.
 - `simulate()` fires both Angular and React events for a given element, allowing the same tests
to be run when Angular directives are migrated to React components with the use of ngReact.


## Installation

`npm i -D ngreact-test-utils`

### Usage
`import {simulate, compile} from 'ngreact-test-utils';`

See the [test/](https://github.com/jrwebdev/ngreact-test-utils/tree/master/test) directory for example usage

## API Documentation

### compile(el, [scope])

Compiles an Angular directive and flushes `$timeout` in order to compile any ngReact directives

#### Arguments
1. `el` (string) Element to compile 
2. `scope` (object) Values to add to the directive's scope

#### Returns
(Object) Object containing the following:
 - `el` (Object) The compiled Angular element
 - `scope` (Scope) The Angular scope for the element
 - `update` (Function) **update([scope])** 
    Merges any supplied values provided by `scope` into the current scope, runs a `scope.$digest` and flushes `$timeout` to ensure ngReact directives are recompiled
 - `destroy` (Function) **destroy()** Destroys the element and scope

### simulate (el, event, [eventData])

Fires both `.triggerHandler()` on the element for Angular and generates a [Synthetic Event](https://facebook.github.io/react/docs/events.html) for React using [React Test Utils' simulate() method](https://facebook.github.io/react/docs/test-utils.html#simulate).

#### Arguments
1. `el` (HTMLElement|Object) Raw DOM Node or Angular element to fire the event on
2. `event` (string) Event to fire. Can either be in lowercase or using React's lower camelCase conventions - the appropriate conversion will occur internally
3. `eventData` (Object) Additional data to pass to the event. By default `bubbles` is set to true.

A number of convenience methods are also available for `simulate` for common events. For all other events, or for additional flexibility, use `simulate()` directly.

#### simulate.click(el, [eventData])
#### simulate.mouseOver(el, [eventData])
#### simulate.mouseOut(el, [eventData])
#### simulate.keyUp(el, keyCode, [eventData])
#### simulate.keyDown(el, keyCode, [eventData])
#### simulate.keyPress(el, keyCode, [eventData])
#### simulate.focus(el, [eventData])
#### simulate.blur(el, [eventData])
#### simulate.change(el, value, [eventData])

- **note 1:** For `keyUp`, `keyDown` and `keyPress`, `keyCode`, `which` and `charCode` will all be set to the value of `keyCode`, which should be a number. To use `key`, this must be passed in `eventData`
- **note 2:** `value` will be set on the raw DOM node's `.value` property prior to firing a change event. If you do not require this behaviour, use `simulate()` directly.
