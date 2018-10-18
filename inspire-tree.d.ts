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
type eventNS = string[];
interface Listener {
    (...values: any[]): void;
}
interface EventAndListener {
    (event: string | string[], ...values: any[]): void;
}

/**
 * Represents a tree configuration object, of which only "data" is required.
 */
export interface Config {
    allowLoadEvents?: Array<string>;
    contextMenu?: boolean;
    data?(node: TreeNode, resolve: (nodes: Array<NodeConfig>) => any, reject: (err: Error) => any): any|Array<NodeConfig>|Promise<Array<NodeConfig>>;
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
}

export interface NodeConfig {
    children?: Array<NodeConfig>|true,
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
    copy(hierarchy?: boolean): TreeNodes;
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
    flatten(predicate: string|NodeIteratee): TreeNodes;
    focused(full?: boolean): TreeNodes;
    get(index: number): TreeNode;
    hidden(full?: boolean): TreeNodes;
    hide(): TreeNodes;
    hideDeep(): TreeNodes;
    id: string | number;
    indeterminate(full?: boolean): TreeNodes;
    insertAt(index: number, object: any): TreeNode;
    invoke(methods: string|Array<string>): TreeNodes;
    invokeDeep(methods: string|Array<string>): TreeNodes;
    isEventMuted(eventName: string): boolean;
    static isTreeNode(object: any): boolean;
    static isTreeNodes(object: any): boolean;
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
    copy(hierarchy?: boolean): TreeNodes;
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

export class TreeNode {
    addChild(node: NodeConfig): TreeNode;
    addChildren(nodes: Array<NodeConfig>): TreeNodes;
    assign(...sources: object[]): TreeNode;
    available(): boolean;
    blur(): TreeNode;
    check(shallow?: boolean): TreeNode;
    checked(): boolean;
    clean(): TreeNode;
    clone(excludeKeys?: Array<string>): TreeNode;
    collapse(): TreeNode;
    collapsed(): boolean;
    constructor(tree: InspireTree, source: any|TreeNode, excludeKeys: Array<string>);
    constructor(tree: InspireTree, source: any|TreeNode);
    constructor(tree: InspireTree);
    context(): TreeNodes;
    copy(hierarchy?: boolean): TreeNode;
    copyHierarchy(excludeNode?: boolean): TreeNode;
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
    hasOrWillHaveChildren(): boolean;
    hasParent(): boolean;
    hasVisibleChildren(): boolean;
    hidden(): boolean;
    hide(): TreeNode;
    indeterminate(): boolean;
    indexPath(): string;
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
