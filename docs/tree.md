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
* <a href="#collapseAll">`collapseAll`</a>
* <a href="#deselectAll">`deselectAll`</a>
* <a href="#getNode">`getNode`</a>
* <a href="#getNodes">`getNodes`</a>
* <a href="#getSelectedNodes">`getSelectedNodes`</a>
* <a href="#hideAll">`hideAll`</a>
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
* <a href="#recurseUp">`recurseUp`</a>
* <a href="#remove">`remove`</a>
* <a href="#select">`select`</a>
* <a href="#selected">`selected`</a>
* <a href="#set">`set`</a>
* <a href="#show">`show`</a>
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
* <a href="#hide">`hide`</a>

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
<a href="#to">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L132 "View in source") [&#x24C9;][1]

Sets a destination.

#### Arguments
1. `dest` *(object)*: Destination Inspire Tree.

* * *

<!-- /div -->

<!-- div -->

### <a id="to"></a>`to(dest)`
<a href="#to">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L766 "View in source") [&#x24C9;][1]

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
<a href="#addNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L987 "View in source") [&#x24C9;][1]

Add a node.

#### Arguments
1. `node` *(object)*: Node object.

* * *

<!-- /div -->

<!-- div -->

### <a id="addNodes"></a>`addNodes(nodes)`
<a href="#addNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1008 "View in source") [&#x24C9;][1]

Add nodes.

#### Arguments
1. `nodes` *(array)*: Array of node objects.

* * *

<!-- /div -->

<!-- div -->

### <a id="clearSearch"></a>`clearSearch`
<a href="#clearSearch">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1027 "View in source") [&#x24C9;][1]

Shows all nodes and collapses parents.

* * *

<!-- /div -->

<!-- div -->

### <a id="collapseAll"></a>`collapseAll`
<a href="#collapseAll">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1038 "View in source") [&#x24C9;][1]

Collapses all nodes.

* * *

<!-- /div -->

<!-- div -->

### <a id="deselectAll"></a>`deselectAll`
<a href="#deselectAll">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1050 "View in source") [&#x24C9;][1]

Deselect all nodes.

* * *

<!-- /div -->

<!-- div -->

### <a id="getNode"></a>`getNode(id, nodes)`
<a href="#getNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1066 "View in source") [&#x24C9;][1]

Get a node.

#### Arguments
1. `id` *(string|number)*: ID of node.
2. `nodes` *(TreeNodes)*: Base collection to search in.

* * *

<!-- /div -->

<!-- div -->

### <a id="getNodes"></a>`getNodes`
<a href="#getNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1096 "View in source") [&#x24C9;][1]

Get all nodes in a tree.

* * *

<!-- /div -->

<!-- div -->

### <a id="getSelectedNodes"></a>`getSelectedNodes(nodes)`
<a href="#getSelectedNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1107 "View in source") [&#x24C9;][1]

Returns a flat array of selected nodes.

#### Arguments
1. `nodes` *(TreeNodes)*: Array of node objects to search within.

* * *

<!-- /div -->

<!-- div -->

### <a id="hideAll"></a>`hideAll`
<a href="#hideAll">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1117 "View in source") [&#x24C9;][1]

Hides all nodes.

* * *

<!-- /div -->

<!-- div -->

### <a id="load"></a>`load(loader)`
<a href="#load">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1131 "View in source") [&#x24C9;][1]

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
<a href="#recurseDown">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1186 "View in source") [&#x24C9;][1]

Iterate down node/children recursively.

#### Arguments
1. `collection` *(TreeNodes|TreeNode)*: Array of nodes or node object.
2. `iteratee` *(function)*: Iteratee function.

* * *

<!-- /div -->

<!-- div -->

### <a id="removeAll"></a>`removeAll`
<a href="#removeAll">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1216 "View in source") [&#x24C9;][1]

Removes all nodes.

* * *

<!-- /div -->

<!-- div -->

### <a id="search"></a>`search(query)`
<a href="#search">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1228 "View in source") [&#x24C9;][1]

Search nodes, showing only those that match and the necessary hierarchy.

#### Arguments
1. `query` *(&#42;)*: Search string, RegExp, or function.

* * *

<!-- /div -->

<!-- div -->

### <a id="selectFirstVisibleNode"></a>`selectFirstVisibleNode`
<a href="#selectFirstVisibleNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1305 "View in source") [&#x24C9;][1]

Select the first visible node at the root level.

* * *

<!-- /div -->

<!-- div -->

### <a id="showAll"></a>`showAll`
<a href="#showAll">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1326 "View in source") [&#x24C9;][1]

Shows all nodes.

* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“TreeNode” Methods`

<!-- div -->

### <a id="addChild"></a>`addChild(child)`
<a href="#addChild">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L78 "View in source") [&#x24C9;][1]

Add a child to this node.

#### Arguments
1. `child` *(object)*: Node object.

* * *

<!-- /div -->

<!-- div -->

### <a id="clone"></a>`clone`
<a href="#clone">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L99 "View in source") [&#x24C9;][1]

Clones this node.

* * *

<!-- /div -->

<!-- div -->

### <a id="collapse"></a>`collapse`
<a href="#collapse">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L189 "View in source") [&#x24C9;][1]

Collapse this node.

* * *

<!-- /div -->

<!-- div -->

### <a id="collapsed"></a>`collapsed`
<a href="#collapsed">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L209 "View in source") [&#x24C9;][1]

Get if node collapsed.

* * *

<!-- /div -->

<!-- div -->

### <a id="copy"></a>`copy(hierarchy)`
<a href="#copy">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L116 "View in source") [&#x24C9;][1]

Copies node to a new tree instance.

#### Arguments
1. `hierarchy` *(boolean)*: Include necessary ancestors to match hierarchy.

* * *

<!-- /div -->

<!-- div -->

### <a id="copyHierarchy"></a>`copyHierarchy(excludeNode)`
<a href="#copyHierarchy">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L149 "View in source") [&#x24C9;][1]

Copies all parents of a node.

#### Arguments
1. `excludeNode` *(boolean)*: Exclude given node from hierarchy.

* * *

<!-- /div -->

<!-- div -->

### <a id="deselect"></a>`deselect`
<a href="#deselect">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L219 "View in source") [&#x24C9;][1]

Deselect this node.

* * *

<!-- /div -->

<!-- div -->

### <a id="expand"></a>`expand`
<a href="#expand">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L240 "View in source") [&#x24C9;][1]

Expand this node.

* * *

<!-- /div -->

<!-- div -->

### <a id="expandParents"></a>`expandParents`
<a href="#expandParents">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L278 "View in source") [&#x24C9;][1]

Expand parent nodes.

* * *

<!-- /div -->

<!-- div -->

### <a id="expanded"></a>`expanded`
<a href="#expanded">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L268 "View in source") [&#x24C9;][1]

Get if node expanded.

* * *

<!-- /div -->

<!-- div -->

### <a id="export"></a>`export`
<a href="#export">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L293 "View in source") [&#x24C9;][1]

Clones a node object and removes any
itree instance information/state.

* * *

<!-- /div -->

<!-- div -->

### <a id="getParent"></a>`getParent`
<a href="#getParent">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L310 "View in source") [&#x24C9;][1]

Get the immediate parent, if any.

* * *

<!-- /div -->

<!-- div -->

### <a id="getParents"></a>`getParents`
<a href="#getParents">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L320 "View in source") [&#x24C9;][1]

Returns parent nodes. Excludes any siblings.

* * *

<!-- /div -->

<!-- div -->

### <a id="getTextualHierarchy"></a>`getTextualHierarchy`
<a href="#getTextualHierarchy">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L339 "View in source") [&#x24C9;][1]

Get a textual hierarchy for a given node. An array
of text from this node's root ancestor to the given node.

* * *

<!-- /div -->

<!-- div -->

### <a id="hasChildren"></a>`hasChildren`
<a href="#hasChildren">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L360 "View in source") [&#x24C9;][1]

If node has any children.

* * *

<!-- /div -->

<!-- div -->

### <a id="hasParent"></a>`hasParent`
<a href="#hasParent">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L370 "View in source") [&#x24C9;][1]

If node has a parent.

* * *

<!-- /div -->

<!-- div -->

### <a id="hasVisibleChildren"></a>`hasVisibleChildren`
<a href="#hasVisibleChildren">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L380 "View in source") [&#x24C9;][1]

If node has any visible children.

* * *

<!-- /div -->

<!-- div -->

### <a id="hidden"></a>`hidden`
<a href="#hidden">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L405 "View in source") [&#x24C9;][1]

Get if node hidden.

* * *

<!-- /div -->

<!-- div -->

### <a id="hide"></a>`hide`
<a href="#hide">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L415 "View in source") [&#x24C9;][1]

Hide this node.

* * *

<!-- /div -->

<!-- div -->

### <a id="loadChildren"></a>`loadChildren`
<a href="#loadChildren">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L449 "View in source") [&#x24C9;][1]

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
<a href="#markDirty">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L479 "View in source") [&#x24C9;][1]

Mark a node as dirty, rebuilding this node in the virtual DOM
and rerendering to the live DOM, next time renderNodes is called.

* * *

<!-- /div -->

<!-- div -->

### <a id="nextVisibleChildNode"></a>`nextVisibleChildNode`
<a href="#nextVisibleChildNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L491 "View in source") [&#x24C9;][1]

Find next visible child node.

* * *

<!-- /div -->

<!-- div -->

### <a id="nextVisibleNode"></a>`nextVisibleNode`
<a href="#nextVisibleNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L510 "View in source") [&#x24C9;][1]

Get the next visible node.

* * *

<!-- /div -->

<!-- div -->

### <a id="nextVisibleSiblingNode"></a>`nextVisibleSiblingNode`
<a href="#nextVisibleSiblingNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L536 "View in source") [&#x24C9;][1]

Find the next visible sibling node.

* * *

<!-- /div -->

<!-- div -->

### <a id="previousVisibleNode"></a>`previousVisibleNode`
<a href="#previousVisibleNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L552 "View in source") [&#x24C9;][1]

Find the previous visible node.

* * *

<!-- /div -->

<!-- div -->

### <a id="previousVisibleSiblingNode"></a>`previousVisibleSiblingNode`
<a href="#previousVisibleSiblingNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L580 "View in source") [&#x24C9;][1]

Find the previous visible sibling node.

* * *

<!-- /div -->

<!-- div -->

### <a id="recurseUp"></a>`recurseUp(iteratee)`
<a href="#recurseUp">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L596 "View in source") [&#x24C9;][1]

Iterate up a node and its parents.

#### Arguments
1. `iteratee` *(function)*: Iteratee function.

* * *

<!-- /div -->

<!-- div -->

### <a id="remove"></a>`remove`
<a href="#remove">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L613 "View in source") [&#x24C9;][1]

Remove a node from the tree.

* * *

<!-- /div -->

<!-- div -->

### <a id="select"></a>`select`
<a href="#select">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L629 "View in source") [&#x24C9;][1]

Select this node.

* * *

<!-- /div -->

<!-- div -->

### <a id="selected"></a>`selected`
<a href="#selected">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L655 "View in source") [&#x24C9;][1]

Get if node selected.

* * *

<!-- /div -->

<!-- div -->

### <a id="set"></a>`set(property, value)`
<a href="#set">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L667 "View in source") [&#x24C9;][1]

Select this node.

#### Arguments
1. `property` *(string|number)*: Property name.
2. `value` *(&#42;)*: New value.

* * *

<!-- /div -->

<!-- div -->

### <a id="show"></a>`show`
<a href="#show">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L680 "View in source") [&#x24C9;][1]

Show this node.

* * *

<!-- /div -->

<!-- div -->

### <a id="visible"></a>`visible(node)`
<a href="#visible">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L702 "View in source") [&#x24C9;][1]

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

### <a id="TreeNodes"></a>`TreeNodes()`
<a href="#TreeNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L727 "View in source") [&#x24C9;][1]

An Array-like collection of TreeNodes.

* * *

<!-- /div -->

<!-- div -->

### <a id="clone"></a>`clone`
<a href="#clone">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L737 "View in source") [&#x24C9;][1]

Clones (deep) the array of nodes.

* * *

<!-- /div -->

<!-- div -->

### <a id="concat"></a>`concat(nodes)`
<a href="#concat">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L789 "View in source") [&#x24C9;][1]

Concat nodes like an Array would.

#### Arguments
1. `nodes` *(TreeNodes)*: Array of nodes.

* * *

<!-- /div -->

<!-- div -->

### <a id="copy"></a>`copy(hierarchy)`
<a href="#copy">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L754 "View in source") [&#x24C9;][1]

Copies nodes to a new tree instance.

#### Arguments
1. `hierarchy` *(boolean)*: Include necessary ancestors to match hierarchy.

* * *

<!-- /div -->

<!-- div -->

### <a id="export"></a>`export`
<a href="#export">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L809 "View in source") [&#x24C9;][1]

Clones an array of node objects and removes any
itree instance information/state.

* * *

<!-- /div -->

<!-- div -->

### <a id="flatten"></a>`flatten(flag)`
<a href="#flatten">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L828 "View in source") [&#x24C9;][1]

Flattens a hierarchy, returning only node(s) with the
expected state, for operations which must exclude parents.

#### Arguments
1. `flag` *(string)*: Which state flag to filter by.

* * *

<!-- /div -->

<!-- div -->

### <a id="hide"></a>`hide`
<a href="#hide">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L853 "View in source") [&#x24C9;][1]

Hide all nodes in an array.

* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `Methods`

<!-- div -->

### <a id="TreeNode"></a>`TreeNode(source)`
<a href="#TreeNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L53 "View in source") [&#x24C9;][1]

Represents a singe node object within the tree.

#### Arguments
1. `source` *(TreeNode)*: TreeNode to copy.

* * *

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #copynode "Jump back to the TOC."
