# Changes to Inspire Tree

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
