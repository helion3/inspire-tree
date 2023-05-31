import { EventEmitter2 } from 'eventemitter2';

/**
 * Represents a generic callback which receives a single TreeNode argument.
 */
export interface NodeIteratee {
    (node: TreeNode): any;
}

/**
 * Represents a processor for nodes matched during search.
 */
export interface MatchProcessor {
    (matches: TreeNodes): any;
}

/**
 * Represents a search matcher which is given resolve/reject callbacks.
 */
export interface SearchMatcher {
    (query: string, resolve: any, reject: any): any;
}

// Copied from EventEmitter2 to avoid imports, see below
interface Listener {
    (...values: any[]): void;
}
interface EventAndListener {
    (event: string | string[], ...values: any[]): void;
}

// Valid resolver return types
export type NodeConfigs = NodeConfig[]
export type NodeConfigsPromise = Promise<NodeConfigs | undefined>

// Preferred function type
export type NodeConfigsFunctionResolver = (node: TreeNode | null) => NodeConfigs | NodeConfigsPromise

// Effectively deprecated!
export type NodeConfigsResolver = (node: TreeNode | null, resolve: (nodes: Array<NodeConfig>) => void, reject: (err: Error) => void) => void

// All possible provider types
export type NodeConfigsProvider = NodeConfigs | NodeConfigsPromise | NodeConfigsFunctionResolver | NodeConfigsResolver;

/**
 * Represents a tree configuration object, of which only "data" is required.
 */
export interface Config {
    allowLoadEvents?: Array<string>;
    contextMenu?: boolean;
    data: NodeConfigsProvider;
    deferredLoading?: boolean;
    editable?: boolean;
    editing?: {
        add?: boolean;
        edit?: boolean;
        remove?: boolean;
    };
    nodes?: {
        resetStateOnRestore?: boolean;
    };
    pagination?: {
        limit?: number;
    };
    renderer?: any;
    search?: {
        matcher: SearchMatcher;
        matchProcess: MatchProcessor;
    };
    selection?: {
        allow?: NodeIteratee;
        autoDeselect?: boolean;
        autoSelectChildren?: boolean;
        disableDirectDeselection?: boolean;
        mode?: string;
        multiple?: boolean;
        require?: boolean;
    };
    sort?: string;
    multiselect?: boolean;
}

export interface NodeConfig {
    children?: Array<NodeConfig>|boolean,
    id?: string,
    text: string,
    itree?: {
        a?: {
            attributes?: any
        },
        icon?: string,
        li?: {
            attributes?: any
        },
        state?: {
            checked?: boolean,
            collapsed?: boolean,
            draggable?: boolean,
            'drop-target'?: boolean,
            editable?: boolean,
            focused?: boolean,
            hidden?: boolean,
            indeterminate?: boolean,
            loading?: boolean,
            matched?: boolean,
            removed?: boolean,
            rendered?: boolean,
            selectable?: boolean,
            selected?: boolean,
            [x: string]: boolean | undefined
        }
    }
}

/**
 * Represents a TreeNodes pagination configuration object.
 */
export interface Pagination {
    limit: number;
    total: number;
}


export interface TreeEvents {
    /** @event changes.applied (InspireTree | TreeNode context) - Indicates batched changes are complete for the context. */
    'changes.applied'?: (context: InspireTree | TreeNode) => void;

    /** @event children.loaded (TreeNode node) - Children were dynamically loaded for a node. */
    'children.loaded'?: (node: TreeNode) => void;

    /** @event data.loaded (Array nodes) - Data has been loaded successfully (only for data loaded via xhr/callbacks). */
    'data.loaded'?: (nodes: any[]) => void;

    /** @event data.loaderror (Error err) - Loading failed. */
    'data.loaderror'?: (err: Error) => void;

    /** @event model.loaded (Array nodes) - Data has been parsed into an internal model. */
    'model.loaded'?: (node: TreeNode) => void;

    /** @event node.added (TreeNode node) - Node added. */
    'node.added'?: (node: TreeNode) => void;

    /** @event node.click (TreeNode node) - Node os clicked. */
    'node.click'?: (node: TreeNode) => void;

    /** @event node.blurred (TreeNode node, bool isLoadEvent) - Node lost focus. */
    'node.blurred'?: (node: TreeNode, isLoadEvent: boolean) => void;

    /** @event node.checked (TreeNode node, bool isLoadEvent) - Node checked. */
    'node.checked'?: (node: TreeNode, isLoadEvent: boolean) => void;

    /** @event node.collapsed (TreeNode node) - Node collapsed. */
    'node.collapsed'?: (node: TreeNode) => void;

    /** @event node.deselected (TreeNode node) - Node deselected. */
    'node.deselected'?: (node: TreeNode) => void;

    /** @event node.edited (TreeNode node), (string oldValue), (string newValue) - Node text was altered via inline editing. */
    'node.edited'?: (node: TreeNode) => void;

    /** @event node.expanded (TreeNode node, bool isLoadEvent) - Node expanded. */
    'node.expanded'?: (node: TreeNode, isLoadEvent: boolean) => void;

    /** @event node.focused (TreeNode node, bool isLoadEvent) - Node focused. */
    'node.focused'?: (node: TreeNode, isLoadEvent: boolean) => void;

    /** @event node.hidden (TreeNode node, bool isLoadEvent) - Node hidden. */
    'node.hidden'?: (node: TreeNode, isLoadEvent: boolean) => void;

    /** @event node.moved (TreeNode node, TreeNodes source, int oldIndex, TreeNodes target, int newIndex) - Node moved. */
    'node.moved'?: (node: TreeNode) => void;

    /** @event node.paginated (TreeNode context), (Object pagination) (Event event) - Nodes were paginated. Context is undefined when for the root level. */
    'node.paginated'?: (node: TreeNode) => void;

    /** @event node.propertchanged - (TreeNode node), (String property), (Mixed oldValue), (Mixed) newValue) - A node's root property has changed. */
    'node.property.changed'?: (node: TreeNode) => void;

    /** @event node.removed (object node) - Node removed. */
    'node.removed'?: (node: TreeNode) => void;

    /** @event node.restored (TreeNode node) - Node restored. */
    'node.restored'?: (node: TreeNode) => void;

    /** @event node.selected (TreeNode node, bool isLoadEvent) - Node selected. */
    'node.selected'?: (node: TreeNode, isLoadEvent: boolean) => void;

    /** @event node.statchanged - (TreeNode node), (String property), (Mixed oldValue), (Mixed) newValue) - A node state boolean has changed. */
    'node.state.changed'?: (node: TreeNode) => void;

    /** @event node.shown (TreeNode node) - Node shown. */
    'node.shown'?: (node: TreeNode) => void;

    /** @event node.softremoved (TreeNode node, bool isLoadEvent) - Node soft removed. */
    'node.softremoved'?: (node: TreeNode, isLoadEvent: boolean) => void;

    /** @event node.unchecked (TreeNode node) - Node unchecked. */
    'node.unchecked'?: (node: TreeNode) => void;
}

export interface InspireTree {

    emit<E extends keyof TreeEvents>(event: E | E[], ...values: any[]): boolean;

    emitAsync<E extends keyof TreeEvents>(event: E | E[], ...values: any[]): Promise<any[]>;

    addListener<E extends keyof TreeEvents>(event: E, listener: TreeEvents[E]): this;

    on<E extends keyof TreeEvents>(event: E, listener: TreeEvents[E]): this;

    prependListener<E extends keyof TreeEvents>(event: E | E[], listener: TreeEvents[E]): this;

    once<E extends keyof TreeEvents>(event: E, listener: TreeEvents[E]): this;

    prependOnceListener<E extends keyof TreeEvents>(event: E | E[], listener: TreeEvents[E]): this;

    many<E extends keyof TreeEvents>(event: E | E[], timesToListen: number, listener: TreeEvents[E]): this;

    prependMany<E extends keyof TreeEvents>(event: E | E[], timesToListen: number, listener: TreeEvents[E]): this;

    onAny(listener: EventAndListener): this;

    prependAny(listener: EventAndListener): this;

    offAny(listener: Listener): this;

    removeListener<E extends keyof TreeEvents>(event: E | E[], listener: TreeEvents[E]): this;

    off<E extends keyof TreeEvents>(event: E, listener: TreeEvents[E]): this;
}

export class InspireTree extends EventEmitter2 {
    addNode(node: NodeConfig): TreeNode;
    addNodes(node: Array<NodeConfig>): TreeNodes;
    available(): TreeNodes;
    blur(): TreeNodes;
    blurDeep(): TreeNodes;
    boundingNodes(): Array<TreeNode>;
    canAutoDeselect(): boolean;
    checked(): TreeNodes;
    clean(): TreeNodes;
    clearSearch(): InspireTree;
    clone(): TreeNodes;
    collapse(): TreeNodes;
    collapsed(full?: boolean): TreeNodes;
    collapseDeep(): TreeNodes;
    constructor(opts: Config);
    constructor(tree: InspireTree, array: Array<any>|TreeNodes);
    constructor(tree: InspireTree);
    context(): TreeNode;
    copy(dest: InspireTree, hierarchy?: boolean, includeState?: boolean): TreeNodes;
    createNode(obj: any): TreeNode;
    deepest(): TreeNodes;
    deselect(): TreeNodes;
    deselectDeep(): TreeNodes;
    disableDeselection(): InspireTree;
    each(iteratee: NodeIteratee): TreeNodes;
    editable(full?: boolean): TreeNodes;
    editing(full?: boolean): TreeNodes;
    enableDeselection(): InspireTree;
    expand(): Promise<TreeNodes>;
    expandDeep(): TreeNodes;
    expanded(full?: boolean): TreeNodes;
    expandParents(): TreeNodes;
    extract(predicate: string|NodeIteratee): TreeNodes;
    filterBy(predicate: string|NodeIteratee): TreeNodes;
    find(predicate: (node: TreeNode, index?: number, obj?: TreeNode[]) => boolean, thisArg?: any): TreeNode;
    first(predicate: (node: TreeNode) => boolean): TreeNode;
    flatten(predicate: string|NodeIteratee): TreeNodes;
    focused(full?: boolean): TreeNodes;
    get(index: number): TreeNode;
    hidden(full?: boolean): TreeNodes;
    hide(): TreeNodes;
    hideDeep(): TreeNodes;
    id: string | number;
    config: Config;
    preventDeselection: boolean;
    indeterminate(full?: boolean): TreeNodes;
    insertAt(index: number, object: any): TreeNode;
    invoke(methods: string|Array<string>): TreeNodes;
    invokeDeep(methods: string|Array<string>): TreeNodes;
    isEventMuted(eventName: string): boolean;
    static isTreeNode(object: any): boolean;
    static isTreeNodes(object: any): boolean;
    last(predicate: (node: TreeNode) => boolean): TreeNode;
    lastSelectedNode(): TreeNode;
    load(loader: Promise<TreeNodes>): Promise<TreeNodes>;
    loading(full?: boolean): TreeNodes;
    matched(full?: boolean): TreeNodes;
    move(index: number, newIndex: number, target: TreeNodes): TreeNode;
    mute(events: Array<string>): InspireTree;
    muted(): boolean;
    node(id: string|number): TreeNode;
    nodes(ids?: Array<string>|Array<number>): TreeNodes;
    pagination(): Pagination;
    recurseDown(iteratee: NodeIteratee): TreeNodes;
    reload(): Promise<TreeNodes>;
    removeAll(): InspireTree;
    removed(full?: boolean): TreeNodes;
    restore(): TreeNodes;
    restoreDeep(): TreeNodes;
    search(query: string|RegExp|NodeIteratee): Promise<TreeNodes>;
    select(): TreeNodes;
    selectable(full?: boolean): TreeNodes;
    selectBetween(start: TreeNode, end: TreeNode): InspireTree;
    selectDeep(): TreeNodes;
    selected(full?: boolean): TreeNodes;
    selectFirstAvailableNode(): TreeNode;
    show(): TreeNodes;
    showDeep(): TreeNodes;
    softRemove(): TreeNodes;
    sortBy(sorter: string|NodeIteratee): TreeNodes;
    state(key: string, val: boolean): TreeNodes;
    stateDeep(key: string, val: boolean): TreeNodes;
    swap(node1: TreeNode, node2: TreeNode): TreeNodes;
    toArray(): Array<any>;
    toArray(): Array<any>;
    tree(): InspireTree;
    unmute(events: Array<string>): InspireTree;
    visible(full?: boolean): TreeNodes;
}

export class TreeNodes extends Array<TreeNode> {
    addNode(node: NodeConfig): TreeNode;
    available(): TreeNodes;
    blur(): TreeNodes;
    blurDeep(): TreeNodes;
    checked(): TreeNodes;
    clean(): TreeNodes;
    clone(): TreeNodes;
    collapse(): TreeNodes;
    collapsed(full?: boolean): TreeNodes;
    collapseDeep(): TreeNodes;
    constructor(tree: InspireTree, array: Array<any>|TreeNodes);
    constructor(tree: InspireTree);
    context(): TreeNode;
    copy(dest: InspireTree, hierarchy?: boolean, includeState?: boolean): TreeNodes;
    deepest(): TreeNodes;
    deselect(): TreeNodes;
    deselectDeep(): TreeNodes;
    each(iteratee: NodeIteratee): TreeNodes;
    editable(full?: boolean): TreeNodes;
    editing(full?: boolean): TreeNodes;
    expand(): TreeNodes;
    expandDeep(): Promise<TreeNodes>;
    expanded(full?: boolean): TreeNodes;
    expandParents(): TreeNodes;
    extract(predicate: string|NodeIteratee): TreeNodes;
    filterBy(predicate: string|NodeIteratee): TreeNodes;
    find(predicate: (node: TreeNode, index?: number, obj?: TreeNode[]) => boolean, thisArg?: any): TreeNode;
    flatten(predicate: string|NodeIteratee): TreeNodes;
    focused(full?: boolean): TreeNodes;
    get(index: number): TreeNode;
    hidden(full?: boolean): TreeNodes;
    hide(): TreeNodes;
    hideDeep(): TreeNodes;
    indeterminate(full?: boolean): TreeNodes;
    insertAt(index: number, object: any): TreeNode;
    invoke(methods: string|Array<string>): TreeNodes;
    invokeDeep(methods: string|Array<string>): TreeNodes;
    loading(full?: boolean): TreeNodes;
    matched(full?: boolean): TreeNodes;
    move(index: number, newIndex: number, target: TreeNodes): TreeNode;
    node(id: string|number): TreeNode;
    nodes(ids?: Array<string>|Array<number>): TreeNodes;
    pagination(): Pagination;
    recurseDown(iteratee: NodeIteratee): TreeNodes;
    removed(full?: boolean): TreeNodes;
    restore(): TreeNodes;
    restoreDeep(): TreeNodes;
    select(): TreeNodes;
    selectable(full?: boolean): TreeNodes;
    selectBetween(start: TreeNode, end: TreeNode): InspireTree;
    selectDeep(): TreeNodes;
    selected(full?: boolean): TreeNodes;
    show(): TreeNodes;
    showDeep(): TreeNodes;
    softRemove(): TreeNodes;
    sortBy(sorter: string|NodeIteratee): TreeNodes;
    state(key: string, val: boolean): TreeNodes;
    stateDeep(key: string, val: boolean): TreeNodes;
    swap(node1: TreeNode, node2: TreeNode): TreeNodes;
    toArray(): Array<any>;
    tree(): InspireTree;
    visible(full?: boolean): TreeNodes;
}

export interface TreeNode {}

export class TreeNode {
    addChild(node: NodeConfig): TreeNode;
    addChildren(nodes: Array<NodeConfig>): TreeNodes;
    assign(...sources: object[]): TreeNode;
    available(): boolean;
    blur(): TreeNode;
    check(shallow?: boolean): TreeNode;
    checked(): boolean;
    children: boolean | TreeNodes;
    clean(): TreeNode;
    clone(excludeKeys?: Array<string>): TreeNode;
    collapse(): TreeNode;
    collapsed(): boolean;
    constructor(tree: InspireTree, source: any|TreeNode, excludeKeys: Array<string>);
    constructor(tree: InspireTree, source: any|TreeNode);
    constructor(tree: InspireTree);
    text: string;
    id: string;
    itree?: NodeConfig['itree'];
    context(): TreeNodes;
    copy(dest: InspireTree, hierarchy?: boolean, includeState?: boolean): TreeNode;
    copyHierarchy(excludeNode?: boolean, includeState?: boolean): TreeNode;
    deselect(shallow?: boolean): TreeNode;
    editable(): boolean;
    editing(): boolean;
    expand(): Promise<TreeNode>;
    expanded(): boolean;
    expandParents(): TreeNode;
    focus(): TreeNode;
    focused(): boolean;
    getChildren(): TreeNodes;
    getParent(): TreeNode;
    getParents(): TreeNodes;
    getTextualHierarchy(): Array<string>;
    hasAncestor(): boolean;
    hasChildren(): boolean;
    hasLoadedChildren(): boolean;
    hasOrWillHaveChildren(): boolean;
    hasParent(): boolean;
    hasVisibleChildren(): boolean;
    hidden(): boolean;
    hide(): TreeNode;
    indeterminate(): boolean;
    indexPath(): string;
    isFirstRenderable(): boolean;
    isLastRenderable(): boolean;
    isOnlyRenderable(): boolean;
    lastDeepestVisibleChild(): TreeNode;
    loadChildren(): Promise<TreeNodes>;
    loading(): boolean;
    markDirty(): TreeNode;
    matched(): TreeNodes;
    nextVisibleAncestralSiblingNode(): TreeNode;
    nextVisibleChildNode(): TreeNode;
    nextVisibleNode(): TreeNode;
    nextVisibleSiblingNode(): TreeNode;
    pagination(): Pagination;
    previousVisibleNode(): TreeNode;
    previousVisibleSiblingNode(): TreeNode;
    recurseDown(iteratee: NodeIteratee): TreeNode;
    recurseUp(iteratee: NodeIteratee): TreeNode;
    refreshIndeterminateState(): TreeNode;
    reload(): Promise<TreeNodes>;
    remove(includeState?: boolean): any;
    removed(): boolean;
    renderable(): boolean;
    rendered(): boolean;
    restore(): TreeNode;
    select(shallow?: boolean): TreeNode;
    selectable(): boolean;
    selected(): boolean;
    set(key: number|string, val: any): TreeNode;
    show(): TreeNode;
    softRemove(): TreeNode;
    state(key: object|string, val?: boolean): boolean|object;
    states(keys: Array<string>, val: boolean): boolean;
    toggleCheck(): TreeNode;
    toggleCollapse(): TreeNode;
    toggleEditing(): TreeNode;
    toggleSelect(): TreeNode;
    toObject(excludeChildren?: boolean, includeState?: boolean): any;
    toString(): string;
    tree(): InspireTree;
    uncheck(shallow?: boolean): TreeNode;
    visible(): boolean;
}

export default InspireTree;
