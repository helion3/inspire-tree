# 

<!-- div class="toc-container" -->

<!-- div -->

## `CopyNode`
* <a href="#to">`to`</a>
* <a href="#to">`to`</a>

<!-- /div -->

<!-- div -->

## `Data`
* <a href="#addChildNode">`addChildNode`</a>
* <a href="#addNode">`addNode`</a>
* <a href="#addNodes">`addNodes`</a>
* <a href="#clearSearch">`clearSearch`</a>
* <a href="#copyHierarchy">`copyHierarchy`</a>
* <a href="#copyNode">`copyNode`</a>
* <a href="#copyNodes">`copyNodes`</a>
* <a href="#deselectAll">`deselectAll`</a>
* <a href="#deselectNode">`deselectNode`</a>
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
* <a href="#getTextualHierarchy">`getTextualHierarchy`</a>
* <a href="#load">`load`</a>
* <a href="#loadChildren">`loadChildren`</a>
* <a href="#recurseDown">`recurseDown`</a>
* <a href="#recurseUp">`recurseUp`</a>
* <a href="#removeAll">`removeAll`</a>
* <a href="#removeNode">`removeNode`</a>
* <a href="#search">`search`</a>
* <a href="#selectFirstVisibleNode">`selectFirstVisibleNode`</a>
* <a href="#selectNode">`selectNode`</a>
* <a href="#setNodeProperty">`setNodeProperty`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `“CopyNode” Methods`

<!-- div -->

### <a id="to"></a>`to(dest)`
<a href="#to">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L278 "View in source") [&#x24C9;][1]

Sets a destination.

#### Arguments
1. `dest` *(object)*: Destination Inspire Tree.

* * *

<!-- /div -->

<!-- div -->

### <a id="to"></a>`to(dest)`
<a href="#to">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L278 "View in source") [&#x24C9;][1]

Sets a destination.

#### Arguments
1. `dest` *(object)*: Destination Inspire Tree.

* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Data” Methods`

<!-- div -->

### <a id="addChildNode"></a>`addChildNode(parent, child)`
<a href="#addChildNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L151 "View in source") [&#x24C9;][1]

Add new node as a child of another.

#### Arguments
1. `parent` *(object)*: Node object.
2. `child` *(object)*: Node object.

* * *

<!-- /div -->

<!-- div -->

### <a id="addNode"></a>`addNode(node)`
<a href="#addNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L173 "View in source") [&#x24C9;][1]

Add a node.

#### Arguments
1. `node` *(object)*: Node object.

* * *

<!-- /div -->

<!-- div -->

### <a id="addNodes"></a>`addNodes(nodes)`
<a href="#addNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L194 "View in source") [&#x24C9;][1]

Add nodes.

#### Arguments
1. `nodes` *(array)*: Array of node objects.

* * *

<!-- /div -->

<!-- div -->

### <a id="clearSearch"></a>`clearSearch`
<a href="#clearSearch">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L212 "View in source") [&#x24C9;][1]

Shows all nodes and collapses parents.

* * *

<!-- /div -->

<!-- div -->

### <a id="copyHierarchy"></a>`copyHierarchy(node, excludeNode)`
<a href="#copyHierarchy">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L224 "View in source") [&#x24C9;][1]

Copies all parents of a node.

#### Arguments
1. `node` *(object)*: Object node.
2. `excludeNode` *(boolean)*: Exclude given node from hierarchy.

* * *

<!-- /div -->

<!-- div -->

### <a id="copyNode"></a>`copyNode(node, hierarchy)`
<a href="#copyNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L264 "View in source") [&#x24C9;][1]

Copies nodes to a new tree instance.

#### Arguments
1. `node` *(array)*: Node object
2. `hierarchy` *(boolean)*: Include necessary ancestors to match hierarchy.

* * *

<!-- /div -->

<!-- div -->

### <a id="copyNodes"></a>`copyNodes(nodes, hierarchy)`
<a href="#copyNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L296 "View in source") [&#x24C9;][1]

Copies nodes to a new tree instance.

#### Arguments
1. `nodes` *(array)*: Array of node objects.
2. `hierarchy` *(boolean)*: Include necessary ancestors to match hierarchy.

* * *

<!-- /div -->

<!-- div -->

### <a id="deselectAll"></a>`deselectAll`
<a href="#deselectAll">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L324 "View in source") [&#x24C9;][1]

Deselect all nodes.

* * *

<!-- /div -->

<!-- div -->

### <a id="deselectNode"></a>`deselectNode(node)`
<a href="#deselectNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L337 "View in source") [&#x24C9;][1]

Deselect a node.

#### Arguments
1. `node` *(object)*: Node object.

* * *

<!-- /div -->

<!-- div -->

### <a id="exportNode"></a>`exportNode(node)`
<a href="#exportNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L358 "View in source") [&#x24C9;][1]

Clones a node object and removes any
itree instance information/state.

#### Arguments
1. `node` *(array)*: Node object

* * *

<!-- /div -->

<!-- div -->

### <a id="exportNodes"></a>`exportNodes(nodes)`
<a href="#exportNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L377 "View in source") [&#x24C9;][1]

Clones an array of node objects and removes any
itree instance information/state.

#### Arguments
1. `nodes` *(array)*: Array of node objects.

* * *

<!-- /div -->

<!-- div -->

### <a id="flattenNodes"></a>`flattenNodes(nodes, flag)`
<a href="#flattenNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L397 "View in source") [&#x24C9;][1]

Flattens a hierarchy, returning only node(s) with the
expected state, for operations which must exclude parents.

#### Arguments
1. `nodes` *(array)*: Array of node objects.
2. `flag` *(string)*: Which state flag to filter by.

* * *

<!-- /div -->

<!-- div -->

### <a id="getNode"></a>`getNode(ref)`
<a href="#getNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L433 "View in source") [&#x24C9;][1]

Get a node.

#### Aliases
*getNodeById*

#### Arguments
1. `ref` *(string|number)*: ID of node.

* * *

<!-- /div -->

<!-- div -->

### <a id="getNodeById"></a>`getNodeById(id, nodes)`
<a href="#getNodeById">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L445 "View in source") [&#x24C9;][1]

Get a node by it's unique id.

#### Arguments
1. `id` *(string)*: Unique ID.
2. `nodes` *(array)*: Base collection to search in.

* * *

<!-- /div -->

<!-- div -->

### <a id="getNodes"></a>`getNodes`
<a href="#getNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L421 "View in source") [&#x24C9;][1]

Get all nodes in a tree.

* * *

<!-- /div -->

<!-- div -->

### <a id="getNodes"></a>`getNodes`
<a href="#getNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L421 "View in source") [&#x24C9;][1]

Get all nodes in a tree.

* * *

<!-- /div -->

<!-- div -->

### <a id="getParentNodes"></a>`getParentNodes(node)`
<a href="#getParentNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L486 "View in source") [&#x24C9;][1]

Returns parent nodes for a node. Excludes any siblings.

#### Arguments
1. `node` *(object)*: Node object.

* * *

<!-- /div -->

<!-- div -->

### <a id="getSelectedNodes"></a>`getSelectedNodes(nodes)`
<a href="#getSelectedNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L504 "View in source") [&#x24C9;][1]

Returns a flat array of selected nodes.

#### Arguments
1. `nodes` *(array)*: Array of node objects to search within.

* * *

<!-- /div -->

<!-- div -->

### <a id="getTextualHierarchy"></a>`getTextualHierarchy(node)`
<a href="#getTextualHierarchy">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L516 "View in source") [&#x24C9;][1]

Get a textual hierarchy for a given node. An array
of text from this node's root ancestor to the given node.

#### Arguments
1. `node` *(object)*: Node object.

* * *

<!-- /div -->

<!-- div -->

### <a id="load"></a>`load(loader)`
<a href="#load">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L539 "View in source") [&#x24C9;][1]

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
<a href="#loadChildren">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L601 "View in source") [&#x24C9;][1]

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

### <a id="recurseDown"></a>`recurseDown(collection, iteratee)`
<a href="#recurseDown">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L631 "View in source") [&#x24C9;][1]

Iterate down node/children recursively.

#### Arguments
1. `collection` *(array|object)*: Array of nodes or node object.
2. `iteratee` *(function)*: Iteratee function.

* * *

<!-- /div -->

<!-- div -->

### <a id="recurseUp"></a>`recurseUp(node, iteratee)`
<a href="#recurseUp">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L659 "View in source") [&#x24C9;][1]

Iterate up a node and its parents.

#### Arguments
1. `node` *(object)*: Object node.
2. `iteratee` *(function)*: Iteratee function.

* * *

<!-- /div -->

<!-- div -->

### <a id="removeAll"></a>`removeAll`
<a href="#removeAll">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L675 "View in source") [&#x24C9;][1]

Removes all nodes.

* * *

<!-- /div -->

<!-- div -->

### <a id="removeNode"></a>`removeNode(node)`
<a href="#removeNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L687 "View in source") [&#x24C9;][1]

Remove a node from the tree.

#### Arguments
1. `node` *(object)*: Node object.

* * *

<!-- /div -->

<!-- div -->

### <a id="search"></a>`search(query)`
<a href="#search">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L703 "View in source") [&#x24C9;][1]

Search nodes, showing only those that match and the necessary hierarchy.

#### Arguments
1. `query` *(&#42;)*: Search string, RegExp, or function.

* * *

<!-- /div -->

<!-- div -->

### <a id="selectFirstVisibleNode"></a>`selectFirstVisibleNode`
<a href="#selectFirstVisibleNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L781 "View in source") [&#x24C9;][1]

Select the first visible node at the root level.

* * *

<!-- /div -->

<!-- div -->

### <a id="selectNode"></a>`selectNode(node)`
<a href="#selectNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L803 "View in source") [&#x24C9;][1]

Select a node. If already selected, no change made.

#### Arguments
1. `node` *(object)*: Node object.

* * *

<!-- /div -->

<!-- div -->

### <a id="setNodeProperty"></a>`setNodeProperty(node, property, value)`
<a href="#setNodeProperty">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/data.js#L830 "View in source") [&#x24C9;][1]

Set a new value for the given property.

#### Arguments
1. `node` *(object)*: Node object.
2. `property` *(string)*: Property name.
3. `value` *(&#42;)*: New value.

* * *

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #copynode "Jump back to the TOC."
