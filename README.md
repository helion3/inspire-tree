# Inspire Tree

[![Join the chat at https://gitter.im/helion3/inspire-tree](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/helion3/inspire-tree?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status](https://travis-ci.org/helion3/inspire-tree.svg?branch=master)](https://travis-ci.org/helion3/inspire-tree)

Inspire Tree is a performance-driven javascript-based UI tree component, built for the modern web. Inspired by
our need for one - the only existing solution which met our *feature* needs was a nightmare to *develop* for.

- [Website & Demos](http://www.inspire-tree.com/)
- [Changelog](https://github.com/helion3/inspire-tree/CHANGELOG.md)

### Features:

- Robust API.
- Events everywhere.
- No required external dependencies.
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

## Usage

In most use-cases you need to provide a target DOM element and a source of data:

```js
var tree = new InspireTree({
    target: '.tree',
    data: $.getJSON('sample-data.json')
});
```

Data objects must have at least a `text` property. Additional properties are listed below in "Node Configuration".

If you're using a custom DOM renderer (see below), the `target` property is optional.

### Data Loading and Initialization Errors

When you define a data loader in the InspireTree constructor, the promise isn't accessible, and this can consume errors
that you should be aware of. There are a few choices:

- If `data` was provided to the constructor, InspireTree will automatically throw any errors. However, errors from
  future calls will only be available through the `load()` method's promise or the `data.loaderror` event.
- Listen to the `data.loaderror` event. All load errors, including initial errors, emit this event.
- Load the data after tree initialization: `tree.load(data).catch(function(err) { ... })`.

## API Docs

- [Tree API](docs/tree.md)
- [TreeNode](docs/treenode.md)
- [TreeNodes](docs/treenodes.md)

## Tree Configuration

- **allowLoadEvents** - Array of state-change events to fire for pre-set states.
- **checkbox**
    + **autoCheckChildren** - Automatically check/uncheck children when parent toggled.
- **contextMenu** - Array of choices (object with `text` property, `handler` function) for a custom context menu.
- **data** - An array, promise, or callback function.
- **deferredLoading** - Enable deferred loading. (See "Deferrals" section below.)
- **dom**
    + **autoLoadMore** - Automatically triggers "Load More" links on scroll. Used with deferrals.
    + **deferredRendering** - Only render nodes as the user clicks to display more. (See "Deferrals" section below.)
    + **nodeHeight** - Height (in pixels) of your nodes. Used with deferrals, if `pagination.limit` not provided.
    + **showCheckboxes** - Show checkbox inputs.
- **dragTargets** - Array of other tree elements which accept drag/drop.
- **editable** - Allow inline editing.
- **editing** (defaults to true if `editable` is true)
    + **add** - Allow user to add nodes.
    + **edit** -  Allow user to edit existing nodes.
    + **remove** - Allow user to remove nodes.
- **nodes**
    + **resetStateOnRestore** - Reset node state to defaults when restored.
- **pagination**
    + **limit** - How many nodes are rendered/loaded at once. Used with deferrals. Defaults to nodes which fit in the container.
- **renderer** - Function which returns a custom renderer (see below).
- **search** - Custom search callback (for external handling of entire search).
- **selection**
    + **allow** - Dynamically determine `selectable` boolean for a node.
    + **autoDeselect** - Prevent automatic deselection.
    + **autoSelectChildren** - Auto-select children when a parent node is selected, regardless of their visibility.
    + **disableDirectDeselection** - Disallow deselecting a node by clicking on it while selected.
    + **mode** - `default` or `checkbox`. Checkbox mode auto-selects children, doesn't auto deselect.
    + **multiple** - Allow multiple nodes to be selected at a time.
    + **require** - Require at least one selected node.
- **showCheckboxes** - Show checkboxes in DOM. (Defaults to true if `selection.mode` === 'checkbox').
- **sort** - Property to sort by, or a custom sort function.
- **tabindex** - Define a tab index for the tree container (used for key nav).
- **target** - An Element, selector, or jQuery object.

## Node Configuration

- **text** - Text used in display.
- **id** - Unique ID. If missing, one will be generated.
- **children** - An array of child nodes.
- **a.attributes** - Custom attributes for this node's `a`.
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
- **node.checked** - `(TreeNode node)` - Node checked.
- **node.click** - `(Event event, TreeNode node)` - User clicked node.
- **node.collapsed** - `(TreeNode node)` - Node collapsed.
- **node.contextmenu** - `(Event event, TreeNode node)` - User right-clicked node.
- **node.dblclick** - `(Event event, TreeNode node)` - User double-clicked node.
- **node.deselected** - `(TreeNode node)` - Node deselected.
- **node.dropin** - `(TreeNode node)` - Tree has received a new node via drop.
- **node.dropout** - `(TreeNode node), (Element elem)` - Node dropped into a valid target.
- **node.expanded** - `(TreeNode node)` - Node expanded.
- **node.focused** - `(TreeNode node)` - Node focused.
- **node.hidden** - `(TreeNode node)` - Node hidden.
- **node.paginate** - `(TreeNode context), (Object pagination) (Event event)` - Nodes were paginated. Context is undefined when for the root level.
- **node.property.changed** - `(TreeNode node), (String property), (Mixed oldValue), (Mixed) newValue)` - A node's root property has changed.
- **node.removed** - `(object node)` - Node removed.
- **node.restored** - `(TreeNode node)` - Node restored.
- **node.selected** - `(TreeNode node)` - Node selected.
- **node.state.changed** - `(TreeNode node), (String property), (Mixed oldValue), (Mixed) newValue)` - A node state boolean has changed.
- **node.shown** - `(TreeNode node)` - Node shown.
- **node.softremoved** - `(TreeNode node)` - Node soft removed.
- **node.unchecked** - `(TreeNode node)` - Node unchecked.

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

- [Tree API Documentation](docs/tree.md)

**TreeNode**

Each incoming javascript object is wrapped as a `TreeNode`, which aliases methods useful on a single node.

```js
tree.node('a-unique-id').select();
```

- [TreeNode API Documentation](docs/treenode.md)

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
- [TreeNodes API Documentation](docs/treenodes.md)

**Global TreeNodes Methods**

Most `TreeNodes` methods are mapped to the `tree` instance to ease working with all nodes. Instead of using `tree.nodes().someMethod()` you can
use `tree.someMethod()`.

## Deferrals

For those working with massive datasets, InspireTree offers several additional features to help reduce initial load burdens.

### Deferred Rendering

Deferred Rendering progressively renders loaded nodes as the user scrolls or clicks a Load More link.

To work properly, you need to enable `dom.deferredRendering` in the configuration.

A "Load More" link will show at the bottom of each section which has more nodes than are initially allowed.

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
