# Inspire Tree

[![Join the chat at https://gitter.im/helion3/inspire-tree](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/helion3/inspire-tree?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status](https://travis-ci.org/helion3/inspire-tree.svg?branch=master)](https://travis-ci.org/helion3/inspire-tree)

Inspire Tree is a performance-driven javascript-based UI tree component, built for the modern web. Inspired by
our need for one - the only existing solution which met our *feature* needs was a nightmare to *develop* for.

[Website & Demos](http://www.inspire-tree.com/)

### Features:

- Robust API.
- Events everywhere.
- No required external dependencies.
- Load data directly, via promises, or callbacks.
- Load child nodes upfront or dynamically (or a mix of both).
- Tri-state checkboxes (optional).
- Multiselect (optional).
- Search by plain string, RegExp, custom matcher, or external resources (optional).
- Sorting (optional).
- AMD and CommonJS support (RequireJS, Node/Webpack).
- Supports multiple instances on a single page.
- API methods to simplify moving nodes between instances.
- Solid coverage by automated tests.
- Built for IE10+.

### DOM Renderer

- Can be replaced with a custom renderer (see details below) for native framework support.
- Virtual DOM for blazing fast change rendering.
- Valid HTML structure.
- Clean and easy-to-override CSS.
- Modular SASS for custom compilation.
- Keyboard navigation.
- Custom context menu (optional).
- Drag and Drop between tree instances (optional).

### Installation

- Node: `npm install -save inspire-tree` or
- Bower `bower install --save inspire-tree`

The `dist` directory contains several versions:

- `bundled` - Includes stripped-down version of lodash, has no external dependencies.
- `core` - Excludes DOM rendering logic, for those using a custom renderer.
- `min` - Minified source for production use.

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

- **allowLoadEvents** - Array of state-change events to fire for pre-set states.
- **checkbox** - Enable tri-state (unchecked, checked, partial) checkboxes for selection.
- **data** - An array, promise, or callback function.
- **dragTargets** - Array of other tree elements which accept drag/drop.
- **renderer** - Function which returns a custom renderer (see below).
- **search** - Custom search callback (for external handling of entire search).
- **selection.allow** - Dynamically determine `selectable` boolean for a node.
- **selection.autoDeselect** - Prevent automatic deselection.
- **selection.autoSelectChildren** - Auto-select children when a parent node is selected, regardless of their visibility.
- **selection.multiple** - Allow multiple nodes to be selected at a time.
- **selection.mode** - `default` or `checkbox`. Checkbox mode auto-selects children, doesn't auto deselect.
- **selection.require** - Require at least one selected node.
- **showCheckboxes** - Show checkboxes in DOM. (Defaults to true if `selection.mode` === 'checkbox').
- **sort** - Property to sort by, or a custom sort function.
- **tabindex** - Define a tab index for the tree container (used for key nav).
- **target** - An Element, selector, or jQuery object.

## Node Configuration

- **text** - Text used in display.
- **id** - Unique ID. If missing, one will be generated.
- **children** - An array of child nodes.
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

- **children.loaded** - `(TreeNode node)` - Children were dynamically loaded for a node.
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

#### Overriding DOM Events

In rare cases, you may need to override our default DOM event handlers. To assist with this, those events provide a `preventTreeDefault` method.

```js
tree.on('node.click', function(event, node) {
    event.preventTreeDefault(); // Cancels default listener
});
```

In these cases, it will be up to you to ensure any further logic has been implemented.

However, the original handler is passed as an argument, which still allows you to execute it when you're ready.

```js
tree.on('node.click', function(event, node, handler) {
    event.preventTreeDefault(); // Cancels default listener
    // do some custom logic
    handler(); // call the original tree logic
});
```

Only DOM-based events support this: *node.click, node.dblclick, node.contextmenu*

## API Basics

Each Inspire Tree instance returns an API object.

All methods not specific to existing node/s are found directly on the API:

```js
tree.addNode({ text: 'Example' });
```

**TreeNode**

Each incoming javascript object is wrapped as a `TreeNode`, which aliases methods useful on a single node.

```js
tree.node('a-unique-id').select();
```

**TreeNodes**

Multiple `TreeNode`s are contained within an Array-like object.

`TreeNodes` maps several TreeNode methods so you can invoke them on all nodes in the collection, or recursively
down the nodes and their children.

*Expands only root nodes inside this collection:*

```js
tree.nodes().expand();
```

*Expands root nodes and their children inside this collection:*

```js
tree.nodes().expandDeep();
```

**Mapped Methods**

`blur`, `clean`, `collapse`, `deselect`, `expand`, `hide`, `restore`, `select`, `setSelectable`, `show`, `softRemove`

Most methods have a `___Deep` variant to execute recursively. e.g. `expandDeep`.

**Methods for All Nodes**

Many methods are mapped to the `tree` instance, so instead of always using `tree.nodes().someMethod()` you can
use `tree.someMethod()`.

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

## Troubleshooting

**Recursing Flattened Arrays**

Methods which return flattened arrays intentionally leave their hierarchy pointers intact. This means that while
you have a flat array, you also have reference to parent/child elements. This can interfere with recursive
methods because they'll iterate *both* the array elements and their children.

This will only impact a small number of methods. For example:

```js
tree.available().deepest();
```

... will duplicate nodes because `deepest` iterates the array *and* recurses through children.

Possible solutions:

- Reverse the order: `tree.deepest().available()`
- Avoid flattened arrays: `tree.available(true).deepest()`

## Development

Clone the repository, and get yourself setup:

- `npm install` - Installs all project dependencies.
- `bower install` - Install libs used only by included demos.
- `npm run setup` - Copies git hooks and run workspace setup.

Live-compile source changes as you develop:

- `npm run watch`
- or `EXCLUDE_DOM=1 npm run watch` for core-only builds.

When needed, lint your code. Will happen automatically on commit.

- `npm run lint`

Run tests:

- `npm test`
