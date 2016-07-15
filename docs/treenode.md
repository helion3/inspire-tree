# 

<!-- div class="toc-container" -->

<!-- div -->

## `CopyNode`
* <a href="#to">`to`</a>

<!-- /div -->

<!-- div -->

## `TreeNode`
* <a href="#addChild">`addChild`</a>
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
* <a href="#toggleSelect">`toggleSelect`</a>
* <a href="#visible">`visible`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `“CopyNode” Methods`

<!-- div -->

### <a id="to"></a>`to(dest)`
<a href="#to">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L244 "View in source") [&#x24C9;][1]

Sets a destination.

#### Arguments
1. `dest` *(object)*: Destination Inspire Tree.

---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“TreeNode” Methods`

<!-- div -->

### <a id="addChild"></a>`addChild(child)`
<a href="#addChild">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L130 "View in source") [&#x24C9;][1]

Add a child to this node.

#### Arguments
1. `child` *(object)*: Node object.

---

<!-- /div -->

<!-- div -->

### <a id="available"></a>`available()`
<a href="#available">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L145 "View in source") [&#x24C9;][1]

Get if node available.

---

<!-- /div -->

<!-- div -->

### <a id="blur"></a>`blur()`
<a href="#blur">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L155 "View in source") [&#x24C9;][1]

Blur focus from this node.

---

<!-- /div -->

<!-- div -->

### <a id="clean"></a>`clean()`
<a href="#clean">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L167 "View in source") [&#x24C9;][1]

Hides parents without any visible children.

---

<!-- /div -->

<!-- div -->

### <a id="clone"></a>`clone(excludeKeys)`
<a href="#clone">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L187 "View in source") [&#x24C9;][1]

Clones this node.

#### Arguments
1. `excludeKeys` *(array)*: Keys to exclude from the clone.

---

<!-- /div -->

<!-- div -->

### <a id="collapse"></a>`collapse()`
<a href="#collapse">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L197 "View in source") [&#x24C9;][1]

Collapse this node.

---

<!-- /div -->

<!-- div -->

### <a id="collapsed"></a>`collapsed()`
<a href="#collapsed">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L207 "View in source") [&#x24C9;][1]

Get whether this node is collapsed.

---

<!-- /div -->

<!-- div -->

### <a id="context"></a>`context()`
<a href="#context">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L217 "View in source") [&#x24C9;][1]

Get the containing context. If no parent present, the root context is returned.

---

<!-- /div -->

<!-- div -->

### <a id="copy"></a>`copy(hierarchy)`
<a href="#copy">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L228 "View in source") [&#x24C9;][1]

Copies node to a new tree instance.

#### Arguments
1. `hierarchy` *(boolean)*: Include necessary ancestors to match hierarchy.

---

<!-- /div -->

<!-- div -->

### <a id="copyHierarchy"></a>`copyHierarchy(excludeNode)`
<a href="#copyHierarchy">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L261 "View in source") [&#x24C9;][1]

Copies all parents of a node.

#### Arguments
1. `excludeNode` *(boolean)*: Exclude given node from hierarchy.

---

<!-- /div -->

<!-- div -->

### <a id="deselect"></a>`deselect(skipParentIndeterminate)`
<a href="#deselect">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L315 "View in source") [&#x24C9;][1]

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

### <a id="editable"></a>`editable()`
<a href="#editable">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L356 "View in source") [&#x24C9;][1]

Get if node editable. Required editing.edit to be enable via config.

---

<!-- /div -->

<!-- div -->

### <a id="editing"></a>`editing()`
<a href="#editing">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L366 "View in source") [&#x24C9;][1]

Get if node is currently in edit mode.

---

<!-- /div -->

<!-- div -->

### <a id="expand"></a>`expand()`
<a href="#expand">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L376 "View in source") [&#x24C9;][1]

Expand this node.

---

<!-- /div -->

<!-- div -->

### <a id="expandParents"></a>`expandParents()`
<a href="#expandParents">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L420 "View in source") [&#x24C9;][1]

Expand parent nodes.

---

<!-- /div -->

<!-- div -->

### <a id="expanded"></a>`expanded()`
<a href="#expanded">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L410 "View in source") [&#x24C9;][1]

Get if node expanded.

---

<!-- /div -->

<!-- div -->

### <a id="focus"></a>`focus()`
<a href="#focus">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L436 "View in source") [&#x24C9;][1]

Focus a node without changing its selection.

---

<!-- /div -->

<!-- div -->

### <a id="focused"></a>`focused()`
<a href="#focused">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L462 "View in source") [&#x24C9;][1]

Get whether this node is focused.

---

<!-- /div -->

<!-- div -->

### <a id="getChildren"></a>`getChildren()`
<a href="#getChildren">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L473 "View in source") [&#x24C9;][1]

Get children for this node. If no children exist, an empty TreeNodes
collection is returned for safe chaining.

---

<!-- /div -->

<!-- div -->

### <a id="getParent"></a>`getParent()`
<a href="#getParent">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L483 "View in source") [&#x24C9;][1]

Get the immediate parent, if any.

---

<!-- /div -->

<!-- div -->

### <a id="getParents"></a>`getParents()`
<a href="#getParents">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L493 "View in source") [&#x24C9;][1]

Returns parent nodes. Excludes any siblings.

---

<!-- /div -->

<!-- div -->

### <a id="getTextualHierarchy"></a>`getTextualHierarchy()`
<a href="#getTextualHierarchy">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L512 "View in source") [&#x24C9;][1]

Get a textual hierarchy for a given node. An array
of text from this node's root ancestor to the given node.

---

<!-- /div -->

<!-- div -->

### <a id="hasChildren"></a>`hasChildren()`
<a href="#hasChildren">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L528 "View in source") [&#x24C9;][1]

If node has any children.

---

<!-- /div -->

<!-- div -->

### <a id="hasParent"></a>`hasParent()`
<a href="#hasParent">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L538 "View in source") [&#x24C9;][1]

If node has a parent.

---

<!-- /div -->

<!-- div -->

### <a id="hasVisibleChildren"></a>`hasVisibleChildren()`
<a href="#hasVisibleChildren">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L548 "View in source") [&#x24C9;][1]

If node has any visible children.

---

<!-- /div -->

<!-- div -->

### <a id="hidden"></a>`hidden()`
<a href="#hidden">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L581 "View in source") [&#x24C9;][1]

Get whether this node is hidden.

---

<!-- /div -->

<!-- div -->

### <a id="hide"></a>`hide()`
<a href="#hide">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L564 "View in source") [&#x24C9;][1]

Hide this node.

---

<!-- /div -->

<!-- div -->

### <a id="indeterminate"></a>`indeterminate()`
<a href="#indeterminate">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L607 "View in source") [&#x24C9;][1]

Get whether this node is indeterminate.

---

<!-- /div -->

<!-- div -->

### <a id="indexPath"></a>`indexPath()`
<a href="#indexPath">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L591 "View in source") [&#x24C9;][1]

Returns a "path" of indices, values which map this node's location within all parent contexts.

---

<!-- /div -->

<!-- div -->

### <a id="lastDeepestVisibleChild"></a>`lastDeepestVisibleChild()`
<a href="#lastDeepestVisibleChild">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L617 "View in source") [&#x24C9;][1]

Find the last + deepest visible child of the previous sibling.

---

<!-- /div -->

<!-- div -->

### <a id="loadChildren"></a>`loadChildren()`
<a href="#loadChildren">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L649 "View in source") [&#x24C9;][1]

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

### <a id="loading"></a>`loading()`
<a href="#loading">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L700 "View in source") [&#x24C9;][1]

Get whether this node is loading child data.

---

<!-- /div -->

<!-- div -->

### <a id="markDirty"></a>`markDirty()`
<a href="#markDirty">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L711 "View in source") [&#x24C9;][1]

Mark a node as dirty, rebuilding this node in the virtual DOM
and rerendering to the live DOM, next time applyChanges is called.

---

<!-- /div -->

<!-- div -->

### <a id="nextVisibleAncestralSiblingNode"></a>`nextVisibleAncestralSiblingNode()`
<a href="#nextVisibleAncestralSiblingNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L731 "View in source") [&#x24C9;][1]

Find the next visible sibling of our ancestor. Continues
seeking up the tree until a valid node is found or we
reach the root node.

---

<!-- /div -->

<!-- div -->

### <a id="nextVisibleChildNode"></a>`nextVisibleChildNode()`
<a href="#nextVisibleChildNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L752 "View in source") [&#x24C9;][1]

Find next visible child node.

---

<!-- /div -->

<!-- div -->

### <a id="nextVisibleNode"></a>`nextVisibleNode()`
<a href="#nextVisibleNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L771 "View in source") [&#x24C9;][1]

Get the next visible node.

---

<!-- /div -->

<!-- div -->

### <a id="nextVisibleSiblingNode"></a>`nextVisibleSiblingNode()`
<a href="#nextVisibleSiblingNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L797 "View in source") [&#x24C9;][1]

Find the next visible sibling node.

---

<!-- /div -->

<!-- div -->

### <a id="previousVisibleNode"></a>`previousVisibleNode()`
<a href="#previousVisibleNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L813 "View in source") [&#x24C9;][1]

Find the previous visible node.

---

<!-- /div -->

<!-- div -->

### <a id="previousVisibleSiblingNode"></a>`previousVisibleSiblingNode()`
<a href="#previousVisibleSiblingNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L839 "View in source") [&#x24C9;][1]

Find the previous visible sibling node.

---

<!-- /div -->

<!-- div -->

### <a id="recurseDown"></a>`recurseDown(iteratee)`
<a href="#recurseDown">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L854 "View in source") [&#x24C9;][1]

Iterate down node and any children.

#### Arguments
1. `iteratee` *(function)*: Iteratee function.

---

<!-- /div -->

<!-- div -->

### <a id="recurseUp"></a>`recurseUp(iteratee)`
<a href="#recurseUp">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L867 "View in source") [&#x24C9;][1]

Iterate up a node and its parents.

#### Arguments
1. `iteratee` *(function)*: Iteratee function.

---

<!-- /div -->

<!-- div -->

### <a id="refreshIndeterminateState"></a>`refreshIndeterminateState()`
<a href="#refreshIndeterminateState">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L887 "View in source") [&#x24C9;][1]

Updates the indeterminate state of this node.
<br>
<br>
Only available when checkbox=true.
True if some, but not all children are selected.
False if no children are selected.

---

<!-- /div -->

<!-- div -->

### <a id="remove"></a>`remove()`
<a href="#remove">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L935 "View in source") [&#x24C9;][1]

Remove a node from the tree.

---

<!-- /div -->

<!-- div -->

### <a id="removed"></a>`removed()`
<a href="#removed">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L964 "View in source") [&#x24C9;][1]

Get whether this node is soft-removed.

---

<!-- /div -->

<!-- div -->

### <a id="restore"></a>`restore()`
<a href="#restore">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L974 "View in source") [&#x24C9;][1]

Restore state if soft-removed.

---

<!-- /div -->

<!-- div -->

### <a id="select"></a>`select()`
<a href="#select">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L984 "View in source") [&#x24C9;][1]

Select this node.

---

<!-- /div -->

<!-- div -->

### <a id="selectable"></a>`selectable()`
<a href="#selectable">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1032 "View in source") [&#x24C9;][1]

Get if node selectable.

---

<!-- /div -->

<!-- div -->

### <a id="selected"></a>`selected()`
<a href="#selected">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1043 "View in source") [&#x24C9;][1]

Get whether this node is selected.

---

<!-- /div -->

<!-- div -->

### <a id="set"></a>`set(property, value)`
<a href="#set">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1055 "View in source") [&#x24C9;][1]

Set a root property on this node.

#### Arguments
1. `property` *(number|string)*: Property name.
2. `value` *(&#42;)*: New value.

---

<!-- /div -->

<!-- div -->

### <a id="show"></a>`show()`
<a href="#show">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1068 "View in source") [&#x24C9;][1]

Show this node.

---

<!-- /div -->

<!-- div -->

### <a id="softRemove"></a>`softRemove()`
<a href="#softRemove">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1106 "View in source") [&#x24C9;][1]

Mark this node as "removed" without actually removing it.
<br>
<br>
Expand/show methods will never reveal this node until restored.

---

<!-- /div -->

<!-- div -->

### <a id="state"></a>`state(name, newVal)`
<a href="#state">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1083 "View in source") [&#x24C9;][1]

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

### <a id="toObject"></a>`toObject(excludeChildren)`
<a href="#toObject">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1144 "View in source") [&#x24C9;][1]

Export this node as a native Object.

#### Arguments
1. `excludeChildren` *(boolean)*: Exclude children.

---

<!-- /div -->

<!-- div -->

### <a id="toggleCollapse"></a>`toggleCollapse()`
<a href="#toggleCollapse">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1116 "View in source") [&#x24C9;][1]

Toggles collapsed state.

---

<!-- /div -->

<!-- div -->

### <a id="toggleSelect"></a>`toggleSelect()`
<a href="#toggleSelect">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1133 "View in source") [&#x24C9;][1]

Toggles selected state.

---

<!-- /div -->

<!-- div -->

### <a id="visible"></a>`visible(node)`
<a href="#visible">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1168 "View in source") [&#x24C9;][1]

Checks whether a node is visible to a user. Returns false
if it's hidden, or if any ancestor is hidden or collapsed.

#### Arguments
1. `node` *(object)*: Node object.

---

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #copynode "Jump back to the TOC."
