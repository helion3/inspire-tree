# 

<!-- div class="toc-container" -->

<!-- div -->

## `CopyNode`
* <a href="#to:">`to:`</a>

<!-- /div -->

<!-- div -->

## `TreeNodes`
* <a href="#addNode">`addNode`</a>
* <a href="#available">`available`</a>
* <a href="#blur">`blur`</a>
* <a href="#blurDeep">`blurDeep`</a>
* <a href="#checked">`checked`</a>
* <a href="#clean">`clean`</a>
* <a href="#clone">`clone`</a>
* <a href="#collapse">`collapse`</a>
* <a href="#collapseDeep">`collapseDeep`</a>
* <a href="#collapsed">`collapsed`</a>
* <a href="#concat">`concat`</a>
* <a href="#context">`context`</a>
* <a href="#copy">`copy`</a>
* <a href="#deepest">`deepest`</a>
* <a href="#deselect">`deselect`</a>
* <a href="#deselectDeep">`deselectDeep`</a>
* <a href="#each">`each`</a>
* <a href="#editable">`editable`</a>
* <a href="#editing">`editing`</a>
* <a href="#expand">`expand`</a>
* <a href="#expandDeep">`expandDeep`</a>
* <a href="#expandParents">`expandParents`</a>
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
* <a href="#loading">`loading`</a>
* <a href="#matched">`matched`</a>
* <a href="#node">`node`</a>
* <a href="#nodes">`nodes`</a>
* <a href="#recurseDown">`recurseDown`</a>
* <a href="#remove">`remove`</a>
* <a href="#removed">`removed`</a>
* <a href="#restore">`restore`</a>
* <a href="#restoreDeep">`restoreDeep`</a>
* <a href="#select">`select`</a>
* <a href="#selectDeep">`selectDeep`</a>
* <a href="#selectable">`selectable`</a>
* <a href="#selected">`selected`</a>
* <a href="#show">`show`</a>
* <a href="#showDeep">`showDeep`</a>
* <a href="#softRemove">`softRemove`</a>
* <a href="#sort">`sort`</a>
* <a href="#state">`state`</a>
* <a href="#stateDeep">`stateDeep`</a>
* <a href="#toArray">`toArray`</a>
* <a href="#tree">`tree`</a>
* <a href="#visible">`visible`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `“CopyNode” Methods`

<!-- div -->

<h3 id="to:"><a href="#to:">#</a>&nbsp;<code>to:(dest)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L280 "View in source") [&#x24C9;][1]

Sets a destination.

#### Arguments
1. `dest` *(object)*: Destination Inspire Tree.

---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“TreeNodes” Methods`

<!-- div -->

<h3 id="addNode"><a href="#addNode">#</a>&nbsp;<code>addNode(object)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L121 "View in source") [&#x24C9;][1]

Adds a new node to this collection. If a sort
method is configured, the node will be added
in the appropriate order.

#### Arguments
1. `object` *(object)*: Node

---

<!-- /div -->

<!-- div -->

<h3 id="available"><a href="#available">#</a>&nbsp;<code>available(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L140 "View in source") [&#x24C9;][1]

Query for all available nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="blur"><a href="#blur">#</a>&nbsp;<code>blur()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L150 "View in source") [&#x24C9;][1]

Blur children in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="blurDeep"><a href="#blurDeep">#</a>&nbsp;<code>blurDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L160 "View in source") [&#x24C9;][1]

Blur all children *(deeply)* in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="checked"><a href="#checked">#</a>&nbsp;<code>checked(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L171 "View in source") [&#x24C9;][1]

Query for all checked nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="clean"><a href="#clean">#</a>&nbsp;<code>clean()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L181 "View in source") [&#x24C9;][1]

Clean children in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="clone"><a href="#clone">#</a>&nbsp;<code>clone()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L193 "View in source") [&#x24C9;][1]

Clones *(deep)* the array of nodes.
<br>
<br>
Note: Cloning will *not* clone the context pointer.

---

<!-- /div -->

<!-- div -->

<h3 id="collapse"><a href="#collapse">#</a>&nbsp;<code>collapse()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L203 "View in source") [&#x24C9;][1]

Collapse children in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="collapseDeep"><a href="#collapseDeep">#</a>&nbsp;<code>collapseDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L224 "View in source") [&#x24C9;][1]

Collapse all children *(deeply)* in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="collapsed"><a href="#collapsed">#</a>&nbsp;<code>collapsed(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L214 "View in source") [&#x24C9;][1]

Query for all collapsed nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="concat"><a href="#concat">#</a>&nbsp;<code>concat(nodes)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L235 "View in source") [&#x24C9;][1]

Concat nodes like an Array would.

#### Arguments
1. `nodes` *(TreeNodes)*: Array of nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="context"><a href="#context">#</a>&nbsp;<code>context()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L259 "View in source") [&#x24C9;][1]

Get the context of this collection. If a collection
of children, context is the parent node. Otherwise
the context is the tree itself.

---

<!-- /div -->

<!-- div -->

<h3 id="copy"><a href="#copy">#</a>&nbsp;<code>copy(hierarchy)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L270 "View in source") [&#x24C9;][1]

Copies nodes to a new tree instance.

#### Arguments
1. `hierarchy` *(boolean)*: Include necessary ancestors to match hierarchy.

---

<!-- /div -->

<!-- div -->

<h3 id="deepest"><a href="#deepest">#</a>&nbsp;<code>deepest()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L302 "View in source") [&#x24C9;][1]

Returns deepest nodes from this array.

---

<!-- /div -->

<!-- div -->

<h3 id="deselect"><a href="#deselect">#</a>&nbsp;<code>deselect()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L320 "View in source") [&#x24C9;][1]

Deselect children in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="deselectDeep"><a href="#deselectDeep">#</a>&nbsp;<code>deselectDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L330 "View in source") [&#x24C9;][1]

Deselect all children *(deeply)* in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="each"><a href="#each">#</a>&nbsp;<code>each(iteratee)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L341 "View in source") [&#x24C9;][1]

Iterate every TreeNode in this collection.

#### Arguments
1. `iteratee` *(function)*: Iteratee invoke for each node.

---

<!-- /div -->

<!-- div -->

<h3 id="editable"><a href="#editable">#</a>&nbsp;<code>editable(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L354 "View in source") [&#x24C9;][1]

Query for all editable nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="editing"><a href="#editing">#</a>&nbsp;<code>editing(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L365 "View in source") [&#x24C9;][1]

Query for all nodes in editing mode.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="expand"><a href="#expand">#</a>&nbsp;<code>expand()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L375 "View in source") [&#x24C9;][1]

Expand children in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="expandDeep"><a href="#expandDeep">#</a>&nbsp;<code>expandDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L396 "View in source") [&#x24C9;][1]

Recursively expands all nodes, loading all dynamic calls.

---

<!-- /div -->

<!-- div -->

<h3 id="expandParents"><a href="#expandParents">#</a>&nbsp;<code>expandParents()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L429 "View in source") [&#x24C9;][1]

Expand parents of children in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="expanded"><a href="#expanded">#</a>&nbsp;<code>expanded(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L386 "View in source") [&#x24C9;][1]

Query for all expanded nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="extract"><a href="#extract">#</a>&nbsp;<code>extract(predicate)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L443 "View in source") [&#x24C9;][1]

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
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L461 "View in source") [&#x24C9;][1]

Returns nodes which match a predicate.

#### Arguments
1. `predicate` *(function|string)*: State flag or custom function.

---

<!-- /div -->

<!-- div -->

<h3 id="flatten"><a href="#flatten">#</a>&nbsp;<code>flatten(predicate)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L482 "View in source") [&#x24C9;][1]

Flattens a hierarchy, returning only node(s) matching the
expected state or predicate function.

#### Arguments
1. `predicate` *(function|string)*: State property or custom function.

---

<!-- /div -->

<!-- div -->

<h3 id="focused"><a href="#focused">#</a>&nbsp;<code>focused(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L502 "View in source") [&#x24C9;][1]

Query for all focused nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="get"><a href="#get">#</a>&nbsp;<code>get(index)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L513 "View in source") [&#x24C9;][1]

Get a specific node in the collection, or undefined if it doesn't exist.

#### Arguments
1. `index` *(int)*: Numeric index of requested node.

---

<!-- /div -->

<!-- div -->

<h3 id="hidden"><a href="#hidden">#</a>&nbsp;<code>hidden(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L524 "View in source") [&#x24C9;][1]

Query for all hidden nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="hide"><a href="#hide">#</a>&nbsp;<code>hide()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L534 "View in source") [&#x24C9;][1]

Hide children in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="hideDeep"><a href="#hideDeep">#</a>&nbsp;<code>hideDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L544 "View in source") [&#x24C9;][1]

Hide all children *(deeply)* in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="indeterminate"><a href="#indeterminate">#</a>&nbsp;<code>indeterminate(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L555 "View in source") [&#x24C9;][1]

Query for all indeterminate nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="insertAt"><a href="#insertAt">#</a>&nbsp;<code>insertAt(index, object)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L567 "View in source") [&#x24C9;][1]

Insert a new node at a given position.

#### Arguments
1. `index` *(integer)*: Index at which to insert the node.
2. `object` *(object)*: Raw node object or TreeNode.

---

<!-- /div -->

<!-- div -->

<h3 id="invoke"><a href="#invoke">#</a>&nbsp;<code>invoke(methods, args)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L638 "View in source") [&#x24C9;][1]

Invoke method(s) on each node.

#### Arguments
1. `methods` *(array|string): Method name(s)*.
2. `args` *(Arguments|array)*: Array of arguments to proxy.

---

<!-- /div -->

<!-- div -->

<h3 id="invokeDeep"><a href="#invokeDeep">#</a>&nbsp;<code>invokeDeep(methods, args)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L650 "View in source") [&#x24C9;][1]

Invoke method(s) deeply.

#### Arguments
1. `methods` *(array|string): Method name(s)*.
2. `args` *(Arguments|array)*: Array of arguments to proxy.

---

<!-- /div -->

<!-- div -->

<h3 id="loading"><a href="#loading">#</a>&nbsp;<code>loading(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L661 "View in source") [&#x24C9;][1]

Query for all loading nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="matched"><a href="#matched">#</a>&nbsp;<code>matched(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L672 "View in source") [&#x24C9;][1]

Query for all nodes which matched the last search.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="node"><a href="#node">#</a>&nbsp;<code>node(id)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L683 "View in source") [&#x24C9;][1]

Get a node.

#### Arguments
1. `id` *(number|string)*: ID of node.

---

<!-- /div -->

<!-- div -->

<h3 id="nodes"><a href="#nodes">#</a>&nbsp;<code>nodes(refs)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L712 "View in source") [&#x24C9;][1]

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

<h3 id="recurseDown"><a href="#recurseDown">#</a>&nbsp;<code>recurseDown(iteratee)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L744 "View in source") [&#x24C9;][1]

Iterate down all nodes and any children.

#### Arguments
1. `iteratee` *(function)*: Iteratee function.

---

<!-- /div -->

<!-- div -->

<h3 id="remove"><a href="#remove">#</a>&nbsp;<code>remove(node)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L757 "View in source") [&#x24C9;][1]

Removes a node from this list.

#### Arguments
1. `node` *(TreeNode)*: Node object.

---

<!-- /div -->

<!-- div -->

<h3 id="removed"><a href="#removed">#</a>&nbsp;<code>removed(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L776 "View in source") [&#x24C9;][1]

Query for all soft-removed nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="restore"><a href="#restore">#</a>&nbsp;<code>restore()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L786 "View in source") [&#x24C9;][1]

Restore children in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="restoreDeep"><a href="#restoreDeep">#</a>&nbsp;<code>restoreDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L796 "View in source") [&#x24C9;][1]

Restore all children *(deeply)* in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="select"><a href="#select">#</a>&nbsp;<code>select()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L806 "View in source") [&#x24C9;][1]

Select children in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="selectDeep"><a href="#selectDeep">#</a>&nbsp;<code>selectDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L827 "View in source") [&#x24C9;][1]

Select all children *(deeply)* in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="selectable"><a href="#selectable">#</a>&nbsp;<code>selectable(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L817 "View in source") [&#x24C9;][1]

Query for all selectable nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="selected"><a href="#selected">#</a>&nbsp;<code>selected(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L838 "View in source") [&#x24C9;][1]

Query for all selected nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

<h3 id="show"><a href="#show">#</a>&nbsp;<code>show()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L848 "View in source") [&#x24C9;][1]

Show children in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="showDeep"><a href="#showDeep">#</a>&nbsp;<code>showDeep()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L858 "View in source") [&#x24C9;][1]

Show all children *(deeply)* in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="softRemove"><a href="#softRemove">#</a>&nbsp;<code>softRemove()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L868 "View in source") [&#x24C9;][1]

Soft-remove children in this collection.

---

<!-- /div -->

<!-- div -->

<h3 id="sort"><a href="#sort">#</a>&nbsp;<code>sort(sorter)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L881 "View in source") [&#x24C9;][1]

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
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L905 "View in source") [&#x24C9;][1]

Set state values for nodes in this collection.

#### Arguments
1. `name` *(string)*: Property name.
2. `newVal` *(boolean)*: New value, if setting.

---

<!-- /div -->

<!-- div -->

<h3 id="stateDeep"><a href="#stateDeep">#</a>&nbsp;<code>stateDeep(name, newVal)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L917 "View in source") [&#x24C9;][1]

Set state values recursively.

#### Arguments
1. `name` *(string)*: Property name.
2. `newVal` *(boolean)*: New value, if setting.

---

<!-- /div -->

<!-- div -->

<h3 id="toArray"><a href="#toArray">#</a>&nbsp;<code>toArray()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L937 "View in source") [&#x24C9;][1]

Returns a native Array of nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="tree"><a href="#tree">#</a>&nbsp;<code>tree()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L927 "View in source") [&#x24C9;][1]

Chained method for returning a chain to the tree context.

---

<!-- /div -->

<!-- div -->

<h3 id="visible"><a href="#visible">#</a>&nbsp;<code>visible(full)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L954 "View in source") [&#x24C9;][1]

Query for all visible nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #copynode "Jump back to the TOC."
