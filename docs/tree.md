# 

<!-- div class="toc-container" -->

<!-- div -->

## `Tree`
* <a href="#addNode">`addNode`</a>
* <a href="#addNodes">`addNodes`</a>
* <a href="#available">`available`</a>
* <a href="#blur">`blur`</a>
* <a href="#blurDeep">`blurDeep`</a>
* <a href="#boundingNodes">`boundingNodes`</a>
* <a href="#canAutoDeselect">`canAutoDeselect`</a>
* <a href="#clean">`clean`</a>
* <a href="#clearSearch">`clearSearch`</a>
* <a href="#clone">`clone`</a>
* <a href="#collapse">`collapse`</a>
* <a href="#collapseDeep">`collapseDeep`</a>
* <a href="#collapsed">`collapsed`</a>
* <a href="#concat">`concat`</a>
* <a href="#copy">`copy`</a>
* <a href="#deepest">`deepest`</a>
* <a href="#deselect">`deselect`</a>
* <a href="#deselectDeep">`deselectDeep`</a>
* <a href="#disableDeselection">`disableDeselection`</a>
* <a href="#each">`each`</a>
* <a href="#editable">`editable`</a>
* <a href="#editing">`editing`</a>
* <a href="#enableDeselection">`enableDeselection`</a>
* <a href="#expand">`expand`</a>
* <a href="#expandDeep">`expandDeep`</a>
* <a href="#expanded">`expanded`</a>
* <a href="#extract">`extract`</a>
* <a href="#filter">`filter`</a>
* <a href="#flatten">`flatten`</a>
* <a href="#focused">`focused`</a>
* <a href="#get">`get`</a>
* <a href="#hidden">`hidden`</a>
* <a href="#hide">`hide`</a>
* <a href="#hideDeep">`hideDeep`</a>
* <a href="#indeterminate">`indeterminate`</a>
* <a href="#insertAt">`insertAt`</a>
* <a href="#invoke">`invoke`</a>
* <a href="#invokeDeep">`invokeDeep`</a>
* <a href="#isNode">`isNode`</a>
* <a href="#lastSelectedNode">`lastSelectedNode`</a>
* <a href="#load">`load`</a>
* <a href="#loading">`loading`</a>
* <a href="#muted">`muted`</a>
* <a href="#node">`node`</a>
* <a href="#nodes">`nodes`</a>
* <a href="#reload">`reload`</a>
* <a href="#removeAll">`removeAll`</a>
* <a href="#removed">`removed`</a>
* <a href="#restore">`restore`</a>
* <a href="#restoreDeep">`restoreDeep`</a>
* <a href="#search">`search`</a>
* <a href="#select">`select`</a>
* <a href="#selectBetween">`selectBetween`</a>
* <a href="#selectDeep">`selectDeep`</a>
* <a href="#selectFirstAvailableNode">`selectFirstAvailableNode`</a>
* <a href="#selectable">`selectable`</a>
* <a href="#selected">`selected`</a>
* <a href="#show">`show`</a>
* <a href="#showDeep">`showDeep`</a>
* <a href="#softRemove">`softRemove`</a>
* <a href="#sort">`sort`</a>
* <a href="#toArray">`toArray`</a>
* <a href="#unmute">`unmute`</a>
* <a href="#visible">`visible`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `“Tree” Methods`

<!-- div -->

### <a id="addNode"></a>`addNode(node)`
<a href="#addNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L183 "View in source") [&#x24C9;][1]

Adds a new node to this collection. If a sort
method is configured, the node will be added
in the appropriate order.

#### Arguments
1. `node` *(object)*: Node

---

<!-- /div -->

<!-- div -->

### <a id="addNodes"></a>`addNodes(nodes)`
<a href="#addNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L194 "View in source") [&#x24C9;][1]

Add nodes.

#### Arguments
1. `nodes` *(array)*: Array of node objects.

---

<!-- /div -->

<!-- div -->

### <a id="available"></a>`available(full)`
<a href="#available">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L215 "View in source") [&#x24C9;][1]

Query for all available nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

### <a id="blur"></a>`blur()`
<a href="#blur">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L225 "View in source") [&#x24C9;][1]

Blur children in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="blurDeep"></a>`blurDeep()`
<a href="#blurDeep">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L235 "View in source") [&#x24C9;][1]

Blur all children *(deeply)* in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="boundingNodes"></a>`boundingNodes()`
<a href="#boundingNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L246 "View in source") [&#x24C9;][1]

Compares any number of TreeNode objects and returns
the minimum and maximum *(starting/ending)* nodes.

---

<!-- /div -->

<!-- div -->

### <a id="canAutoDeselect"></a>`canAutoDeselect()`
<a href="#canAutoDeselect">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L265 "View in source") [&#x24C9;][1]

Get if the tree will auto-deselect currently selected nodes
when a new selection is made.

---

<!-- /div -->

<!-- div -->

### <a id="clean"></a>`clean()`
<a href="#clean">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L275 "View in source") [&#x24C9;][1]

Clean children in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="clearSearch"></a>`clearSearch()`
<a href="#clearSearch">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L285 "View in source") [&#x24C9;][1]

Shows all nodes and collapses parents.

---

<!-- /div -->

<!-- div -->

### <a id="clone"></a>`clone()`
<a href="#clone">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L297 "View in source") [&#x24C9;][1]

Clones *(deep)* the array of nodes.
<br>
<br>
Note: Cloning will *not* clone the context pointer.

---

<!-- /div -->

<!-- div -->

### <a id="collapse"></a>`collapse()`
<a href="#collapse">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L307 "View in source") [&#x24C9;][1]

Collapse children in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="collapseDeep"></a>`collapseDeep()`
<a href="#collapseDeep">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L328 "View in source") [&#x24C9;][1]

Collapse all children *(deeply)* in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="collapsed"></a>`collapsed(full)`
<a href="#collapsed">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L318 "View in source") [&#x24C9;][1]

Query for all collapsed nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

### <a id="concat"></a>`concat(nodes)`
<a href="#concat">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L339 "View in source") [&#x24C9;][1]

Concat nodes like an Array would.

#### Arguments
1. `nodes` *(TreeNodes)*: Array of nodes.

---

<!-- /div -->

<!-- div -->

### <a id="copy"></a>`copy(hierarchy)`
<a href="#copy">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L350 "View in source") [&#x24C9;][1]

Copies nodes to a new tree instance.

#### Arguments
1. `hierarchy` *(boolean)*: Include necessary ancestors to match hierarchy.

---

<!-- /div -->

<!-- div -->

### <a id="deepest"></a>`deepest()`
<a href="#deepest">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L360 "View in source") [&#x24C9;][1]

Returns deepest nodes from this array.

---

<!-- /div -->

<!-- div -->

### <a id="deselect"></a>`deselect()`
<a href="#deselect">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L370 "View in source") [&#x24C9;][1]

Deselect children in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="deselectDeep"></a>`deselectDeep()`
<a href="#deselectDeep">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L380 "View in source") [&#x24C9;][1]

Deselect all children *(deeply)* in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="disableDeselection"></a>`disableDeselection()`
<a href="#disableDeselection">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L390 "View in source") [&#x24C9;][1]

Disable auto-deselection of currently selected nodes.

---

<!-- /div -->

<!-- div -->

### <a id="each"></a>`each(iteratee)`
<a href="#each">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L405 "View in source") [&#x24C9;][1]

Iterate every TreeNode in this collection.

#### Arguments
1. `iteratee` *(function)*: Iteratee invoke for each node.

---

<!-- /div -->

<!-- div -->

### <a id="editable"></a>`editable(full)`
<a href="#editable">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L416 "View in source") [&#x24C9;][1]

Query for all editable nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

### <a id="editing"></a>`editing(full)`
<a href="#editing">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L427 "View in source") [&#x24C9;][1]

Query for all nodes in editing mode.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

### <a id="enableDeselection"></a>`enableDeselection()`
<a href="#enableDeselection">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L437 "View in source") [&#x24C9;][1]

Enable auto-deselection of currently selected nodes.

---

<!-- /div -->

<!-- div -->

### <a id="expand"></a>`expand()`
<a href="#expand">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L449 "View in source") [&#x24C9;][1]

Expand children in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="expandDeep"></a>`expandDeep(full)`
<a href="#expandDeep">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L460 "View in source") [&#x24C9;][1]

Query for all expanded nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

### <a id="expanded"></a>`expanded()`
<a href="#expanded">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L470 "View in source") [&#x24C9;][1]

Recursively expands all nodes, loading all dynamic calls.

---

<!-- /div -->

<!-- div -->

### <a id="extract"></a>`extract(predicate)`
<a href="#extract">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L484 "View in source") [&#x24C9;][1]

Returns a cloned hierarchy of all nodes matching a predicate.
<br>
<br>
Because it filters deeply, we must clone all nodes so that we
don't affect the actual node array.

#### Arguments
1. `predicate` *(function|string)*: State flag or custom function.

---

<!-- /div -->

<!-- div -->

### <a id="filter"></a>`filter(predicate)`
<a href="#filter">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L495 "View in source") [&#x24C9;][1]

Returns nodes which match a predicate.

#### Arguments
1. `predicate` *(function|string)*: State flag or custom function.

---

<!-- /div -->

<!-- div -->

### <a id="flatten"></a>`flatten(predicate)`
<a href="#flatten">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L507 "View in source") [&#x24C9;][1]

Flattens a hierarchy, returning only node(s) matching the
expected state or predicate function.

#### Arguments
1. `predicate` *(function|string)*: State property or custom function.

---

<!-- /div -->

<!-- div -->

### <a id="focused"></a>`focused(full)`
<a href="#focused">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L518 "View in source") [&#x24C9;][1]

Query for all focused nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

### <a id="get"></a>`get(index)`
<a href="#get">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L529 "View in source") [&#x24C9;][1]

Get a specific node in the collection, or undefined if it doesn't exist.

#### Arguments
1. `index` *(int)*: Numeric index of requested node.

---

<!-- /div -->

<!-- div -->

### <a id="hidden"></a>`hidden(full)`
<a href="#hidden">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L540 "View in source") [&#x24C9;][1]

Query for all hidden nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

### <a id="hide"></a>`hide()`
<a href="#hide">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L550 "View in source") [&#x24C9;][1]

Hide children in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="hideDeep"></a>`hideDeep()`
<a href="#hideDeep">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L560 "View in source") [&#x24C9;][1]

Hide all children *(deeply)* in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="indeterminate"></a>`indeterminate(full)`
<a href="#indeterminate">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L571 "View in source") [&#x24C9;][1]

Query for all indeterminate nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

### <a id="insertAt"></a>`insertAt(index, object)`
<a href="#insertAt">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L583 "View in source") [&#x24C9;][1]

Insert a new node at a given position.

#### Arguments
1. `index` *(integer)*: Index at which to insert the node.
2. `object` *(object)*: Raw node object or TreeNode.

---

<!-- /div -->

<!-- div -->

### <a id="invoke"></a>`invoke(methods)`
<a href="#invoke">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L594 "View in source") [&#x24C9;][1]

Invoke method(s) on each node.

#### Arguments
1. `methods` *(array|string): Method name(s)*.

---

<!-- /div -->

<!-- div -->

### <a id="invokeDeep"></a>`invokeDeep(methods)`
<a href="#invokeDeep">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L605 "View in source") [&#x24C9;][1]

Invoke method(s) deeply.

#### Arguments
1. `methods` *(array|string): Method name(s)*.

---

<!-- /div -->

<!-- div -->

### <a id="isNode"></a>`isNode(object)`
<a href="#isNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L616 "View in source") [&#x24C9;][1]

Check if an object is a TreeNode.

#### Arguments
1. `object` *(object)*: Object

---

<!-- /div -->

<!-- div -->

### <a id="lastSelectedNode"></a>`lastSelectedNode()`
<a href="#lastSelectedNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L626 "View in source") [&#x24C9;][1]

Get the most recently selected node, if any.

---

<!-- /div -->

<!-- div -->

### <a id="load"></a>`load(loader)`
<a href="#load">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L640 "View in source") [&#x24C9;][1]

Loads tree. Accepts an array or a promise.

#### Arguments
1. `loader` *(array|function)*: Array of nodes, or promise resolving an array of nodes.

#### Example
```js
tree.load($.getJSON('nodes.json'));
```
---

<!-- /div -->

<!-- div -->

### <a id="loading"></a>`loading(full)`
<a href="#loading">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L724 "View in source") [&#x24C9;][1]

Query for all loading nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

### <a id="muted"></a>`muted()`
<a href="#muted">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L752 "View in source") [&#x24C9;][1]

Get current mute settings.

---

<!-- /div -->

<!-- div -->

### <a id="node"></a>`node(id)`
<a href="#node">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L763 "View in source") [&#x24C9;][1]

Get a node.

#### Arguments
1. `id` *(number|string)*: ID of node.

---

<!-- /div -->

<!-- div -->

### <a id="nodes"></a>`nodes(refs)`
<a href="#nodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L778 "View in source") [&#x24C9;][1]

Get all nodes in a tree, or nodes for an array of IDs.

#### Arguments
1. `refs` *(array)*: Array of ID references.

#### Example
```js
var all = tree.nodes()
var some = tree.nodes([1, 2, 3])
```
---

<!-- /div -->

<!-- div -->

### <a id="reload"></a>`reload()`
<a href="#reload">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L802 "View in source") [&#x24C9;][1]

Reloads/re-executes the original data loader.

---

<!-- /div -->

<!-- div -->

### <a id="removeAll"></a>`removeAll()`
<a href="#removeAll">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L812 "View in source") [&#x24C9;][1]

Removes all nodes.

---

<!-- /div -->

<!-- div -->

### <a id="removed"></a>`removed(full)`
<a href="#removed">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L826 "View in source") [&#x24C9;][1]

Query for all soft-removed nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

### <a id="restore"></a>`restore()`
<a href="#restore">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L836 "View in source") [&#x24C9;][1]

Restore children in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="restoreDeep"></a>`restoreDeep()`
<a href="#restoreDeep">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L846 "View in source") [&#x24C9;][1]

Restore all children *(deeply)* in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="search"></a>`search(query)`
<a href="#search">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L857 "View in source") [&#x24C9;][1]

Search nodes, showing only those that match and the necessary hierarchy.

#### Arguments
1. `query` *(&#42;)*: Search string, RegExp, or function.

---

<!-- /div -->

<!-- div -->

### <a id="select"></a>`select()`
<a href="#select">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L931 "View in source") [&#x24C9;][1]

Select children in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="selectBetween"></a>`selectBetween(startNode, endNode)`
<a href="#selectBetween">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L955 "View in source") [&#x24C9;][1]

Select all nodes between a start and end node.
Starting node must have a higher index path so we can work down to endNode.

#### Arguments
1. `startNode` *(TreeNode)*: Starting node
2. `endNode` *(TreeNode)*: Ending node

---

<!-- /div -->

<!-- div -->

### <a id="selectDeep"></a>`selectDeep()`
<a href="#selectDeep">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L980 "View in source") [&#x24C9;][1]

Select all children *(deeply)* in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="selectFirstAvailableNode"></a>`selectFirstAvailableNode()`
<a href="#selectFirstAvailableNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1001 "View in source") [&#x24C9;][1]

Select the first available node at the root level.

---

<!-- /div -->

<!-- div -->

### <a id="selectable"></a>`selectable(full)`
<a href="#selectable">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L942 "View in source") [&#x24C9;][1]

Query for all selectable nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

### <a id="selected"></a>`selected(full)`
<a href="#selected">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L991 "View in source") [&#x24C9;][1]

Query for all selected nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

### <a id="show"></a>`show()`
<a href="#show">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1016 "View in source") [&#x24C9;][1]

Show children in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="showDeep"></a>`showDeep()`
<a href="#showDeep">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1026 "View in source") [&#x24C9;][1]

Show all children *(deeply)* in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="softRemove"></a>`softRemove()`
<a href="#softRemove">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1036 "View in source") [&#x24C9;][1]

Soft-remove children in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="sort"></a>`sort(sorter)`
<a href="#sort">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1049 "View in source") [&#x24C9;][1]

Sorts all TreeNode objects in this collection.
<br>
<br>
If no custom sorter given, the configured "sort" value will be used.

#### Arguments
1. `sorter` *(function|string)*: Sort function or property name.

---

<!-- /div -->

<!-- div -->

### <a id="toArray"></a>`toArray()`
<a href="#toArray">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1059 "View in source") [&#x24C9;][1]

Returns a native Array of nodes.

---

<!-- /div -->

<!-- div -->

### <a id="unmute"></a>`unmute(events)`
<a href="#unmute">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1070 "View in source") [&#x24C9;][1]

Resume events.

#### Arguments
1. `events` *(array)*: Events to unmute.

---

<!-- /div -->

<!-- div -->

### <a id="visible"></a>`visible(full)`
<a href="#visible">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1092 "View in source") [&#x24C9;][1]

Query for all visible nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #tree "Jump back to the TOC."
