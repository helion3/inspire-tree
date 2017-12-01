# 

<!-- div class="toc-container" -->

<!-- div -->

## `CopyNode`
* <a href="#to:dest">`to:`</a>

<!-- /div -->

<!-- div -->

## `TreeNodes`
* <a href="#addnodeobject">`addNode`</a>
* <a href="#availablefull">`available`</a>
* <a href="#blur">`blur`</a>
* <a href="#blurdeep">`blurDeep`</a>
* <a href="#checkedfull">`checked`</a>
* <a href="#clean">`clean`</a>
* <a href="#clone">`clone`</a>
* <a href="#collapse">`collapse`</a>
* <a href="#collapsedeep">`collapseDeep`</a>
* <a href="#collapsedfull">`collapsed`</a>
* <a href="#concatnodes">`concat`</a>
* <a href="#context">`context`</a>
* <a href="#copyhierarchy">`copy`</a>
* <a href="#deepest">`deepest`</a>
* <a href="#deselect">`deselect`</a>
* <a href="#deselectdeep">`deselectDeep`</a>
* <a href="#eachiteratee">`each`</a>
* <a href="#editablefull">`editable`</a>
* <a href="#editingfull">`editing`</a>
* <a href="#expand">`expand`</a>
* <a href="#expanddeep">`expandDeep`</a>
* <a href="#expandparents">`expandParents`</a>
* <a href="#expandedfull">`expanded`</a>
* <a href="#extractpredicate">`extract`</a>
* <a href="#filterbypredicate">`filterBy`</a>
* <a href="#flattenpredicate">`flatten`</a>
* <a href="#focusedfull">`focused`</a>
* <a href="#foreachiteratee">`forEach`</a>
* <a href="#getindex">`get`</a>
* <a href="#hiddenfull">`hidden`</a>
* <a href="#hide">`hide`</a>
* <a href="#hidedeep">`hideDeep`</a>
* <a href="#indeterminatefull">`indeterminate`</a>
* <a href="#insertatindex-object">`insertAt`</a>
* <a href="#invokemethods-args">`invoke`</a>
* <a href="#invokedeepmethods-args">`invokeDeep`</a>
* <a href="#loadmoreevent">`loadMore`</a>
* <a href="#loadingfull">`loading`</a>
* <a href="#matchedfull">`matched`</a>
* <a href="#moveindex-newindex-target">`move`</a>
* <a href="#nodeid">`node`</a>
* <a href="#nodesrefs">`nodes`</a>
* <a href="#pagination">`pagination`</a>
* <a href="#recursedowniteratee">`recurseDown`</a>
* <a href="#removenode">`remove`</a>
* <a href="#removedfull">`removed`</a>
* <a href="#restore">`restore`</a>
* <a href="#restoredeep">`restoreDeep`</a>
* <a href="#select">`select`</a>
* <a href="#selectdeep">`selectDeep`</a>
* <a href="#selectablefull">`selectable`</a>
* <a href="#selectedfull">`selected`</a>
* <a href="#show">`show`</a>
* <a href="#showdeep">`showDeep`</a>
* <a href="#softremove">`softRemove`</a>
* <a href="#sortbysorter">`sortBy`</a>
* <a href="#statename-newval">`state`</a>
* <a href="#statedeepname-newval">`stateDeep`</a>
* <a href="#swapnode1-node2">`swap`</a>
* <a href="#toarray">`toArray`</a>
* <a href="#tree">`tree`</a>
* <a href="#visiblefull">`visible`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `“CopyNode” Methods`

<!-- div -->

<h3 id="to:dest"><code>to:(dest)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L293 "View in source") [&#x24C9;][1]

Sets a destination.

#### Arguments
1. `dest` *(object)*: Destination Inspire Tree.

---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“TreeNodes” Methods`

<!-- div -->

<h3 id="addnodeobject"><code>addNode(object)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L131 "View in source") [&#x24C9;][1]

Adds a new node. If a sort
method is configured, the node will be added
in the appropriate order.

#### Arguments
1. `object` *(object)*: Node

---

<!-- /div -->

<!-- div -->

<h3 id="availablefull"><code>available(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L150 "View in source") [&#x24C9;][1]

Query for all available nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="blur"><code>blur()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L160 "View in source") [&#x24C9;][1]

Blur nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="blurdeep"><code>blurDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L170 "View in source") [&#x24C9;][1]

Blur *(deeply)* all nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="checkedfull"><code>checked(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L181 "View in source") [&#x24C9;][1]

Query for all checked nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="clean"><code>clean()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L191 "View in source") [&#x24C9;][1]

Clean nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="clone"><code>clone()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L203 "View in source") [&#x24C9;][1]

Clones *(deeply)* the array of nodes.
<br>
<br>
Note: Cloning will *not* clone the context pointer.

---

<!-- /div -->

<!-- div -->

<h3 id="collapse"><code>collapse()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L213 "View in source") [&#x24C9;][1]

Collapse nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="collapsedeep"><code>collapseDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L234 "View in source") [&#x24C9;][1]

Collapse *(deeply)* all children.

---

<!-- /div -->

<!-- div -->

<h3 id="collapsedfull"><code>collapsed(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L224 "View in source") [&#x24C9;][1]

Query for all collapsed nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="concatnodes"><code>concat(nodes)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L245 "View in source") [&#x24C9;][1]

Concat multiple TreeNodes arrays.

#### Arguments
1. `nodes` *(TreeNodes)*: Array of nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="context"><code>context()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L272 "View in source") [&#x24C9;][1]

Get the context of this collection. If a collection
of children, context is the parent node. Otherwise
the context is the tree itself.

---

<!-- /div -->

<!-- div -->

<h3 id="copyhierarchy"><code>copy(hierarchy)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L283 "View in source") [&#x24C9;][1]

Copy nodes to another tree instance.

#### Arguments
1. `hierarchy` *(boolean)*: Include necessary ancestors to match hierarchy.

---

<!-- /div -->

<!-- div -->

<h3 id="deepest"><code>deepest()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L315 "View in source") [&#x24C9;][1]

Return deepest nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="deselect"><code>deselect()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L333 "View in source") [&#x24C9;][1]

Deselect nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="deselectdeep"><code>deselectDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L343 "View in source") [&#x24C9;][1]

Deselect *(deeply)* all nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="eachiteratee"><code>each(iteratee)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L354 "View in source") [&#x24C9;][1]

Iterate each TreeNode.

#### Arguments
1. `iteratee` *(function)*: Iteratee invoke for each node.

---

<!-- /div -->

<!-- div -->

<h3 id="editablefull"><code>editable(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L367 "View in source") [&#x24C9;][1]

Query for all editable nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="editingfull"><code>editing(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L378 "View in source") [&#x24C9;][1]

Query for all nodes in editing mode.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="expand"><code>expand()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L388 "View in source") [&#x24C9;][1]

Expand nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="expanddeep"><code>expandDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L409 "View in source") [&#x24C9;][1]

Expand *(deeply)* all nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="expandparents"><code>expandParents()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L442 "View in source") [&#x24C9;][1]

Expand parents.

---

<!-- /div -->

<!-- div -->

<h3 id="expandedfull"><code>expanded(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L399 "View in source") [&#x24C9;][1]

Query for all expanded nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="extractpredicate"><code>extract(predicate)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L456 "View in source") [&#x24C9;][1]

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

<h3 id="filterbypredicate"><code>filterBy(predicate)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L474 "View in source") [&#x24C9;][1]

Filter all nodes matching the given predicate.

#### Arguments
1. `predicate` *(function|string)*: State flag or custom function.

---

<!-- /div -->

<!-- div -->

<h3 id="flattenpredicate"><code>flatten(predicate)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L494 "View in source") [&#x24C9;][1]

Flatten and get only node(s) matching the expected state or predicate function.

#### Arguments
1. `predicate` *(function|string)*: State property or custom function.

---

<!-- /div -->

<!-- div -->

<h3 id="focusedfull"><code>focused(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L514 "View in source") [&#x24C9;][1]

Query for all focused nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="foreachiteratee"><code>forEach(iteratee)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L525 "View in source") [&#x24C9;][1]

Iterate each TreeNode.

#### Arguments
1. `iteratee` *(function)*: Iteratee invoke for each node.

---

<!-- /div -->

<!-- div -->

<h3 id="getindex"><code>get(index)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L536 "View in source") [&#x24C9;][1]

Get a specific node by its index, or undefined if it doesn't exist.

#### Arguments
1. `index` *(int)*: Numeric index of requested node.

---

<!-- /div -->

<!-- div -->

<h3 id="hiddenfull"><code>hidden(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L547 "View in source") [&#x24C9;][1]

Query for all hidden nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="hide"><code>hide()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L557 "View in source") [&#x24C9;][1]

Hide nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="hidedeep"><code>hideDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L567 "View in source") [&#x24C9;][1]

Hide *(deeply)* all nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="indeterminatefull"><code>indeterminate(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L578 "View in source") [&#x24C9;][1]

Query for all indeterminate nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="insertatindex-object"><code>insertAt(index, object)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L590 "View in source") [&#x24C9;][1]

Insert a new node at a given position.

#### Arguments
1. `index` *(integer)*: Index at which to insert the node.
2. `object` *(object)*: Raw node object or TreeNode.

---

<!-- /div -->

<!-- div -->

<h3 id="invokemethods-args"><code>invoke(methods, args)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L661 "View in source") [&#x24C9;][1]

Invoke method(s) on each node.

#### Arguments
1. `methods` *(array|string): Method name(s)*.
2. `args` *(Arguments|array)*: Array of arguments to proxy.

---

<!-- /div -->

<!-- div -->

<h3 id="invokedeepmethods-args"><code>invokeDeep(methods, args)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L673 "View in source") [&#x24C9;][1]

Invoke method(s) deeply.

#### Arguments
1. `methods` *(array|string): Method name(s)*.
2. `args` *(Arguments|array)*: Array of arguments to proxy.

---

<!-- /div -->

<!-- div -->

<h3 id="loadmoreevent"><code>loadMore(event)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L695 "View in source") [&#x24C9;][1]

Loads additional nodes for this context.

#### Arguments
1. `event` *(Event)*: Click or scroll event if DOM interaction triggered this call.

---

<!-- /div -->

<!-- div -->

<h3 id="loadingfull"><code>loading(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L684 "View in source") [&#x24C9;][1]

Query for all nodes currently loading children.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="matchedfull"><code>matched(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L758 "View in source") [&#x24C9;][1]

Query for all nodes matched in the last search.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="moveindex-newindex-target"><code>move(index, newIndex, target)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L771 "View in source") [&#x24C9;][1]

Move node at a given index to a new index.

#### Arguments
1. `index` *(int)*: Current index.
2. `newIndex` *(int)*: New index.
3. `target` *(TreeNodes)*: Target TreeNodes array. Defaults to this.

---

<!-- /div -->

<!-- div -->

<h3 id="nodeid"><code>node(id)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L791 "View in source") [&#x24C9;][1]

Get a node.

#### Arguments
1. `id` *(number|string)*: ID of node.

---

<!-- /div -->

<!-- div -->

<h3 id="nodesrefs"><code>nodes(refs)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L816 "View in source") [&#x24C9;][1]

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
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L838 "View in source") [&#x24C9;][1]

Get the pagination.

---

<!-- /div -->

<!-- div -->

<h3 id="recursedowniteratee"><code>recurseDown(iteratee)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L851 "View in source") [&#x24C9;][1]

Iterate down all nodes and any children.
<br>
<br>
Return false to stop execution.

#### Arguments
1. `iteratee` *(function)*: Iteratee function.

---

<!-- /div -->

<!-- div -->

<h3 id="removenode"><code>remove(node)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L864 "View in source") [&#x24C9;][1]

Remove a node.

#### Arguments
1. `node` *(TreeNode)*: Node object.

---

<!-- /div -->

<!-- div -->

<h3 id="removedfull"><code>removed(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L881 "View in source") [&#x24C9;][1]

Query for all soft-removed nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="restore"><code>restore()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L891 "View in source") [&#x24C9;][1]

Restore nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="restoredeep"><code>restoreDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L901 "View in source") [&#x24C9;][1]

Restore *(deeply)* all nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="select"><code>select()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L911 "View in source") [&#x24C9;][1]

Select nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="selectdeep"><code>selectDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L932 "View in source") [&#x24C9;][1]

Select *(deeply)* all nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="selectablefull"><code>selectable(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L922 "View in source") [&#x24C9;][1]

Query for all selectable nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="selectedfull"><code>selected(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L943 "View in source") [&#x24C9;][1]

Query for all selected nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="show"><code>show()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L953 "View in source") [&#x24C9;][1]

Show nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="showdeep"><code>showDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L963 "View in source") [&#x24C9;][1]

Show *(deeply)* all nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="softremove"><code>softRemove()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L973 "View in source") [&#x24C9;][1]

Soft-remove nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="sortbysorter"><code>sortBy(sorter)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L986 "View in source") [&#x24C9;][1]

Sorts all TreeNode objects in this collection.
<br>
<br>
If no custom sorter given, the configured "sort" value will be used.

#### Arguments
1. `sorter` *(function|string)*: Sort function or property name.

---

<!-- /div -->

<!-- div -->

<h3 id="statename-newval"><code>state(name, newVal)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L1010 "View in source") [&#x24C9;][1]

Set nodes' state values.

#### Arguments
1. `name` *(string)*: Property name.
2. `newVal` *(boolean)*: New value, if setting.

---

<!-- /div -->

<!-- div -->

<h3 id="statedeepname-newval"><code>stateDeep(name, newVal)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L1022 "View in source") [&#x24C9;][1]

Set *(deeply)* nodes' state values.

#### Arguments
1. `name` *(string)*: Property name.
2. `newVal` *(boolean)*: New value, if setting.

---

<!-- /div -->

<!-- div -->

<h3 id="swapnode1-node2"><code>swap(node1, node2)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L1034 "View in source") [&#x24C9;][1]

Swaps two node positions.

#### Arguments
1. `node1` *(TreeNode)*: Node `1`.
2. `node2` *(TreeNode)*: Node `2`.

---

<!-- /div -->

<!-- div -->

<h3 id="toarray"><code>toArray()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L1085 "View in source") [&#x24C9;][1]

Get a native node Array.

---

<!-- /div -->

<!-- div -->

<h3 id="tree"><code>tree()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L1075 "View in source") [&#x24C9;][1]

Get the tree instance.

---

<!-- /div -->

<!-- div -->

<h3 id="visiblefull"><code>visible(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L1102 "View in source") [&#x24C9;][1]

Query for all visible nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #copynode "Jump back to the TOC."
