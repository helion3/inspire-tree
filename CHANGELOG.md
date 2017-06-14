# Changes to Inspire Tree

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
