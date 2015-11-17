(function() {
    'use strict';

    define(['angular', 'inspireTree'], function(angular, InspireTree) {
        var module = angular.module('ngInspireTree', []);

        /**
         * Creates an InspireTree instance.
         *
         * If options object contains a function "onRegisterApi", it will be
         * called with the tree instance API passed as an argument.
         *
         * @param {object} Options object passed to InspireTree
         * @return {void}
         * @example
         *
         * <inspire-tree data="nodes" options="options"></inspire-tree>
         */
        module.directive('inspireTree', [function() {
            return {
                restrict: 'E',
                replace: true,
                template: '<div class="inspire-tree">' +
                    '<inspire-tree-nodes nodes="model"></inspire-tree-nodes>' +
                '</div>',
                scope: {
                    options: '='
                },
                link: function(scope, $element) {
                    scope.options = scope.options || {};
                    scope.options.target = $element;

                    var tree = new InspireTree(scope.options);

                    tree.on('model.loaded', function(model) {
                        scope.model = model;
                    });

                    if (typeof scope.options.onRegisterApi === 'function') {
                        scope.options.onRegisterApi(tree);
                    }

                    scope.$watch('options.data', function(newValue) {
                        if (typeof newValue !== 'function') {
                            tree.load(scope.options.data);
                        }
                    });
                }
            };
        }]);

        /**
         * Builds a list of nodes.
         *
         * @private
         * @param {array} nodes Array of node objects.
         * @return {void}
         */
        module.directive('inspireTreeNodes', [function() {
            return {
                restrict: 'E',
                replace: true,
                template: '<ol>' +
                    '<li ' +
                        'ng-if="node.available()" ' +
                        'ng-repeat="node in nodes track by node.id" ' +
                        'ng-class="{' +
                            'collapsed: node.collapsed(),' +
                            'hidden: node.hidden(),' +
                            'selected: node.selected()' +
                        '}">' +
                        '<inspire-tree-node node="node"></inspire-tree-node>' +
                    '</li>' +
                '</ol>',
                scope: {
                    nodes: '='
                }
            };
        }]);

        /**
         * Builds a node.
         *
         * @private
         * @param {TreeNode} node Node object.
         * @return {void}
         */
        module.directive('inspireTreeNode', ['$compile', function($compile) {
            return {
                restrict: 'E',
                replace: true,
                template: '<div>' +
                    '<div class="wholerow"></div>' +
                    '<div class="title-wrap">' +
                        '<a class="toggle icon" ' +
                        'ng-click="node.toggleCollapse()" ' +
                        'ng-class="node.collapsed() ? \'icon-caret\' : \'icon-caret-down\'" ' +
                        'ng-if="node.hasChildren()"></a> ' +
                        '<a class="title icon" ' +
                        'ng-class="getIcon()" ' +
                        'ng-click="node.toggleSelect()" ' +
                        'ng-bind="node.text"></a>' +
                    '</div>' +
                '</div>',
                scope: {
                    node: '='
                },
                link: function(scope, $element) {
                    if (scope.node.hasChildren()) {
                        var tmpl = '<inspire-tree-nodes nodes="node.children"></inspire-tree-nodes>';
                        $element.append($compile(tmpl)(scope));
                    }
                },
                controller: ['$scope', function($scope) {
                    $scope.getIcon = function() {
                        return $scope.node.itree.icon || $scope.node.hasChildren() ? 'icon-folder' : 'icon-file-empty';
                    };
                }]
            };
        }]);
    });
}());
