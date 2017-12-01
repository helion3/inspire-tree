# 

<!-- div class="toc-container" -->

<!-- div -->

## `Tree`
* <a href="#addnodenode">`addNode`</a>
* <a href="#addnodesnodes">`addNodes`</a>
* <a href="#availablefull">`available`</a>
* <a href="#blur">`blur`</a>
* <a href="#blurdeep">`blurDeep`</a>
* <a href="#boundingnodes">`boundingNodes`</a>
* <a href="#canautodeselect">`canAutoDeselect`</a>
* <a href="#checkedfull">`checked`</a>
* <a href="#clean">`clean`</a>
* <a href="#clearsearch">`clearSearch`</a>
* <a href="#clone">`clone`</a>
* <a href="#collapse">`collapse`</a>
* <a href="#collapsedeep">`collapseDeep`</a>
* <a href="#collapsedfull">`collapsed`</a>
* <a href="#concatnodes">`concat`</a>
* <a href="#copyhierarchy">`copy`</a>
* <a href="#createnodeobj">`createNode`</a>
* <a href="#deepest">`deepest`</a>
* <a href="#deselect">`deselect`</a>
* <a href="#deselectdeep">`deselectDeep`</a>
* <a href="#disabledeselection">`disableDeselection`</a>
* <a href="#eachiteratee">`each`</a>
* <a href="#editablefull">`editable`</a>
* <a href="#editingfull">`editing`</a>
* <a href="#enabledeselection">`enableDeselection`</a>
* <a href="#everytester">`every`</a>
* <a href="#expand">`expand`</a>
* <a href="#expanddeep">`expandDeep`</a>
* <a href="#expanded">`expanded`</a>
* <a href="#extractpredicate">`extract`</a>
* <a href="#filterpredicate">`filter`</a>
* <a href="#filterbypredicate">`filterBy`</a>
* <a href="#flattenpredicate">`flatten`</a>
* <a href="#focusedfull">`focused`</a>
* <a href="#foreachiteratee">`forEach`</a>
* <a href="#getindex">`get`</a>
* <a href="#hiddenfull">`hidden`</a>
* <a href="#hide">`hide`</a>
* <a href="#hidedeep">`hideDeep`</a>
* <a href="#indeterminatefull">`indeterminate`</a>
* <a href="#indexofnode">`indexOf`</a>
* <a href="#insertatindex-object">`insertAt`</a>
* <a href="#invokemethods">`invoke`</a>
* <a href="#invokedeepmethods">`invokeDeep`</a>
* <a href="#iseventmutedeventname">`isEventMuted`</a>
* <a href="#istreeobject">`isTree`</a>
* <a href="#joinseparator">`join`</a>
* <a href="#lastselectednode">`lastSelectedNode`</a>
* <a href="#loadloader">`load`</a>
* <a href="#loadmoreevent">`loadMore`</a>
* <a href="#loadingfull">`loading`</a>
* <a href="#mapiteratee">`map`</a>
* <a href="#matchedfull">`matched`</a>
* <a href="#moveindex-newindex-target">`move`</a>
* <a href="#muted">`muted`</a>
* <a href="#nodeid">`node`</a>
* <a href="#nodesrefs">`nodes`</a>
* <a href="#pagination">`pagination`</a>
* <a href="#pop">`pop`</a>
* <a href="#pushnode">`push`</a>
* <a href="#reduceiteratee">`reduce`</a>
* <a href="#reducerightiteratee">`reduceRight`</a>
* <a href="#reload">`reload`</a>
* <a href="#removenode">`remove`</a>
* <a href="#removeall">`removeAll`</a>
* <a href="#removedfull">`removed`</a>
* <a href="#restore">`restore`</a>
* <a href="#restoredeep">`restoreDeep`</a>
* <a href="#reverse">`reverse`</a>
* <a href="#searchquery">`search`</a>
* <a href="#select">`select`</a>
* <a href="#selectbetweenstartnode-endnode">`selectBetween`</a>
* <a href="#selectdeep">`selectDeep`</a>
* <a href="#selectfirstavailablenode">`selectFirstAvailableNode`</a>
* <a href="#selectablefull">`selectable`</a>
* <a href="#selectedfull">`selected`</a>
* <a href="#shift">`shift`</a>
* <a href="#show">`show`</a>
* <a href="#showdeep">`showDeep`</a>
* <a href="#slicebegin-end">`slice`</a>
* <a href="#softremove">`softRemove`</a>
* <a href="#sometester">`some`</a>
* <a href="#sortcomparefn">`sort`</a>
* <a href="#sortbysorter">`sortBy`</a>
* <a href="#splicestart-deletecount-node">`splice`</a>
* <a href="#statename-newval">`state`</a>
* <a href="#statedeepname-newval">`stateDeep`</a>
* <a href="#swapnode1-node2">`swap`</a>
* <a href="#toarray">`toArray`</a>
* <a href="#tostring">`toString`</a>
* <a href="#unmuteevents">`unmute`</a>
* <a href="#unshift">`unshift`</a>
* <a href="#visiblefull">`visible`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `“Tree” Methods`

<!-- div -->

<h3 id="addnodenode"><code>addNode(node)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L198 "View in source") [&#x24C9;][1]

Adds a new node. If a sort
method is configured, the node will be added
in the appropriate order.

#### Arguments
1. `node` *(object)*: Node

---

<!-- /div -->

<!-- div -->

<h3 id="addnodesnodes"><code>addNodes(nodes)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L209 "View in source") [&#x24C9;][1]

Add nodes.

#### Arguments
1. `nodes` *(array)*: Array of node objects.

---

<!-- /div -->

<!-- div -->

<h3 id="availablefull"><code>available(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L248 "View in source") [&#x24C9;][1]

Query for all available nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="blur"><code>blur()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L273 "View in source") [&#x24C9;][1]

Blur children in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="blurdeep"><code>blurDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L283 "View in source") [&#x24C9;][1]

Blur *(deeply)* all nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="boundingnodes"><code>boundingNodes()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L294 "View in source") [&#x24C9;][1]

Compares any number of TreeNode objects and returns
the minimum and maximum *(starting/ending)* nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="canautodeselect"><code>canAutoDeselect()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L314 "View in source") [&#x24C9;][1]

Check if the tree will auto-deselect currently selected nodes
when a new selection is made.

---

<!-- /div -->

<!-- div -->

<h3 id="checkedfull"><code>checked(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L325 "View in source") [&#x24C9;][1]

Query for all checked nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="clean"><code>clean()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L335 "View in source") [&#x24C9;][1]

Clean nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="clearsearch"><code>clearSearch()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L345 "View in source") [&#x24C9;][1]

Clear nodes matched by previous search, restore all nodes and collapse parents.

---

<!-- /div -->

<!-- div -->

<h3 id="clone"><code>clone()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L358 "View in source") [&#x24C9;][1]

Clones *(deeply)* the array of nodes.
<br>
<br>
Note: Cloning will *not* clone the context pointer.

---

<!-- /div -->

<!-- div -->

<h3 id="collapse"><code>collapse()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L368 "View in source") [&#x24C9;][1]

Collapse nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="collapsedeep"><code>collapseDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L389 "View in source") [&#x24C9;][1]

Collapse *(deeply)* all children.

---

<!-- /div -->

<!-- div -->

<h3 id="collapsedfull"><code>collapsed(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L379 "View in source") [&#x24C9;][1]

Query for all collapsed nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="concatnodes"><code>concat(nodes)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L400 "View in source") [&#x24C9;][1]

Concat multiple TreeNodes arrays.

#### Arguments
1. `nodes` *(TreeNodes)*: Array of nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="copyhierarchy"><code>copy(hierarchy)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L411 "View in source") [&#x24C9;][1]

Copy nodes to another tree instance.

#### Arguments
1. `hierarchy` *(boolean)*: Include necessary ancestors to match hierarchy.

---

<!-- /div -->

<!-- div -->

<h3 id="createnodeobj"><code>createNode(obj)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L422 "View in source") [&#x24C9;][1]

Creates a TreeNode without adding it. If the obj is already a TreeNode it's returned without modification.

#### Arguments
1. `obj` *(object)*: Source node object.

---

<!-- /div -->

<!-- div -->

<h3 id="deepest"><code>deepest()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L432 "View in source") [&#x24C9;][1]

Return deepest nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="deselect"><code>deselect()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L442 "View in source") [&#x24C9;][1]

Deselect nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="deselectdeep"><code>deselectDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L452 "View in source") [&#x24C9;][1]

Deselect *(deeply)* all nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="disabledeselection"><code>disableDeselection()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L462 "View in source") [&#x24C9;][1]

Disable auto-deselection of currently selected nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="eachiteratee"><code>each(iteratee)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L477 "View in source") [&#x24C9;][1]

Iterate each TreeNode.

#### Arguments
1. `iteratee` *(function)*: Iteratee invoke for each node.

---

<!-- /div -->

<!-- div -->

<h3 id="editablefull"><code>editable(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L499 "View in source") [&#x24C9;][1]

Query for all editable nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="editingfull"><code>editing(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L510 "View in source") [&#x24C9;][1]

Query for all nodes in editing mode.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="enabledeselection"><code>enableDeselection()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L520 "View in source") [&#x24C9;][1]

Enable auto-deselection of currently selected nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="everytester"><code>every(tester)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L488 "View in source") [&#x24C9;][1]

Check if every node passes the given test.

#### Arguments
1. `tester` *(function)*: Test each node in this collection,

---

<!-- /div -->

<!-- div -->

<h3 id="expand"><code>expand()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L547 "View in source") [&#x24C9;][1]

Expand children.

---

<!-- /div -->

<!-- div -->

<h3 id="expanddeep"><code>expandDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L557 "View in source") [&#x24C9;][1]

Expand *(deeply)* all nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="expanded"><code>expanded()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L567 "View in source") [&#x24C9;][1]

Query for all expanded nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="extractpredicate"><code>extract(predicate)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L581 "View in source") [&#x24C9;][1]

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

<h3 id="filterpredicate"><code>filter(predicate)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L592 "View in source") [&#x24C9;][1]

Filter all nodes matching the given predicate.

#### Arguments
1. `predicate` *(function)*: Test function.

---

<!-- /div -->

<!-- div -->

<h3 id="filterbypredicate"><code>filterBy(predicate)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L603 "View in source") [&#x24C9;][1]

Filter all nodes matching the given predicate.

#### Arguments
1. `predicate` *(function|string)*: State flag or custom function.

---

<!-- /div -->

<!-- div -->

<h3 id="flattenpredicate"><code>flatten(predicate)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L614 "View in source") [&#x24C9;][1]

Flatten and get only node(s) matching the expected state or predicate function.

#### Arguments
1. `predicate` *(function|string)*: State property or custom function.

---

<!-- /div -->

<!-- div -->

<h3 id="focusedfull"><code>focused(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L625 "View in source") [&#x24C9;][1]

Query for all focused nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="foreachiteratee"><code>forEach(iteratee)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L636 "View in source") [&#x24C9;][1]

Iterate each TreeNode.

#### Arguments
1. `iteratee` *(function)*: Iteratee invoke for each node.

---

<!-- /div -->

<!-- div -->

<h3 id="getindex"><code>get(index)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L647 "View in source") [&#x24C9;][1]

Get a specific node by its index, or undefined if it doesn't exist.

#### Arguments
1. `index` *(int)*: Numeric index of requested node.

---

<!-- /div -->

<!-- div -->

<h3 id="hiddenfull"><code>hidden(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L658 "View in source") [&#x24C9;][1]

Query for all hidden nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="hide"><code>hide()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L668 "View in source") [&#x24C9;][1]

Hide nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="hidedeep"><code>hideDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L678 "View in source") [&#x24C9;][1]

Hide *(deeply)* all nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="indeterminatefull"><code>indeterminate(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L689 "View in source") [&#x24C9;][1]

Query for all indeterminate nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="indexofnode"><code>indexOf(node)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L700 "View in source") [&#x24C9;][1]

Get the index of the given node.

#### Arguments
1. `node` *(TreeNode)*: Root tree node.

---

<!-- /div -->

<!-- div -->

<h3 id="insertatindex-object"><code>insertAt(index, object)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L712 "View in source") [&#x24C9;][1]

Insert a new node at the given position.

#### Arguments
1. `index` *(integer)*: Index at which to insert the node.
2. `object` *(object)*: Raw node object or TreeNode.

---

<!-- /div -->

<!-- div -->

<h3 id="invokemethods"><code>invoke(methods)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L723 "View in source") [&#x24C9;][1]

Invoke method(s) on each node.

#### Arguments
1. `methods` *(array|string): Method name(s)*.

---

<!-- /div -->

<!-- div -->

<h3 id="invokedeepmethods"><code>invokeDeep(methods)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L734 "View in source") [&#x24C9;][1]

Invoke method(s) deeply.

#### Arguments
1. `methods` *(array|string): Method name(s)*.

---

<!-- /div -->

<!-- div -->

<h3 id="iseventmutedeventname"><code>isEventMuted(eventName)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L745 "View in source") [&#x24C9;][1]

Check if an event is currently muted.

#### Arguments
1. `eventName` *(string)*: Event name.

---

<!-- /div -->

<!-- div -->

<h3 id="istreeobject"><code>isTree(object)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L760 "View in source") [&#x24C9;][1]

Check if an object is a Tree.

#### Arguments
1. `object` *(object)*: Object

---

<!-- /div -->

<!-- div -->

<h3 id="joinseparator"><code>join(separator)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L793 "View in source") [&#x24C9;][1]

Join nodes into a resulting string.

#### Arguments
1. `separator` *(string)*: Separator, defaults to a comma

---

<!-- /div -->

<!-- div -->

<h3 id="lastselectednode"><code>lastSelectedNode()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L803 "View in source") [&#x24C9;][1]

Get the most recently selected node, if any.

---

<!-- /div -->

<!-- div -->

<h3 id="loadloader"><code>load(loader)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L817 "View in source") [&#x24C9;][1]

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

<h3 id="loadmoreevent"><code>loadMore(event)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L939 "View in source") [&#x24C9;][1]

Load additional nodes for the root context.

#### Arguments
1. `event` *(Event)*: Click or scroll event if DOM interaction triggered this call.

---

<!-- /div -->

<!-- div -->

<h3 id="loadingfull"><code>loading(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L928 "View in source") [&#x24C9;][1]

Query for all nodes currently loading children.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="mapiteratee"><code>map(iteratee)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L950 "View in source") [&#x24C9;][1]

Create a new collection after passing every node through iteratee.

#### Arguments
1. `iteratee` *(function)*: Node iteratee.

---

<!-- /div -->

<!-- div -->

<h3 id="matchedfull"><code>matched(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L961 "View in source") [&#x24C9;][1]

Query for all nodes matched in the last search.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="moveindex-newindex-target"><code>move(index, newIndex, target)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L974 "View in source") [&#x24C9;][1]

Move node at a given index to a new index.

#### Arguments
1. `index` *(int)*: Current index.
2. `newIndex` *(int)*: New index.
3. `target` *(TreeNodes)*: Target TreeNodes array. Defaults to this.

---

<!-- /div -->

<!-- div -->

<h3 id="muted"><code>muted()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1002 "View in source") [&#x24C9;][1]

Get current mute settings.

---

<!-- /div -->

<!-- div -->

<h3 id="nodeid"><code>node(id)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1013 "View in source") [&#x24C9;][1]

Get a node.

#### Arguments
1. `id` *(number|string)*: ID of node.

---

<!-- /div -->

<!-- div -->

<h3 id="nodesrefs"><code>nodes(refs)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1028 "View in source") [&#x24C9;][1]

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

<h3 id="pagination"><code>pagination()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1038 "View in source") [&#x24C9;][1]

Get the root TreeNodes pagination.

---

<!-- /div -->

<!-- div -->

<h3 id="pop"><code>pop()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1048 "View in source") [&#x24C9;][1]

Pop node in the final index position.

---

<!-- /div -->

<!-- div -->

<h3 id="pushnode"><code>push(node)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1059 "View in source") [&#x24C9;][1]

Add a TreeNode to the end of the root collection.

#### Arguments
1. `node` *(TreeNode)*: Node object.

---

<!-- /div -->

<!-- div -->

<h3 id="reduceiteratee"><code>reduce(iteratee)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1083 "View in source") [&#x24C9;][1]

Reduce nodes.

#### Arguments
1. `iteratee` *(function)*: Iteratee function

---

<!-- /div -->

<!-- div -->

<h3 id="reducerightiteratee"><code>reduceRight(iteratee)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1094 "View in source") [&#x24C9;][1]

Right-reduce root nodes.

#### Arguments
1. `iteratee` *(function)*: Iteratee function

---

<!-- /div -->

<!-- div -->

<h3 id="reload"><code>reload()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1104 "View in source") [&#x24C9;][1]

Reload/re-execute the original data loader.

---

<!-- /div -->

<!-- div -->

<h3 id="removenode"><code>remove(node)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1117 "View in source") [&#x24C9;][1]

Remove a node.

#### Arguments
1. `node` *(TreeNode)*: Node object.

---

<!-- /div -->

<!-- div -->

<h3 id="removeall"><code>removeAll()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1127 "View in source") [&#x24C9;][1]

Remove all nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="removedfull"><code>removed(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1141 "View in source") [&#x24C9;][1]

Query for all soft-removed nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="restore"><code>restore()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1151 "View in source") [&#x24C9;][1]

Restore nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="restoredeep"><code>restoreDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1161 "View in source") [&#x24C9;][1]

Restore *(deeply)* all nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="reverse"><code>reverse()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1171 "View in source") [&#x24C9;][1]

Reverse node order.

---

<!-- /div -->

<!-- div -->

<h3 id="searchquery"><code>search(query)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1182 "View in source") [&#x24C9;][1]

Search nodes, showing only those that match and the necessary hierarchy.

#### Arguments
1. `query` *(&#42;)*: Search string, RegExp, or function.

---

<!-- /div -->

<!-- div -->

<h3 id="select"><code>select()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1271 "View in source") [&#x24C9;][1]

Select nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="selectbetweenstartnode-endnode"><code>selectBetween(startNode, endNode)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1295 "View in source") [&#x24C9;][1]

Select all nodes between a start and end node.
Starting node must have a higher index path so we can work down to endNode.

#### Arguments
1. `startNode` *(TreeNode)*: Starting node
2. `endNode` *(TreeNode)*: Ending node

---

<!-- /div -->

<!-- div -->

<h3 id="selectdeep"><code>selectDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1316 "View in source") [&#x24C9;][1]

Select *(deeply)* all nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="selectfirstavailablenode"><code>selectFirstAvailableNode()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1337 "View in source") [&#x24C9;][1]

Select the first available node.

---

<!-- /div -->

<!-- div -->

<h3 id="selectablefull"><code>selectable(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1282 "View in source") [&#x24C9;][1]

Query for all selectable nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="selectedfull"><code>selected(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1327 "View in source") [&#x24C9;][1]

Query for all selected nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="shift"><code>shift()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1352 "View in source") [&#x24C9;][1]

Shift node in the first index position.

---

<!-- /div -->

<!-- div -->

<h3 id="show"><code>show()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1362 "View in source") [&#x24C9;][1]

Show nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="showdeep"><code>showDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1372 "View in source") [&#x24C9;][1]

Show *(deeply)* all nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="slicebegin-end"><code>slice(begin, end)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1384 "View in source") [&#x24C9;][1]

Get a shallow copy of a portion of nodes.

#### Arguments
1. `begin` *(int)*: Starting index.
2. `end` *(int)*: End index.

---

<!-- /div -->

<!-- div -->

<h3 id="softremove"><code>softRemove()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1394 "View in source") [&#x24C9;][1]

Soft-remove nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="sometester"><code>some(tester)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1405 "View in source") [&#x24C9;][1]

Check if at least one node passes the given test.

#### Arguments
1. `tester` *(function)*: Test each node in this collection,

---

<!-- /div -->

<!-- div -->

<h3 id="sortcomparefn"><code>sort(compareFn)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1416 "View in source") [&#x24C9;][1]

Sort nodes using a function.

#### Arguments
1. `compareFn` *(function)*: Comparison function.

---

<!-- /div -->

<!-- div -->

<h3 id="sortbysorter"><code>sortBy(sorter)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1429 "View in source") [&#x24C9;][1]

Sort nodes using a function or key name.
<br>
<br>
If no custom sorter given, the configured "sort" value will be used.

#### Arguments
1. `sorter` *(function|string)*: Sort function or property name.

---

<!-- /div -->

<!-- div -->

<h3 id="splicestart-deletecount-node"><code>splice(start, deleteCount, node)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1442 "View in source") [&#x24C9;][1]

Remove and/or add new TreeNodes into the root collection.

#### Arguments
1. `start` *(int)*: Starting index.
2. `deleteCount` *(int)*: Count of nodes to delete.
3. `node` *(TreeNode): Node(s)* to insert.

---

<!-- /div -->

<!-- div -->

<h3 id="statename-newval"><code>state(name, newVal)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1454 "View in source") [&#x24C9;][1]

Set nodes' state values.

#### Arguments
1. `name` *(string)*: Property name.
2. `newVal` *(boolean)*: New value, if setting.

---

<!-- /div -->

<!-- div -->

<h3 id="statedeepname-newval"><code>stateDeep(name, newVal)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1466 "View in source") [&#x24C9;][1]

Set *(deeply)* nodes' state values.

#### Arguments
1. `name` *(string)*: Property name.
2. `newVal` *(boolean)*: New value, if setting.

---

<!-- /div -->

<!-- div -->

<h3 id="swapnode1-node2"><code>swap(node1, node2)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1478 "View in source") [&#x24C9;][1]

Swap two node positions.

#### Arguments
1. `node1` *(TreeNode)*: Node `1`.
2. `node2` *(TreeNode)*: Node `2`.

---

<!-- /div -->

<!-- div -->

<h3 id="toarray"><code>toArray()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1488 "View in source") [&#x24C9;][1]

Get a native node Array.

---

<!-- /div -->

<!-- div -->

<h3 id="tostring"><code>toString()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1498 "View in source") [&#x24C9;][1]

Get a string representation of node objects.

---

<!-- /div -->

<!-- div -->

<h3 id="unmuteevents"><code>unmute(events)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1509 "View in source") [&#x24C9;][1]

Resume events.

#### Arguments
1. `events` *(array)*: Events to unmute.

---

<!-- /div -->

<!-- div -->

<h3 id="unshift"><code>unshift()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1530 "View in source") [&#x24C9;][1]

Add a TreeNode in the first index position.

---

<!-- /div -->

<!-- div -->

<h3 id="visiblefull"><code>visible(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/tree.js#L1541 "View in source") [&#x24C9;][1]

Query for all visible nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #tree "Jump back to the TOC."
