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
* <a href="#createNode">`createNode`</a>
* <a href="#deepest">`deepest`</a>
* <a href="#deselect">`deselect`</a>
* <a href="#deselectDeep">`deselectDeep`</a>
* <a href="#disableDeselection">`disableDeselection`</a>
* <a href="#each">`each`</a>
* <a href="#editable">`editable`</a>
* <a href="#editing">`editing`</a>
* <a href="#enableDeselection">`enableDeselection`</a>
* <a href="#every">`every`</a>
* <a href="#expand">`expand`</a>
* <a href="#expandDeep">`expandDeep`</a>
* <a href="#expanded">`expanded`</a>
* <a href="#extract">`extract`</a>
* <a href="#filter">`filter`</a>
* <a href="#filterBy">`filterBy`</a>
* <a href="#flatten">`flatten`</a>
* <a href="#focused">`focused`</a>
* <a href="#forEach">`forEach`</a>
* <a href="#get">`get`</a>
* <a href="#hidden">`hidden`</a>
* <a href="#hide">`hide`</a>
* <a href="#hideDeep">`hideDeep`</a>
* <a href="#indeterminate">`indeterminate`</a>
* <a href="#indexOf">`indexOf`</a>
* <a href="#insertAt">`insertAt`</a>
* <a href="#invoke">`invoke`</a>
* <a href="#invokeDeep">`invokeDeep`</a>
* <a href="#isEventMuted">`isEventMuted`</a>
* <a href="#isTree">`isTree`</a>
* <a href="#join">`join`</a>
* <a href="#lastSelectedNode">`lastSelectedNode`</a>
* <a href="#load">`load`</a>
* <a href="#loadMore">`loadMore`</a>
* <a href="#loading">`loading`</a>
* <a href="#map">`map`</a>
* <a href="#matched">`matched`</a>
* <a href="#move">`move`</a>
* <a href="#muted">`muted`</a>
* <a href="#node">`node`</a>
* <a href="#nodes">`nodes`</a>
* <a href="#pagination">`pagination`</a>
* <a href="#pop">`pop`</a>
* <a href="#push">`push`</a>
* <a href="#reduce">`reduce`</a>
* <a href="#reduceRight">`reduceRight`</a>
* <a href="#reload">`reload`</a>
* <a href="#remove">`remove`</a>
* <a href="#removeAll">`removeAll`</a>
* <a href="#removed">`removed`</a>
* <a href="#restore">`restore`</a>
* <a href="#restoreDeep">`restoreDeep`</a>
* <a href="#reverse">`reverse`</a>
* <a href="#search">`search`</a>
* <a href="#select">`select`</a>
* <a href="#selectBetween">`selectBetween`</a>
* <a href="#selectDeep">`selectDeep`</a>
* <a href="#selectFirstAvailableNode">`selectFirstAvailableNode`</a>
* <a href="#selectable">`selectable`</a>
* <a href="#selected">`selected`</a>
* <a href="#shift">`shift`</a>
* <a href="#show">`show`</a>
* <a href="#showDeep">`showDeep`</a>
* <a href="#slice">`slice`</a>
* <a href="#softRemove">`softRemove`</a>
* <a href="#some">`some`</a>
* <a href="#sort">`sort`</a>
* <a href="#sortBy">`sortBy`</a>
* <a href="#splice">`splice`</a>
* <a href="#state">`state`</a>
* <a href="#stateDeep">`stateDeep`</a>
* <a href="#swap">`swap`</a>
* <a href="#toArray">`toArray`</a>
* <a href="#toString">`toString`</a>
* <a href="#unmute">`unmute`</a>
* <a href="#unshift">`unshift`</a>
* <a href="#visible">`visible`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `“Tree” Methods`

<!-- div -->

<h3 id="addNode"><a href="#addNode">#</a>&nbsp;<code>addNode(node)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L196 "View in source") [&#x24C9;][1]

Adds a new node. If a sort
method is configured, the node will be added
in the appropriate order.

#### Arguments
1. `node` *(object)*: Node

---

<!-- /div -->

<!-- div -->

<h3 id="addNodes"><a href="#addNodes">#</a>&nbsp;<code>addNodes(nodes)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L207 "View in source") [&#x24C9;][1]

Add nodes.

#### Arguments
1. `nodes` *(array)*: Array of node objects.

---

<!-- /div -->

<!-- div -->

<h3 id="available"><a href="#available">#</a>&nbsp;<code>available(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L246 "View in source") [&#x24C9;][1]

Query for all available nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="blur"><a href="#blur">#</a>&nbsp;<code>blur()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L271 "View in source") [&#x24C9;][1]

Blur children in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="blurDeep"><a href="#blurDeep">#</a>&nbsp;<code>blurDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L281 "View in source") [&#x24C9;][1]

Blur *(deeply)* all nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="boundingNodes"><a href="#boundingNodes">#</a>&nbsp;<code>boundingNodes()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L292 "View in source") [&#x24C9;][1]

Compares any number of TreeNode objects and returns
the minimum and maximum *(starting/ending)* nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="canAutoDeselect"><a href="#canAutoDeselect">#</a>&nbsp;<code>canAutoDeselect()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L312 "View in source") [&#x24C9;][1]

Check if the tree will auto-deselect currently selected nodes
when a new selection is made.

---

<!-- /div -->

<!-- div -->

<h3 id="checked"><a href="#checked">#</a>&nbsp;<code>checked(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L323 "View in source") [&#x24C9;][1]

Query for all checked nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="clean"><a href="#clean">#</a>&nbsp;<code>clean()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L333 "View in source") [&#x24C9;][1]

Clean nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="clearSearch"><a href="#clearSearch">#</a>&nbsp;<code>clearSearch()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L343 "View in source") [&#x24C9;][1]

Clear nodes matched by previous search, restore all nodes and collapse parents.

---

<!-- /div -->

<!-- div -->

<h3 id="clone"><a href="#clone">#</a>&nbsp;<code>clone()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L356 "View in source") [&#x24C9;][1]

Clones *(deeply)* the array of nodes.
<br>
<br>
Note: Cloning will *not* clone the context pointer.

---

<!-- /div -->

<!-- div -->

<h3 id="collapse"><a href="#collapse">#</a>&nbsp;<code>collapse()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L366 "View in source") [&#x24C9;][1]

Collapse nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="collapseDeep"><a href="#collapseDeep">#</a>&nbsp;<code>collapseDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L387 "View in source") [&#x24C9;][1]

Collapse *(deeply)* all children.

---

<!-- /div -->

<!-- div -->

<h3 id="collapsed"><a href="#collapsed">#</a>&nbsp;<code>collapsed(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L377 "View in source") [&#x24C9;][1]

Query for all collapsed nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="concat"><a href="#concat">#</a>&nbsp;<code>concat(nodes)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L398 "View in source") [&#x24C9;][1]

Concat multiple TreeNodes arrays.

#### Arguments
1. `nodes` *(TreeNodes)*: Array of nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="copy"><a href="#copy">#</a>&nbsp;<code>copy(hierarchy)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L409 "View in source") [&#x24C9;][1]

Copy nodes to another tree instance.

#### Arguments
1. `hierarchy` *(boolean)*: Include necessary ancestors to match hierarchy.

---

<!-- /div -->

<!-- div -->

<h3 id="createNode"><a href="#createNode">#</a>&nbsp;<code>createNode(obj)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L420 "View in source") [&#x24C9;][1]

Creates a TreeNode without adding it. If the obj is already a TreeNode it's returned without modification.

#### Arguments
1. `obj` *(object)*: Source node object.

---

<!-- /div -->

<!-- div -->

<h3 id="deepest"><a href="#deepest">#</a>&nbsp;<code>deepest()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L430 "View in source") [&#x24C9;][1]

Return deepest nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="deselect"><a href="#deselect">#</a>&nbsp;<code>deselect()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L440 "View in source") [&#x24C9;][1]

Deselect nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="deselectDeep"><a href="#deselectDeep">#</a>&nbsp;<code>deselectDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L450 "View in source") [&#x24C9;][1]

Deselect *(deeply)* all nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="disableDeselection"><a href="#disableDeselection">#</a>&nbsp;<code>disableDeselection()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L460 "View in source") [&#x24C9;][1]

Disable auto-deselection of currently selected nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="each"><a href="#each">#</a>&nbsp;<code>each(iteratee)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L475 "View in source") [&#x24C9;][1]

Iterate each TreeNode.

#### Arguments
1. `iteratee` *(function)*: Iteratee invoke for each node.

---

<!-- /div -->

<!-- div -->

<h3 id="editable"><a href="#editable">#</a>&nbsp;<code>editable(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L497 "View in source") [&#x24C9;][1]

Query for all editable nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="editing"><a href="#editing">#</a>&nbsp;<code>editing(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L508 "View in source") [&#x24C9;][1]

Query for all nodes in editing mode.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="enableDeselection"><a href="#enableDeselection">#</a>&nbsp;<code>enableDeselection()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L518 "View in source") [&#x24C9;][1]

Enable auto-deselection of currently selected nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="every"><a href="#every">#</a>&nbsp;<code>every(tester)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L486 "View in source") [&#x24C9;][1]

Check if every node passes the given test.

#### Arguments
1. `tester` *(function)*: Test each node in this collection,

---

<!-- /div -->

<!-- div -->

<h3 id="expand"><a href="#expand">#</a>&nbsp;<code>expand()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L545 "View in source") [&#x24C9;][1]

Expand children.

---

<!-- /div -->

<!-- div -->

<h3 id="expandDeep"><a href="#expandDeep">#</a>&nbsp;<code>expandDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L555 "View in source") [&#x24C9;][1]

Expand *(deeply)* all nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="expanded"><a href="#expanded">#</a>&nbsp;<code>expanded()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L565 "View in source") [&#x24C9;][1]

Query for all expanded nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="extract"><a href="#extract">#</a>&nbsp;<code>extract(predicate)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L579 "View in source") [&#x24C9;][1]

Clone a hierarchy of all nodes matching a predicate.
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
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L590 "View in source") [&#x24C9;][1]

Filter all nodes matching the given predicate.

#### Arguments
1. `predicate` *(function)*: Test function.

---

<!-- /div -->

<!-- div -->

<h3 id="filterBy"><a href="#filterBy">#</a>&nbsp;<code>filterBy(predicate)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L601 "View in source") [&#x24C9;][1]

Filter all nodes matching the given predicate.

#### Arguments
1. `predicate` *(function|string)*: State flag or custom function.

---

<!-- /div -->

<!-- div -->

<h3 id="flatten"><a href="#flatten">#</a>&nbsp;<code>flatten(predicate)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L612 "View in source") [&#x24C9;][1]

Flatten and get only node(s) matching the expected state or predicate function.

#### Arguments
1. `predicate` *(function|string)*: State property or custom function.

---

<!-- /div -->

<!-- div -->

<h3 id="focused"><a href="#focused">#</a>&nbsp;<code>focused(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L623 "View in source") [&#x24C9;][1]

Query for all focused nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="forEach"><a href="#forEach">#</a>&nbsp;<code>forEach(iteratee)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L634 "View in source") [&#x24C9;][1]

Iterate each TreeNode.

#### Arguments
1. `iteratee` *(function)*: Iteratee invoke for each node.

---

<!-- /div -->

<!-- div -->

<h3 id="get"><a href="#get">#</a>&nbsp;<code>get(index)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L645 "View in source") [&#x24C9;][1]

Get a specific node by its index, or undefined if it doesn't exist.

#### Arguments
1. `index` *(int)*: Numeric index of requested node.

---

<!-- /div -->

<!-- div -->

<h3 id="hidden"><a href="#hidden">#</a>&nbsp;<code>hidden(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L656 "View in source") [&#x24C9;][1]

Query for all hidden nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="hide"><a href="#hide">#</a>&nbsp;<code>hide()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L666 "View in source") [&#x24C9;][1]

Hide nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="hideDeep"><a href="#hideDeep">#</a>&nbsp;<code>hideDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L676 "View in source") [&#x24C9;][1]

Hide *(deeply)* all nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="indeterminate"><a href="#indeterminate">#</a>&nbsp;<code>indeterminate(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L687 "View in source") [&#x24C9;][1]

Query for all indeterminate nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="indexOf"><a href="#indexOf">#</a>&nbsp;<code>indexOf(node)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L698 "View in source") [&#x24C9;][1]

Get the index of the given node.

#### Arguments
1. `node` *(TreeNode)*: Root tree node.

---

<!-- /div -->

<!-- div -->

<h3 id="insertAt"><a href="#insertAt">#</a>&nbsp;<code>insertAt(index, object)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L710 "View in source") [&#x24C9;][1]

Insert a new node at the given position.

#### Arguments
1. `index` *(integer)*: Index at which to insert the node.
2. `object` *(object)*: Raw node object or TreeNode.

---

<!-- /div -->

<!-- div -->

<h3 id="invoke"><a href="#invoke">#</a>&nbsp;<code>invoke(methods)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L721 "View in source") [&#x24C9;][1]

Invoke method(s) on each node.

#### Arguments
1. `methods` *(array|string): Method name(s)*.

---

<!-- /div -->

<!-- div -->

<h3 id="invokeDeep"><a href="#invokeDeep">#</a>&nbsp;<code>invokeDeep(methods)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L732 "View in source") [&#x24C9;][1]

Invoke method(s) deeply.

#### Arguments
1. `methods` *(array|string): Method name(s)*.

---

<!-- /div -->

<!-- div -->

<h3 id="isEventMuted"><a href="#isEventMuted">#</a>&nbsp;<code>isEventMuted(eventName)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L743 "View in source") [&#x24C9;][1]

Check if an event is currently muted.

#### Arguments
1. `eventName` *(string)*: Event name.

---

<!-- /div -->

<!-- div -->

<h3 id="isTree"><a href="#isTree">#</a>&nbsp;<code>isTree(object)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L758 "View in source") [&#x24C9;][1]

Check if an object is a Tree.

#### Arguments
1. `object` *(object)*: Object

---

<!-- /div -->

<!-- div -->

<h3 id="join"><a href="#join">#</a>&nbsp;<code>join(separator)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L791 "View in source") [&#x24C9;][1]

Join nodes into a resulting string.

#### Arguments
1. `separator` *(string)*: Separator, defaults to a comma

---

<!-- /div -->

<!-- div -->

<h3 id="lastSelectedNode"><a href="#lastSelectedNode">#</a>&nbsp;<code>lastSelectedNode()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L801 "View in source") [&#x24C9;][1]

Get the most recently selected node, if any.

---

<!-- /div -->

<!-- div -->

<h3 id="load"><a href="#load">#</a>&nbsp;<code>load(loader)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L815 "View in source") [&#x24C9;][1]

Load data. Accepts an array, function, or promise.

#### Arguments
1. `loader` *(Promise|array|function)*: Array of nodes, function, or promise resolving an array of nodes.

#### Example
```js
tree.load($.getJSON('nodes.json'));
```
---

<!-- /div -->

<!-- div -->

<h3 id="loadMore"><a href="#loadMore">#</a>&nbsp;<code>loadMore(event)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L928 "View in source") [&#x24C9;][1]

Load additional nodes for the root context.

#### Arguments
1. `event` *(Event)*: Click or scroll event if DOM interaction triggered this call.

---

<!-- /div -->

<!-- div -->

<h3 id="loading"><a href="#loading">#</a>&nbsp;<code>loading(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L917 "View in source") [&#x24C9;][1]

Query for all nodes currently loading children.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="map"><a href="#map">#</a>&nbsp;<code>map(iteratee)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L939 "View in source") [&#x24C9;][1]

Create a new collection after passing every node through iteratee.

#### Arguments
1. `iteratee` *(function)*: Node iteratee.

---

<!-- /div -->

<!-- div -->

<h3 id="matched"><a href="#matched">#</a>&nbsp;<code>matched(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L950 "View in source") [&#x24C9;][1]

Query for all nodes matched in the last search.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="move"><a href="#move">#</a>&nbsp;<code>move(index, newIndex, target)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L963 "View in source") [&#x24C9;][1]

Move node at a given index to a new index.

#### Arguments
1. `index` *(int)*: Current index.
2. `newIndex` *(int)*: New index.
3. `target` *(TreeNodes)*: Target TreeNodes array. Defaults to this.

---

<!-- /div -->

<!-- div -->

<h3 id="muted"><a href="#muted">#</a>&nbsp;<code>muted()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L991 "View in source") [&#x24C9;][1]

Get current mute settings.

---

<!-- /div -->

<!-- div -->

<h3 id="node"><a href="#node">#</a>&nbsp;<code>node(id)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1002 "View in source") [&#x24C9;][1]

Get a node.

#### Arguments
1. `id` *(number|string)*: ID of node.

---

<!-- /div -->

<!-- div -->

<h3 id="nodes"><a href="#nodes">#</a>&nbsp;<code>nodes(refs)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1017 "View in source") [&#x24C9;][1]

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
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1027 "View in source") [&#x24C9;][1]

Get the root TreeNodes pagination.

---

<!-- /div -->

<!-- div -->

<h3 id="pop"><a href="#pop">#</a>&nbsp;<code>pop()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1037 "View in source") [&#x24C9;][1]

Pop node in the final index position.

---

<!-- /div -->

<!-- div -->

<h3 id="push"><a href="#push">#</a>&nbsp;<code>push(node)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1048 "View in source") [&#x24C9;][1]

Add a TreeNode to the end of the root collection.

#### Arguments
1. `node` *(TreeNode)*: Node object.

---

<!-- /div -->

<!-- div -->

<h3 id="reduce"><a href="#reduce">#</a>&nbsp;<code>reduce(iteratee)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1072 "View in source") [&#x24C9;][1]

Reduce nodes.

#### Arguments
1. `iteratee` *(function)*: Iteratee function

---

<!-- /div -->

<!-- div -->

<h3 id="reduceRight"><a href="#reduceRight">#</a>&nbsp;<code>reduceRight(iteratee)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1083 "View in source") [&#x24C9;][1]

Right-reduce root nodes.

#### Arguments
1. `iteratee` *(function)*: Iteratee function

---

<!-- /div -->

<!-- div -->

<h3 id="reload"><a href="#reload">#</a>&nbsp;<code>reload()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1093 "View in source") [&#x24C9;][1]

Reload/re-execute the original data loader.

---

<!-- /div -->

<!-- div -->

<h3 id="remove"><a href="#remove">#</a>&nbsp;<code>remove(node)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1106 "View in source") [&#x24C9;][1]

Remove a node.

#### Arguments
1. `node` *(TreeNode)*: Node object.

---

<!-- /div -->

<!-- div -->

<h3 id="removeAll"><a href="#removeAll">#</a>&nbsp;<code>removeAll()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1116 "View in source") [&#x24C9;][1]

Remove all nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="removed"><a href="#removed">#</a>&nbsp;<code>removed(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1130 "View in source") [&#x24C9;][1]

Query for all soft-removed nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="restore"><a href="#restore">#</a>&nbsp;<code>restore()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1140 "View in source") [&#x24C9;][1]

Restore nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="restoreDeep"><a href="#restoreDeep">#</a>&nbsp;<code>restoreDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1150 "View in source") [&#x24C9;][1]

Restore *(deeply)* all nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="reverse"><a href="#reverse">#</a>&nbsp;<code>reverse()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1160 "View in source") [&#x24C9;][1]

Reverse node order.

---

<!-- /div -->

<!-- div -->

<h3 id="search"><a href="#search">#</a>&nbsp;<code>search(query)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1171 "View in source") [&#x24C9;][1]

Search nodes, showing only those that match and the necessary hierarchy.

#### Arguments
1. `query` *(&#42;)*: Search string, RegExp, or function.

---

<!-- /div -->

<!-- div -->

<h3 id="select"><a href="#select">#</a>&nbsp;<code>select()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1260 "View in source") [&#x24C9;][1]

Select nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="selectBetween"><a href="#selectBetween">#</a>&nbsp;<code>selectBetween(startNode, endNode)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1284 "View in source") [&#x24C9;][1]

Select all nodes between a start and end node.
Starting node must have a higher index path so we can work down to endNode.

#### Arguments
1. `startNode` *(TreeNode)*: Starting node
2. `endNode` *(TreeNode)*: Ending node

---

<!-- /div -->

<!-- div -->

<h3 id="selectDeep"><a href="#selectDeep">#</a>&nbsp;<code>selectDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1305 "View in source") [&#x24C9;][1]

Select *(deeply)* all nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="selectFirstAvailableNode"><a href="#selectFirstAvailableNode">#</a>&nbsp;<code>selectFirstAvailableNode()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1326 "View in source") [&#x24C9;][1]

Select the first available node.

---

<!-- /div -->

<!-- div -->

<h3 id="selectable"><a href="#selectable">#</a>&nbsp;<code>selectable(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1271 "View in source") [&#x24C9;][1]

Query for all selectable nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="selected"><a href="#selected">#</a>&nbsp;<code>selected(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1316 "View in source") [&#x24C9;][1]

Query for all selected nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="shift"><a href="#shift">#</a>&nbsp;<code>shift()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1341 "View in source") [&#x24C9;][1]

Shift node in the first index position.

---

<!-- /div -->

<!-- div -->

<h3 id="show"><a href="#show">#</a>&nbsp;<code>show()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1351 "View in source") [&#x24C9;][1]

Show nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="showDeep"><a href="#showDeep">#</a>&nbsp;<code>showDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1361 "View in source") [&#x24C9;][1]

Show *(deeply)* all nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="slice"><a href="#slice">#</a>&nbsp;<code>slice(begin, end)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1373 "View in source") [&#x24C9;][1]

Get a shallow copy of a portion of nodes.

#### Arguments
1. `begin` *(int)*: Starting index.
2. `end` *(int)*: End index.

---

<!-- /div -->

<!-- div -->

<h3 id="softRemove"><a href="#softRemove">#</a>&nbsp;<code>softRemove()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1383 "View in source") [&#x24C9;][1]

Soft-remove nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="some"><a href="#some">#</a>&nbsp;<code>some(tester)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1394 "View in source") [&#x24C9;][1]

Check if at least one node passes the given test.

#### Arguments
1. `tester` *(function)*: Test each node in this collection,

---

<!-- /div -->

<!-- div -->

<h3 id="sort"><a href="#sort">#</a>&nbsp;<code>sort(compareFn)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1405 "View in source") [&#x24C9;][1]

Sort nodes using a function.

#### Arguments
1. `compareFn` *(function)*: Comparison function.

---

<!-- /div -->

<!-- div -->

<h3 id="sortBy"><a href="#sortBy">#</a>&nbsp;<code>sortBy(sorter)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1418 "View in source") [&#x24C9;][1]

Sort nodes using a function or key name.
<br>
<br>
If no custom sorter given, the configured "sort" value will be used.

#### Arguments
1. `sorter` *(function|string)*: Sort function or property name.

---

<!-- /div -->

<!-- div -->

<h3 id="splice"><a href="#splice">#</a>&nbsp;<code>splice(start, deleteCount, node)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1431 "View in source") [&#x24C9;][1]

Remove and/or add new TreeNodes into the root collection.

#### Arguments
1. `start` *(int)*: Starting index.
2. `deleteCount` *(int)*: Count of nodes to delete.
3. `node` *(TreeNode): Node(s)* to insert.

---

<!-- /div -->

<!-- div -->

<h3 id="state"><a href="#state">#</a>&nbsp;<code>state(name, newVal)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1443 "View in source") [&#x24C9;][1]

Set nodes' state values.

#### Arguments
1. `name` *(string)*: Property name.
2. `newVal` *(boolean)*: New value, if setting.

---

<!-- /div -->

<!-- div -->

<h3 id="stateDeep"><a href="#stateDeep">#</a>&nbsp;<code>stateDeep(name, newVal)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1455 "View in source") [&#x24C9;][1]

Set *(deeply)* nodes' state values.

#### Arguments
1. `name` *(string)*: Property name.
2. `newVal` *(boolean)*: New value, if setting.

---

<!-- /div -->

<!-- div -->

<h3 id="swap"><a href="#swap">#</a>&nbsp;<code>swap(node1, node2)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1467 "View in source") [&#x24C9;][1]

Swap two node positions.

#### Arguments
1. `node1` *(TreeNode)*: Node `1`.
2. `node2` *(TreeNode)*: Node `2`.

---

<!-- /div -->

<!-- div -->

<h3 id="toArray"><a href="#toArray">#</a>&nbsp;<code>toArray()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1477 "View in source") [&#x24C9;][1]

Get a native node Array.

---

<!-- /div -->

<!-- div -->

<h3 id="toString"><a href="#toString">#</a>&nbsp;<code>toString()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1487 "View in source") [&#x24C9;][1]

Get a string representation of node objects.

---

<!-- /div -->

<!-- div -->

<h3 id="unmute"><a href="#unmute">#</a>&nbsp;<code>unmute(events)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1498 "View in source") [&#x24C9;][1]

Resume events.

#### Arguments
1. `events` *(array)*: Events to unmute.

---

<!-- /div -->

<!-- div -->

<h3 id="unshift"><a href="#unshift">#</a>&nbsp;<code>unshift()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1519 "View in source") [&#x24C9;][1]

Add a TreeNode in the first index position.

---

<!-- /div -->

<!-- div -->

<h3 id="visible"><a href="#visible">#</a>&nbsp;<code>visible(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1530 "View in source") [&#x24C9;][1]

Query for all visible nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #tree "Jump back to the TOC."
