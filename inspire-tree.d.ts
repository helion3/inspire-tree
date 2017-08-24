declare module "inspire-tree" {
    /**
     * Represents a generic callback which receives a single TreeNode argument.
     */
    interface NodeIteratee {
        (node: TreeNode): any;
    }

    /**
     * Represents a generic data loader which is given resolve/reject callbacks.
     */
    interface DataResolver {
        (node: any, resolve: any, reject: any): any;
    }

    /**
     * Represents a processor for nodes matched during search.
     */
    interface MatchProcessor {
        (matches: TreeNodes): any;
    }

    /**
     * Represents a search matcher which is given resolve/reject callbacks.
     */
    interface SearchMatcher {
        (query: string, resolve: any, reject: any): any;
    }

    /**
     * Represents the copy.to middleman structure.
     */
    interface Copy {
        to(dest: any): any;
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
    interface Config {
        allowLoadEvents?: Array<string>;
        contextMenu?: boolean;
        data?: Array<any>|Promise<any>|DataResolver;
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

    /**
     * Represents a TreeNodes pagination configuration object.
     */
    interface Pagination {
        limit: number;
        total: number;
    }

    class InspireTree extends TreeNodes {
        addNodes(node: Array<any>): TreeNodes;
        boundingNodes(): Array<TreeNode>;
        canAutoDeselect(): boolean;
        clearSearch(): InspireTree;
        constructor(opts: Config);
        createNode(obj: any): TreeNode;
        disableDeselection(): InspireTree;
        enableDeselection(): InspireTree;
        id: string;
        isEventMuted(eventName: string): boolean;
        static isTreeNode(object: any): boolean;
        static isTreeNodes(object: any): boolean;
        lastSelectedNode(): TreeNode;
        load(loader: Promise<TreeNodes>): any;
        mute(events: Array<string>): InspireTree;
        muted(): boolean;
        reload(): Promise<TreeNodes>;
        removeAll(): InspireTree;
        search(query: string|RegExp|NodeIteratee): TreeNodes;
        selectFirstAvailableNode(): TreeNode;
        toArray(): Array<any>;
        unmute(events: Array<string>): InspireTree;

        // Inherited from EventEmitter2.
        // These are manually defined because otherwise we'd have to make
        // the eventemitter2 module a dependency purely for the typings which
        // simply be spam for a majority of users
        emit(event: string | string[], ...values: any[]): boolean;
        emitAsync(event: string | string[], ...values: any[]): Promise<any[]>;
        addListener(event: string, listener: Listener): this;
        on(event: string | string[], listener: Listener): this;
        prependListener(event: string | string[], listener: Listener): this;
        once(event: string | string[], listener: Listener): this;
        prependOnceListener(event: string | string[], listener: Listener): this;
        many(event: string | string[], timesToListen: number, listener: Listener): this;
        prependMany(event: string | string[], timesToListen: number, listener: Listener): this;
        onAny(listener: EventAndListener): this;
        prependAny(listener: EventAndListener): this;
        offAny(listener: Listener): this;
        removeListener(event: string | string[], listener: Listener): this;
        off(event: string, listener: Listener): this;
        removeAllListeners(event?: string | eventNS): this;
        setMaxListeners(n: number): void;
        eventNames(): string[];
    }

    class TreeNodes extends Array<TreeNode> {
        addNode(node: any): TreeNode;
        available(): TreeNodes;
        blur(): TreeNodes;
        blurDeep(): TreeNodes;
        checked(): TreeNodes;
        clean(): TreeNodes;
        clone(): TreeNodes;
        collapse(): TreeNodes;
        collapsed(full?: boolean): TreeNodes;
        collapseDeep(): TreeNodes;
        constructor(tree: InspireTree);
        constructor(tree: InspireTree, array: Array<any>|TreeNodes);
        context(): TreeNode;
        copy(hierarchy?: boolean): Copy;
        deepest(): TreeNodes;
        deselect(): TreeNodes;
        deselectDeep(): TreeNodes;
        each(iteratee: NodeIteratee): TreeNodes;
        editable(full?: boolean): TreeNodes;
        editing(full?: boolean): TreeNodes;
        expand(): TreeNodes;
        expanded(full?: boolean): TreeNodes;
        expandDeep(): TreeNodes;
        expandParents(): TreeNodes;
        extract(predicate: string|NodeIteratee): TreeNodes;
        filterBy(predicate: string|NodeIteratee): TreeNodes;
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
        tree(): InspireTree;
        toArray(): Array<any>;
        visible(full?: boolean): TreeNodes;
    }

    class TreeNode {
        addChild(node: any): TreeNode;
        addChildren(nodes: Array<any>): TreeNodes;
        available(): boolean;
        blur(): TreeNode;
        check(shallow?: boolean): TreeNode;
        checked(): boolean;
        clean(): TreeNode;
        clone(excludeKeys?: Array<string>): TreeNode;
        collapse(): TreeNode;
        collapsed(): boolean;
        constructor(tree: InspireTree);
        constructor(tree: InspireTree, source: any|TreeNode);
        constructor(tree: InspireTree, source: any|TreeNode, excludeKeys: Array<string>);
        context(): TreeNodes;
        copy(hierarchy?: boolean): Copy;
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
        hasChildren(): boolean;
        hasParent(): boolean;
        hasVisibleChildren(): boolean;
        hide(): TreeNode;
        hidden(): boolean;
        indexPath(): string;
        indeterminate(): boolean;
        lastDeepestVisibleChild(): TreeNode;
        loadChildren(): Promise<TreeNodes>;
        loading(): boolean;
        matched(): TreeNodes;
        markDirty(): TreeNode;
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
        remove(): any;
        removed(): boolean;
        rendered(): boolean;
        restore(): TreeNode;
        select(shallow?: boolean): TreeNode;
        selectable(): boolean;
        selected(): boolean;
        set(key: number|string, val: any): TreeNode;
        show(): TreeNode;
        state(key: string, val: boolean): TreeNodes;
        softRemove(): TreeNode;
        toggleCheck(): TreeNode;
        toggleCollapse(): TreeNode;
        toggleEditing(): TreeNode;
        toggleSelect(): TreeNode;
        toString(): string;
        toObject(excludeChildren?: boolean): any;
        tree(): InspireTree;
        uncheck(shallow?: boolean): TreeNode;
        visible(): boolean;
    }

	export default InspireTree;
}
