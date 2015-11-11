# 

<!-- div class="toc-container" -->

<!-- div -->

## `Data`
* <a href="#addChildNode">`addChildNode`</a>
* <a href="#addNode">`addNode`</a>
* <a href="#addNodes">`addNodes`</a>
* <a href="#batch">`batch`</a>
* <a href="#clearSearch">`clearSearch`</a>
* <a href="#collapseNode">`collapseNode`</a>
* <a href="#copyHierarchy">`copyHierarchy`</a>
* <a href="#copyNode">`copyNode`</a>
* <a href="#copyNodes">`copyNodes`</a>
* <a href="#deselectAll">`deselectAll`</a>
* <a href="#deselectNode">`deselectNode`</a>
* <a href="#end">`end`</a>
* <a href="#expandNode">`expandNode`</a>
* <a href="#exportNode">`exportNode`</a>
* <a href="#exportNodes">`exportNodes`</a>
* <a href="#flattenNodes">`flattenNodes`</a>
* <a href="#getNode">`getNode`</a>
* <a href="#getNodeById">`getNodeById`</a>
* <a href="#getNode" class="alias">`getNodeById` -> `getNode`</a>
* <a href="#getNodes">`getNodes`</a>
* <a href="#getNodes">`getNodes`</a>
* <a href="#getParentNodes">`getParentNodes`</a>
* <a href="#getSelectedNodes">`getSelectedNodes`</a>
* <a href="#hideAll">`hideAll`</a>
* <a href="#hideNode">`hideNode`</a>
* <a href="#hideNodes">`hideNodes`</a>
* <a href="#load">`load`</a>
* <a href="#loadChildren">`loadChildren`</a>
* <a href="#removeAll">`removeAll`</a>
* <a href="#removeNode">`removeNode`</a>
* <a href="#search">`search`</a>
* <a href="#selectNode">`selectNode`</a>
* <a href="#showAll">`showAll`</a>
* <a href="#showNode">`showNode`</a>

<!-- /div -->

<!-- div -->

## `Methods`
* <a href="#to">`to`</a>
* <a href="#to">`to`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `“Data” Methods`

<!-- div -->

### <a id="addChildNode"></a>`addChildNode(parent, child)`
<a href="#addChildNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L211 "View in source") [&#x24C9;][1]

Add new node as a child of another.

#### Arguments
1. `parent` *(object)*: Node object.
2. `child` *(object)*: Node object.

* * *

<!-- /div -->

<!-- div -->

### <a id="addNode"></a>`addNode(node)`
<a href="#addNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L232 "View in source") [&#x24C9;][1]

Add a node.

#### Arguments
1. `node` *(object)*: Node object.

* * *

<!-- /div -->

<!-- div -->

### <a id="addNodes"></a>`addNodes(nodes)`
<a href="#addNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L252 "View in source") [&#x24C9;][1]

Add nodes.

#### Arguments
1. `nodes` *(array)*: Array of node objects.

* * *

<!-- /div -->

<!-- div -->

### <a id="batch"></a>`batch`
<a href="#batch">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L270 "View in source") [&#x24C9;][1]

Disable rendering in preparation for multiple changes.

* * *

<!-- /div -->

<!-- div -->

### <a id="clearSearch"></a>`clearSearch`
<a href="#clearSearch">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L280 "View in source") [&#x24C9;][1]

Shows all nodes and collapses parents.

* * *

<!-- /div -->

<!-- div -->

### <a id="collapseNode"></a>`collapseNode(node)`
<a href="#collapseNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L291 "View in source") [&#x24C9;][1]

Expand immediate children for this node, if any.

#### Arguments
1. `node` *(object)*: Node object.

* * *

<!-- /div -->

<!-- div -->

### <a id="copyHierarchy"></a>`copyHierarchy(node, excludeNode)`
<a href="#copyHierarchy">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L311 "View in source") [&#x24C9;][1]

Copies all parents of a node.

#### Arguments
1. `node` *(object)*: Object node.
2. `excludeNode` *(boolean)*: Exclude given node from hierarchy.

* * *

<!-- /div -->

<!-- div -->

### <a id="copyNode"></a>`copyNode(node, hierarchy)`
<a href="#copyNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L351 "View in source") [&#x24C9;][1]

Copies nodes to a new tree instance.

#### Arguments
1. `node` *(array)*: Node object
2. `hierarchy` *(boolean)*: Include necessary ancestors to match hierarchy.

* * *

<!-- /div -->

<!-- div -->

### <a id="copyNodes"></a>`copyNodes(nodes, hierarchy)`
<a href="#copyNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L382 "View in source") [&#x24C9;][1]

Copies nodes to a new tree instance.

#### Arguments
1. `nodes` *(array)*: Array of node objects.
2. `hierarchy` *(boolean)*: Include necessary ancestors to match hierarchy.

* * *

<!-- /div -->

<!-- div -->

### <a id="deselectAll"></a>`deselectAll`
<a href="#deselectAll">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L409 "View in source") [&#x24C9;][1]

Deselect all nodes.

* * *

<!-- /div -->

<!-- div -->

### <a id="deselectNode"></a>`deselectNode(node)`
<a href="#deselectNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L422 "View in source") [&#x24C9;][1]

Deselect a node.

#### Arguments
1. `node` *(object)*: Node object.

* * *

<!-- /div -->

<!-- div -->

### <a id="end"></a>`end`
<a href="#end">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L440 "View in source") [&#x24C9;][1]

Permit rerendering of batched changes.

* * *

<!-- /div -->

<!-- div -->

### <a id="expandNode"></a>`expandNode(node)`
<a href="#expandNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L452 "View in source") [&#x24C9;][1]

Expand immediate children for this node, if any.

#### Arguments
1. `node` *(object)*: Node object.

* * *

<!-- /div -->

<!-- div -->

### <a id="exportNode"></a>`exportNode(node)`
<a href="#exportNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L480 "View in source") [&#x24C9;][1]

Clones a node object and removes any
itree instance information/state.

#### Arguments
1. `node` *(array)*: Node object

* * *

<!-- /div -->

<!-- div -->

### <a id="exportNodes"></a>`exportNodes(nodes)`
<a href="#exportNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L499 "View in source") [&#x24C9;][1]

Clones an array of node objects and removes any
itree instance information/state.

#### Arguments
1. `nodes` *(array)*: Array of node objects.

* * *

<!-- /div -->

<!-- div -->

### <a id="flattenNodes"></a>`flattenNodes(nodes, flag)`
<a href="#flattenNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L519 "View in source") [&#x24C9;][1]

Flattens a hierarchy, returning only node(s) with the
expected state, for operations which must exclude parents.

#### Arguments
1. `nodes` *(array)*: Array of node objects.
2. `flag` *(string)*: Which state flag to filter by.

* * *

<!-- /div -->

<!-- div -->

### <a id="getNode"></a>`getNode(ref)`
<a href="#getNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L555 "View in source") [&#x24C9;][1]

Get a node.

#### Aliases
*getNodeById*

#### Arguments
1. `ref` *(string|number)*: ID of node.

* * *

<!-- /div -->

<!-- div -->

### <a id="getNodeById"></a>`getNodeById(id, nodes)`
<a href="#getNodeById">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L567 "View in source") [&#x24C9;][1]

Get a node by it's unique id.

#### Arguments
1. `id` *(string)*: Unique ID.
2. `nodes` *(array)*: Base collection to search in.

* * *

<!-- /div -->

<!-- div -->

### <a id="getNodes"></a>`getNodes`
<a href="#getNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L543 "View in source") [&#x24C9;][1]

Get all nodes in a tree.

* * *

<!-- /div -->

<!-- div -->

### <a id="getNodes"></a>`getNodes`
<a href="#getNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L543 "View in source") [&#x24C9;][1]

Get all nodes in a tree.

* * *

<!-- /div -->

<!-- div -->

### <a id="getParentNodes"></a>`getParentNodes(node)`
<a href="#getParentNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L608 "View in source") [&#x24C9;][1]

Returns parent nodes for a node. Excludes any siblings.

#### Arguments
1. `node` *(object)*: Node object.

* * *

<!-- /div -->

<!-- div -->

### <a id="getSelectedNodes"></a>`getSelectedNodes(nodes)`
<a href="#getSelectedNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L626 "View in source") [&#x24C9;][1]

Returns a flat array of selected nodes.

#### Arguments
1. `nodes` *(array)*: Array of node objects to search within.

* * *

<!-- /div -->

<!-- div -->

### <a id="hideAll"></a>`hideAll`
<a href="#hideAll">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L674 "View in source") [&#x24C9;][1]

Hides all nodes.

* * *

<!-- /div -->

<!-- div -->

### <a id="hideNode"></a>`hideNode(node)`
<a href="#hideNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L637 "View in source") [&#x24C9;][1]

Hide a node.

#### Arguments
1. `node` *(object)*: Node object.

* * *

<!-- /div -->

<!-- div -->

### <a id="hideNodes"></a>`hideNodes(nodes)`
<a href="#hideNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L661 "View in source") [&#x24C9;][1]

Hide all nodes in an array.

#### Arguments
1. `nodes` *(array)*: Array of node objects.

* * *

<!-- /div -->

<!-- div -->

### <a id="load"></a>`load(loader)`
<a href="#load">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L688 "View in source") [&#x24C9;][1]

Loads data. Accepts an array or a promise.

#### Arguments
1. `loader` *(array|function)*: Array of nodes, or promise resolving an array of nodes.

#### Example
```js
data.load($.getJSON('nodes.json'));
```
* * *

<!-- /div -->

<!-- div -->

### <a id="loadChildren"></a>`loadChildren(node)`
<a href="#loadChildren">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L746 "View in source") [&#x24C9;][1]

Initiate a dynamic load of children for a given node.
<br>
<br>
This requires `opts.data` to be a function which accepts
three arguments: node, resolve, reject.
<br>
<br>
Use the `node` to filter results.
<br>
<br>
On load success, pass the result array to `resolve`.
On error, pass the Error to `reject`.

#### Arguments
1. `node` *(object)*: Node object.

* * *

<!-- /div -->

<!-- div -->

### <a id="removeAll"></a>`removeAll`
<a href="#removeAll">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L770 "View in source") [&#x24C9;][1]

Removes all nodes.

* * *

<!-- /div -->

<!-- div -->

### <a id="removeNode"></a>`removeNode(node)`
<a href="#removeNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L782 "View in source") [&#x24C9;][1]

Remove a node from the tree.

#### Arguments
1. `node` *(object)*: Node object.

* * *

<!-- /div -->

<!-- div -->

### <a id="search"></a>`search(query)`
<a href="#search">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L798 "View in source") [&#x24C9;][1]

Search nodes, showing only those that match and the necessary hierarchy.

#### Arguments
1. `query` *(&#42;)*: Search string, RegExp, or function.

* * *

<!-- /div -->

<!-- div -->

### <a id="selectNode"></a>`selectNode(node)`
<a href="#selectNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L870 "View in source") [&#x24C9;][1]

Select a node. If already selected, no change made.

#### Arguments
1. `node` *(object)*: Node object.

* * *

<!-- /div -->

<!-- div -->

### <a id="showAll"></a>`showAll`
<a href="#showAll">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L890 "View in source") [&#x24C9;][1]

Shows all nodes.

* * *

<!-- /div -->

<!-- div -->

### <a id="showNode"></a>`showNode(node)`
<a href="#showNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L903 "View in source") [&#x24C9;][1]

Hide a node.

#### Arguments
1. `node` *(object)*: Node object.

* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `Methods`

<!-- div -->

### <a id="to"></a>`to(dest)`
<a href="#to">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L364 "View in source") [&#x24C9;][1]

Sets a destination.

#### Arguments
1. `dest` *(object)*: Destination Inspire Tree.

* * *

<!-- /div -->

<!-- div -->

### <a id="to"></a>`to(dest)`
<a href="#to">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L364 "View in source") [&#x24C9;][1]

Sets a destination.

#### Arguments
1. `dest` *(object)*: Destination Inspire Tree.

* * *

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #data "Jump back to the TOC."
