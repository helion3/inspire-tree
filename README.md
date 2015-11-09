# Inspire Tree

[![Build Status](https://travis-ci.org/helion3/inspire-tree.svg)](https://travis-ci.org/helion3/inspire-tree)

Inspire Tree is a performance-driven javascript-based UI tree component, built for the modern web. Inspired by
our need for one - the only existing solution which met our *feature* needs was a nightmare to *develop* for.

[Demos](http://helion3.com/inspire-tree/)

Features include:

- Robust API.
- Load data directly, via Promise, or via callback.
- Optionally load child nodes dynamically.
- Search by plain string or RegExp, or via external resources.
- Events everywhere.
- Virtual DOM for blazing fast DOM updates.
- Valid HTML5 DOM structure and extremely clean, easy-to-override CSS.
- Custom context menu (optional).
- AMD and CommonJS support (RequireJS, Node).
- Supports multiple instances on a single page.
- Includes functionality for moving nodes between instances.
- Supports IE10+.

### Installation

- Node: `npm install -save inspire-tree`
- Bower `bower install --save inspire-tree`

## Using

At a minimum you must provide a selector for a target DOM element and data.

```js
var tree = new InspireTree({
    target: '.tree',
    data: $.getJSON('sample-data.json')
});
```

If `data` is a promise, results will be read when it's resolved.

#### Events

Events are triggered to inform you of changes or user interaction.

```js
tree.events.on('node.click', function(event, node) {
    // node clicked!
});
```

#### Event List

- *data.loaded*
- *data.loaderror*
- *node.added*
- *node.click*
- *node.collapsed*
- *node.contextmenu*
- *node.dblclick*
- *node.deselected*
- *node.expanded*
- *node.hidden*
- *node.selected*
- *node.shown*
- *tree.ready*

### Development

Clone the repository, and get yourself setup:

- `npm install` - Installs all project dependencies.
- `npm run setup` - Copies git hooks and run workspace setup.

Live-compile source changes as you develop:

- `npm run watch`

When needed, lint your code. Will happen automatically on commit.

- `npm run lint`

Run tests:

- `npm test`
