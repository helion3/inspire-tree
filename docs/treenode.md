# 

<!-- div class="toc-container" -->

<!-- div -->

## `CopyNode`
* <a href="#to:dest">`to:`</a>

<!-- /div -->

<!-- div -->

## `TreeNode`
* <a href="#addchildchild">`addChild`</a>
* <a href="#addchildrenchildren">`addChildren`</a>
* <a href="#available">`available`</a>
* <a href="#blur">`blur`</a>
* <a href="#checkshallow">`check`</a>
* <a href="#checked">`checked`</a>
* <a href="#clean">`clean`</a>
* <a href="#cloneexcludekeys">`clone`</a>
* <a href="#collapse">`collapse`</a>
* <a href="#collapsed">`collapsed`</a>
* <a href="#context">`context`</a>
* <a href="#copyhierarchy">`copy`</a>
* <a href="#copyhierarchyexcludenode">`copyHierarchy`</a>
* <a href="#deselectshallow">`deselect`</a>
* <a href="#editable">`editable`</a>
* <a href="#editing">`editing`</a>
* <a href="#expand">`expand`</a>
* <a href="#expandparents">`expandParents`</a>
* <a href="#expanded">`expanded`</a>
* <a href="#focus">`focus`</a>
* <a href="#focused">`focused`</a>
* <a href="#getchildren">`getChildren`</a>
* <a href="#getparent">`getParent`</a>
* <a href="#getparents">`getParents`</a>
* <a href="#gettextualhierarchy">`getTextualHierarchy`</a>
* <a href="#hasancestornode">`hasAncestor`</a>
* <a href="#haschildren">`hasChildren`</a>
* <a href="#hasloadedchildren">`hasLoadedChildren`</a>
* <a href="#hasorwillhavechildren">`hasOrWillHaveChildren`</a>
* <a href="#hasparent">`hasParent`</a>
* <a href="#hasvisiblechildren">`hasVisibleChildren`</a>
* <a href="#hidden">`hidden`</a>
* <a href="#hide">`hide`</a>
* <a href="#indeterminate">`indeterminate`</a>
* <a href="#indexpath">`indexPath`</a>
* <a href="#lastdeepestvisiblechild">`lastDeepestVisibleChild`</a>
* <a href="#loadchildren">`loadChildren`</a>
* <a href="#loadmoreevent">`loadMore`</a>
* <a href="#loading">`loading`</a>
* <a href="#markdirty">`markDirty`</a>
* <a href="#matched">`matched`</a>
* <a href="#nextvisibleancestralsiblingnode">`nextVisibleAncestralSiblingNode`</a>
* <a href="#nextvisiblechildnode">`nextVisibleChildNode`</a>
* <a href="#nextvisiblenode">`nextVisibleNode`</a>
* <a href="#nextvisiblesiblingnode">`nextVisibleSiblingNode`</a>
* <a href="#pagination">`pagination`</a>
* <a href="#previousvisiblenode">`previousVisibleNode`</a>
* <a href="#previousvisiblesiblingnode">`previousVisibleSiblingNode`</a>
* <a href="#recursedowniteratee">`recurseDown`</a>
* <a href="#recurseupiteratee">`recurseUp`</a>
* <a href="#refreshindeterminatestate">`refreshIndeterminateState`</a>
* <a href="#reload">`reload`</a>
* <a href="#removeincludestate">`remove`</a>
* <a href="#removed">`removed`</a>
* <a href="#rendered">`rendered`</a>
* <a href="#restore">`restore`</a>
* <a href="#selectshallow">`select`</a>
* <a href="#selectable">`selectable`</a>
* <a href="#selected">`selected`</a>
* <a href="#setproperty-value">`set`</a>
* <a href="#show">`show`</a>
* <a href="#softremove">`softRemove`</a>
* <a href="#statename-newval">`state`</a>
* <a href="#swapnode">`swap`</a>
* <a href="#toobjectexcludechildren-includestate">`toObject`</a>
* <a href="#togglecheck">`toggleCheck`</a>
* <a href="#togglecollapse">`toggleCollapse`</a>
* <a href="#toggleediting">`toggleEditing`</a>
* <a href="#toggleselect">`toggleSelect`</a>
* <a href="#tree">`tree`</a>
* <a href="#uncheckshallow">`uncheck`</a>
* <a href="#visible">`visible`</a>

<!-- /div -->

<!-- div -->

## `Methods`
* <a href="#statesnames-newval">`states`</a>
* <a href="#tostring">`toString`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `“CopyNode” Methods`

<!-- div -->

<h3 id="to:dest"><code>to:(dest)</code></h3>
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

<h3 id="addchildchild"><code>addChild(child)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L83 "View in source") [&#x24C9;][1]

Add a child to this node.

#### Arguments
1. `child` *(object)*: Node object.

---

<!-- /div -->

<!-- div -->

<h3 id="addchildrenchildren"><code>addChildren(children)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L99 "View in source") [&#x24C9;][1]

Add multiple children to this node.

#### Arguments
1. `children` *(object)*: Array of nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="available"><code>available()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L127 "View in source") [&#x24C9;][1]

Check if node available.

---

<!-- /div -->

<!-- div -->

<h3 id="blur"><code>blur()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L137 "View in source") [&#x24C9;][1]

Blur focus from this node.

---

<!-- /div -->

<!-- div -->

<h3 id="checkshallow"><code>check(shallow)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L150 "View in source") [&#x24C9;][1]

Mark node as checked.

#### Arguments
1. `shallow` *(boolean)*: Skip auto-checking children.

---

<!-- /div -->

<!-- div -->

<h3 id="checked"><code>checked()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L177 "View in source") [&#x24C9;][1]

Get whether this node is checked.

---

<!-- /div -->

<!-- div -->

<h3 id="clean"><code>clean()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L187 "View in source") [&#x24C9;][1]

Hide parents without any visible children.

---

<!-- /div -->

<!-- div -->

<h3 id="cloneexcludekeys"><code>clone(excludeKeys)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L207 "View in source") [&#x24C9;][1]

Clone this node.

#### Arguments
1. `excludeKeys` *(array)*: Keys to exclude from the clone.

---

<!-- /div -->

<!-- div -->

<h3 id="collapse"><code>collapse()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L217 "View in source") [&#x24C9;][1]

Collapse this node.

---

<!-- /div -->

<!-- div -->

<h3 id="collapsed"><code>collapsed()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L227 "View in source") [&#x24C9;][1]

Get whether this node is collapsed.

---

<!-- /div -->

<!-- div -->

<h3 id="context"><code>context()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L237 "View in source") [&#x24C9;][1]

Get the containing context. If no parent present, the root context is returned.

---

<!-- /div -->

<!-- div -->

<h3 id="copyhierarchy"><code>copy(hierarchy)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L248 "View in source") [&#x24C9;][1]

Copy node to another tree instance.

#### Arguments
1. `hierarchy` *(boolean)*: Include necessary ancestors to match hierarchy.

---

<!-- /div -->

<!-- div -->

<h3 id="copyhierarchyexcludenode"><code>copyHierarchy(excludeNode)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L281 "View in source") [&#x24C9;][1]

Copy all parents of a node.

#### Arguments
1. `excludeNode` *(boolean)*: Exclude given node from hierarchy.

---

<!-- /div -->

<!-- div -->

<h3 id="deselectshallow"><code>deselect(shallow)</code></h3>
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

<h3 id="editable"><code>editable()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L355 "View in source") [&#x24C9;][1]

Get weather node editable. Required editing.edit to be enable via config.

---

<!-- /div -->

<!-- div -->

<h3 id="editing"><code>editing()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L365 "View in source") [&#x24C9;][1]

Get weather node is currently in edit mode.

---

<!-- /div -->

<!-- div -->

<h3 id="expand"><code>expand()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L375 "View in source") [&#x24C9;][1]

Expand this node.

---

<!-- /div -->

<!-- div -->

<h3 id="expandparents"><code>expandParents()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L419 "View in source") [&#x24C9;][1]

Expand parent nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="expanded"><code>expanded()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L409 "View in source") [&#x24C9;][1]

Get weather node expanded.

---

<!-- /div -->

<!-- div -->

<h3 id="focus"><code>focus()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L435 "View in source") [&#x24C9;][1]

Focus a node without changing its selection.

---

<!-- /div -->

<!-- div -->

<h3 id="focused"><code>focused()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L459 "View in source") [&#x24C9;][1]

Get weather this node is focused.

---

<!-- /div -->

<!-- div -->

<h3 id="getchildren"><code>getChildren()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L470 "View in source") [&#x24C9;][1]

Get children for this node. If no children exist, an empty TreeNodes
collection is returned for safe chaining.

---

<!-- /div -->

<!-- div -->

<h3 id="getparent"><code>getParent()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L480 "View in source") [&#x24C9;][1]

Get the immediate parent, if any.

---

<!-- /div -->

<!-- div -->

<h3 id="getparents"><code>getParents()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L490 "View in source") [&#x24C9;][1]

Get parent nodes. Excludes any siblings.

---

<!-- /div -->

<!-- div -->

<h3 id="gettextualhierarchy"><code>getTextualHierarchy()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L509 "View in source") [&#x24C9;][1]

Get a textual hierarchy for a given node. An array
of text from this node's root ancestor to the given node.

---

<!-- /div -->

<!-- div -->

<h3 id="hasancestornode"><code>hasAncestor(node)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L526 "View in source") [&#x24C9;][1]

Get weather the given node is an ancestor of this node.

#### Arguments
1. `node` *(TreeNode)*: Node object.

---

<!-- /div -->

<!-- div -->

<h3 id="haschildren"><code>hasChildren()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L539 "View in source") [&#x24C9;][1]

Get weather node has any children.

---

<!-- /div -->

<!-- div -->

<h3 id="hasloadedchildren"><code>hasLoadedChildren()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L549 "View in source") [&#x24C9;][1]

Get weather children have been loaded. Will always be true for non-dynamic nodes.

---

<!-- /div -->

<!-- div -->

<h3 id="hasorwillhavechildren"><code>hasOrWillHaveChildren()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L559 "View in source") [&#x24C9;][1]

Get weather node has any children, or allows dynamic loading.

---

<!-- /div -->

<!-- div -->

<h3 id="hasparent"><code>hasParent()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L569 "View in source") [&#x24C9;][1]

Get weather node has a parent.

---

<!-- /div -->

<!-- div -->

<h3 id="hasvisiblechildren"><code>hasVisibleChildren()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L579 "View in source") [&#x24C9;][1]

Get weather node has any visible children.

---

<!-- /div -->

<!-- div -->

<h3 id="hidden"><code>hidden()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L612 "View in source") [&#x24C9;][1]

Get weather this node is hidden.

---

<!-- /div -->

<!-- div -->

<h3 id="hide"><code>hide()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L595 "View in source") [&#x24C9;][1]

Hide this node.

---

<!-- /div -->

<!-- div -->

<h3 id="indeterminate"><code>indeterminate()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L638 "View in source") [&#x24C9;][1]

Get weather this node is indeterminate.

---

<!-- /div -->

<!-- div -->

<h3 id="indexpath"><code>indexPath()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L622 "View in source") [&#x24C9;][1]

Get a "path" of indices, values which map this node's location within all parent contexts.

---

<!-- /div -->

<!-- div -->

<h3 id="lastdeepestvisiblechild"><code>lastDeepestVisibleChild()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L648 "View in source") [&#x24C9;][1]

Find the last + deepest visible child of the previous sibling.

---

<!-- /div -->

<!-- div -->

<h3 id="loadchildren"><code>loadChildren()</code></h3>
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

<h3 id="loadmoreevent"><code>loadMore(event)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L762 "View in source") [&#x24C9;][1]

Load additional children.

#### Arguments
1. `event` *(Event)*: Click or scroll event if DOM interaction triggered this call.

---

<!-- /div -->

<!-- div -->

<h3 id="loading"><code>loading()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L751 "View in source") [&#x24C9;][1]

Get weather this node is loading child data.

---

<!-- /div -->

<!-- div -->

<h3 id="markdirty"><code>markDirty()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L776 "View in source") [&#x24C9;][1]

Mark node as dirty. For some systems this assists with rendering tracking.

---

<!-- /div -->

<!-- div -->

<h3 id="matched"><code>matched()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L794 "View in source") [&#x24C9;][1]

Get whether this node was matched during the last search.

---

<!-- /div -->

<!-- div -->

<h3 id="nextvisibleancestralsiblingnode"><code>nextVisibleAncestralSiblingNode()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L806 "View in source") [&#x24C9;][1]

Find the next visible sibling of our ancestor. Continues
seeking up the tree until a valid node is found or we
reach the root node.

---

<!-- /div -->

<!-- div -->

<h3 id="nextvisiblechildnode"><code>nextVisibleChildNode()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L827 "View in source") [&#x24C9;][1]

Find next visible child node.

---

<!-- /div -->

<!-- div -->

<h3 id="nextvisiblenode"><code>nextVisibleNode()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L845 "View in source") [&#x24C9;][1]

Get the next visible node.

---

<!-- /div -->

<!-- div -->

<h3 id="nextvisiblesiblingnode"><code>nextVisibleSiblingNode()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L870 "View in source") [&#x24C9;][1]

Find the next visible sibling node.

---

<!-- /div -->

<!-- div -->

<h3 id="pagination"><code>pagination()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L885 "View in source") [&#x24C9;][1]

Get pagination object for this tree node.

---

<!-- /div -->

<!-- div -->

<h3 id="previousvisiblenode"><code>previousVisibleNode()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L895 "View in source") [&#x24C9;][1]

Find the previous visible node.

---

<!-- /div -->

<!-- div -->

<h3 id="previousvisiblesiblingnode"><code>previousVisibleSiblingNode()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L920 "View in source") [&#x24C9;][1]

Find the previous visible sibling node.

---

<!-- /div -->

<!-- div -->

<h3 id="recursedowniteratee"><code>recurseDown(iteratee)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L935 "View in source") [&#x24C9;][1]

Iterate down node and any children.

#### Arguments
1. `iteratee` *(function)*: Iteratee function.

---

<!-- /div -->

<!-- div -->

<h3 id="recurseupiteratee"><code>recurseUp(iteratee)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L948 "View in source") [&#x24C9;][1]

Iterate up a node and its parents.

#### Arguments
1. `iteratee` *(function)*: Iteratee function.

---

<!-- /div -->

<!-- div -->

<h3 id="refreshindeterminatestate"><code>refreshIndeterminateState()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L967 "View in source") [&#x24C9;][1]

Update the indeterminate state of this node by scanning states of children.
<br>
<br>
True if some, but not all children are checked.
False if no children are checked.

---

<!-- /div -->

<!-- div -->

<h3 id="reload"><code>reload()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1017 "View in source") [&#x24C9;][1]

Remove all current children and re-execute a loadChildren call.

---

<!-- /div -->

<!-- div -->

<h3 id="removeincludestate"><code>remove(includeState)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1041 "View in source") [&#x24C9;][1]

Remove a node from the tree.

#### Arguments
1. `includeState` *(boolean)*: Include itree.state object.

---

<!-- /div -->

<!-- div -->

<h3 id="removed"><code>removed()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1072 "View in source") [&#x24C9;][1]

Get whether this node is soft-removed.

---

<!-- /div -->

<!-- div -->

<h3 id="rendered"><code>rendered()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1085 "View in source") [&#x24C9;][1]

Get whether this node has been rendered.
<br>
<br>
Will be false if deferred rendering is enable and the node has
not yet been loaded, or if a custom DOM renderer is used.

---

<!-- /div -->

<!-- div -->

<h3 id="restore"><code>restore()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1095 "View in source") [&#x24C9;][1]

Restore state if soft-removed.

---

<!-- /div -->

<!-- div -->

<h3 id="selectshallow"><code>select(shallow)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1106 "View in source") [&#x24C9;][1]

Select this node.

#### Arguments
1. `shallow` *(boolean)*: Skip auto-selecting children.

---

<!-- /div -->

<!-- div -->

<h3 id="selectable"><code>selectable()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1140 "View in source") [&#x24C9;][1]

Get weather node selectable.

---

<!-- /div -->

<!-- div -->

<h3 id="selected"><code>selected()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1151 "View in source") [&#x24C9;][1]

Get whether this node is selected.

---

<!-- /div -->

<!-- div -->

<h3 id="setproperty-value"><code>set(property, value)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1163 "View in source") [&#x24C9;][1]

Set a root property on this node.

#### Arguments
1. `property` *(number|string)*: Property name.
2. `value` *(&#42;)*: New value.

---

<!-- /div -->

<!-- div -->

<h3 id="show"><code>show()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1178 "View in source") [&#x24C9;][1]

Show this node.

---

<!-- /div -->

<!-- div -->

<h3 id="softremove"><code>softRemove()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1253 "View in source") [&#x24C9;][1]

Mark this node as "removed" without actually removing it.
<br>
<br>
Expand/show methods will never reveal this node until restored.

---

<!-- /div -->

<!-- div -->

<h3 id="statename-newval"><code>state(name, newVal)</code></h3>
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

<h3 id="swapnode"><code>swap(node)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1239 "View in source") [&#x24C9;][1]

Swap position with the given node.

#### Arguments
1. `node` *(TreeNode)*: Node.

---

<!-- /div -->

<!-- div -->

<h3 id="toobjectexcludechildren-includestate"><code>toObject(excludeChildren, includeState)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1310 "View in source") [&#x24C9;][1]

Export this node as a native Object.

#### Arguments
1. `excludeChildren` *(boolean)*: Exclude children.
2. `includeState` *(boolean)*: Include itree.state object.

---

<!-- /div -->

<!-- div -->

<h3 id="togglecheck"><code>toggleCheck()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1263 "View in source") [&#x24C9;][1]

Toggle checked state.

---

<!-- /div -->

<!-- div -->

<h3 id="togglecollapse"><code>toggleCollapse()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1273 "View in source") [&#x24C9;][1]

Toggle collapsed state.

---

<!-- /div -->

<!-- div -->

<h3 id="toggleediting"><code>toggleEditing()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1283 "View in source") [&#x24C9;][1]

Toggle editing state.

---

<!-- /div -->

<!-- div -->

<h3 id="toggleselect"><code>toggleSelect()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1298 "View in source") [&#x24C9;][1]

Toggle selected state.

---

<!-- /div -->

<!-- div -->

<h3 id="tree"><code>tree()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1354 "View in source") [&#x24C9;][1]

Get the tree this node ultimately belongs to.

---

<!-- /div -->

<!-- div -->

<h3 id="uncheckshallow"><code>uncheck(shallow)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1365 "View in source") [&#x24C9;][1]

Uncheck this node.

#### Arguments
1. `shallow` *(boolean)*: Skip auto-unchecking children.

---

<!-- /div -->

<!-- div -->

<h3 id="visible"><code>visible()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1393 "View in source") [&#x24C9;][1]

Get whether node is visible to a user. Returns false
if it's hidden, or if any ancestor is hidden or collapsed.

---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `Methods`

<!-- div -->

<h3 id="statesnames-newval"><code>states(names, newVal)</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1218 "View in source") [&#x24C9;][1]

Get or set multiple state values to a single value.

#### Arguments
1. `names` *(Array)*: Property names.
2. `newVal` *(boolean)*: New value, if setting.

---

<!-- /div -->

<!-- div -->

<h3 id="tostring"><code>toString()</code></h3>
[&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/treenode.js#L1344 "View in source") [&#x24C9;][1]

Get the text content of this tree node.

---

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #copynode "Jump back to the TOC."
