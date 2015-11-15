# Inspire Tree

[![Join the chat at https://gitter.im/helion3/inspire-tree](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/helion3/inspire-tree?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status](https://travis-ci.org/helion3/inspire-tree.svg)](https://travis-ci.org/helion3/inspire-tree)

Inspire Tree is a performance-driven javascript-based UI tree component, built for the modern web. Inspired by
our need for one - the only existing solution which met our *feature* needs was a nightmare to *develop* for.


[Demos](http://helion3.com/inspire-tree/)

### Features:

- Robust API.
- Events everywhere.
- ~60k minified, uncompressed.
- No external dependencies.
- Load data directly, via promises, callbacks, etc.
- Load child nodes upfront or dynamically.
- Search by plain string, RegExp, custom matcher, or external resources (optional).
- Custom context menu (optional).
- Drag and Drop (optional).
- Virtual DOM for blazing fast change rendering.
- Valid HTML structure.
- Clean and easy-to-override CSS.
- AMD and CommonJS support (RequireJS, Node/Webpack).
- Supports multiple instances on a single page.
- Includes functionality for moving nodes between instances.
- Solid coverage by automated tests.
- Built for IE10+.

### Installation

- Node: `npm install -save inspire-tree` or
- Bower `bower install --save inspire-tree`

## Using

At a minimum you must provide a target DOM element and data / data loader.

```js
var tree = new InspireTree({
    target: ,
    data: $.getJSON('sample-data.json')
});
```

Data objects must have at least a `text` property. Additional properties are listed below in "Node Configuration".

## API Docs

- [Tree API](docs/tree.md)

## Tree Configuration

- **target** - An Element, selector, or jQuery object.
- **data** - An array, promise, or callback function.
- **dynamic** - True if children will be loaded via `data` function.
- **search** - Custom search callback (for external handling of entire search).
- **sort** - Property to sort by, or a custom sort function.

## Node Configuration

- **text** - Text used in display.
- **id** - Unique ID. If missing, one will be generated.
- **li.attributes** - Custom attributes for this node's root `li`.
- **itree** - An object used to describe initial tree values:
	+ **icon** - Custom icon for the anchor.
	+ **state.collasped** - Set initial collapsed state.
	+ **state.hidden** - Set initial visibility.
    + **state.removed** - Soft removed. Never shown until restored.
	+ **state.selected** - Set initial selection.

## Events

Events are triggered to inform you of changes or user interaction. Listeners are always registered on `tree.on`. Methods available in our event system are described at [EventEmitter2](https://github.com/asyncly/EventEmitter2).

```js
tree.on('node.click', function(event, node) {
    // node clicked!
});
```

#### Event List

- **data.loaded** - `(Array nodes)` - Data has been loaded successfully.
- **data.loaderror** - `(Error err)` - Loading failed.
- **model.loaded** - `(Array nodes)` - Data has been parsed into an internal model.
- **node.added** - `(TreeNode node)` - Node added.
- **node.click** - `(Event event, TreeNode node)` - User clicked node.
- **node.collapsed** - `(TreeNode node)` - Node collapsed.
- **node.contextmenu** - `(Event event, TreeNode node)` - User right-clicked node.
- **node.dblclick** - `(Event event, TreeNode node)` - User double-clicked node.
- **node.deselected** - `(TreeNode node)` - Node deselected.
- **node.drop** - `(TreeNode node)` - Node dropped into a valid target.
- **node.expanded** - `(TreeNode node)` - Node expanded.
- **node.hidden** - `(TreeNode node)` - Node hidden.
- **node.removed** - `(object node)` - Node removed.
- **node.restored** - `(TreeNode node)` - Node restored.
- **node.selected** - `(TreeNode node)` - Node selected.
- **node.shown** - `(TreeNode node)` - Node shown.
- **node.softremoved** - `(TreeNode node)` - Node soft removed.
- **tree.ready** - Tree has attached target DOM element.

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

- collapse
- deselect
- expand
- hide
- restore
- show
- softRemove

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
