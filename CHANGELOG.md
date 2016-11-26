# Changes to Inspire Tree

# 1.10.6

- Added `TreeNode.hasLoadedChildren` to determine if children of a node have been loaded yet.
- Added physical dom.js file to distribution so browserify can properly resolve the optional module.
- Changed "No Results" to Loading... for unloaded children of dynamic trees.
- Fixed dynamically loaded children not inheriting their parent's selected state.

# 1.10.5

- Fixed initial data loader to throw caught errors, and to emit them in `data.loaderror` event.
- Removed data config requirement, allowing deferred data loading.
- Fixed checkboxes showing over loading icons.

# 1.10.4

- Added `TreeNode.addChildren` method for bulk additions.
- Added typescript definition file.
- Fixed rendering error for nodes shifted by node insertion while sorting.
- Switched unique id generation libraries.
- Expanded tree shaking on bundled lodash for lighter builds.

# 1.10.3

- Fixed icon-folder-open svg encoding which resolves a rendering issue in IE.
- Changed wholerow css to negative margins over translateY to resolve an IE rendering issue.

# 1.10.2

- Fixed `this` binding of mapped filter methods in TreeNodes.

# 1.10.1

- Added `TreeNodes.stateDeep` method for setting states recursively.
- Mapped `TreeNode.state` method to TreeNodes.

Note: 1.10 failed to provide a suitable alternative for `setSelectableDeep` which was removed when `setSelectable` was. Now you may use `TreeNodes.stateDeep('selectable', [true|false]);`.

# 1.10

- Added `node.loading()` state convenience method.
- Added `node.state(prop, val)` method for getting/setting state booleans.
- Added `node.state.changed` event for all state property value changes.
- Added `excludeChildren` parameter to `TreeNode.toObject`.
- Added `ignoreKeys` parameter to the `TreeNode` constructor.
- Added DOM element pointer for each node to `node.itree.ref`.
- Fixed lodash modules being included in non-bundled builds.
- Fixed minor css issues.
- Improved efficiency/performance of export system.
- Tied focus/blur state changes to native browser focus/blur events.
- Added 60 unit tests & refactored internal code to ES6 class syntax.

**Breaking Changes**

- Nodes are no longer focused when selected via the API.
- `expandParents` is no longer mapped to the `tree` api since it's useless at the root level.
- Removed `export` methods. Use `TreeNodes.toArray` or `TreeNode.toObject`.
- Removed `setSelectable` in favor of `node.state('selectable', value)`.
- Removed `selectability-changed` event since it's now driven by `state()`. Instead, listen to `node.state.changed` and filter for `selectable`.
- Left/right arrow keys no longer move focus after expanding/collapsing the node. It was inconsistent with native browser tabbing behavior.

# 1.9.1

- Fixed css somehow missed by deploy script.

# 1.9

- Added support for `a.attributes` primarily to allow for custom `href`s.
- Added `icon-folder-open`.
- Added hierarchy lines which can be disabled by excluding the `hierarchy.scss` file when building.
- Revamped default theme icons and colors.

**Breaking Changes**

- `icon-caret` has been removed in favor of `icon-expand` and `icon-collapse` which also removes the rotation.

# 1.8

- Added `preventTreeDefault` to DOM-related events `node.click`, `node.dblclick`, and `node.contextmenu`.
- Added pointer for the default handler to DOM-related events, as the third argument.
- Added support for non-tree DOM elements as drop targets.
- Allowed custom classnames from `node.itree.li.attributes.class` or `node.itree.li.attributes.classNames`.

**Breaking Changes**

To allow for event overrides, DOM events fire *before* the Inspire Tree logic has executed. For example
in 1.7, if you check `node.expanded()` inside a `node.dblclick` listener it would reflect the result
of the double click. Now, it will return the *current* value, before the click handler logic has executed.

# 1.7

- Changed `extract` to make use of `addNode` for hierarchy merges.
- Prevented `insertAt` from overwriting an array with a boolean for `children` when merging.
- Added `disableDirectDeselection` configuration option.
- Added `invoke` and `invokeDeep` methods to `TreeNodes`.
- Improved performance of `TreeNodes.nodes`.

**Breaking Changes**

- Removed second `context` argument to `tree.node` and `tree.nodes`, as they now operate from `TreeNodes`.

# 1.6.1

- Added `src` directory to npm include list.
- `search` will skip soft-removed nodes.
- Fixed clones being shallow.

# 1.6

- Added `selection.autoSelectChildren` option to also set selected state of child nodes when parent is selected.
- Added `tree.isNode` method.
- Added `TreeNode.interdeterminate` method.
- Added `TreeNodes.addNode()` method to add a node to a collection. If a sort method is defined, it will insert at the correction position.
- Added `TreeNodes.context()` method to return the parent node or tree context.
- Added `TreeNodes.each()` method for chain-friendly node iteration.
- Added `TreeNodes.insertAt()` method which inserts a node at a given index or merges existing.
- Added `TreeNodes.tree()` method to allow cleaner chain context changes.
- Added `showCheckboxes` configuration option.
- Added defaults to custom render objects to allow for undefined methods.
- Cleaned which files are ignore for both npm/bower packages.
- Fixed interdeterminate/deselection logic/state/dom issues.
- Mapped `expanded`, `selectable`, and `visible` filter methods on TreeNodes.
- Removed internal mergeNode method, in favor of smarter `addNode`/`insertAt` methods.
- Replaced `tree.addNode` with a mapping to `TreeNodes.addNode`. The method signature is unchanged.
- Separate checkbox visuals and checkbox selection mode for finer control over behaviors.

**Breaking Changes**

- Changed `tree.reload()` to return the `tree.load` promise instead of the tree instance.
- Changed `TreeNode.copyHierarchy` to exclude hidden children (when `excludeNode` is false).
- Moved `allowSelection` configuration option to `selection.allow`.
- Moved `autoDeselect` configuration option to `selection.autoDeselect`.
- Moved `multiselect` configuration option to `selection.multiple`.
- Moved `requireSelection` configuration option to `selection.require`.
- Moved `checkbox` configuration option to `selection.mode: 'checkbox'`.
- `TreeNode.restore` may now reset the node's state - this must be enabled via config option `nodes.resetStateOnRestore`.
- `TreeNode.softRemove` no longer resets a node's state.
- Removed `dist/scss` files in favor of including `src` and `img` directories.

# 1.5

Note: 1.5 was quickly unpublished because it became clear that our logic for a new feature wasn't acceptable. All of these changes appear in 1.6.

- Added `tree.canAutoDeselect` method.
- Added `autoSelectChildren` option.

**Breaking Changes**

- Replaced `tree.preventDeselection` boolean with `tree.enableDeselection` and `tree.disableDeselection` methods.

# 1.4.5

- Updated data loader to accept a returned promise as an alternative to resolve/reject arguments.
- Updated all tree methods without a return value to return the tree instance.
- Added `mute` and `unmute` methods to surpress events.
- Added `unselectable` attribute for IE, cancel on click event to prevent text selection.
- Fixed nodes remaining focused when tree itself is blurred.
- Changed focus styling to use dotted outline instead of hover color.

# 1.4.4

- Fixed `selectBetween` failing when a range of two nodes was selected.

# 1.4.3

- Added `tree.lastSelectedNode()`.
- Updated shift+select logic to use last selected node, to allow for separate ranges.
- Fixed bug with `selectBetween` including the end node.

# 1.4.2

- Disabled text selection via css for a cleaner experience.
- Added `boundingNodes` methods to return min/max nodes.
- `search` now treats undefined arguments as empty queries.
- Minor cleanup.

# 1.4.1

- Added `TreeNode.context` method to get it's immediate `TreeNodes` context.
- Added `TreeNode.indexPath` method to get a key of all parent context indices.
- Added `tree.selectBetween` method for selecting all nodes between a start and end node.
- Added ranged selection via shift key.
- Added logic to clear text selection after a double or shift-click.
- Mapped `setSelectable` to TreeNodes (shallow and deep copies).
- Fixed performance problems with `export` and `copyHierarchy`.
- `expand` resolves promise immediately if already expanded.
- Minor repo cleanup.

# 1.4.0

- Internal and repo cleanup.

**Breaking Changes**

- Moves bundled lodash to a `-bundled` distribution file. `inspire-tree.js` and its variants require lodash as an external dependency.

# 1.3.0

- Added `setSelectable`.

**Breaking Changes**

- `load`, `expand`, and `expandDeep` now return a Promise.

# 1.2.6

- Minor cleanup, package updates

# 1.2.5

- Updated to lodash v4
- Internal cleanup, methods make use of own recursion functions.

# 1.2.4

- Load event now fires even when data is an array.
- Recursion functions end when `false` is returned.

# 1.2.3

- Renamed `selectFirstVisibleNode` -> `selectFirstAvailableNode`
- Added `TreeNodes.get` method.
- Internal cleanup.

# 1.2.2

- Renamed `filter` to `extract`, add `filter` method.
- Fixed `flatten` treatment of arguments.

# 1.2.1

- `filter` returns TreeNodes instead of an Array.
- Removed `reduce` in favor of `filter`.

# 1.2.0

- Renamed `getNode` -> `node`.
- Renamed `getFocusedNode` -> `focused`.
- Renamed `getNodes` -> `nodes`.
- Renamed get(State)Nodes methods to (state)().
- Added comment banner to output.

# 1.1.1

- Removed auto-execution of clean().
- Fixed TreeNode methods missing return.
- Deepest excludes nodes with `children: true`;
- Cleanup/internal fixes.

# 1.1.0

- Removed `softRemoveDeep`, `softRemove` must be recursive by default.
- Recurse methods no longer require return.
- Removed `tree.showAll` since tree.showDeep exists.
- Internal cleanup.

*All previous commits are considered early development-heavy and won't be listed here.*
