# 

<!-- div class="toc-container" -->

<!-- div -->

## `CopyNode`
* <a href="#to">`to`</a>

<!-- /div -->

<!-- div -->

## `TreeNodes`
* <a href="#addNode">`addNode`</a>
* <a href="#available">`available`</a>
* <a href="#blur">`blur`</a>
* <a href="#blurDeep">`blurDeep`</a>
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
* <a href="#node">`node`</a>
* <a href="#nodes">`nodes`</a>
* <a href="#recurseDown">`recurseDown`</a>
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

### <a id="to"></a>`to(dest)`
<a href="#to">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L269 "View in source") [&#x24C9;][1]

Sets a destination.

#### Arguments
1. `dest` *(object)*: Destination Inspire Tree.

---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“TreeNodes” Methods`

<!-- div -->

### <a id="addNode"></a>`addNode(object)`
<a href="#addNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L119 "View in source") [&#x24C9;][1]

Adds a new node to this collection. If a sort
method is configured, the node will be added
in the appropriate order.

#### Arguments
1. `object` *(object)*: Node

---

<!-- /div -->

<!-- div -->

### <a id="available"></a>`available(full)`
<a href="#available">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L138 "View in source") [&#x24C9;][1]

Query for all available nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

### <a id="blur"></a>`blur()`
<a href="#blur">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L148 "View in source") [&#x24C9;][1]

Blur children in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="blurDeep"></a>`blurDeep()`
<a href="#blurDeep">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L158 "View in source") [&#x24C9;][1]

Blur all children *(deeply)* in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="clean"></a>`clean()`
<a href="#clean">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L168 "View in source") [&#x24C9;][1]

Clean children in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="clone"></a>`clone()`
<a href="#clone">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L180 "View in source") [&#x24C9;][1]

Clones *(deep)* the array of nodes.
<br>
<br>
Note: Cloning will *not* clone the context pointer.

---

<!-- /div -->

<!-- div -->

### <a id="collapse"></a>`collapse()`
<a href="#collapse">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L190 "View in source") [&#x24C9;][1]

Collapse children in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="collapseDeep"></a>`collapseDeep()`
<a href="#collapseDeep">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L211 "View in source") [&#x24C9;][1]

Collapse all children *(deeply)* in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="collapsed"></a>`collapsed(full)`
<a href="#collapsed">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L201 "View in source") [&#x24C9;][1]

Query for all collapsed nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

### <a id="concat"></a>`concat(nodes)`
<a href="#concat">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L222 "View in source") [&#x24C9;][1]

Concat nodes like an Array would.

#### Arguments
1. `nodes` *(TreeNodes)*: Array of nodes.

---

<!-- /div -->

<!-- div -->

### <a id="context"></a>`context()`
<a href="#context">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L246 "View in source") [&#x24C9;][1]

Get the context of this collection. If a collection
of children, context is the parent node. Otherwise
the context is the tree itself.

---

<!-- /div -->

<!-- div -->

### <a id="copy"></a>`copy(hierarchy)`
<a href="#copy">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L257 "View in source") [&#x24C9;][1]

Copies nodes to a new tree instance.

#### Arguments
1. `hierarchy` *(boolean)*: Include necessary ancestors to match hierarchy.

---

<!-- /div -->

<!-- div -->

### <a id="deepest"></a>`deepest()`
<a href="#deepest">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L291 "View in source") [&#x24C9;][1]

Returns deepest nodes from this array.

---

<!-- /div -->

<!-- div -->

### <a id="deselect"></a>`deselect()`
<a href="#deselect">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L309 "View in source") [&#x24C9;][1]

Deselect children in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="deselectDeep"></a>`deselectDeep()`
<a href="#deselectDeep">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L319 "View in source") [&#x24C9;][1]

Deselect all children *(deeply)* in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="each"></a>`each(iteratee)`
<a href="#each">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L330 "View in source") [&#x24C9;][1]

Iterate every TreeNode in this collection.

#### Arguments
1. `iteratee` *(function)*: Iteratee invoke for each node.

---

<!-- /div -->

<!-- div -->

### <a id="editable"></a>`editable(full)`
<a href="#editable">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L343 "View in source") [&#x24C9;][1]

Query for all editable nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

### <a id="editing"></a>`editing(full)`
<a href="#editing">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L354 "View in source") [&#x24C9;][1]

Query for all nodes in editing mode.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

### <a id="expand"></a>`expand()`
<a href="#expand">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L364 "View in source") [&#x24C9;][1]

Expand children in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="expandDeep"></a>`expandDeep()`
<a href="#expandDeep">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L385 "View in source") [&#x24C9;][1]

Recursively expands all nodes, loading all dynamic calls.

---

<!-- /div -->

<!-- div -->

### <a id="expandParents"></a>`expandParents()`
<a href="#expandParents">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L420 "View in source") [&#x24C9;][1]

Expand parents of children in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="expanded"></a>`expanded(full)`
<a href="#expanded">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L375 "View in source") [&#x24C9;][1]

Query for all expanded nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

### <a id="extract"></a>`extract(predicate)`
<a href="#extract">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L434 "View in source") [&#x24C9;][1]

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
<a href="#filter">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L452 "View in source") [&#x24C9;][1]

Returns nodes which match a predicate.

#### Arguments
1. `predicate` *(function|string)*: State flag or custom function.

---

<!-- /div -->

<!-- div -->

### <a id="flatten"></a>`flatten(predicate)`
<a href="#flatten">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L473 "View in source") [&#x24C9;][1]

Flattens a hierarchy, returning only node(s) matching the
expected state or predicate function.

#### Arguments
1. `predicate` *(function|string)*: State property or custom function.

---

<!-- /div -->

<!-- div -->

### <a id="focused"></a>`focused(full)`
<a href="#focused">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L493 "View in source") [&#x24C9;][1]

Query for all focused nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

### <a id="get"></a>`get(index)`
<a href="#get">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L504 "View in source") [&#x24C9;][1]

Get a specific node in the collection, or undefined if it doesn't exist.

#### Arguments
1. `index` *(int)*: Numeric index of requested node.

---

<!-- /div -->

<!-- div -->

### <a id="hidden"></a>`hidden(full)`
<a href="#hidden">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L515 "View in source") [&#x24C9;][1]

Query for all hidden nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

### <a id="hide"></a>`hide()`
<a href="#hide">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L525 "View in source") [&#x24C9;][1]

Hide children in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="hideDeep"></a>`hideDeep()`
<a href="#hideDeep">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L535 "View in source") [&#x24C9;][1]

Hide all children *(deeply)* in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="indeterminate"></a>`indeterminate(full)`
<a href="#indeterminate">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L546 "View in source") [&#x24C9;][1]

Query for all indeterminate nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

### <a id="insertAt"></a>`insertAt(index, object)`
<a href="#insertAt">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L558 "View in source") [&#x24C9;][1]

Insert a new node at a given position.

#### Arguments
1. `index` *(integer)*: Index at which to insert the node.
2. `object` *(object)*: Raw node object or TreeNode.

---

<!-- /div -->

<!-- div -->

### <a id="invoke"></a>`invoke(methods, args)`
<a href="#invoke">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L622 "View in source") [&#x24C9;][1]

Invoke method(s) on each node.

#### Arguments
1. `methods` *(array|string): Method name(s)*.
2. `args` *(Arguments|array)*: Array of arguments to proxy.

---

<!-- /div -->

<!-- div -->

### <a id="invokeDeep"></a>`invokeDeep(methods, args)`
<a href="#invokeDeep">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L634 "View in source") [&#x24C9;][1]

Invoke method(s) deeply.

#### Arguments
1. `methods` *(array|string): Method name(s)*.
2. `args` *(Arguments|array)*: Array of arguments to proxy.

---

<!-- /div -->

<!-- div -->

### <a id="loading"></a>`loading(full)`
<a href="#loading">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L645 "View in source") [&#x24C9;][1]

Query for all loading nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

### <a id="node"></a>`node(id)`
<a href="#node">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L656 "View in source") [&#x24C9;][1]

Get a node.

#### Arguments
1. `id` *(number|string)*: ID of node.

---

<!-- /div -->

<!-- div -->

### <a id="nodes"></a>`nodes(refs)`
<a href="#nodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L685 "View in source") [&#x24C9;][1]

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

### <a id="recurseDown"></a>`recurseDown(iteratee)`
<a href="#recurseDown">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L717 "View in source") [&#x24C9;][1]

Iterate down all nodes and any children.

#### Arguments
1. `iteratee` *(function)*: Iteratee function.

---

<!-- /div -->

<!-- div -->

### <a id="removed"></a>`removed(full)`
<a href="#removed">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L730 "View in source") [&#x24C9;][1]

Query for all soft-removed nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

### <a id="restore"></a>`restore()`
<a href="#restore">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L740 "View in source") [&#x24C9;][1]

Restore children in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="restoreDeep"></a>`restoreDeep()`
<a href="#restoreDeep">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L750 "View in source") [&#x24C9;][1]

Restore all children *(deeply)* in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="select"></a>`select()`
<a href="#select">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L760 "View in source") [&#x24C9;][1]

Select children in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="selectDeep"></a>`selectDeep()`
<a href="#selectDeep">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L781 "View in source") [&#x24C9;][1]

Select all children *(deeply)* in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="selectable"></a>`selectable(full)`
<a href="#selectable">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L771 "View in source") [&#x24C9;][1]

Query for all selectable nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

### <a id="selected"></a>`selected(full)`
<a href="#selected">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L792 "View in source") [&#x24C9;][1]

Query for all selected nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- div -->

### <a id="show"></a>`show()`
<a href="#show">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L802 "View in source") [&#x24C9;][1]

Show children in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="showDeep"></a>`showDeep()`
<a href="#showDeep">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L812 "View in source") [&#x24C9;][1]

Show all children *(deeply)* in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="softRemove"></a>`softRemove()`
<a href="#softRemove">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L822 "View in source") [&#x24C9;][1]

Soft-remove children in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="sort"></a>`sort(sorter)`
<a href="#sort">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L835 "View in source") [&#x24C9;][1]

Sorts all TreeNode objects in this collection.
<br>
<br>
If no custom sorter given, the configured "sort" value will be used.

#### Arguments
1. `sorter` *(function|string)*: Sort function or property name.

---

<!-- /div -->

<!-- div -->

### <a id="state"></a>`state()`
<a href="#state">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L858 "View in source") [&#x24C9;][1]

Set state values for nodes in this collection.

---

<!-- /div -->

<!-- div -->

### <a id="stateDeep"></a>`stateDeep()`
<a href="#stateDeep">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L868 "View in source") [&#x24C9;][1]

Set state values recursively.

---

<!-- /div -->

<!-- div -->

### <a id="toArray"></a>`toArray()`
<a href="#toArray">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L888 "View in source") [&#x24C9;][1]

Returns a native Array of nodes.

---

<!-- /div -->

<!-- div -->

### <a id="tree"></a>`tree()`
<a href="#tree">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L878 "View in source") [&#x24C9;][1]

Chained method for returning a chain to the tree context.

---

<!-- /div -->

<!-- div -->

### <a id="visible"></a>`visible(full)`
<a href="#visible">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenodes.js#L905 "View in source") [&#x24C9;][1]

Query for all visible nodes.

#### Arguments
1. `full` *(boolean)*: Retain full hiearchy.

---

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #copynode "Jump back to the TOC."
