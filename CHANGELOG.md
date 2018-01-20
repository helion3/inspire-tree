# Changes to Inspire Tree

# 4.3.0

- Typescript definition file cleanup and improvements:
- Added `NodeConfig` interface.
- Imports `EventEmitter2` definitions.
- Various cleanup.

# 4.2.1

- Improves typescript definitions.
- Moves four npm dependencies to the `dependencies` array to support ES6 users.

# 4.2.0

- Added `includeState` parameter to `TreeNode.remove`.
- Added `draggable` and `drop-target` to node state objects.
- Improved logic for calculating pagination totals when using arrays.
- Fixed batch end error in `TreeNode.states`.

# 4.1.0

- Added `TreeNode.states` which sets multiple states to a single value.
- `toObject` now supports optionally exporting node state.
- Fixed pagination totals for nested data loaded via array.

# 4.0.1

- Added `TreeNode@hasAncestor`.

# 4.0.0

**Breaking Changes**

- Removes string typing of node ID.

This means that you must query your nodes by ID using the same type as the ID was given to the tree.
Using `id: 1` means you must query by a number, `tree.node(1)`. Previously, querying by a number *or* string
would work. This change allows your data to remain typed, if you need it later.

Anything except numbers or strings will still be converted to a string using `toString`.

# 3.0.1

- Added `TreeNode.hasOrWillHaveChildren`. Returns true when children are present or `children` property is true.

# 3.0.0

- Added `createNode` method for creating a node, without adding it.
- Added `TreeNode.tree` method.
- Implemented tests and support for inherited Array prototype methods (excluding those not available in IE10+).
- Updated typescript definition file to include Array methods.

**Breaking Changes**

- Removed `isNode` alias of `isTreeNode`.
- `isTreeNode` and `isTreeNodes` are now static methods.
- Renamed `filter` to `filterBy` to avoid overriding `Array.filter`.
- Renamed `sort` to `sortBy` to avoid overriding `Array.sort`.

# 2.0.6

- Added `isLoadEvent` boolean to state events. `true` only when event fires on load and is in `allowLoadEvents` config.

# 2.0.5

- Added `TreeNodes.move`.
- Added `TreeNodes.swap` and `TreeNode.swap`.
- Added event-related methods to typescript definition file.
- Fixed empty arrays not being converted to TreeNodes instances.
- Cached initial load promise on the tree rather than throwing its error.
- Added safety check for invalid arrays on data load.

# 2.0.4

- Clears existing data on `load` when not using deferred loading. Was broken with 1.11.

# 2.0.3

- Addressed incorrect version in distribution file banners.

# 2.0.2

- Added `TreeNode.reload` method.
- Removed bower support.

# 2.0.1

- Added `isTreeNode` alias to (and deprecated) `isNode`.
- Fixed uglify-incompatible instance checks.

# 2.0.0

2.0 is an overhaul (and improvement) with how we manage and build InspireTree. The API has *not* changed aside from some
additions, but *how you instantiate the DOM* **has**.

Most critically, the inspire-tree package is now only the core API. To use the official DOM renderer,
you'll also need the `inspire-tree-dom` package. This allows us to keep the packages cleaner for those
using their own view layer/rendering framework.

Overall, InspireTree is lighter because we now use rollup for bundling, which saves us 20k worth of code versus webpack.

We've ported our DOM rendering to [Inferno](https://infernojs.org/), and are seeing up to 60% faster rendering
(initial render of 10k nodes with Chrome 57 on macOS Sierra: 2265ms average with virtual-dom, 963ms average with Inferno).

- Added a gzipped copy of distribution files.
- Added `Tree.pagination`, `TreeNodes.pagination`, `TreNode.pagination`.
- Added/exposed `Tree.loadMore`, `TreeNodes.loadMore`, `TreNode.loadMore`, which loads additional paginated nodes.
- Fixed `check` call failing to reset indeterminate state.
- Overhauled and added tests for deferral-related pagination.
- Improved the efficiency of which uuid imports we're referencing.

**Breaking Changes**

- Moved DOM code into a new package, [inspire-tree-dom](https://github.com/helion3/inspire-tree-dom).
- Rewrote the DOM engine with Inferno, replacing virtual-dom.

While there are no official API changes, the `node.itree.ref.node` Element reference is now just `node.itree.ref`.

- We're no longer bundling lodash. If you're not using a bundler like Webpack, Browserify, or rollup,
you'll need to include it as a dependency.

- Removed native context menu support since the `node.contextmenu` event is passed through anyway.
- Renamed `node.paginate` event to `node.paginated`.

# 1.0

For 1.0 changelogs, see the 1.x branch: https://github.com/helion3/inspire-tree/tree/1.x
