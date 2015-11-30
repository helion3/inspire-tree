# 

<!-- div class="toc-container" -->

<!-- div -->

## `CopyNode`
* <a href="#to">`to`</a>
* <a href="#to">`to`</a>

<!-- /div -->

<!-- div -->

## `Tree`
* <a href="#addNode">`addNode`</a>
* <a href="#addNodes">`addNodes`</a>
* <a href="#clearSearch">`clearSearch`</a>
* <a href="#getAvailableNodes">`getAvailableNodes`</a>
* <a href="#getDeepestAvailableNodes">`getDeepestAvailableNodes`</a>
* <a href="#getFocusedNode">`getFocusedNode`</a>
* <a href="#getNode">`getNode`</a>
* <a href="#getNodes">`getNodes`</a>
* <a href="#getSelectedNodes">`getSelectedNodes`</a>
* <a href="#load">`load`</a>
* <a href="#recurseDown">`recurseDown`</a>
* <a href="#removeAll">`removeAll`</a>
* <a href="#search">`search`</a>
* <a href="#selectFirstVisibleNode">`selectFirstVisibleNode`</a>
* <a href="#showAll">`showAll`</a>

<!-- /div -->

<!-- div -->

## `TreeNode`
* <a href="#addChild">`addChild`</a>
* <a href="#available">`available`</a>
* <a href="#blur">`blur`</a>
* <a href="#clone">`clone`</a>
* <a href="#collapse">`collapse`</a>
* <a href="#collapsed">`collapsed`</a>
* <a href="#copy">`copy`</a>
* <a href="#copyHierarchy">`copyHierarchy`</a>
* <a href="#deselect">`deselect`</a>
* <a href="#expand">`expand`</a>
* <a href="#expandParents">`expandParents`</a>
* <a href="#expanded">`expanded`</a>
* <a href="#export">`export`</a>
* <a href="#focus">`focus`</a>
* <a href="#focused">`focused`</a>
* <a href="#getParent">`getParent`</a>
* <a href="#getParents">`getParents`</a>
* <a href="#getTextualHierarchy">`getTextualHierarchy`</a>
* <a href="#hasChildren">`hasChildren`</a>
* <a href="#hasParent">`hasParent`</a>
* <a href="#hasVisibleChildren">`hasVisibleChildren`</a>
* <a href="#hidden">`hidden`</a>
* <a href="#hide">`hide`</a>
* <a href="#loadChildren">`loadChildren`</a>
* <a href="#markDirty">`markDirty`</a>
* <a href="#nextVisibleChildNode">`nextVisibleChildNode`</a>
* <a href="#nextVisibleNode">`nextVisibleNode`</a>
* <a href="#nextVisibleSiblingNode">`nextVisibleSiblingNode`</a>
* <a href="#previousVisibleNode">`previousVisibleNode`</a>
* <a href="#previousVisibleSiblingNode">`previousVisibleSiblingNode`</a>
* <a href="#recurseDown">`recurseDown`</a>
* <a href="#recurseUp">`recurseUp`</a>
* <a href="#remove">`remove`</a>
* <a href="#removed">`removed`</a>
* <a href="#restore">`restore`</a>
* <a href="#select">`select`</a>
* <a href="#selected">`selected`</a>
* <a href="#set">`set`</a>
* <a href="#show">`show`</a>
* <a href="#softRemove">`softRemove`</a>
* <a href="#toggleCollapse">`toggleCollapse`</a>
* <a href="#toggleSelect">`toggleSelect`</a>
* <a href="#visible">`visible`</a>

<!-- /div -->

<!-- div -->

## `TreeNodes`
* <a href="#TreeNodes">`TreeNodes`</a>
* <a href="#clone">`clone`</a>
* <a href="#concat">`concat`</a>
* <a href="#copy">`copy`</a>
* <a href="#export">`export`</a>
* <a href="#flatten">`flatten`</a>
* <a href="#getAvailableNodes">`getAvailableNodes`</a>
* <a href="#getDeepestAvailableNodes">`getDeepestAvailableNodes`</a>
* <a href="#recurseDown">`recurseDown`</a>
* <a href="#reduce">`reduce`</a>
* <a href="#reduceDeep">`reduceDeep`</a>
* <a href="#sort">`sort`</a>

<!-- /div -->

<!-- div -->

## `Methods`
* <a href="#TreeNode">`TreeNode`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `“CopyNode” Methods`

<!-- div -->

### <a id="to"></a>`to(dest)`
<a href="#to">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L193 "View in source") [&#x24C9;][1]

Sets a destination.

#### Arguments
1. `dest` *(object)*: Destination Inspire Tree.

* * *

<!-- /div -->

<!-- div -->

### <a id="to"></a>`to(dest)`
<a href="#to">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L900 "View in source") [&#x24C9;][1]

Sets a destination.

#### Arguments
1. `dest` *(object)*: Destination Inspire Tree.

* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Tree” Methods`

<!-- div -->

### <a id="addNode"></a>`addNode(node)`
<a href="#addNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1286 "View in source") [&#x24C9;][1]

Add a node.

#### Arguments
1. `node` *(object)*: Node object.

* * *

<!-- /div -->

<!-- div -->

### <a id="addNodes"></a>`addNodes(nodes)`
<a href="#addNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1307 "View in source") [&#x24C9;][1]

Add nodes.

#### Arguments
1. `nodes` *(array)*: Array of node objects.

* * *

<!-- /div -->

<!-- div -->

### <a id="clearSearch"></a>`clearSearch`
<a href="#clearSearch">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1326 "View in source") [&#x24C9;][1]

Shows all nodes and collapses parents.

* * *

<!-- /div -->

<!-- div -->

### <a id="getAvailableNodes"></a>`getAvailableNodes`
<a href="#getAvailableNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1337 "View in source") [&#x24C9;][1]

Get all available nodes.

* * *

<!-- /div -->

<!-- div -->

### <a id="getDeepestAvailableNodes"></a>`getDeepestAvailableNodes`
<a href="#getDeepestAvailableNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1347 "View in source") [&#x24C9;][1]

Get all deepest available nodes.

* * *

<!-- /div -->

<!-- div -->

### <a id="getFocusedNode"></a>`getFocusedNode`
<a href="#getFocusedNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1419 "View in source") [&#x24C9;][1]

Get the currently focused node, if any.

* * *

<!-- /div -->

<!-- div -->

### <a id="getNode"></a>`getNode(id, nodes)`
<a href="#getNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1359 "View in source") [&#x24C9;][1]

Get a node.

#### Arguments
1. `id` *(string|number)*: ID of node.
2. `nodes` *(TreeNodes)*: Base collection to search in.

* * *

<!-- /div -->

<!-- div -->

### <a id="getNodes"></a>`getNodes(refs)`
<a href="#getNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1394 "View in source") [&#x24C9;][1]

Get all nodes in a tree, or nodes for an array of IDs.

#### Arguments
1. `refs` *(array)*: Array of ID references.

#### Example
```js
var all = tree.getNodes()
var some = tree.getNodes([1, 2, 3])
```
* * *

<!-- /div -->

<!-- div -->

### <a id="getSelectedNodes"></a>`getSelectedNodes(nodes)`
<a href="#getSelectedNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1437 "View in source") [&#x24C9;][1]

Returns a flat array of selected nodes.

#### Arguments
1. `nodes` *(TreeNodes)*: Array of node objects to search within.

* * *

<!-- /div -->

<!-- div -->

### <a id="load"></a>`load(loader)`
<a href="#load">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1451 "View in source") [&#x24C9;][1]

Loads tree. Accepts an array or a promise.

#### Arguments
1. `loader` *(array|function)*: Array of nodes, or promise resolving an array of nodes.

#### Example
```js
tree.load($.getJSON('nodes.json'));
```
* * *

<!-- /div -->

<!-- div -->

### <a id="recurseDown"></a>`recurseDown(collection, iteratee)`
<a href="#recurseDown">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1511 "View in source") [&#x24C9;][1]

Iterate down node/children recursively.

#### Arguments
1. `collection` *(TreeNodes|TreeNode)*: Array of nodes or node object.
2. `iteratee` *(function)*: Iteratee function.

* * *

<!-- /div -->

<!-- div -->

### <a id="removeAll"></a>`removeAll`
<a href="#removeAll">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1541 "View in source") [&#x24C9;][1]

Removes all nodes.

* * *

<!-- /div -->

<!-- div -->

### <a id="search"></a>`search(query)`
<a href="#search">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1553 "View in source") [&#x24C9;][1]

Search nodes, showing only those that match and the necessary hierarchy.

#### Arguments
1. `query` *(&#42;)*: Search string, RegExp, or function.

* * *

<!-- /div -->

<!-- div -->

### <a id="selectFirstVisibleNode"></a>`selectFirstVisibleNode`
<a href="#selectFirstVisibleNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1630 "View in source") [&#x24C9;][1]

Select the first visible node at the root level.

* * *

<!-- /div -->

<!-- div -->

### <a id="showAll"></a>`showAll`
<a href="#showAll">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1651 "View in source") [&#x24C9;][1]

Shows all nodes.

* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“TreeNode” Methods`

<!-- div -->

### <a id="addChild"></a>`addChild(child)`
<a href="#addChild">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L98 "View in source") [&#x24C9;][1]

Add a child to this node.

#### Arguments
1. `child` *(object)*: Node object.

* * *

<!-- /div -->

<!-- div -->

### <a id="available"></a>`available`
<a href="#available">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L120 "View in source") [&#x24C9;][1]

Get if node available.

* * *

<!-- /div -->

<!-- div -->

### <a id="blur"></a>`blur`
<a href="#blur">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L130 "View in source") [&#x24C9;][1]

Blur focus from this node.

* * *

<!-- /div -->

<!-- div -->

### <a id="clone"></a>`clone`
<a href="#clone">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L140 "View in source") [&#x24C9;][1]

Clones this node.

* * *

<!-- /div -->

<!-- div -->

### <a id="collapse"></a>`collapse`
<a href="#collapse">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L156 "View in source") [&#x24C9;][1]

Collapse this node.

* * *

<!-- /div -->

<!-- div -->

### <a id="collapsed"></a>`collapsed`
<a href="#collapsed">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L166 "View in source") [&#x24C9;][1]

Get if node collapsed.

* * *

<!-- /div -->

<!-- div -->

### <a id="copy"></a>`copy(hierarchy)`
<a href="#copy">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L177 "View in source") [&#x24C9;][1]

Copies node to a new tree instance.

#### Arguments
1. `hierarchy` *(boolean)*: Include necessary ancestors to match hierarchy.

* * *

<!-- /div -->

<!-- div -->

### <a id="copyHierarchy"></a>`copyHierarchy(excludeNode)`
<a href="#copyHierarchy">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L210 "View in source") [&#x24C9;][1]

Copies all parents of a node.

#### Arguments
1. `excludeNode` *(boolean)*: Exclude given node from hierarchy.

* * *

<!-- /div -->

<!-- div -->

### <a id="deselect"></a>`deselect`
<a href="#deselect">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L250 "View in source") [&#x24C9;][1]

Deselect this node.

* * *

<!-- /div -->

<!-- div -->

### <a id="expand"></a>`expand`
<a href="#expand">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L260 "View in source") [&#x24C9;][1]

Expand this node.

* * *

<!-- /div -->

<!-- div -->

### <a id="expandParents"></a>`expandParents`
<a href="#expandParents">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L288 "View in source") [&#x24C9;][1]

Expand parent nodes.

* * *

<!-- /div -->

<!-- div -->

### <a id="expanded"></a>`expanded`
<a href="#expanded">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L302 "View in source") [&#x24C9;][1]

Get if node expanded.

* * *

<!-- /div -->

<!-- div -->

### <a id="export"></a>`export`
<a href="#export">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L313 "View in source") [&#x24C9;][1]

Clones a node object and removes any
itree instance information/state.

* * *

<!-- /div -->

<!-- div -->

### <a id="focus"></a>`focus`
<a href="#focus">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L330 "View in source") [&#x24C9;][1]

Focus a node without changing its selection.

* * *

<!-- /div -->

<!-- div -->

### <a id="focused"></a>`focused`
<a href="#focused">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L356 "View in source") [&#x24C9;][1]

Get whether node has focus or not.

* * *

<!-- /div -->

<!-- div -->

### <a id="getParent"></a>`getParent`
<a href="#getParent">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L366 "View in source") [&#x24C9;][1]

Get the immediate parent, if any.

* * *

<!-- /div -->

<!-- div -->

### <a id="getParents"></a>`getParents`
<a href="#getParents">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L376 "View in source") [&#x24C9;][1]

Returns parent nodes. Excludes any siblings.

* * *

<!-- /div -->

<!-- div -->

### <a id="getTextualHierarchy"></a>`getTextualHierarchy`
<a href="#getTextualHierarchy">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L395 "View in source") [&#x24C9;][1]

Get a textual hierarchy for a given node. An array
of text from this node's root ancestor to the given node.

* * *

<!-- /div -->

<!-- div -->

### <a id="hasChildren"></a>`hasChildren`
<a href="#hasChildren">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L415 "View in source") [&#x24C9;][1]

If node has any children.

* * *

<!-- /div -->

<!-- div -->

### <a id="hasParent"></a>`hasParent`
<a href="#hasParent">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L425 "View in source") [&#x24C9;][1]

If node has a parent.

* * *

<!-- /div -->

<!-- div -->

### <a id="hasVisibleChildren"></a>`hasVisibleChildren`
<a href="#hasVisibleChildren">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L435 "View in source") [&#x24C9;][1]

If node has any visible children.

* * *

<!-- /div -->

<!-- div -->

### <a id="hidden"></a>`hidden`
<a href="#hidden">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L460 "View in source") [&#x24C9;][1]

Get if node hidden.

* * *

<!-- /div -->

<!-- div -->

### <a id="hide"></a>`hide`
<a href="#hide">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L470 "View in source") [&#x24C9;][1]

Hide this node.

* * *

<!-- /div -->

<!-- div -->

### <a id="loadChildren"></a>`loadChildren`
<a href="#loadChildren">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L495 "View in source") [&#x24C9;][1]

Initiate a dynamic load of children for a given node.
<br>
<br>
This requires `tree.config.data` to be a function which accepts
three arguments: node, resolve, reject.
<br>
<br>
Use the `node` to filter results.
<br>
<br>
On load success, pass the result array to `resolve`.
On error, pass the Error to `reject`.

* * *

<!-- /div -->

<!-- div -->

### <a id="markDirty"></a>`markDirty(noRecursion)`
<a href="#markDirty">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L532 "View in source") [&#x24C9;][1]

Mark a node as dirty, rebuilding this node in the virtual DOM
and rerendering to the live DOM, next time applyChanges is called.

#### Arguments
1. `noRecursion` *(boolean)*: Skip recursing up parent tree.

* * *

<!-- /div -->

<!-- div -->

### <a id="nextVisibleChildNode"></a>`nextVisibleChildNode`
<a href="#nextVisibleChildNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L551 "View in source") [&#x24C9;][1]

Find next visible child node.

* * *

<!-- /div -->

<!-- div -->

### <a id="nextVisibleNode"></a>`nextVisibleNode`
<a href="#nextVisibleNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L570 "View in source") [&#x24C9;][1]

Get the next visible node.

* * *

<!-- /div -->

<!-- div -->

### <a id="nextVisibleSiblingNode"></a>`nextVisibleSiblingNode`
<a href="#nextVisibleSiblingNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L596 "View in source") [&#x24C9;][1]

Find the next visible sibling node.

* * *

<!-- /div -->

<!-- div -->

### <a id="previousVisibleNode"></a>`previousVisibleNode`
<a href="#previousVisibleNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L612 "View in source") [&#x24C9;][1]

Find the previous visible node.

* * *

<!-- /div -->

<!-- div -->

### <a id="previousVisibleSiblingNode"></a>`previousVisibleSiblingNode`
<a href="#previousVisibleSiblingNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L640 "View in source") [&#x24C9;][1]

Find the previous visible sibling node.

* * *

<!-- /div -->

<!-- div -->

### <a id="recurseDown"></a>`recurseDown(iteratee)`
<a href="#recurseDown">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L677 "View in source") [&#x24C9;][1]

Iterate down node and any children.

#### Arguments
1. `iteratee` *(function)*: Iteratee function.

* * *

<!-- /div -->

<!-- div -->

### <a id="recurseUp"></a>`recurseUp(iteratee)`
<a href="#recurseUp">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L655 "View in source") [&#x24C9;][1]

Iterate up a node and its parents.

#### Arguments
1. `iteratee` *(function)*: Iteratee function.

* * *

<!-- /div -->

<!-- div -->

### <a id="remove"></a>`remove`
<a href="#remove">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L687 "View in source") [&#x24C9;][1]

Remove a node from the tree.

* * *

<!-- /div -->

<!-- div -->

### <a id="removed"></a>`removed`
<a href="#removed">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L703 "View in source") [&#x24C9;][1]

Get if node soft-removed.

* * *

<!-- /div -->

<!-- div -->

### <a id="restore"></a>`restore`
<a href="#restore">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L713 "View in source") [&#x24C9;][1]

Restore state if soft-removed.

* * *

<!-- /div -->

<!-- div -->

### <a id="select"></a>`select`
<a href="#select">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L723 "View in source") [&#x24C9;][1]

Select this node.

* * *

<!-- /div -->

<!-- div -->

### <a id="selected"></a>`selected`
<a href="#selected">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L755 "View in source") [&#x24C9;][1]

Get if node selected.

* * *

<!-- /div -->

<!-- div -->

### <a id="set"></a>`set(property, value)`
<a href="#set">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L767 "View in source") [&#x24C9;][1]

Select this node.

#### Arguments
1. `property` *(string|number)*: Property name.
2. `value` *(&#42;)*: New value.

* * *

<!-- /div -->

<!-- div -->

### <a id="show"></a>`show`
<a href="#show">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L780 "View in source") [&#x24C9;][1]

Show this node.

* * *

<!-- /div -->

<!-- div -->

### <a id="softRemove"></a>`softRemove`
<a href="#softRemove">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L792 "View in source") [&#x24C9;][1]

Mark this node as "removed" without actually removing it.
<br>
<br>
Expand/show methods will never reveal this node until restored.

* * *

<!-- /div -->

<!-- div -->

### <a id="toggleCollapse"></a>`toggleCollapse`
<a href="#toggleCollapse">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L802 "View in source") [&#x24C9;][1]

Toggles collapsed state.

* * *

<!-- /div -->

<!-- div -->

### <a id="toggleSelect"></a>`toggleSelect`
<a href="#toggleSelect">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L812 "View in source") [&#x24C9;][1]

Toggles collapsed state.

* * *

<!-- /div -->

<!-- div -->

### <a id="visible"></a>`visible(node)`
<a href="#visible">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L824 "View in source") [&#x24C9;][1]

Checks whether a node is visible to a user. Returns false
if it's hidden, or if any ancestor is hidden or collapsed.

#### Arguments
1. `node` *(object)*: Node object.

* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“TreeNodes” Methods`

<!-- div -->

### <a id="TreeNodes"></a>`TreeNodes(array)`
<a href="#TreeNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L853 "View in source") [&#x24C9;][1]

An Array-like collection of TreeNodes.

#### Arguments
1. `array` *(array)*: Array of TreeNode objects.

* * *

<!-- /div -->

<!-- div -->

### <a id="clone"></a>`clone`
<a href="#clone">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L871 "View in source") [&#x24C9;][1]

Clones (deep) the array of nodes.

* * *

<!-- /div -->

<!-- div -->

### <a id="concat"></a>`concat(nodes)`
<a href="#concat">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L923 "View in source") [&#x24C9;][1]

Concat nodes like an Array would.

#### Arguments
1. `nodes` *(TreeNodes)*: Array of nodes.

* * *

<!-- /div -->

<!-- div -->

### <a id="copy"></a>`copy(hierarchy)`
<a href="#copy">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L888 "View in source") [&#x24C9;][1]

Copies nodes to a new tree instance.

#### Arguments
1. `hierarchy` *(boolean)*: Include necessary ancestors to match hierarchy.

* * *

<!-- /div -->

<!-- div -->

### <a id="export"></a>`export`
<a href="#export">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L943 "View in source") [&#x24C9;][1]

Clones an array of node objects and removes any
itree instance information/state.

* * *

<!-- /div -->

<!-- div -->

### <a id="flatten"></a>`flatten(flag)`
<a href="#flatten">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L962 "View in source") [&#x24C9;][1]

Flattens a hierarchy, returning only node(s) with the
expected state, for operations which must exclude parents.

#### Arguments
1. `flag` *(string)*: Which state flag to filter by.

* * *

<!-- /div -->

<!-- div -->

### <a id="getAvailableNodes"></a>`getAvailableNodes`
<a href="#getAvailableNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L990 "View in source") [&#x24C9;][1]

Returns a new TreeNodes array of available nodes.
<br>
<br>
See README.md for terminology.

* * *

<!-- /div -->

<!-- div -->

### <a id="getDeepestAvailableNodes"></a>`getDeepestAvailableNodes`
<a href="#getDeepestAvailableNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1005 "View in source") [&#x24C9;][1]

Returns a new TreeNodes array of all available nodes
at the deepest level (having no children).
<br>
<br>
See README.md for terminology.

* * *

<!-- /div -->

<!-- div -->

### <a id="recurseDown"></a>`recurseDown(iteratee)`
<a href="#recurseDown">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1018 "View in source") [&#x24C9;][1]

Iterate down all nodes and any children.

#### Arguments
1. `iteratee` *(function)*: Iteratee function.

* * *

<!-- /div -->

<!-- div -->

### <a id="reduce"></a>`reduce(predicate)`
<a href="#reduce">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1029 "View in source") [&#x24C9;][1]

Get a subset of nodes based on how they match the predicate function.

#### Arguments
1. `predicate` *(function)*: Predicate function.

* * *

<!-- /div -->

<!-- div -->

### <a id="reduceDeep"></a>`reduceDeep(predicate)`
<a href="#reduceDeep">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1048 "View in source") [&#x24C9;][1]

Get a subset of all descendant nodes based on how they match the predicate function.

#### Arguments
1. `predicate` *(function)*: Predicate function.

* * *

<!-- /div -->

<!-- div -->

### <a id="sort"></a>`sort(sorter)`
<a href="#sort">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1071 "View in source") [&#x24C9;][1]

Sorts all TreeNode objects in this collection.
<br>
<br>
If no custom sorter given, the configured "sort" value will be used.

#### Arguments
1. `sorter` *(string|function)*: Sort function or property name.

* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `Methods`

<!-- div -->

### <a id="TreeNode"></a>`TreeNode(source)`
<a href="#TreeNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L73 "View in source") [&#x24C9;][1]

Represents a singe node object within the tree.

#### Arguments
1. `source` *(TreeNode)*: TreeNode to copy.

* * *

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #copynode "Jump back to the TOC."
