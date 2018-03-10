# Inspire Tree

[![Join the chat at https://gitter.im/helion3/inspire-tree](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/helion3/inspire-tree?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status](https://travis-ci.org/helion3/inspire-tree.svg?branch=master)](https://travis-ci.org/helion3/inspire-tree)

Inspire Tree is a performance-driven javascript-based UI tree component, built for the modern web. Inspired by
our need for one - the only existing solution which met our *feature* needs was a nightmare to *develop* for.

- [Website & Demos](http://www.inspire-tree.com/)
- [Changelog](https://github.com/helion3/inspire-tree/blob/master/CHANGELOG.md)

### Features:

- Robust API.
- Events everywhere.
- Load data directly, via promises, or callbacks.
- Load child nodes upfront or dynamically (or a mix of both).
- Tri-state checkboxes (optional).
- Multiselect (optional).
- Inline editing (optional).
- Search by plain string, RegExp, custom matcher, or external resources (optional).
- Sorting (optional).
- AMD and CommonJS support (RequireJS, Node/Webpack).
- Supports multiple instances on a single page.
- API methods to simplify moving nodes between instances.
- Solid coverage by automated tests.
- Built for IE10+.

### Installation

- Yarn: `yarn add --dev inspire-tree` or
- NPM `npm install --save-dev inspire-tree`

If you're using InspireTree in a browser environment, and are **not** using a module bundler like
Webpack, Browserify, rollup, etc, you'll need to ensure [lodash](https://lodash.com/) is available.

### DOM Rendering

This package contains the core API only. Our DOM rendering engine is offered through a separate package because
some users prefer to implement rendering in their existing framework of choice (like Angular, React, Vue, etc).

Inspire Tree DOM uses a virtual DOM to achieve high-performance rendering.

To install:

- Yarn: `yarn add --dev inspire-tree-dom` or
- NPM `npm install --save-dev inspire-tree-dom`

*Note:* InspireTreeDOM offers additional configuration options and events. Please be sure to read the [README](https://github.com/helion3/inspire-tree-dom).

## Usage

At the very least you must provide data source

```js
var tree = new InspireTree({
    data: [{
        text: 'A node'
    }]
});
```

Node objects must have at least a `text` property. Additional properties are listed below in "Node Configuration".

## Usage with Inspire Tree DOM

If you're using our DOM rendering, you need to pass in two arguments: the tree instance, and a DOM target:

```js
new InspireTreeDOM(tree, {
    target: '.tree'
});
```

For more information regarding InspireTreeDOM, see the [README](https://github.com/helion3/inspire-tree-dom).

### Data Loading and Initialization Errors

If `data` was provided to the constructor, the InspireTree constructor will load it. If an error occurs, it
will be caught in a promise that's cached as `tree._loader.promise`. This allows you to track the promise returned,
which can't be returned from the InspireTree constructor.

Any calls to `load`-related methods can use the returned promise normally.

## API Docs

- [Tree API](docs/tree.md)
- [TreeNode](docs/treenode.md)
- [TreeNodes](docs/treenodes.md)

## Tree Configuration

- **allowLoadEvents** - Array of state-change events to fire for pre-set states.
- **checkbox**
    + **autoCheckChildren** - Automatically check/uncheck children when parent toggled.
- **data** - An array, promise, or callback function.
- **deferredLoading** - Enable deferred loading. (See "Deferrals" section below.)
- **editable** - Allow inline editing (requires inspire-tree-dom).
- **editing** (defaults to true if `editable` is true)
    + **add** - Allow user to add nodes.
    + **edit** -  Allow user to edit existing nodes.
    + **remove** - Allow user to remove nodes.
- **nodes**
    + **resetStateOnRestore** - Reset node state to defaults when restored.
- **pagination**
    + **limit** - How many nodes are rendered/loaded at once. Used with deferrals. Defaults to nodes which fit in the container.
- **search**
    + **matcher** - Custom search executor (for custom/external handling of entire search). Must be a function which accepts a `query` and resolve/reject arguments.
    + **matchProcessor** - Custom handler for search matches. Must be a function which accepts a `TreeNodes` argument.
- **selection**
    + **allow** - Dynamically determine `selectable` boolean for a node.
    + **autoDeselect** - Prevent automatic deselection.
    + **autoSelectChildren** - Auto-select children when a parent node is selected, regardless of their visibility.
    + **disableDirectDeselection** - Disallow deselecting a node by clicking on it while selected.
    + **mode** - `default` or `checkbox`. Checkbox mode auto-selects children, doesn't auto deselect.
    + **multiple** - Allow multiple nodes to be selected at a time.
    + **require** - Require at least one selected node.
- **sort** - Property to sort by, or a custom sort function.

## Node Configuration

- **text** - Text used in display.
- **id** - Unique ID. If missing, one will be generated.
- **children** - An array of child nodes.
- **itree** - An object used to describe initial tree values:
    + **a.attributes** - Custom attributes for this node's `a`.
	+ **icon** - Custom icon for the anchor.
    + **li.attributes** - Custom attributes for this node's root `li`.
    + **state.checked** - Set checked state.
	+ **state.collapsed** - Set initial collapsed state.
    + **state.draggable** - Allows this node to be dragged, if supported*.
    + **state.drop-target** - Allows node to be a drop target, if supported*.
    + **state.editable** - Allow user editing of node text, if supported*.
    + **state.focused** - Node has focus, if supported*.
	+ **state.hidden** - Set initial visibility.
    + **state.indeterminate** - Set indeterminate state. May be overridden if all or zero children checked.
    + **state.loading** - Dynamic load of children in progress.
    + **state.matched** - Node was matched by a search.
    + **state.removed** - Soft removed. Never shown until restored.
    + **state.rendered** - Whether node has been rendered, if supported*.
    + **state.selectable** - Allow selection.
	+ **state.selected** - Set initial selection.

* Value applies natively to InspireTreeDOM, and will require added support if you're using a custom DOM renderer.

Some internal-use-only states are not listed.

## Events

Events are triggered to inform you of changes or user interaction. Listeners are always registered on `tree.on`. Methods available in our event system are described at [EventEmitter2](https://github.com/asyncly/EventEmitter2).

```js
tree.on('node.added', function(event, node) {
    // node added!
});
```

#### Event List

- **children.loaded** - `(TreeNode node)` - Children were dynamically loaded for a node.
- **data.loaded** - `(Array nodes)` - Data has been loaded successfully (only for data loaded via xhr/callbacks).
- **data.loaderror** - `(Error err)` - Loading failed.
- **model.loaded** - `(Array nodes)` - Data has been parsed into an internal model.
- **node.added** - `(TreeNode node)` - Node added.
- **node.blurred** - `(TreeNode node, bool isLoadEvent)` - Node lost focus.
- **node.checked** - `(TreeNode node, bool isLoadEvent)` - Node checked.
- **node.collapsed** - `(TreeNode node)` - Node collapsed.
- **node.deselected** - `(TreeNode node)` - Node deselected.
- **node.edited** - `(TreeNode node), (string oldValue), (string newValue)` - Node text was altered via inline editing.
- **node.expanded** - `(TreeNode node, bool isLoadEvent)` - Node expanded.
- **node.focused** - `(TreeNode node, bool isLoadEvent)` - Node focused.
- **node.hidden** - `(TreeNode node, bool isLoadEvent)` - Node hidden.
- **node.moved** - `(TreeNode node, TreeNodes source, int oldIndex, TreeNodes target, int newIndex)` - Node moved.
- **node.paginated** - `(TreeNode context), (Object pagination) (Event event)` - Nodes were paginated. Context is undefined when for the root level.
- **node.property.changed** - `(TreeNode node), (String property), (Mixed oldValue), (Mixed) newValue)` - A node's root property has changed.
- **node.removed** - `(object node)` - Node removed.
- **node.restored** - `(TreeNode node)` - Node restored.
- **node.selected** - `(TreeNode node, bool isLoadEvent)` - Node selected.
- **node.state.changed** - `(TreeNode node), (String property), (Mixed oldValue), (Mixed) newValue)` - A node state boolean has changed.
- **node.shown** - `(TreeNode node)` - Node shown.
- **node.softremoved** - `(TreeNode node, bool isLoadEvent)` - Node soft removed.
- **node.unchecked** - `(TreeNode node)` - Node unchecked.

## API Basics

Each Inspire Tree instance returns an API object.

All methods not specific to existing node/s are found directly on the API:

```js
tree.addNode({ text: 'Example' });
```

- [Tree API Documentation](docs/tree.md)

**TreeNode**

Each incoming javascript object is wrapped as a `TreeNode`, which aliases methods useful on a single node.

```js
tree.node('a-unique-id').select();
```

- [TreeNode API Documentation](docs/treenode.md)

**TreeNodes**

Multiple `TreeNode`s are contained within an Array-like object. The `TreeNodes` class extends `Array`, but we currently
only provide official tests/support for Array prototype methods available in all of our target browsers.

However, there are a few exceptions:

- `lastIndexOf` cannot be applied because nodes may not be duplicated. Use `indexOf`.

`TreeNodes` maps several `TreeNode` methods so you can invoke them on all nodes in the collection, or recursively
down the nodes and their children.

*Expands only root nodes inside this collection:*

```js
tree.nodes().expand();
```

*Expands root nodes and their children inside this collection:*

```js
tree.nodes().expandDeep();
```
- [TreeNodes API Documentation](docs/treenodes.md)

**Global TreeNodes Methods**

Most `TreeNodes` methods are mapped to the `tree` instance to ease working with all nodes. Instead of using `tree.nodes().someMethod()` you can
use `tree.someMethod()`.

## Deferrals

For those working with massive datasets, InspireTree offers several additional features to help reduce initial load burdens.

For Deferred Rendering, see the InspireTreeDOM package.

# Deferred Loading

Deferred Loading works exactly like deferred rendering, except nodes are loaded in paginated chunks.

1. Enable `deferredLoading` in the config.
2. Pass a count of total nodes to the `data` callback. This way, inspire tree knows how many nodes remain.

```js
data: function(node, resolve, reject, pagination) {
    // nodes = subset of total nodes, 1000 = total rows
    resolve(nodes, 1000);
}
```

3. Set `pagination.limit` in the config if the default doesn't suit you.
4. A fourth object, `pagination` is passed to the `data` callback. It contains the current limit/total for the context being loaded.
If `node` is undefined, the pagination object refers to root level nodes, otherwise it refers to children of the `node`.

*Note: Deferred rendering and loading may be used together but there's no reason to.*

## Custom Rendering

- Inferno: [Source](https://github.com/helion3/inspire-tree-inferno-demo) - [Demo](http://inspire-tree.com/inferno)
- React: [Source](https://github.com/helion3/inspire-tree-react-demo) - [Demo](http://inspire-tree.com/react)
- Angular: [Source](https://github.com/helion3/inspire-tree-angular-demo) - [Demo](http://inspire-tree.com/angular)
- Angular2: [Source](https://github.com/helion3/inspire-tree-angular2-demo)

While Inspire Tree provides a super-fast virtual DOM engine for element rendering, there are times
when you need your own. Useful for integrating with existing engines like Angular, React, etc.

All you need is this core API package, and to listen to the `changes.applied` event.

Inspire Tree offers data change batching and fires the `changes.applied` event when multiple changes are complete.

When the event emits, you may trigger an updated render through your existing view layer.

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
