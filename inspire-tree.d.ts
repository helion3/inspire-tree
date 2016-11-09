/// <reference types="es6-promise" />

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
     * Represents the copy.to middleman structure.
     */
    interface Copy {
        to(dest: any): any;
    }

    /**
     * Represents a tree configuration object, of which only "data" is required.
     */
    interface Config {
        allowLoadEvents?: Array<string>;
        contextMenu?: boolean;
        data?: Array<any>|Promise<any>|DataResolver;
        dragTargets?: Array<string>;
        editable?: boolean;
        editing?: {
            add?: boolean;
            edit?: boolean;
            remove?: boolean;
        };
        nodes?: {
            resetStateOnRestore?: boolean;
        };
        renderer?: any;
        search?: string|RegExp|NodeIteratee;
        selection?: {
            allow?: NodeIteratee;
            autoDeselect?: boolean;
            autoSelectChildren?: boolean;
            disableDirectDeselection?: boolean;
            mode?: string;
            multiple?: boolean;
            require?: boolean;
        };
        showCheckboxes?: boolean;
        sort?: string;
        tabindex?: number;
        target?: HTMLElement;
    }

    class InspireTree {
        addNode(node: any): TreeNode;
        addNodes(node: Array<any>): TreeNodes;
        available(): TreeNodes;
        blur(): TreeNodes;
        blurDeep(): TreeNodes;
        boundingNodes(): Array<TreeNode>;
        canAutoDeselect(): boolean;
        clean(): TreeNodes;
        clearSearch(): InspireTree;
        clone(): TreeNodes;
        collapse(): TreeNodes;
        collapsed(full?: boolean): TreeNodes;
        collapseDeep(): TreeNodes;
        concat(nodes: TreeNodes): TreeNodes;
        constructor(opts: Config);
        copy(hierarchy?: boolean): Copy;
        deepest(): TreeNodes;
        deselect(): TreeNodes;
        deselectDeep(): TreeNodes;
        disableDeselection(): InspireTree;
        each(iteratee: NodeIteratee): TreeNodes;
        editable(full?: boolean): TreeNodes;
        editing(full?: boolean): TreeNodes;
        enableDeselection(): InspireTree;
        expand(): TreeNodes;
        expanded(full?: boolean): TreeNodes;
        expandDeep(): TreeNodes;
        extract(predicate: string|NodeIteratee): TreeNodes;
        filter(predicate: string|NodeIteratee): TreeNodes;
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
        isNode(object: any): boolean;
        lastSelectedNode(): TreeNode;
        load(loader: Promise<TreeNodes>): any;
        loading(full?: boolean): TreeNodes;
        mute(events: Array<string>): InspireTree;
        muted(): boolean;
        node(id: string|number): TreeNode;
        nodes(ids?: Array<string>|Array<number>): TreeNodes;
        recurseDown(iteratee: NodeIteratee): TreeNodes;
        reload(): Promise<TreeNodes>;
        removeAll(): InspireTree;
        removed(full?: boolean): TreeNodes;
        restore(): TreeNodes;
        restoreDeep(): TreeNodes;
        search(query: string|RegExp|NodeIteratee): TreeNodes;
        select(): TreeNodes;
        selectable(full?: boolean): TreeNodes;
        selectBetween(start: TreeNode, end: TreeNode): InspireTree;
        selectDeep(): TreeNodes;
        selected(full?: boolean): TreeNodes;
        selectFirstAvailableNode(): TreeNode;
        show(): TreeNodes;
        showDeep(): TreeNodes;
        softRemove(): TreeNodes;
        sort(sorter: string|NodeIteratee): TreeNodes;
        state(key: string, val: boolean): TreeNodes;
        stateDeep(key: string, val: boolean): TreeNodes;
        toArray(): Array<any>;
        unmute(events: Array<string>): InspireTree;
        visible(full?: boolean): TreeNodes;
    }

    interface TreeNodes {
        addNode(node: any): TreeNode;
        available(): TreeNodes;
        blur(): TreeNodes;
        blurDeep(): TreeNodes;
        clean(): TreeNodes;
        clone(): TreeNodes;
        collapse(): TreeNodes;
        collapsed(full?: boolean): TreeNodes;
        collapseDeep(): TreeNodes;
        concat(nodes: TreeNodes): TreeNodes;
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
        filter(predicate: string|NodeIteratee): TreeNodes;
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
        node(id: string|number): TreeNode;
        nodes(ids?: Array<string>|Array<number>): TreeNodes;
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
        sort(sorter: string|NodeIteratee): TreeNodes;
        state(key: string, val: boolean): TreeNodes;
        stateDeep(key: string, val: boolean): TreeNodes;
        tree(): InspireTree;
        toArray(): Array<any>;
        visible(full?: boolean): TreeNodes;
    }

    interface TreeNode {
        addChild(node: any): TreeNode;
        addChildren(nodes: Array<any>): TreeNodes;
        available(): boolean;
        blur(): TreeNode;
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
        deselect(skipParentIndeterminate?: boolean): TreeNode;
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
        markDirty(): TreeNode;
        nextVisibleAncestralSiblingNode(): TreeNode;
        nextVisibleChildNode(): TreeNode;
        nextVisibleNode(): TreeNode;
        nextVisibleSiblingNode(): TreeNode;
        previousVisibleNode(): TreeNode;
        previousVisibleSiblingNode(): TreeNode;
        recurseDown(iteratee: NodeIteratee): TreeNode;
        recurseUp(iteratee: NodeIteratee): TreeNode;
        refreshIndeterminateState(): TreeNode;
        remove(): any;
        removed(): boolean;
        restore(): TreeNode;
        select(): TreeNode;
        selectable(): boolean;
        selected(): boolean;
        set(key: number|string, val: any): TreeNode;
        show(): TreeNode;
        state(key: string, val: boolean): TreeNodes;
        softRemove(): TreeNode;
        toggleCollapse(): TreeNode;
        toggleEditing(): TreeNode;
        toggleSelect(): TreeNode;
        toObject(excludeChildren?: boolean): any;
        visible(): boolean;
    }

	export default InspireTree;
}
