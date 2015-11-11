# 

<!-- div class="toc-container" -->

<!-- div -->

## `DOM`
* <a href="#attach">`attach`</a>
* <a href="#batch">`batch`</a>
* <a href="#closeContextMenu">`closeContextMenu`</a>
* <a href="#collapseNode">`collapseNode`</a>
* <a href="#end">`end`</a>
* <a href="#expandNode">`expandNode`</a>
* <a href="#hideAll">`hideAll`</a>
* <a href="#hideNode">`hideNode`</a>
* <a href="#hideNodes">`hideNodes`</a>
* <a href="#renderNodes">`renderNodes`</a>
* <a href="#showAll">`showAll`</a>
* <a href="#showNode">`showNode`</a>

<!-- /div -->

<!-- div -->

## `Properties`
* <a href="#applyChanges">`applyChanges`</a>

<!-- /div -->

<!-- div -->

## `Methods`
* <a href="#markNodeDirty">`markNodeDirty`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `“DOM” Methods`

<!-- div -->

### <a id="attach"></a>`attach(target)`
<a href="#attach">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/dom.js#L465 "View in source") [&#x24C9;][1]

Attaches to the DOM element for rendering.

#### Arguments
1. `target` *(HTMLElement)*: Element, selector, or jQuery-like object.

* * *

<!-- /div -->

<!-- div -->

### <a id="batch"></a>`batch`
<a href="#batch">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/dom.js#L528 "View in source") [&#x24C9;][1]

Disable rendering in preparation for multiple changes.

* * *

<!-- /div -->

<!-- div -->

### <a id="closeContextMenu"></a>`closeContextMenu`
<a href="#closeContextMenu">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/dom.js#L538 "View in source") [&#x24C9;][1]

Closes any open context menu.

* * *

<!-- /div -->

<!-- div -->

### <a id="collapseNode"></a>`collapseNode(node)`
<a href="#collapseNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/dom.js#L552 "View in source") [&#x24C9;][1]

Expand immediate children for this node, if any.

#### Arguments
1. `node` *(object)*: Node object.

* * *

<!-- /div -->

<!-- div -->

### <a id="end"></a>`end`
<a href="#end">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/dom.js#L571 "View in source") [&#x24C9;][1]

Permit rerendering of batched changes.

* * *

<!-- /div -->

<!-- div -->

### <a id="expandNode"></a>`expandNode(node)`
<a href="#expandNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/dom.js#L586 "View in source") [&#x24C9;][1]

Expand immediate children for this node, if any.

#### Arguments
1. `node` *(object)*: Node object.

* * *

<!-- /div -->

<!-- div -->

### <a id="hideAll"></a>`hideAll`
<a href="#hideAll">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/dom.js#L651 "View in source") [&#x24C9;][1]

Hides all nodes.

* * *

<!-- /div -->

<!-- div -->

### <a id="hideNode"></a>`hideNode(node)`
<a href="#hideNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/dom.js#L613 "View in source") [&#x24C9;][1]

Hide a node.

#### Arguments
1. `node` *(object)*: Node object.

* * *

<!-- /div -->

<!-- div -->

### <a id="hideNodes"></a>`hideNodes(nodes)`
<a href="#hideNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/dom.js#L638 "View in source") [&#x24C9;][1]

Hide all nodes in an array.

#### Arguments
1. `nodes` *(array)*: Array of node objects.

* * *

<!-- /div -->

<!-- div -->

### <a id="renderNodes"></a>`renderNodes(nodes)`
<a href="#renderNodes">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/dom.js#L679 "View in source") [&#x24C9;][1]

Triggers rendering for the given node array.

#### Arguments
1. `nodes` *(array)*: Array of node objects.

* * *

<!-- /div -->

<!-- div -->

### <a id="showAll"></a>`showAll`
<a href="#showAll">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/dom.js#L702 "View in source") [&#x24C9;][1]

Shows all nodes.

* * *

<!-- /div -->

<!-- div -->

### <a id="showNode"></a>`showNode(node)`
<a href="#showNode">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/dom.js#L715 "View in source") [&#x24C9;][1]

Hide a node.

#### Arguments
1. `node` *(object)*: Node object.

* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `Properties`

<!-- div -->

### <a id="applyChanges"></a>`applyChanges`
<a href="#applyChanges">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/dom.js#L449 "View in source") [&#x24C9;][1]

Apply pending data changes to the DOM.
<br>
<br>
Will skip rendering as long as any calls
to `batch` have yet to be resolved,

* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `Methods`

<!-- div -->

### <a id="markNodeDirty"></a>`markNodeDirty(startingNode)`
<a href="#markNodeDirty">#</a> [&#x24C8;](https://github.com/helion3/inspire-tree/blob/master/src/lib/dom.js#L662 "View in source") [&#x24C9;][1]

Mark a node as dirty, rebuilding this node in the virtual DOM
and rerendering to the live DOM, next time renderNodes is called.

#### Arguments
1. `startingNode` *(object)*: Node object.

* * *

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #dom "Jump back to the TOC."
