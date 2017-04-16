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
* <a href="#checked">`checked`</a>
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
* <a href="#isEventMuted">`isEventMuted`</a>
* <a href="#isNode">`isNode`</a>
* <a href="#isTree">`isTree`</a>
* <a href="#isTreeNode">`isTreeNode`</a>
* <a href="#isTreeNodes">`isTreeNodes`</a>
* <a href="#lastSelectedNode">`lastSelectedNode`</a>
* <a href="#load">`load`</a>
* <a href="#loadMore">`loadMore`</a>
* <a href="#loading">`loading`</a>
* <a href="#matched">`matched`</a>
* <a href="#muted">`muted`</a>
* <a href="#node">`node`</a>
* <a href="#nodes">`nodes`</a>
* <a href="#pagination">`pagination`</a>
* <a href="#reload">`reload`</a>
* <a href="#remove">`remove`</a>
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
* <a href="#state">`state`</a>
* <a href="#stateDeep">`stateDeep`</a>
* <a href="#toArray">`toArray`</a>
* <a href="#unmute">`unmute`</a>
* <a href="#visible">`visible`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `“Tree” Methods`

<!-- div -->

<h3 id="addNode"><a href="#addNode">#</a>&nbsp;<code>addNode(node)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L198 "View in source") [&#x24C9;][1]

Adds a new node to this collection. If a sort
method is configured, the node will be added
in the appropriate order.

#### Arguments
1. `node` *(object)*: Node

---

<!-- /div -->

<!-- div -->

<h3 id="addNodes"><a href="#addNodes">#</a>&nbsp;<code>addNodes(nodes)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L209 "View in source") [&#x24C9;][1]

Add nodes.

#### Arguments
1. `nodes` *(array)*: Array of node objects.

---

<!-- /div -->

<!-- div -->

<h3 id="available"><a href="#available">#</a>&nbsp;<code>available(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L248 "View in source") [&#x24C9;][1]

Query for all available nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="blur"><a href="#blur">#</a>&nbsp;<code>blur()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L273 "View in source") [&#x24C9;][1]

Blur children in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="blurDeep"><a href="#blurDeep">#</a>&nbsp;<code>blurDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L283 "View in source") [&#x24C9;][1]

Blur all children *(deeply)* in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="boundingNodes"><a href="#boundingNodes">#</a>&nbsp;<code>boundingNodes()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L294 "View in source") [&#x24C9;][1]

Compares any number of TreeNode objects and returns
the minimum and maximum *(starting/ending)* nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="canAutoDeselect"><a href="#canAutoDeselect">#</a>&nbsp;<code>canAutoDeselect()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L314 "View in source") [&#x24C9;][1]

Get if the tree will auto-deselect currently selected nodes
when a new selection is made.

---

<!-- /div -->

<!-- div -->

<h3 id="checked"><a href="#checked">#</a>&nbsp;<code>checked(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L325 "View in source") [&#x24C9;][1]

Query for all checked nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="clean"><a href="#clean">#</a>&nbsp;<code>clean()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L335 "View in source") [&#x24C9;][1]

Clean children in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="clearSearch"><a href="#clearSearch">#</a>&nbsp;<code>clearSearch()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L345 "View in source") [&#x24C9;][1]

Clears matched nodes, shows all nodes and collapses parents.

---

<!-- /div -->

<!-- div -->

<h3 id="clone"><a href="#clone">#</a>&nbsp;<code>clone()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L358 "View in source") [&#x24C9;][1]

Clones *(deep)* the array of nodes.
<br>
<br>
Note: Cloning will *not* clone the context pointer.

---

<!-- /div -->

<!-- div -->

<h3 id="collapse"><a href="#collapse">#</a>&nbsp;<code>collapse()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L368 "View in source") [&#x24C9;][1]

Collapse children in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="collapseDeep"><a href="#collapseDeep">#</a>&nbsp;<code>collapseDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L389 "View in source") [&#x24C9;][1]

Collapse all children *(deeply)* in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="collapsed"><a href="#collapsed">#</a>&nbsp;<code>collapsed(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L379 "View in source") [&#x24C9;][1]

Query for all collapsed nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="concat"><a href="#concat">#</a>&nbsp;<code>concat(nodes)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L400 "View in source") [&#x24C9;][1]

Concat nodes like an Array would.

#### Arguments
1. `nodes` *(TreeNodes)*: Array of nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="copy"><a href="#copy">#</a>&nbsp;<code>copy(hierarchy)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L411 "View in source") [&#x24C9;][1]

Copies nodes to a new tree instance.

#### Arguments
1. `hierarchy` *(boolean)*: Include necessary ancestors to match hierarchy.

---

<!-- /div -->

<!-- div -->

<h3 id="deepest"><a href="#deepest">#</a>&nbsp;<code>deepest()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L421 "View in source") [&#x24C9;][1]

Returns deepest nodes from this array.

---

<!-- /div -->

<!-- div -->

<h3 id="deselect"><a href="#deselect">#</a>&nbsp;<code>deselect()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L431 "View in source") [&#x24C9;][1]

Deselect children in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="deselectDeep"><a href="#deselectDeep">#</a>&nbsp;<code>deselectDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L441 "View in source") [&#x24C9;][1]

Deselect all children *(deeply)* in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="disableDeselection"><a href="#disableDeselection">#</a>&nbsp;<code>disableDeselection()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L451 "View in source") [&#x24C9;][1]

Disable auto-deselection of currently selected nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="each"><a href="#each">#</a>&nbsp;<code>each(iteratee)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L466 "View in source") [&#x24C9;][1]

Iterate every TreeNode in this collection.

#### Arguments
1. `iteratee` *(function)*: Iteratee invoke for each node.

---

<!-- /div -->

<!-- div -->

<h3 id="editable"><a href="#editable">#</a>&nbsp;<code>editable(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L477 "View in source") [&#x24C9;][1]

Query for all editable nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="editing"><a href="#editing">#</a>&nbsp;<code>editing(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L488 "View in source") [&#x24C9;][1]

Query for all nodes in editing mode.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="enableDeselection"><a href="#enableDeselection">#</a>&nbsp;<code>enableDeselection()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L498 "View in source") [&#x24C9;][1]

Enable auto-deselection of currently selected nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="expand"><a href="#expand">#</a>&nbsp;<code>expand()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L525 "View in source") [&#x24C9;][1]

Expand children in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="expandDeep"><a href="#expandDeep">#</a>&nbsp;<code>expandDeep(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L536 "View in source") [&#x24C9;][1]

Recursively expands all nodes, loading all dynamic calls.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="expanded"><a href="#expanded">#</a>&nbsp;<code>expanded()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L546 "View in source") [&#x24C9;][1]

Query for all expanded nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="extract"><a href="#extract">#</a>&nbsp;<code>extract(predicate)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L560 "View in source") [&#x24C9;][1]

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

<h3 id="filter"><a href="#filter">#</a>&nbsp;<code>filter(predicate)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L571 "View in source") [&#x24C9;][1]

Returns nodes which match a predicate.

#### Arguments
1. `predicate` *(function|string)*: State flag or custom function.

---

<!-- /div -->

<!-- div -->

<h3 id="flatten"><a href="#flatten">#</a>&nbsp;<code>flatten(predicate)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L583 "View in source") [&#x24C9;][1]

Flattens a hierarchy, returning only node(s) matching the
expected state or predicate function.

#### Arguments
1. `predicate` *(function|string)*: State property or custom function.

---

<!-- /div -->

<!-- div -->

<h3 id="focused"><a href="#focused">#</a>&nbsp;<code>focused(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L594 "View in source") [&#x24C9;][1]

Query for all focused nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="get"><a href="#get">#</a>&nbsp;<code>get(index)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L605 "View in source") [&#x24C9;][1]

Get a specific node in the collection, or undefined if it doesn't exist.

#### Arguments
1. `index` *(int)*: Numeric index of requested node.

---

<!-- /div -->

<!-- div -->

<h3 id="hidden"><a href="#hidden">#</a>&nbsp;<code>hidden(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L616 "View in source") [&#x24C9;][1]

Query for all hidden nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="hide"><a href="#hide">#</a>&nbsp;<code>hide()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L626 "View in source") [&#x24C9;][1]

Hide children in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="hideDeep"><a href="#hideDeep">#</a>&nbsp;<code>hideDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L636 "View in source") [&#x24C9;][1]

Hide all children *(deeply)* in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="indeterminate"><a href="#indeterminate">#</a>&nbsp;<code>indeterminate(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L647 "View in source") [&#x24C9;][1]

Query for all indeterminate nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="insertAt"><a href="#insertAt">#</a>&nbsp;<code>insertAt(index, object)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L659 "View in source") [&#x24C9;][1]

Insert a new node at a given position.

#### Arguments
1. `index` *(integer)*: Index at which to insert the node.
2. `object` *(object)*: Raw node object or TreeNode.

---

<!-- /div -->

<!-- div -->

<h3 id="invoke"><a href="#invoke">#</a>&nbsp;<code>invoke(methods)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L670 "View in source") [&#x24C9;][1]

Invoke method(s) on each node.

#### Arguments
1. `methods` *(array|string): Method name(s)*.

---

<!-- /div -->

<!-- div -->

<h3 id="invokeDeep"><a href="#invokeDeep">#</a>&nbsp;<code>invokeDeep(methods)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L681 "View in source") [&#x24C9;][1]

Invoke method(s) deeply.

#### Arguments
1. `methods` *(array|string): Method name(s)*.

---

<!-- /div -->

<!-- div -->

<h3 id="isEventMuted"><a href="#isEventMuted">#</a>&nbsp;<code>isEventMuted(eventName)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L692 "View in source") [&#x24C9;][1]

Check if an event is currently muted.

#### Arguments
1. `eventName` *(string)*: Event name.

---

<!-- /div -->

<!-- div -->

<h3 id="isNode"><a href="#isNode">#</a>&nbsp;<code>isNode(object)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L708 "View in source") [&#x24C9;][1]

Check if an object is a TreeNode.

#### Arguments
1. `object` *(object)*: Object

---

<!-- /div -->

<!-- div -->

<h3 id="isTree"><a href="#isTree">#</a>&nbsp;<code>isTree(object)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L719 "View in source") [&#x24C9;][1]

Check if an object is a Tree.

#### Arguments
1. `object` *(object)*: Object

---

<!-- /div -->

<!-- div -->

<h3 id="isTreeNode"><a href="#isTreeNode">#</a>&nbsp;<code>isTreeNode(object)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L730 "View in source") [&#x24C9;][1]

Check if an object is a TreeNode.

#### Arguments
1. `object` *(object)*: Object

---

<!-- /div -->

<!-- div -->

<h3 id="isTreeNodes"><a href="#isTreeNodes">#</a>&nbsp;<code>isTreeNodes(object)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L741 "View in source") [&#x24C9;][1]

Check if an object is a TreeNodes array.

#### Arguments
1. `object` *(object)*: Object

---

<!-- /div -->

<!-- div -->

<h3 id="lastSelectedNode"><a href="#lastSelectedNode">#</a>&nbsp;<code>lastSelectedNode()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L751 "View in source") [&#x24C9;][1]

Get the most recently selected node, if any.

---

<!-- /div -->

<!-- div -->

<h3 id="load"><a href="#load">#</a>&nbsp;<code>load(loader)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L765 "View in source") [&#x24C9;][1]

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

<h3 id="loadMore"><a href="#loadMore">#</a>&nbsp;<code>loadMore(event)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L860 "View in source") [&#x24C9;][1]

Loads additional nodes for the root context.

#### Arguments
1. `event` *(Event)*: Click or scroll event if DOM interaction triggered this call.

---

<!-- /div -->

<!-- div -->

<h3 id="loading"><a href="#loading">#</a>&nbsp;<code>loading(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L849 "View in source") [&#x24C9;][1]

Query for all loading nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="matched"><a href="#matched">#</a>&nbsp;<code>matched(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L871 "View in source") [&#x24C9;][1]

Query for all nodes matched in the last search.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="muted"><a href="#muted">#</a>&nbsp;<code>muted()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L899 "View in source") [&#x24C9;][1]

Get current mute settings.

---

<!-- /div -->

<!-- div -->

<h3 id="node"><a href="#node">#</a>&nbsp;<code>node(id)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L910 "View in source") [&#x24C9;][1]

Get a node.

#### Arguments
1. `id` *(number|string)*: ID of node.

---

<!-- /div -->

<!-- div -->

<h3 id="nodes"><a href="#nodes">#</a>&nbsp;<code>nodes(refs)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L925 "View in source") [&#x24C9;][1]

Get all nodes in a tree, or nodes for an array of IDs.

#### Arguments
1. `refs` *(array)*: Array of ID references.

#### Example
```js
let all = tree.nodes()
let some = tree.nodes([1, 2, 3])
```
---

<!-- /div -->

<!-- div -->

<h3 id="pagination"><a href="#pagination">#</a>&nbsp;<code>pagination()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L935 "View in source") [&#x24C9;][1]

Get the root TreeNodes pagination.

---

<!-- /div -->

<!-- div -->

<h3 id="reload"><a href="#reload">#</a>&nbsp;<code>reload()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L958 "View in source") [&#x24C9;][1]

Reloads/re-executes the original data loader.

---

<!-- /div -->

<!-- div -->

<h3 id="remove"><a href="#remove">#</a>&nbsp;<code>remove(node)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L971 "View in source") [&#x24C9;][1]

Removes a direct descendant node.

#### Arguments
1. `node` *(TreeNode)*: Node object.

---

<!-- /div -->

<!-- div -->

<h3 id="removeAll"><a href="#removeAll">#</a>&nbsp;<code>removeAll()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L981 "View in source") [&#x24C9;][1]

Removes all nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="removed"><a href="#removed">#</a>&nbsp;<code>removed(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L995 "View in source") [&#x24C9;][1]

Query for all soft-removed nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="restore"><a href="#restore">#</a>&nbsp;<code>restore()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1005 "View in source") [&#x24C9;][1]

Restore children in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="restoreDeep"><a href="#restoreDeep">#</a>&nbsp;<code>restoreDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1015 "View in source") [&#x24C9;][1]

Restore all children *(deeply)* in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="search"><a href="#search">#</a>&nbsp;<code>search(query)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1026 "View in source") [&#x24C9;][1]

Search nodes, showing only those that match and the necessary hierarchy.

#### Arguments
1. `query` *(&#42;)*: Search string, RegExp, or function.

---

<!-- /div -->

<!-- div -->

<h3 id="select"><a href="#select">#</a>&nbsp;<code>select()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1115 "View in source") [&#x24C9;][1]

Select children in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="selectBetween"><a href="#selectBetween">#</a>&nbsp;<code>selectBetween(startNode, endNode)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1139 "View in source") [&#x24C9;][1]

Select all nodes between a start and end node.
Starting node must have a higher index path so we can work down to endNode.

#### Arguments
1. `startNode` *(TreeNode)*: Starting node
2. `endNode` *(TreeNode)*: Ending node

---

<!-- /div -->

<!-- div -->

<h3 id="selectDeep"><a href="#selectDeep">#</a>&nbsp;<code>selectDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1160 "View in source") [&#x24C9;][1]

Select all children *(deeply)* in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="selectFirstAvailableNode"><a href="#selectFirstAvailableNode">#</a>&nbsp;<code>selectFirstAvailableNode()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1181 "View in source") [&#x24C9;][1]

Select the first available node at the root level.

---

<!-- /div -->

<!-- div -->

<h3 id="selectable"><a href="#selectable">#</a>&nbsp;<code>selectable(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1126 "View in source") [&#x24C9;][1]

Query for all selectable nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="selected"><a href="#selected">#</a>&nbsp;<code>selected(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1171 "View in source") [&#x24C9;][1]

Query for all selected nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="show"><a href="#show">#</a>&nbsp;<code>show()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1196 "View in source") [&#x24C9;][1]

Show children in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="showDeep"><a href="#showDeep">#</a>&nbsp;<code>showDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1206 "View in source") [&#x24C9;][1]

Show all children *(deeply)* in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="softRemove"><a href="#softRemove">#</a>&nbsp;<code>softRemove()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1216 "View in source") [&#x24C9;][1]

Soft-remove children in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="sort"><a href="#sort">#</a>&nbsp;<code>sort(sorter)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1229 "View in source") [&#x24C9;][1]

Sorts all TreeNode objects in this collection.
<br>
<br>
If no custom sorter given, the configured "sort" value will be used.

#### Arguments
1. `sorter` *(function|string)*: Sort function or property name.

---

<!-- /div -->

<!-- div -->

<h3 id="state"><a href="#state">#</a>&nbsp;<code>state(name, newVal)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1241 "View in source") [&#x24C9;][1]

Set state values for nodes in this collection.

#### Arguments
1. `name` *(string)*: Property name.
2. `newVal` *(boolean)*: New value, if setting.

---

<!-- /div -->

<!-- div -->

<h3 id="stateDeep"><a href="#stateDeep">#</a>&nbsp;<code>stateDeep(name, newVal)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1253 "View in source") [&#x24C9;][1]

Set state values for nodes in this collection.

#### Arguments
1. `name` *(string)*: Property name.
2. `newVal` *(boolean)*: New value, if setting.

---

<!-- /div -->

<!-- div -->

<h3 id="toArray"><a href="#toArray">#</a>&nbsp;<code>toArray()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1263 "View in source") [&#x24C9;][1]

Returns a native Array of nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="unmute"><a href="#unmute">#</a>&nbsp;<code>unmute(events)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1274 "View in source") [&#x24C9;][1]

Resume events.

#### Arguments
1. `events` *(array)*: Events to unmute.

---

<!-- /div -->

<!-- div -->

<h3 id="visible"><a href="#visible">#</a>&nbsp;<code>visible(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1296 "View in source") [&#x24C9;][1]

Query for all visible nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #tree "Jump back to the TOC."
