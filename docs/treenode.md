# 

<!-- div class="toc-container" -->

<!-- div -->

## `CopyNode`
* <a href="#to:">`to:`</a>

<!-- /div -->

<!-- div -->

## `TreeNode`
* <a href="#addChild">`addChild`</a>
* <a href="#addChildren">`addChildren`</a>
* <a href="#available">`available`</a>
* <a href="#blur">`blur`</a>
* <a href="#check">`check`</a>
* <a href="#checked">`checked`</a>
* <a href="#clean">`clean`</a>
* <a href="#clone">`clone`</a>
* <a href="#collapse">`collapse`</a>
* <a href="#collapsed">`collapsed`</a>
* <a href="#context">`context`</a>
* <a href="#copy">`copy`</a>
* <a href="#copyHierarchy">`copyHierarchy`</a>
* <a href="#deselect">`deselect`</a>
* <a href="#editable">`editable`</a>
* <a href="#editing">`editing`</a>
* <a href="#expand">`expand`</a>
* <a href="#expandParents">`expandParents`</a>
* <a href="#expanded">`expanded`</a>
* <a href="#focus">`focus`</a>
* <a href="#focused">`focused`</a>
* <a href="#getChildren">`getChildren`</a>
* <a href="#getParent">`getParent`</a>
* <a href="#getParents">`getParents`</a>
* <a href="#getTextualHierarchy">`getTextualHierarchy`</a>
* <a href="#hasAncestor">`hasAncestor`</a>
* <a href="#hasChildren">`hasChildren`</a>
* <a href="#hasLoadedChildren">`hasLoadedChildren`</a>
* <a href="#hasOrWillHaveChildren">`hasOrWillHaveChildren`</a>
* <a href="#hasParent">`hasParent`</a>
* <a href="#hasVisibleChildren">`hasVisibleChildren`</a>
* <a href="#hidden">`hidden`</a>
* <a href="#hide">`hide`</a>
* <a href="#indeterminate">`indeterminate`</a>
* <a href="#indexPath">`indexPath`</a>
* <a href="#lastDeepestVisibleChild">`lastDeepestVisibleChild`</a>
* <a href="#loadChildren">`loadChildren`</a>
* <a href="#loadMore">`loadMore`</a>
* <a href="#loading">`loading`</a>
* <a href="#markDirty">`markDirty`</a>
* <a href="#matched">`matched`</a>
* <a href="#nextVisibleAncestralSiblingNode">`nextVisibleAncestralSiblingNode`</a>
* <a href="#nextVisibleChildNode">`nextVisibleChildNode`</a>
* <a href="#nextVisibleNode">`nextVisibleNode`</a>
* <a href="#nextVisibleSiblingNode">`nextVisibleSiblingNode`</a>
* <a href="#pagination">`pagination`</a>
* <a href="#previousVisibleNode">`previousVisibleNode`</a>
* <a href="#previousVisibleSiblingNode">`previousVisibleSiblingNode`</a>
* <a href="#recurseDown">`recurseDown`</a>
* <a href="#recurseUp">`recurseUp`</a>
* <a href="#refreshIndeterminateState">`refreshIndeterminateState`</a>
* <a href="#reload">`reload`</a>
* <a href="#remove">`remove`</a>
* <a href="#removed">`removed`</a>
* <a href="#rendered">`rendered`</a>
* <a href="#restore">`restore`</a>
* <a href="#select">`select`</a>
* <a href="#selectable">`selectable`</a>
* <a href="#selected">`selected`</a>
* <a href="#set">`set`</a>
* <a href="#show">`show`</a>
* <a href="#softRemove">`softRemove`</a>
* <a href="#state">`state`</a>
* <a href="#swap">`swap`</a>
* <a href="#toObject">`toObject`</a>
* <a href="#toggleCheck">`toggleCheck`</a>
* <a href="#toggleCollapse">`toggleCollapse`</a>
* <a href="#toggleEditing">`toggleEditing`</a>
* <a href="#toggleSelect">`toggleSelect`</a>
* <a href="#tree">`tree`</a>
* <a href="#uncheck">`uncheck`</a>
* <a href="#visible">`visible`</a>

<!-- /div -->

<!-- div -->

## `Methods`
* <a href="#states">`states`</a>
* <a href="#toString">`toString`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `“CopyNode” Methods`

<!-- div -->

<h3 id="to:"><a href="#to:">#</a>&nbsp;<code>to:(dest)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L264 "View in source") [&#x24C9;][1]

Sets a destination.

#### Arguments
1. `dest` *(object)*: Destination Inspire Tree.

---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“TreeNode” Methods`

<!-- div -->

<h3 id="addChild"><a href="#addChild">#</a>&nbsp;<code>addChild(child)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L83 "View in source") [&#x24C9;][1]

Add a child to this node.

#### Arguments
1. `child` *(object)*: Node object.

---

<!-- /div -->

<!-- div -->

<h3 id="addChildren"><a href="#addChildren">#</a>&nbsp;<code>addChildren(children)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L99 "View in source") [&#x24C9;][1]

Add multiple children to this node.

#### Arguments
1. `children` *(object)*: Array of nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="available"><a href="#available">#</a>&nbsp;<code>available()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L127 "View in source") [&#x24C9;][1]

Check if node available.

---

<!-- /div -->

<!-- div -->

<h3 id="blur"><a href="#blur">#</a>&nbsp;<code>blur()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L137 "View in source") [&#x24C9;][1]

Blur focus from this node.

---

<!-- /div -->

<!-- div -->

<h3 id="check"><a href="#check">#</a>&nbsp;<code>check(shallow)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L150 "View in source") [&#x24C9;][1]

Mark node as checked.

#### Arguments
1. `shallow` *(boolean)*: Skip auto-checking children.

---

<!-- /div -->

<!-- div -->

<h3 id="checked"><a href="#checked">#</a>&nbsp;<code>checked()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L177 "View in source") [&#x24C9;][1]

Get whether this node is checked.

---

<!-- /div -->

<!-- div -->

<h3 id="clean"><a href="#clean">#</a>&nbsp;<code>clean()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L187 "View in source") [&#x24C9;][1]

Hide parents without any visible children.

---

<!-- /div -->

<!-- div -->

<h3 id="clone"><a href="#clone">#</a>&nbsp;<code>clone(excludeKeys)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L207 "View in source") [&#x24C9;][1]

Clone this node.

#### Arguments
1. `excludeKeys` *(array)*: Keys to exclude from the clone.

---

<!-- /div -->

<!-- div -->

<h3 id="collapse"><a href="#collapse">#</a>&nbsp;<code>collapse()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L217 "View in source") [&#x24C9;][1]

Collapse this node.

---

<!-- /div -->

<!-- div -->

<h3 id="collapsed"><a href="#collapsed">#</a>&nbsp;<code>collapsed()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L227 "View in source") [&#x24C9;][1]

Get whether this node is collapsed.

---

<!-- /div -->

<!-- div -->

<h3 id="context"><a href="#context">#</a>&nbsp;<code>context()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L237 "View in source") [&#x24C9;][1]

Get the containing context. If no parent present, the root context is returned.

---

<!-- /div -->

<!-- div -->

<h3 id="copy"><a href="#copy">#</a>&nbsp;<code>copy(hierarchy)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L248 "View in source") [&#x24C9;][1]

Copy node to another tree instance.

#### Arguments
1. `hierarchy` *(boolean)*: Include necessary ancestors to match hierarchy.

---

<!-- /div -->

<!-- div -->

<h3 id="copyHierarchy"><a href="#copyHierarchy">#</a>&nbsp;<code>copyHierarchy(excludeNode)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L281 "View in source") [&#x24C9;][1]

Copy all parents of a node.

#### Arguments
1. `excludeNode` *(boolean)*: Exclude given node from hierarchy.

---

<!-- /div -->

<!-- div -->

<h3 id="deselect"><a href="#deselect">#</a>&nbsp;<code>deselect(shallow)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L334 "View in source") [&#x24C9;][1]

Deselect this node.
<br>
<br>
If selection.require is true and this is the last selected
node, the node will remain in a selected state.

#### Arguments
1. `shallow` *(boolean)*: Skip auto-deselecting children.

---

<!-- /div -->

<!-- div -->

<h3 id="editable"><a href="#editable">#</a>&nbsp;<code>editable()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L355 "View in source") [&#x24C9;][1]

Get weather node editable. Required editing.edit to be enable via config.

---

<!-- /div -->

<!-- div -->

<h3 id="editing"><a href="#editing">#</a>&nbsp;<code>editing()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L365 "View in source") [&#x24C9;][1]

Get weather node is currently in edit mode.

---

<!-- /div -->

<!-- div -->

<h3 id="expand"><a href="#expand">#</a>&nbsp;<code>expand()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L375 "View in source") [&#x24C9;][1]

Expand this node.

---

<!-- /div -->

<!-- div -->

<h3 id="expandParents"><a href="#expandParents">#</a>&nbsp;<code>expandParents()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L419 "View in source") [&#x24C9;][1]

Expand parent nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="expanded"><a href="#expanded">#</a>&nbsp;<code>expanded()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L409 "View in source") [&#x24C9;][1]

Get weather node expanded.

---

<!-- /div -->

<!-- div -->

<h3 id="focus"><a href="#focus">#</a>&nbsp;<code>focus()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L435 "View in source") [&#x24C9;][1]

Focus a node without changing its selection.

---

<!-- /div -->

<!-- div -->

<h3 id="focused"><a href="#focused">#</a>&nbsp;<code>focused()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L459 "View in source") [&#x24C9;][1]

Get weather this node is focused.

---

<!-- /div -->

<!-- div -->

<h3 id="getChildren"><a href="#getChildren">#</a>&nbsp;<code>getChildren()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L470 "View in source") [&#x24C9;][1]

Get children for this node. If no children exist, an empty TreeNodes
collection is returned for safe chaining.

---

<!-- /div -->

<!-- div -->

<h3 id="getParent"><a href="#getParent">#</a>&nbsp;<code>getParent()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L480 "View in source") [&#x24C9;][1]

Get the immediate parent, if any.

---

<!-- /div -->

<!-- div -->

<h3 id="getParents"><a href="#getParents">#</a>&nbsp;<code>getParents()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L490 "View in source") [&#x24C9;][1]

Get parent nodes. Excludes any siblings.

---

<!-- /div -->

<!-- div -->

<h3 id="getTextualHierarchy"><a href="#getTextualHierarchy">#</a>&nbsp;<code>getTextualHierarchy()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L509 "View in source") [&#x24C9;][1]

Get a textual hierarchy for a given node. An array
of text from this node's root ancestor to the given node.

---

<!-- /div -->

<!-- div -->

<h3 id="hasAncestor"><a href="#hasAncestor">#</a>&nbsp;<code>hasAncestor(node)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L526 "View in source") [&#x24C9;][1]

Get weather the given node is an ancestor of this node.

#### Arguments
1. `node` *(TreeNode)*: Node object.

---

<!-- /div -->

<!-- div -->

<h3 id="hasChildren"><a href="#hasChildren">#</a>&nbsp;<code>hasChildren()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L539 "View in source") [&#x24C9;][1]

Get weather node has any children.

---

<!-- /div -->

<!-- div -->

<h3 id="hasLoadedChildren"><a href="#hasLoadedChildren">#</a>&nbsp;<code>hasLoadedChildren()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L549 "View in source") [&#x24C9;][1]

Get weather children have been loaded. Will always be true for non-dynamic nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="hasOrWillHaveChildren"><a href="#hasOrWillHaveChildren">#</a>&nbsp;<code>hasOrWillHaveChildren()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L559 "View in source") [&#x24C9;][1]

Get weather node has any children, or allows dynamic loading.

---

<!-- /div -->

<!-- div -->

<h3 id="hasParent"><a href="#hasParent">#</a>&nbsp;<code>hasParent()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L569 "View in source") [&#x24C9;][1]

Get weather node has a parent.

---

<!-- /div -->

<!-- div -->

<h3 id="hasVisibleChildren"><a href="#hasVisibleChildren">#</a>&nbsp;<code>hasVisibleChildren()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L579 "View in source") [&#x24C9;][1]

Get weather node has any visible children.

---

<!-- /div -->

<!-- div -->

<h3 id="hidden"><a href="#hidden">#</a>&nbsp;<code>hidden()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L612 "View in source") [&#x24C9;][1]

Get weather this node is hidden.

---

<!-- /div -->

<!-- div -->

<h3 id="hide"><a href="#hide">#</a>&nbsp;<code>hide()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L595 "View in source") [&#x24C9;][1]

Hide this node.

---

<!-- /div -->

<!-- div -->

<h3 id="indeterminate"><a href="#indeterminate">#</a>&nbsp;<code>indeterminate()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L638 "View in source") [&#x24C9;][1]

Get weather this node is indeterminate.

---

<!-- /div -->

<!-- div -->

<h3 id="indexPath"><a href="#indexPath">#</a>&nbsp;<code>indexPath()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L622 "View in source") [&#x24C9;][1]

Get a "path" of indices, values which map this node's location within all parent contexts.

---

<!-- /div -->

<!-- div -->

<h3 id="lastDeepestVisibleChild"><a href="#lastDeepestVisibleChild">#</a>&nbsp;<code>lastDeepestVisibleChild()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L648 "View in source") [&#x24C9;][1]

Find the last + deepest visible child of the previous sibling.

---

<!-- /div -->

<!-- div -->

<h3 id="loadChildren"><a href="#loadChildren">#</a>&nbsp;<code>loadChildren()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L679 "View in source") [&#x24C9;][1]

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

---

<!-- /div -->

<!-- div -->

<h3 id="loadMore"><a href="#loadMore">#</a>&nbsp;<code>loadMore(event)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L763 "View in source") [&#x24C9;][1]

Load additional children.

#### Arguments
1. `event` *(Event)*: Click or scroll event if DOM interaction triggered this call.

---

<!-- /div -->

<!-- div -->

<h3 id="loading"><a href="#loading">#</a>&nbsp;<code>loading()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L752 "View in source") [&#x24C9;][1]

Get weather this node is loading child data.

---

<!-- /div -->

<!-- div -->

<h3 id="markDirty"><a href="#markDirty">#</a>&nbsp;<code>markDirty()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L777 "View in source") [&#x24C9;][1]

Mark node as dirty. For some systems this assists with rendering tracking.

---

<!-- /div -->

<!-- div -->

<h3 id="matched"><a href="#matched">#</a>&nbsp;<code>matched()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L795 "View in source") [&#x24C9;][1]

Get whether this node was matched during the last search.

---

<!-- /div -->

<!-- div -->

<h3 id="nextVisibleAncestralSiblingNode"><a href="#nextVisibleAncestralSiblingNode">#</a>&nbsp;<code>nextVisibleAncestralSiblingNode()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L807 "View in source") [&#x24C9;][1]

Find the next visible sibling of our ancestor. Continues
seeking up the tree until a valid node is found or we
reach the root node.

---

<!-- /div -->

<!-- div -->

<h3 id="nextVisibleChildNode"><a href="#nextVisibleChildNode">#</a>&nbsp;<code>nextVisibleChildNode()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L828 "View in source") [&#x24C9;][1]

Find next visible child node.

---

<!-- /div -->

<!-- div -->

<h3 id="nextVisibleNode"><a href="#nextVisibleNode">#</a>&nbsp;<code>nextVisibleNode()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L846 "View in source") [&#x24C9;][1]

Get the next visible node.

---

<!-- /div -->

<!-- div -->

<h3 id="nextVisibleSiblingNode"><a href="#nextVisibleSiblingNode">#</a>&nbsp;<code>nextVisibleSiblingNode()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L871 "View in source") [&#x24C9;][1]

Find the next visible sibling node.

---

<!-- /div -->

<!-- div -->

<h3 id="pagination"><a href="#pagination">#</a>&nbsp;<code>pagination()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L886 "View in source") [&#x24C9;][1]

Get pagination object for this tree node.

---

<!-- /div -->

<!-- div -->

<h3 id="previousVisibleNode"><a href="#previousVisibleNode">#</a>&nbsp;<code>previousVisibleNode()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L896 "View in source") [&#x24C9;][1]

Find the previous visible node.

---

<!-- /div -->

<!-- div -->

<h3 id="previousVisibleSiblingNode"><a href="#previousVisibleSiblingNode">#</a>&nbsp;<code>previousVisibleSiblingNode()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L921 "View in source") [&#x24C9;][1]

Find the previous visible sibling node.

---

<!-- /div -->

<!-- div -->

<h3 id="recurseDown"><a href="#recurseDown">#</a>&nbsp;<code>recurseDown(iteratee)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L936 "View in source") [&#x24C9;][1]

Iterate down node and any children.

#### Arguments
1. `iteratee` *(function)*: Iteratee function.

---

<!-- /div -->

<!-- div -->

<h3 id="recurseUp"><a href="#recurseUp">#</a>&nbsp;<code>recurseUp(iteratee)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L949 "View in source") [&#x24C9;][1]

Iterate up a node and its parents.

#### Arguments
1. `iteratee` *(function)*: Iteratee function.

---

<!-- /div -->

<!-- div -->

<h3 id="refreshIndeterminateState"><a href="#refreshIndeterminateState">#</a>&nbsp;<code>refreshIndeterminateState()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L968 "View in source") [&#x24C9;][1]

Update the indeterminate state of this node by scanning states of children.
<br>
<br>
True if some, but not all children are checked.
False if no children are checked.

---

<!-- /div -->

<!-- div -->

<h3 id="reload"><a href="#reload">#</a>&nbsp;<code>reload()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1018 "View in source") [&#x24C9;][1]

Remove all current children and re-execute a loadChildren call.

---

<!-- /div -->

<!-- div -->

<h3 id="remove"><a href="#remove">#</a>&nbsp;<code>remove()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1041 "View in source") [&#x24C9;][1]

Remove a node from the tree.

---

<!-- /div -->

<!-- div -->

<h3 id="removed"><a href="#removed">#</a>&nbsp;<code>removed()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1072 "View in source") [&#x24C9;][1]

Get whether this node is soft-removed.

---

<!-- /div -->

<!-- div -->

<h3 id="rendered"><a href="#rendered">#</a>&nbsp;<code>rendered()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1085 "View in source") [&#x24C9;][1]

Get whether this node has been rendered.
<br>
<br>
Will be false if deferred rendering is enable and the node has
not yet been loaded, or if a custom DOM renderer is used.

---

<!-- /div -->

<!-- div -->

<h3 id="restore"><a href="#restore">#</a>&nbsp;<code>restore()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1095 "View in source") [&#x24C9;][1]

Restore state if soft-removed.

---

<!-- /div -->

<!-- div -->

<h3 id="select"><a href="#select">#</a>&nbsp;<code>select(shallow)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1106 "View in source") [&#x24C9;][1]

Select this node.

#### Arguments
1. `shallow` *(boolean)*: Skip auto-selecting children.

---

<!-- /div -->

<!-- div -->

<h3 id="selectable"><a href="#selectable">#</a>&nbsp;<code>selectable()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1140 "View in source") [&#x24C9;][1]

Get weather node selectable.

---

<!-- /div -->

<!-- div -->

<h3 id="selected"><a href="#selected">#</a>&nbsp;<code>selected()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1151 "View in source") [&#x24C9;][1]

Get whether this node is selected.

---

<!-- /div -->

<!-- div -->

<h3 id="set"><a href="#set">#</a>&nbsp;<code>set(property, value)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1163 "View in source") [&#x24C9;][1]

Set a root property on this node.

#### Arguments
1. `property` *(number|string)*: Property name.
2. `value` *(&#42;)*: New value.

---

<!-- /div -->

<!-- div -->

<h3 id="show"><a href="#show">#</a>&nbsp;<code>show()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1178 "View in source") [&#x24C9;][1]

Show this node.

---

<!-- /div -->

<!-- div -->

<h3 id="softRemove"><a href="#softRemove">#</a>&nbsp;<code>softRemove()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1253 "View in source") [&#x24C9;][1]

Mark this node as "removed" without actually removing it.
<br>
<br>
Expand/show methods will never reveal this node until restored.

---

<!-- /div -->

<!-- div -->

<h3 id="state"><a href="#state">#</a>&nbsp;<code>state(name, newVal)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1193 "View in source") [&#x24C9;][1]

Get or set a state value.
<br>
<br>
This is a base method and will not invoke related changes, for example
setting selected=false will not trigger any deselection logic.

#### Arguments
1. `name` *(string)*: Property name.
2. `newVal` *(boolean)*: New value, if setting.

---

<!-- /div -->

<!-- div -->

<h3 id="swap"><a href="#swap">#</a>&nbsp;<code>swap(node)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1239 "View in source") [&#x24C9;][1]

Swap position with the given node.

#### Arguments
1. `node` *(TreeNode)*: Node.

---

<!-- /div -->

<!-- div -->

<h3 id="toObject"><a href="#toObject">#</a>&nbsp;<code>toObject(excludeChildren, includeState)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1310 "View in source") [&#x24C9;][1]

Export this node as a native Object.

#### Arguments
1. `excludeChildren` *(boolean)*: Exclude children.
2. `includeState` *(boolean)*: Include itree.state object.

---

<!-- /div -->

<!-- div -->

<h3 id="toggleCheck"><a href="#toggleCheck">#</a>&nbsp;<code>toggleCheck()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1263 "View in source") [&#x24C9;][1]

Toggle checked state.

---

<!-- /div -->

<!-- div -->

<h3 id="toggleCollapse"><a href="#toggleCollapse">#</a>&nbsp;<code>toggleCollapse()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1273 "View in source") [&#x24C9;][1]

Toggle collapsed state.

---

<!-- /div -->

<!-- div -->

<h3 id="toggleEditing"><a href="#toggleEditing">#</a>&nbsp;<code>toggleEditing()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1283 "View in source") [&#x24C9;][1]

Toggle editing state.

---

<!-- /div -->

<!-- div -->

<h3 id="toggleSelect"><a href="#toggleSelect">#</a>&nbsp;<code>toggleSelect()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1298 "View in source") [&#x24C9;][1]

Toggle selected state.

---

<!-- /div -->

<!-- div -->

<h3 id="tree"><a href="#tree">#</a>&nbsp;<code>tree()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1354 "View in source") [&#x24C9;][1]

Get the tree this node ultimately belongs to.

---

<!-- /div -->

<!-- div -->

<h3 id="uncheck"><a href="#uncheck">#</a>&nbsp;<code>uncheck(shallow)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1365 "View in source") [&#x24C9;][1]

Uncheck this node.

#### Arguments
1. `shallow` *(boolean)*: Skip auto-unchecking children.

---

<!-- /div -->

<!-- div -->

<h3 id="visible"><a href="#visible">#</a>&nbsp;<code>visible()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1393 "View in source") [&#x24C9;][1]

Get whether node is visible to a user. Returns false
if it's hidden, or if any ancestor is hidden or collapsed.

---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `Methods`

<!-- div -->

<h3 id="states"><a href="#states">#</a>&nbsp;<code>states(names, newVal)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1218 "View in source") [&#x24C9;][1]

Get or set multiple state values to a single value.

#### Arguments
1. `names` *(Array)*: Property names.
2. `newVal` *(boolean)*: New value, if setting.

---

<!-- /div -->

<!-- div -->

<h3 id="toString"><a href="#toString">#</a>&nbsp;<code>toString()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1344 "View in source") [&#x24C9;][1]

Get the text content of this tree node.

---

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #copynode "Jump back to the TOC."
