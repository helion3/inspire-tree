# Inspire Tree

[![Join the chat at https://gitter.im/helion3/inspire-tree](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/helion3/inspire-tree?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status](https://travis-ci.org/helion3/inspire-tree.svg)](https://travis-ci.org/helion3/inspire-tree)

Inspire Tree is a performance-driven javascript-based UI tree component, built for the modern web. Inspired by
our need for one - the only existing solution which met our *feature* needs was a nightmare to *develop* for.


[Demos](http://helion3.com/inspire-tree/)

### Features:

- Robust API.
- Events everywhere.
- ~40k minified, uncompressed.
- No external dependencies.
- Load data directly, via promises, callbacks, etc.
- Load child nodes upfront or dynamically.
- Multiselect (optional).
- Search by plain string, RegExp, custom matcher, or external resources (optional).
- Sorting (optional).
- AMD and CommonJS support (RequireJS, Node/Webpack).
- Supports multiple instances on a single page.
- Includes functionality for moving nodes between instances.
- Solid coverage by automated tests.
- Built for IE10+.

### DOM Renderer

- Can be replaced with a custom renderer (see details below) for native framework support.
- Virtual DOM for blazing fast change rendering.
- Valid HTML structure.
- Clean and easy-to-override CSS.
- Keyboard navigation.
- Custom context menu (optional).
- Drag and Drop (optional).
- ~20k minified, uncompressed.

### Installation

- Node: `npm install -save inspire-tree` or
- Bower `bower install --save inspire-tree`

## Using

At a minimum you must provide a target DOM element and data / data loader.

```js
var tree = new InspireTree({
    target: '.tree',
    data: $.getJSON('sample-data.json')
});
```

Data objects must have at least a `text` property. Additional properties are listed below in "Node Configuration".

## API Docs

- [Tree API](docs/tree.md)

## Tree Configuration

- **data** - An array, promise, or callback function.
- **dragTargets** - Array of other tree elements which accept drag/drop.
- **dynamic** - True if children will be loaded via `data` function.
- **multiselect** - Allow multiple nodes to be selected at a time.
- **renderer** - Function which returns a custom renderer (see below).
- **search** - Custom search callback (for external handling of entire search).
- **sort** - Property to sort by, or a custom sort function.
- **tabindex** - Define a tab index for the tree container (used for key nav).
- **target** - An Element, selector, or jQuery object.

## Node Configuration

- **text** - Text used in display.
- **id** - Unique ID. If missing, one will be generated.
- **li.attributes** - Custom attributes for this node's root `li`.
- **itree** - An object used to describe initial tree values:
	+ **icon** - Custom icon for the anchor.
	+ **state.collasped** - Set initial collapsed state.
    + **state.focused** - Node has UI focus.
	+ **state.hidden** - Set initial visibility.
    + **state.loading** - Dynamic load of children in progress.
    + **state.removed** - Soft removed. Never shown until restored.
    + **state.selectable** - Allow selection.
	+ **state.selected** - Set initial selection.

## Events

Events are triggered to inform you of changes or user interaction. Listeners are always registered on `tree.on`. Methods available in our event system are described at [EventEmitter2](https://github.com/asyncly/EventEmitter2).

```js
tree.on('node.click', function(event, node) {
    // node clicked!
});
```

#### Event List

- **data.loaded** - `(Array nodes)` - Data has been loaded successfully (only for data loaded via xhr/callbacks).
- **data.loaderror** - `(Error err)` - Loading failed.
- **model.loaded** - `(Array nodes)` - Data has been parsed into an internal model.
- **node.added** - `(TreeNode node)` - Node added.
- **node.blurred** - `(TreeNode node)` - Node lost focus.
- **node.click** - `(Event event, TreeNode node)` - User clicked node.
- **node.collapsed** - `(TreeNode node)` - Node collapsed.
- **node.contextmenu** - `(Event event, TreeNode node)` - User right-clicked node.
- **node.dblclick** - `(Event event, TreeNode node)` - User double-clicked node.
- **node.deselected** - `(TreeNode node)` - Node deselected.
- **node.dropin** - `(TreeNode node)` - Tree has received a new node via drop.
- **node.dropout** - `(TreeNode node, Element elem)` - Node dropped into a valid target.
- **node.expanded** - `(TreeNode node)` - Node expanded.
- **node.focused** - `(TreeNode node)` - Node focused.
- **node.hidden** - `(TreeNode node)` - Node hidden.
- **node.removed** - `(object node)` - Node removed.
- **node.restored** - `(TreeNode node)` - Node restored.
- **node.selected** - `(TreeNode node)` - Node selected.
- **node.shown** - `(TreeNode node)` - Node shown.
- **node.softremoved** - `(TreeNode node)` - Node soft removed.

## API Basics

Each Inspire Tree instance returns an API object.

All methods not specific to existing node/s are found directly on the API:

```js
tree.addNode({ text: 'Example' });
```

**TreeNode**

Each incoming javascript object is wrapped as a `TreeNode`, which aliases methods useful on a single node.

```js
tree.getNode('a-unique-id').select();
```

**TreeNodes**

Arrays of `TreeNode`s are contained within an Array-like object.

`TreeNodes` maps several TreeNode methods so you can invoke them on all nodes in the collection, or recursively
down the nodes and their children.

*Expands only root nodes inside this collection:*

```js
tree.getNodes().expand();
```

*Expands root nodes and their children inside this collection:*

```js
tree.getNodes().expandDeep();
```

**Mapped Method List**

- blur
- collapse
- deselect
- expand
- hide
- restore
- show
- softRemove

## Custom Rendering

[AngularJS Demo](http://helion3.com/inspire-tree/demos/angular.html)

While Inspire Tree comes with a super-fast virtual DOM engine for element rendering, there are times
when you need your own. Useful for integrating with existing engines like Angular, React, etc.

1. Use only the `inspire-tree-core.js` file. This **excludes** our DOM code.
2. Set the `renderer` option to a function which returns an object with the following methods. If/how you implement them
depends on your rendering engine.

- **applyChanges** - Called when *core* has altered something which will impact rendering.
- **attach** - Called on load to attach to a given HTML element.
- **batch** - Pause live rendering because multiple changes are coming.
- **end** - Batch changes are done, rendering may resume.

Again, you may not need to implement these depending on how you render the data.

Your custom rendering function will be given the `tree` instance as an argument.

```js
var tree = new InspireTree({
    target: '.tree',
    data: [],
    renderer: function(tree) {
        return {
            applyChanges: function() {},
            attach: function() {},
            batch: function() {},
            end: function() {}
        }
    }
});
```

## Terminology

- **available** - Node is not soft-removed or hidden.
- **deepest** - Nodes without any children.
- **visible** - Node is visible to the user. It's ancestors are not hidden/collapsed/removed.

## Development

Clone the repository, and get yourself setup:

- `npm install` - Installs all project dependencies.
- `npm run setup` - Copies git hooks and run workspace setup.

Live-compile source changes as you develop:

- `npm run watch`

When needed, lint your code. Will happen automatically on commit.

- `npm run lint`

Run tests:

- `npm test`
