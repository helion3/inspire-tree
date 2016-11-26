# 

<!-- div class="toc-container" -->

<!-- div -->

## `CopyNode`
* <a href="#to">`to`</a>

<!-- /div -->

<!-- div -->

## `TreeNode`
* <a href="#addChild">`addChild`</a>
* <a href="#addChildren">`addChildren`</a>
* <a href="#available">`available`</a>
* <a href="#blur">`blur`</a>
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
* <a href="#hasChildren">`hasChildren`</a>
* <a href="#hasLoadedChildren">`hasLoadedChildren`</a>
* <a href="#hasParent">`hasParent`</a>
* <a href="#hasVisibleChildren">`hasVisibleChildren`</a>
* <a href="#hidden">`hidden`</a>
* <a href="#hide">`hide`</a>
* <a href="#indeterminate">`indeterminate`</a>
* <a href="#indexPath">`indexPath`</a>
* <a href="#lastDeepestVisibleChild">`lastDeepestVisibleChild`</a>
* <a href="#loadChildren">`loadChildren`</a>
* <a href="#loading">`loading`</a>
* <a href="#markDirty">`markDirty`</a>
* <a href="#nextVisibleAncestralSiblingNode">`nextVisibleAncestralSiblingNode`</a>
* <a href="#nextVisibleChildNode">`nextVisibleChildNode`</a>
* <a href="#nextVisibleNode">`nextVisibleNode`</a>
* <a href="#nextVisibleSiblingNode">`nextVisibleSiblingNode`</a>
* <a href="#previousVisibleNode">`previousVisibleNode`</a>
* <a href="#previousVisibleSiblingNode">`previousVisibleSiblingNode`</a>
* <a href="#recurseDown">`recurseDown`</a>
* <a href="#recurseUp">`recurseUp`</a>
* <a href="#refreshIndeterminateState">`refreshIndeterminateState`</a>
* <a href="#remove">`remove`</a>
* <a href="#removed">`removed`</a>
* <a href="#restore">`restore`</a>
* <a href="#select">`select`</a>
* <a href="#selectable">`selectable`</a>
* <a href="#selected">`selected`</a>
* <a href="#set">`set`</a>
* <a href="#show">`show`</a>
* <a href="#softRemove">`softRemove`</a>
* <a href="#state">`state`</a>
* <a href="#toObject">`toObject`</a>
* <a href="#toggleCollapse">`toggleCollapse`</a>
* <a href="#toggleEditing">`toggleEditing`</a>
* <a href="#toggleSelect">`toggleSelect`</a>
* <a href="#visible">`visible`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `“CopyNode” Methods`

<!-- div -->

<h3 id="to"><a href="#to">#</a>&nbsp;<code>to(dest)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L263 "View in source") [&#x24C9;][1]

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
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L130 "View in source") [&#x24C9;][1]

Add a child to this node.

#### Arguments
1. `child` *(object)*: Node object.

---

<!-- /div -->

<!-- div -->

<h3 id="addChildren"><a href="#addChildren">#</a>&nbsp;<code>addChildren(children)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L146 "View in source") [&#x24C9;][1]

Add multiple children to this node.

#### Arguments
1. `children` *(object)*: Array of nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="available"><a href="#available">#</a>&nbsp;<code>available()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L164 "View in source") [&#x24C9;][1]

Get if node available.

---

<!-- /div -->

<!-- div -->

<h3 id="blur"><a href="#blur">#</a>&nbsp;<code>blur()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L174 "View in source") [&#x24C9;][1]

Blur focus from this node.

---

<!-- /div -->

<!-- div -->

<h3 id="clean"><a href="#clean">#</a>&nbsp;<code>clean()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L186 "View in source") [&#x24C9;][1]

Hides parents without any visible children.

---

<!-- /div -->

<!-- div -->

<h3 id="clone"><a href="#clone">#</a>&nbsp;<code>clone(excludeKeys)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L206 "View in source") [&#x24C9;][1]

Clones this node.

#### Arguments
1. `excludeKeys` *(array)*: Keys to exclude from the clone.

---

<!-- /div -->

<!-- div -->

<h3 id="collapse"><a href="#collapse">#</a>&nbsp;<code>collapse()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L216 "View in source") [&#x24C9;][1]

Collapse this node.

---

<!-- /div -->

<!-- div -->

<h3 id="collapsed"><a href="#collapsed">#</a>&nbsp;<code>collapsed()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L226 "View in source") [&#x24C9;][1]

Get whether this node is collapsed.

---

<!-- /div -->

<!-- div -->

<h3 id="context"><a href="#context">#</a>&nbsp;<code>context()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L236 "View in source") [&#x24C9;][1]

Get the containing context. If no parent present, the root context is returned.

---

<!-- /div -->

<!-- div -->

<h3 id="copy"><a href="#copy">#</a>&nbsp;<code>copy(hierarchy)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L247 "View in source") [&#x24C9;][1]

Copies node to a new tree instance.

#### Arguments
1. `hierarchy` *(boolean)*: Include necessary ancestors to match hierarchy.

---

<!-- /div -->

<!-- div -->

<h3 id="copyHierarchy"><a href="#copyHierarchy">#</a>&nbsp;<code>copyHierarchy(excludeNode)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L280 "View in source") [&#x24C9;][1]

Copies all parents of a node.

#### Arguments
1. `excludeNode` *(boolean)*: Exclude given node from hierarchy.

---

<!-- /div -->

<!-- div -->

<h3 id="deselect"><a href="#deselect">#</a>&nbsp;<code>deselect(skipParentIndeterminate)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L334 "View in source") [&#x24C9;][1]

Deselect this node.
<br>
<br>
If selection.require is true and this is the last selected
node, the node will remain in a selected state.

#### Arguments
1. `skipParentIndeterminate` *(boolean)*: Skip refreshing parent indeterminate states.

---

<!-- /div -->

<!-- div -->

<h3 id="editable"><a href="#editable">#</a>&nbsp;<code>editable()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L375 "View in source") [&#x24C9;][1]

Get if node editable. Required editing.edit to be enable via config.

---

<!-- /div -->

<!-- div -->

<h3 id="editing"><a href="#editing">#</a>&nbsp;<code>editing()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L385 "View in source") [&#x24C9;][1]

Get if node is currently in edit mode.

---

<!-- /div -->

<!-- div -->

<h3 id="expand"><a href="#expand">#</a>&nbsp;<code>expand()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L395 "View in source") [&#x24C9;][1]

Expand this node.

---

<!-- /div -->

<!-- div -->

<h3 id="expandParents"><a href="#expandParents">#</a>&nbsp;<code>expandParents()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L439 "View in source") [&#x24C9;][1]

Expand parent nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="expanded"><a href="#expanded">#</a>&nbsp;<code>expanded()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L429 "View in source") [&#x24C9;][1]

Get if node expanded.

---

<!-- /div -->

<!-- div -->

<h3 id="focus"><a href="#focus">#</a>&nbsp;<code>focus()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L455 "View in source") [&#x24C9;][1]

Focus a node without changing its selection.

---

<!-- /div -->

<!-- div -->

<h3 id="focused"><a href="#focused">#</a>&nbsp;<code>focused()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L481 "View in source") [&#x24C9;][1]

Get whether this node is focused.

---

<!-- /div -->

<!-- div -->

<h3 id="getChildren"><a href="#getChildren">#</a>&nbsp;<code>getChildren()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L492 "View in source") [&#x24C9;][1]

Get children for this node. If no children exist, an empty TreeNodes
collection is returned for safe chaining.

---

<!-- /div -->

<!-- div -->

<h3 id="getParent"><a href="#getParent">#</a>&nbsp;<code>getParent()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L502 "View in source") [&#x24C9;][1]

Get the immediate parent, if any.

---

<!-- /div -->

<!-- div -->

<h3 id="getParents"><a href="#getParents">#</a>&nbsp;<code>getParents()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L512 "View in source") [&#x24C9;][1]

Returns parent nodes. Excludes any siblings.

---

<!-- /div -->

<!-- div -->

<h3 id="getTextualHierarchy"><a href="#getTextualHierarchy">#</a>&nbsp;<code>getTextualHierarchy()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L531 "View in source") [&#x24C9;][1]

Get a textual hierarchy for a given node. An array
of text from this node's root ancestor to the given node.

---

<!-- /div -->

<!-- div -->

<h3 id="hasChildren"><a href="#hasChildren">#</a>&nbsp;<code>hasChildren()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L547 "View in source") [&#x24C9;][1]

If node has any children.

---

<!-- /div -->

<!-- div -->

<h3 id="hasLoadedChildren"><a href="#hasLoadedChildren">#</a>&nbsp;<code>hasLoadedChildren()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L557 "View in source") [&#x24C9;][1]

If children loading method has completed. Will always be true for non-dynamic nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="hasParent"><a href="#hasParent">#</a>&nbsp;<code>hasParent()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L567 "View in source") [&#x24C9;][1]

If node has a parent.

---

<!-- /div -->

<!-- div -->

<h3 id="hasVisibleChildren"><a href="#hasVisibleChildren">#</a>&nbsp;<code>hasVisibleChildren()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L577 "View in source") [&#x24C9;][1]

If node has any visible children.

---

<!-- /div -->

<!-- div -->

<h3 id="hidden"><a href="#hidden">#</a>&nbsp;<code>hidden()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L610 "View in source") [&#x24C9;][1]

Get whether this node is hidden.

---

<!-- /div -->

<!-- div -->

<h3 id="hide"><a href="#hide">#</a>&nbsp;<code>hide()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L593 "View in source") [&#x24C9;][1]

Hide this node.

---

<!-- /div -->

<!-- div -->

<h3 id="indeterminate"><a href="#indeterminate">#</a>&nbsp;<code>indeterminate()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L636 "View in source") [&#x24C9;][1]

Get whether this node is indeterminate.

---

<!-- /div -->

<!-- div -->

<h3 id="indexPath"><a href="#indexPath">#</a>&nbsp;<code>indexPath()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L620 "View in source") [&#x24C9;][1]

Returns a "path" of indices, values which map this node's location within all parent contexts.

---

<!-- /div -->

<!-- div -->

<h3 id="lastDeepestVisibleChild"><a href="#lastDeepestVisibleChild">#</a>&nbsp;<code>lastDeepestVisibleChild()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L646 "View in source") [&#x24C9;][1]

Find the last + deepest visible child of the previous sibling.

---

<!-- /div -->

<!-- div -->

<h3 id="loadChildren"><a href="#loadChildren">#</a>&nbsp;<code>loadChildren()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L677 "View in source") [&#x24C9;][1]

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

<h3 id="loading"><a href="#loading">#</a>&nbsp;<code>loading()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L734 "View in source") [&#x24C9;][1]

Get whether this node is loading child data.

---

<!-- /div -->

<!-- div -->

<h3 id="markDirty"><a href="#markDirty">#</a>&nbsp;<code>markDirty()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L745 "View in source") [&#x24C9;][1]

Mark a node as dirty, rebuilding this node in the virtual DOM
and rerendering to the live DOM, next time applyChanges is called.

---

<!-- /div -->

<!-- div -->

<h3 id="nextVisibleAncestralSiblingNode"><a href="#nextVisibleAncestralSiblingNode">#</a>&nbsp;<code>nextVisibleAncestralSiblingNode()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L765 "View in source") [&#x24C9;][1]

Find the next visible sibling of our ancestor. Continues
seeking up the tree until a valid node is found or we
reach the root node.

---

<!-- /div -->

<!-- div -->

<h3 id="nextVisibleChildNode"><a href="#nextVisibleChildNode">#</a>&nbsp;<code>nextVisibleChildNode()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L786 "View in source") [&#x24C9;][1]

Find next visible child node.

---

<!-- /div -->

<!-- div -->

<h3 id="nextVisibleNode"><a href="#nextVisibleNode">#</a>&nbsp;<code>nextVisibleNode()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L805 "View in source") [&#x24C9;][1]

Get the next visible node.

---

<!-- /div -->

<!-- div -->

<h3 id="nextVisibleSiblingNode"><a href="#nextVisibleSiblingNode">#</a>&nbsp;<code>nextVisibleSiblingNode()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L831 "View in source") [&#x24C9;][1]

Find the next visible sibling node.

---

<!-- /div -->

<!-- div -->

<h3 id="previousVisibleNode"><a href="#previousVisibleNode">#</a>&nbsp;<code>previousVisibleNode()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L847 "View in source") [&#x24C9;][1]

Find the previous visible node.

---

<!-- /div -->

<!-- div -->

<h3 id="previousVisibleSiblingNode"><a href="#previousVisibleSiblingNode">#</a>&nbsp;<code>previousVisibleSiblingNode()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L873 "View in source") [&#x24C9;][1]

Find the previous visible sibling node.

---

<!-- /div -->

<!-- div -->

<h3 id="recurseDown"><a href="#recurseDown">#</a>&nbsp;<code>recurseDown(iteratee)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L888 "View in source") [&#x24C9;][1]

Iterate down node and any children.

#### Arguments
1. `iteratee` *(function)*: Iteratee function.

---

<!-- /div -->

<!-- div -->

<h3 id="recurseUp"><a href="#recurseUp">#</a>&nbsp;<code>recurseUp(iteratee)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L901 "View in source") [&#x24C9;][1]

Iterate up a node and its parents.

#### Arguments
1. `iteratee` *(function)*: Iteratee function.

---

<!-- /div -->

<!-- div -->

<h3 id="refreshIndeterminateState"><a href="#refreshIndeterminateState">#</a>&nbsp;<code>refreshIndeterminateState()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L921 "View in source") [&#x24C9;][1]

Updates the indeterminate state of this node.
<br>
<br>
Only available when checkbox=true.
True if some, but not all children are selected.
False if no children are selected.

---

<!-- /div -->

<!-- div -->

<h3 id="remove"><a href="#remove">#</a>&nbsp;<code>remove()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L969 "View in source") [&#x24C9;][1]

Remove a node from the tree.

---

<!-- /div -->

<!-- div -->

<h3 id="removed"><a href="#removed">#</a>&nbsp;<code>removed()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L998 "View in source") [&#x24C9;][1]

Get whether this node is soft-removed.

---

<!-- /div -->

<!-- div -->

<h3 id="restore"><a href="#restore">#</a>&nbsp;<code>restore()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1008 "View in source") [&#x24C9;][1]

Restore state if soft-removed.

---

<!-- /div -->

<!-- div -->

<h3 id="select"><a href="#select">#</a>&nbsp;<code>select()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1018 "View in source") [&#x24C9;][1]

Select this node.

---

<!-- /div -->

<!-- div -->

<h3 id="selectable"><a href="#selectable">#</a>&nbsp;<code>selectable()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1066 "View in source") [&#x24C9;][1]

Get if node selectable.

---

<!-- /div -->

<!-- div -->

<h3 id="selected"><a href="#selected">#</a>&nbsp;<code>selected()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1077 "View in source") [&#x24C9;][1]

Get whether this node is selected.

---

<!-- /div -->

<!-- div -->

<h3 id="set"><a href="#set">#</a>&nbsp;<code>set(property, value)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1089 "View in source") [&#x24C9;][1]

Set a root property on this node.

#### Arguments
1. `property` *(number|string)*: Property name.
2. `value` *(&#42;)*: New value.

---

<!-- /div -->

<!-- div -->

<h3 id="show"><a href="#show">#</a>&nbsp;<code>show()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1102 "View in source") [&#x24C9;][1]

Show this node.

---

<!-- /div -->

<!-- div -->

<h3 id="softRemove"><a href="#softRemove">#</a>&nbsp;<code>softRemove()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1140 "View in source") [&#x24C9;][1]

Mark this node as "removed" without actually removing it.
<br>
<br>
Expand/show methods will never reveal this node until restored.

---

<!-- /div -->

<!-- div -->

<h3 id="state"><a href="#state">#</a>&nbsp;<code>state(name, newVal)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1117 "View in source") [&#x24C9;][1]

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

<h3 id="toObject"><a href="#toObject">#</a>&nbsp;<code>toObject(excludeChildren)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1186 "View in source") [&#x24C9;][1]

Export this node as a native Object.

#### Arguments
1. `excludeChildren` *(boolean)*: Exclude children.

---

<!-- /div -->

<!-- div -->

<h3 id="toggleCollapse"><a href="#toggleCollapse">#</a>&nbsp;<code>toggleCollapse()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1150 "View in source") [&#x24C9;][1]

Toggles collapsed state.

---

<!-- /div -->

<!-- div -->

<h3 id="toggleEditing"><a href="#toggleEditing">#</a>&nbsp;<code>toggleEditing()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1160 "View in source") [&#x24C9;][1]

Toggles editing state.

---

<!-- /div -->

<!-- div -->

<h3 id="toggleSelect"><a href="#toggleSelect">#</a>&nbsp;<code>toggleSelect()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1175 "View in source") [&#x24C9;][1]

Toggles selected state.

---

<!-- /div -->

<!-- div -->

<h3 id="visible"><a href="#visible">#</a>&nbsp;<code>visible()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1209 "View in source") [&#x24C9;][1]

Checks whether a node is visible to a user. Returns false
if it's hidden, or if any ancestor is hidden or collapsed.

---

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #copynode "Jump back to the TOC."
