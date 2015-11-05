(function(window, document) {
    'use strict';

    var clone = function(obj) {
        return Object.keys(obj).reduce(function(c, k) {
            c[k] = obj[k];
            return c;
        }, {});
    };

    var recurse = function(col, func) {
        col.forEach(function(item, key) {
            col[key] = func(item);

            if (Array.isArray(item.children) && item.children.length) {
                item.children = recurse(item.children, func);
            }
        });

        return col;
    };

    var removeClass = function($elem, className) {
        $elem.className = $elem.className.replace(new RegExp('(?:^|\\s)' + className + '(?!\\S)'), '');
    };

    var toggleClass = function($elem, className) {
        if ($elem.className.indexOf(className) >= 0) {
            removeClass($elem, className);
            $elem.className = $elem.className.replace(' ' + className, '');
        }
        else {
            $elem.className += ' ' + className;
        }
    };

    var InspireTree = function InspireTree(options) {
        var tree = this;
        var model = [];
        var $tree;

        tree.addNode = function(node) {
            node.itree = null;
            node = tree.objectToModel(node);
            node.itree.state.changed = true;
            model.push(node);
        };

        tree.addNodes = function(nodes) {
            nodes.forEach(function(node) {
                tree.addNode(node);
            });

            tree.redraw();
        };

        tree.deselectAll = function() {
            tree.deselectNodes(model);
        };

        tree.deselectNodes = function(nodes) {
            nodes.forEach(function(node) {
                tree.deselectNode(node);
            });
        };

        tree.deselectNode = function(node) {
            removeClass(node.itree.dom, 'selected');
            node.itree.state.selected = false;
        };

        tree.flatten = function(nodes) {
            var flat = [];

            if (Array.isArray(nodes) && nodes.length) {
                nodes.forEach(function(node) {
                    if (node.itree.state.selected) {
                        flat.push(node);
                    }
                    else {
                        flat = flat.concat(tree.flatten(node.children));
                    }
                });
            }

            return flat;
        };

        tree.generateId = function() {
            return performance.now().toString();
        };

        tree.hideNode = function(node) {
            tree.deselectNode(node);

            node.itree.state.hidden = true;
            node.itree.dom.className += ' hidden';
        };

        tree.hideNodes = function(nodes) {
            nodes.forEach(function(node) {
                tree.hideNode(node);
            });
        };

        tree.collectionToModel = function(coll) {
            coll.forEach(function(obj, key) {
                coll[key] = tree.objectToModel(obj);
            });

            return coll;
        };

        tree.objectToModel = function objectToModel(obj) {
            obj.id = obj.id || tree.generateId();

            if (!obj.itree) {
                obj.itree = {
                    state: {
                        selected: false
                    }
                };
            }

            if (Array.isArray(obj.children) && obj.children.length) {
                tree.collectionToModel(obj.children);
            }

            return obj;
        };

        // Link to a DOM element
        tree.linkDom = function linkDom(selector) {
            $tree = document.querySelector(selector);
            if (!$tree) {
                throw new Error('No valid target DOM element found. Selector: ' + selector);
            }

            $tree.className += ' inspire-tree';
        };

        tree.loadData = function loadData(data) {
            if (Array.isArray(data)) {
                model = tree.collectionToModel(data);
                tree.render();
            }

            else if (typeof data === 'object') {
                // Promise
                if (typeof data.then === 'function') {
                    data.then(function(results) {
                        model = tree.collectionToModel(results);
                        tree.render();
                    });
                }
            }
        };

        tree.render = function render() {
            $tree.appendChild(tree.renderNodes(model, true));
        };

        tree.renderNodes = function renderNodes(nodes, isRootNode) {
            var $ul = document.createElement('ul');

            if (!isRootNode) {
                $ul.className += ' collapsed';
            }

            nodes.forEach(function(node) {
                $ul.appendChild(tree.renderNode(node));
            });

            return $ul;
        };

        // Move these
        tree.dom = {};

        tree.dom.buildToggle = function buildToggle() {
            var $toggle = document.createElement('a');
            $toggle.className += 'toggle icon icon-caret';
            $toggle.addEventListener('click', function() {
                toggleClass($toggle.parentNode.nextSibling, 'collapsed');
            });

            return $toggle;
        };

        tree.dom.buildTitle = function buildTitle(title) {
            var $titleAnchor = document.createElement('a');
            $titleAnchor.innerHTML = '<span></span><span>' + title + '</span>';

            $titleAnchor.addEventListener('click', function() {
                tree.selectNode($titleAnchor.parentNode.parentNode);
            });

            return $titleAnchor;
        };

        tree.renderNode = function renderNode(node) {
            var $li = document.createElement('li');

            $li.setAttribute('data-iid', node.id);

            var $div = document.createElement('div');
            if (Array.isArray(node.children) && node.children.length) {
                $div.appendChild(tree.dom.buildToggle());
            }

            $div.appendChild(tree.dom.buildTitle(node.title));
            $li.appendChild($div);

            // Nested nodes
            if (Array.isArray(node.children) && node.children.length) {
                $li.appendChild(tree.renderNodes(node.children));
            }

            node.itree.dom = $li;

            return $li;
        };

        tree.getNodeByElement = function getNodeByElement($elem) {
            if (!($elem instanceof HTMLLIElement)) {
                throw new TypeError('Argument is not an Element.');
            }

            return tree.getNodeById($elem.getAttribute('data-iid'));
        };

        tree.getNodeById = function(id, nodes) {
            var node;

            (nodes || model).forEach(function(item) {
                if (item.id === id) {
                    node = item;
                }

                if (!node && Array.isArray(item.children) && item.children.length) {
                    node = tree.getNodeById(id, item.children);
                }

                if (node) {
                    return false;
                }
            });

            return node;
        };

        tree.getSelected = function(nodes, flat) {
            var selected = [];

            if (flat) {
                recurse((nodes || model), function(node) {
                    if (node.itree.state.selected) {
                        selected.push(node);
                    }

                    return node;
                });
            }
            else {
                (nodes || model).forEach(function(node) {
                    var nodeClone;

                    if (node.itree.state.selected) {
                        nodeClone = clone(node);
                    }

                    // Are any children selected?
                    if (!nodeClone && Array.isArray(node.children) && node.children.length) {
                        var children = tree.getSelected(node.children);
                        if (children.length) {
                            nodeClone = clone(node);
                            nodeClone.children = children;
                        }
                    }

                    if (nodeClone) {
                        selected.push(nodeClone);
                    }
                });
            }

            return selected;
        };

        tree.redraw = function() {
            var $ul = $tree.querySelector('ul');
            model.forEach(function(node) {
                if (node.itree.state.changed) {
                    $ul.appendChild(tree.renderNode(node));
                }
            });
        };

        tree.removeNode = function(node) {
            node.itree.dom.parentNode.removeChild(node.itree.dom);
            node.itree = null;

            return node;
        };

        tree.removeNodes = function(nodes) {
            var removed = [];

            nodes.forEach(function(node) {
                removed.push(tree.removeNode(node));
            });

            return removed;
        };

        tree.selectNode = function selectNode(source) {
            tree.deselectAll();

            if (source instanceof HTMLLIElement) {
                var node = tree.getNodeByElement(source);
                node.itree.state.selected = true;
                toggleClass(source, 'selected');
            }
        };

        tree.linkDom(options.target);
        tree.loadData(options.data);

        return tree;
    };

    // Register a constructor
    window.inspireTree = function(opts) {
        return new InspireTree(opts);
    };

    /**
     * @file perfnow is a 0.14 kb window.performance.now high resolution timer polyfill with Date fallback
     * @author Daniel Lamb <dlamb.open.source@gmail.com>
     */
    if (!('performance' in window)) {
        window.performance = {};
    }
    var perf = window.performance;

    // handle vendor prefixing
    window.performance.now = perf.now ||
        perf.mozNow ||
        perf.msNow ||
        perf.oNow ||
        perf.webkitNow ||
        Date.now || function() {
            return new Date().getTime();
        };
}(window, window.document));
