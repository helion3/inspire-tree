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
* <a href="#load">`load`</a>
* <a href="#node">`node`</a>
* <a href="#nodes">`nodes`</a>
* <a href="#recurseDown">`recurseDown`</a>
* <a href="#reload">`reload`</a>
* <a href="#removeAll">`removeAll`</a>
* <a href="#search">`search`</a>
* <a href="#selectFirstVisibleNode">`selectFirstVisibleNode`</a>

<!-- /div -->

<!-- div -->

## `TreeNode`
* <a href="#addChild">`addChild`</a>
* <a href="#available">`available`</a>
* <a href="#blur">`blur`</a>
* <a href="#clean">`clean`</a>
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
* <a href="#getChildren">`getChildren`</a>
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
* <a href="#refreshIndeterminateState">`refreshIndeterminateState`</a>
* <a href="#remove">`remove`</a>
* <a href="#removed">`removed`</a>
* <a href="#restore">`restore`</a>
* <a href="#select">`select`</a>
* <a href="#selectable">`selectable`</a>
* <a href="#selected">`selected`</a>
* <a href="#set">`set`</a>
* <a href="#show">`show`</a>
* <a href="#softRemove">`softRemove`</a>
* <a href="#toObject">`toObject`</a>
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
* <a href="#filter">`filter`</a>
* <a href="#flatten">`flatten`</a>
* <a href="#recurseDown">`recurseDown`</a>
* <a href="#reduce">`reduce`</a>
* <a href="#reduceDeep">`reduceDeep`</a>
* <a href="#sort">`sort`</a>
* <a href="#toArray">`toArray`</a>

<!-- /div -->

<!-- div -->

## `Methods`
* <a href="#TreeNode">`TreeNode`</a>

<!-- /div -->

<!-- div -->

## `Properties`
* <a href="#deepest">`deepest`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `“CopyNode” Methods`

<!-- div -->

### <a id="to"></a>`to(dest)`
<a href="#to">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L240 "View in source") [&#x24C9;][1]

Sets a destination.

#### Arguments
1. `dest` *(object)*: Destination Inspire Tree.

* * *

<!-- /div -->

<!-- div -->

### <a id="to"></a>`to(dest)`
<a href="#to">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1101 "View in source") [&#x24C9;][1]

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
<a href="#addNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1574 "View in source") [&#x24C9;][1]

Add a node.

#### Arguments
1. `node` *(object)*: Node object.

* * *

<!-- /div -->

<!-- div -->

### <a id="addNodes"></a>`addNodes(nodes)`
<a href="#addNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1595 "View in source") [&#x24C9;][1]

Add nodes.

#### Arguments
1. `nodes` *(array)*: Array of node objects.

* * *

<!-- /div -->

<!-- div -->

### <a id="clearSearch"></a>`clearSearch`
<a href="#clearSearch">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1614 "View in source") [&#x24C9;][1]

Shows all nodes and collapses parents.

* * *

<!-- /div -->

<!-- div -->

### <a id="load"></a>`load(loader)`
<a href="#load">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1691 "View in source") [&#x24C9;][1]

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

### <a id="node"></a>`node(id, nodes)`
<a href="#node">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1627 "View in source") [&#x24C9;][1]

Get a node.

#### Arguments
1. `id` *(string|number)*: ID of node.
2. `nodes` *(TreeNodes)*: Base collection to search in.

* * *

<!-- /div -->

<!-- div -->

### <a id="nodes"></a>`nodes(refs)`
<a href="#nodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1662 "View in source") [&#x24C9;][1]

Get all nodes in a tree, or nodes for an array of IDs.

#### Arguments
1. `refs` *(array)*: Array of ID references.

#### Example
```js
var all = tree.nodes()
var some = tree.nodes([1, 2, 3])
```
* * *

<!-- /div -->

<!-- div -->

### <a id="recurseDown"></a>`recurseDown(collection, iteratee)`
<a href="#recurseDown">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1760 "View in source") [&#x24C9;][1]

Iterate down node/children recursively.

#### Arguments
1. `collection` *(TreeNodes|TreeNode)*: Array of nodes or node object.
2. `iteratee` *(function)*: Iteratee function.

* * *

<!-- /div -->

<!-- div -->

### <a id="reload"></a>`reload`
<a href="#reload">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1794 "View in source") [&#x24C9;][1]

Reloads/re-executes the original data loader.

* * *

<!-- /div -->

<!-- div -->

### <a id="removeAll"></a>`removeAll`
<a href="#removeAll">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1804 "View in source") [&#x24C9;][1]

Removes all nodes.

* * *

<!-- /div -->

<!-- div -->

### <a id="search"></a>`search(query)`
<a href="#search">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1816 "View in source") [&#x24C9;][1]

Search nodes, showing only those that match and the necessary hierarchy.

#### Arguments
1. `query` *(&#42;)*: Search string, RegExp, or function.

* * *

<!-- /div -->

<!-- div -->

### <a id="selectFirstVisibleNode"></a>`selectFirstVisibleNode`
<a href="#selectFirstVisibleNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1891 "View in source") [&#x24C9;][1]

Select the first visible node at the root level.

* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“TreeNode” Methods`

<!-- div -->

### <a id="addChild"></a>`addChild(child)`
<a href="#addChild">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L125 "View in source") [&#x24C9;][1]

Add a child to this node.

#### Arguments
1. `child` *(object)*: Node object.

* * *

<!-- /div -->

<!-- div -->

### <a id="available"></a>`available`
<a href="#available">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L148 "View in source") [&#x24C9;][1]

Get if node available.

* * *

<!-- /div -->

<!-- div -->

### <a id="blur"></a>`blur`
<a href="#blur">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L158 "View in source") [&#x24C9;][1]

Blur focus from this node.

* * *

<!-- /div -->

<!-- div -->

### <a id="clean"></a>`clean`
<a href="#clean">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L168 "View in source") [&#x24C9;][1]

Hides parents without any visible children.

* * *

<!-- /div -->

<!-- div -->

### <a id="clone"></a>`clone`
<a href="#clone">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L187 "View in source") [&#x24C9;][1]

Clones this node.

* * *

<!-- /div -->

<!-- div -->

### <a id="collapse"></a>`collapse`
<a href="#collapse">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L203 "View in source") [&#x24C9;][1]

Collapse this node.

* * *

<!-- /div -->

<!-- div -->

### <a id="collapsed"></a>`collapsed`
<a href="#collapsed">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L213 "View in source") [&#x24C9;][1]

Get if node collapsed.

* * *

<!-- /div -->

<!-- div -->

### <a id="copy"></a>`copy(hierarchy)`
<a href="#copy">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L224 "View in source") [&#x24C9;][1]

Copies node to a new tree instance.

#### Arguments
1. `hierarchy` *(boolean)*: Include necessary ancestors to match hierarchy.

* * *

<!-- /div -->

<!-- div -->

### <a id="copyHierarchy"></a>`copyHierarchy(excludeNode)`
<a href="#copyHierarchy">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L257 "View in source") [&#x24C9;][1]

Copies all parents of a node.

#### Arguments
1. `excludeNode` *(boolean)*: Exclude given node from hierarchy.

* * *

<!-- /div -->

<!-- div -->

### <a id="deselect"></a>`deselect(skipParentIndeterminate)`
<a href="#deselect">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L301 "View in source") [&#x24C9;][1]

Deselect this node.
<br>
<br>
If requireSelection is true and this is the last selected
node, the node will remain in a selected state.

#### Arguments
1. `skipParentIndeterminate` *(boolean)*: Skip refreshing parent indeterminate states.

* * *

<!-- /div -->

<!-- div -->

### <a id="expand"></a>`expand`
<a href="#expand">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L335 "View in source") [&#x24C9;][1]

Expand this node.

* * *

<!-- /div -->

<!-- div -->

### <a id="expandParents"></a>`expandParents`
<a href="#expandParents">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L363 "View in source") [&#x24C9;][1]

Expand parent nodes.

* * *

<!-- /div -->

<!-- div -->

### <a id="expanded"></a>`expanded`
<a href="#expanded">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L379 "View in source") [&#x24C9;][1]

Get if node expanded.

* * *

<!-- /div -->

<!-- div -->

### <a id="export"></a>`export`
<a href="#export">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L390 "View in source") [&#x24C9;][1]

Clones a node, removes itree property, and returns it
as a native object.

* * *

<!-- /div -->

<!-- div -->

### <a id="focus"></a>`focus`
<a href="#focus">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L407 "View in source") [&#x24C9;][1]

Focus a node without changing its selection.

* * *

<!-- /div -->

<!-- div -->

### <a id="focused"></a>`focused`
<a href="#focused">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L433 "View in source") [&#x24C9;][1]

Get whether node has focus or not.

* * *

<!-- /div -->

<!-- div -->

### <a id="getChildren"></a>`getChildren`
<a href="#getChildren">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L444 "View in source") [&#x24C9;][1]

Get children for this node. If no children exist, an empty TreeNodes
collection is returned for safe chaining.

* * *

<!-- /div -->

<!-- div -->

### <a id="getParent"></a>`getParent`
<a href="#getParent">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L454 "View in source") [&#x24C9;][1]

Get the immediate parent, if any.

* * *

<!-- /div -->

<!-- div -->

### <a id="getParents"></a>`getParents`
<a href="#getParents">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L464 "View in source") [&#x24C9;][1]

Returns parent nodes. Excludes any siblings.

* * *

<!-- /div -->

<!-- div -->

### <a id="getTextualHierarchy"></a>`getTextualHierarchy`
<a href="#getTextualHierarchy">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L483 "View in source") [&#x24C9;][1]

Get a textual hierarchy for a given node. An array
of text from this node's root ancestor to the given node.

* * *

<!-- /div -->

<!-- div -->

### <a id="hasChildren"></a>`hasChildren`
<a href="#hasChildren">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L503 "View in source") [&#x24C9;][1]

If node has any children.

* * *

<!-- /div -->

<!-- div -->

### <a id="hasParent"></a>`hasParent`
<a href="#hasParent">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L513 "View in source") [&#x24C9;][1]

If node has a parent.

* * *

<!-- /div -->

<!-- div -->

### <a id="hasVisibleChildren"></a>`hasVisibleChildren`
<a href="#hasVisibleChildren">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L523 "View in source") [&#x24C9;][1]

If node has any visible children.

* * *

<!-- /div -->

<!-- div -->

### <a id="hidden"></a>`hidden`
<a href="#hidden">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L548 "View in source") [&#x24C9;][1]

Get if node hidden.

* * *

<!-- /div -->

<!-- div -->

### <a id="hide"></a>`hide`
<a href="#hide">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L558 "View in source") [&#x24C9;][1]

Hide this node.

* * *

<!-- /div -->

<!-- div -->

### <a id="loadChildren"></a>`loadChildren`
<a href="#loadChildren">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L583 "View in source") [&#x24C9;][1]

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

### <a id="markDirty"></a>`markDirty`
<a href="#markDirty">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L623 "View in source") [&#x24C9;][1]

Mark a node as dirty, rebuilding this node in the virtual DOM
and rerendering to the live DOM, next time applyChanges is called.

* * *

<!-- /div -->

<!-- div -->

### <a id="nextVisibleChildNode"></a>`nextVisibleChildNode`
<a href="#nextVisibleChildNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L641 "View in source") [&#x24C9;][1]

Find next visible child node.

* * *

<!-- /div -->

<!-- div -->

### <a id="nextVisibleNode"></a>`nextVisibleNode`
<a href="#nextVisibleNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L660 "View in source") [&#x24C9;][1]

Get the next visible node.

* * *

<!-- /div -->

<!-- div -->

### <a id="nextVisibleSiblingNode"></a>`nextVisibleSiblingNode`
<a href="#nextVisibleSiblingNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L686 "View in source") [&#x24C9;][1]

Find the next visible sibling node.

* * *

<!-- /div -->

<!-- div -->

### <a id="previousVisibleNode"></a>`previousVisibleNode`
<a href="#previousVisibleNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L702 "View in source") [&#x24C9;][1]

Find the previous visible node.

* * *

<!-- /div -->

<!-- div -->

### <a id="previousVisibleSiblingNode"></a>`previousVisibleSiblingNode`
<a href="#previousVisibleSiblingNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L730 "View in source") [&#x24C9;][1]

Find the previous visible sibling node.

* * *

<!-- /div -->

<!-- div -->

### <a id="recurseDown"></a>`recurseDown(iteratee)`
<a href="#recurseDown">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L767 "View in source") [&#x24C9;][1]

Iterate down node and any children.

#### Arguments
1. `iteratee` *(function)*: Iteratee function.

* * *

<!-- /div -->

<!-- div -->

### <a id="recurseUp"></a>`recurseUp(iteratee)`
<a href="#recurseUp">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L745 "View in source") [&#x24C9;][1]

Iterate up a node and its parents.

#### Arguments
1. `iteratee` *(function)*: Iteratee function.

* * *

<!-- /div -->

<!-- div -->

### <a id="refreshIndeterminateState"></a>`refreshIndeterminateState`
<a href="#refreshIndeterminateState">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L781 "View in source") [&#x24C9;][1]

Updates the indeterminate state of this node.
<br>
<br>
Only available when checkbox=true.
True if some, but not all children are selected.
False if no children are selected.

* * *

<!-- /div -->

<!-- div -->

### <a id="remove"></a>`remove`
<a href="#remove">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L831 "View in source") [&#x24C9;][1]

Remove a node from the tree.

* * *

<!-- /div -->

<!-- div -->

### <a id="removed"></a>`removed`
<a href="#removed">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L857 "View in source") [&#x24C9;][1]

Get if node soft-removed.

* * *

<!-- /div -->

<!-- div -->

### <a id="restore"></a>`restore`
<a href="#restore">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L867 "View in source") [&#x24C9;][1]

Restore state if soft-removed.

* * *

<!-- /div -->

<!-- div -->

### <a id="select"></a>`select`
<a href="#select">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L877 "View in source") [&#x24C9;][1]

Select this node.

* * *

<!-- /div -->

<!-- div -->

### <a id="selectable"></a>`selectable`
<a href="#selectable">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L925 "View in source") [&#x24C9;][1]

Get if node selectable.

* * *

<!-- /div -->

<!-- div -->

### <a id="selected"></a>`selected`
<a href="#selected">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L936 "View in source") [&#x24C9;][1]

Get if node selected.

* * *

<!-- /div -->

<!-- div -->

### <a id="set"></a>`set(property, value)`
<a href="#set">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L948 "View in source") [&#x24C9;][1]

Select this node.

#### Arguments
1. `property` *(string|number)*: Property name.
2. `value` *(&#42;)*: New value.

* * *

<!-- /div -->

<!-- div -->

### <a id="show"></a>`show`
<a href="#show">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L961 "View in source") [&#x24C9;][1]

Show this node.

* * *

<!-- /div -->

<!-- div -->

### <a id="softRemove"></a>`softRemove`
<a href="#softRemove">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L973 "View in source") [&#x24C9;][1]

Mark this node as "removed" without actually removing it.
<br>
<br>
Expand/show methods will never reveal this node until restored.

* * *

<!-- /div -->

<!-- div -->

### <a id="toObject"></a>`toObject`
<a href="#toObject">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1003 "View in source") [&#x24C9;][1]

Export this node as a native Object.

* * *

<!-- /div -->

<!-- div -->

### <a id="toggleCollapse"></a>`toggleCollapse`
<a href="#toggleCollapse">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L983 "View in source") [&#x24C9;][1]

Toggles collapsed state.

* * *

<!-- /div -->

<!-- div -->

### <a id="toggleSelect"></a>`toggleSelect`
<a href="#toggleSelect">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L993 "View in source") [&#x24C9;][1]

Toggles selected state.

* * *

<!-- /div -->

<!-- div -->

### <a id="visible"></a>`visible(node)`
<a href="#visible">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1025 "View in source") [&#x24C9;][1]

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
<a href="#TreeNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1054 "View in source") [&#x24C9;][1]

An Array-like collection of TreeNodes.

#### Arguments
1. `array` *(array)*: Array of TreeNode objects.

* * *

<!-- /div -->

<!-- div -->

### <a id="clone"></a>`clone`
<a href="#clone">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1072 "View in source") [&#x24C9;][1]

Clones (deep) the array of nodes.

* * *

<!-- /div -->

<!-- div -->

### <a id="concat"></a>`concat(nodes)`
<a href="#concat">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1124 "View in source") [&#x24C9;][1]

Concat nodes like an Array would.

#### Arguments
1. `nodes` *(TreeNodes)*: Array of nodes.

* * *

<!-- /div -->

<!-- div -->

### <a id="copy"></a>`copy(hierarchy)`
<a href="#copy">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1089 "View in source") [&#x24C9;][1]

Copies nodes to a new tree instance.

#### Arguments
1. `hierarchy` *(boolean)*: Include necessary ancestors to match hierarchy.

* * *

<!-- /div -->

<!-- div -->

### <a id="export"></a>`export`
<a href="#export">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1161 "View in source") [&#x24C9;][1]

Clones an array of node objects and removes any
itree instance information/state.

* * *

<!-- /div -->

<!-- div -->

### <a id="filter"></a>`filter(predicate)`
<a href="#filter">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1178 "View in source") [&#x24C9;][1]

Returns a new array of nodes which match a predicate.

#### Arguments
1. `predicate` *(string|function)*: State flag or custom function.

* * *

<!-- /div -->

<!-- div -->

### <a id="flatten"></a>`flatten(predicate)`
<a href="#flatten">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1197 "View in source") [&#x24C9;][1]

Flattens a hierarchy, returning only node(s) matching the
expected state or predicate function.

#### Arguments
1. `predicate` *(string|function)*: State property or custom function.

* * *

<!-- /div -->

<!-- div -->

### <a id="recurseDown"></a>`recurseDown(iteratee)`
<a href="#recurseDown">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1223 "View in source") [&#x24C9;][1]

Iterate down all nodes and any children.

#### Arguments
1. `iteratee` *(function)*: Iteratee function.

* * *

<!-- /div -->

<!-- div -->

### <a id="reduce"></a>`reduce(predicate)`
<a href="#reduce">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1234 "View in source") [&#x24C9;][1]

Get a subset of nodes based on how they match the predicate function.

#### Arguments
1. `predicate` *(function)*: Predicate function.

* * *

<!-- /div -->

<!-- div -->

### <a id="reduceDeep"></a>`reduceDeep(predicate)`
<a href="#reduceDeep">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1253 "View in source") [&#x24C9;][1]

Get a subset of all descendant nodes based on how they match the predicate function.

#### Arguments
1. `predicate` *(function)*: Predicate function.

* * *

<!-- /div -->

<!-- div -->

### <a id="sort"></a>`sort(sorter)`
<a href="#sort">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1274 "View in source") [&#x24C9;][1]

Sorts all TreeNode objects in this collection.
<br>
<br>
If no custom sorter given, the configured "sort" value will be used.

#### Arguments
1. `sorter` *(string|function)*: Sort function or property name.

* * *

<!-- /div -->

<!-- div -->

### <a id="toArray"></a>`toArray`
<a href="#toArray">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1297 "View in source") [&#x24C9;][1]

Returns a native Array of nodes.

* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `Methods`

<!-- div -->

### <a id="TreeNode"></a>`TreeNode(source)`
<a href="#TreeNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L100 "View in source") [&#x24C9;][1]

Represents a singe node object within the tree.

#### Arguments
1. `source` *(TreeNode)*: TreeNode to copy.

* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `Properties`

<!-- div -->

### <a id="deepest"></a>`deepest`
<a href="#deepest">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1142 "View in source") [&#x24C9;][1]

Returns deepest nodes from this array.

* * *

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #copynode "Jump back to the TOC."
