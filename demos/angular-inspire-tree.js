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
        module.directive('inspireTree', function() {
            return {
                restrict: 'E',
                replace: true,
                template: '<div class="inspire-tree" tabindex="-1">' +
                    '<inspire-tree-nodes nodes="model" tree="tree"></inspire-tree-nodes>' +
                '</div>',
                scope: {
                    options: '='
                },
                link: function(scope) {
                    scope.options = scope.options || {};

                    var tree = new InspireTree(scope.options);
                    scope.tree = tree;

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
        });

        module.directive('inspireTreeNodes', function() {
            return {
                restrict: 'E',
                replace: true,
                template: '<ol>' +
                    '<li ' +
                        'ng-if="node.available()" ' +
                        'ng-repeat="node in nodes track by node.id" ' +
                        'ng-class="{' +
                            'collapsed: node.collapsed(),' +
                            'focused: node.focused(),' +
                            'hidden: node.hidden() || node.removed(),' +
                            'selected: node.selected()' +
                        '}">' +
                        '<inspire-tree-node node="node" tree="tree"></inspire-tree-node>' +
                    '</li>' +
                '</ol>',
                scope: {
                    nodes: '=',
                    tree: '='
                }
            };
        });

        module.directive('inspireTreeNode', ['$compile', function($compile) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    node: '=',
                    tree: '='
                },
                template: '<div>' +
                    '<div class="title-wrap">' +
                        '<a class="toggle icon" ' +
                        'ng-click="node.toggleCollapse()" ' +
                        'ng-class="node.collapsed() ? \'icon-expand\' : \'icon-collapse\'" ' +
                        'ng-if="node.hasChildren()"></a> ' +
                        '<a class="title icon" ' +
                        'ng-class="getIcon()" ' +
                        'ng-click="onClick($event)" ' +
                        'ng-bind="node.text"></a>' +
                    '</div>' +
                    '<div class="wholerow"></div>' +
                '</div>',
                link: function(scope, $element) {
                    if (scope.node.hasChildren()) {
                        var tmpl = '<inspire-tree-nodes nodes="node.children" tree="tree"></inspire-tree-nodes>';
                        $element.append($compile(tmpl)(scope));
                    }
                },
                controller: ['$scope', function($scope) {
                    $scope.getIcon = function() {
                        return $scope.node.itree.icon || $scope.node.hasChildren() ? 'icon-folder' : 'icon-file-empty';
                    };

                    $scope.onClick = function($event) {
                        if ($scope.tree.config.multiselect) {
                            $scope.tree.preventDeselection = $event.metaKey || $event.ctrlKey;
                        }

                        $scope.node.toggleSelect();
                    };
                }]
            };
        }]);
    });
}());
