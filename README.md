# Inspire Tree

Inspire Tree is a highly efficient javascript-based UI tree component, built for the modern web.

Features include:

- Robust API.
- Events everywhere.
- Virtual DOM for blazing fast DOM updates.
- Supports promises for loading data, etc.
- AMD and CommonJS support (RequireJS, Node).
- Supports IE10+.
- Supports multiple instances on a single page.

## Using

At a minimum you must provide a selector for a target DOM element and data.

```js
var tree = new InspireTree({
    selector: '.source-tree',
    data: $.getJSON('sample-data.json')
});
```

If `data` is a promise, results will be read when it's resolved.

#### Events

Events are triggered to inform you of changes or user interaction.

```js
tree.events.on('node.click', function(event, node) {
    // node clicked!
});
```

#### Event List

- *node.added*
- *node.click*
- *node.collapsed*
- *node.deselected*
- *node.expanded*
- *node.hidden*
- *node.selected*
- *node.shown*

### Development

Clone the repository, and get yourself setup:

- `npm install` - Installs all project dependencies.
- `npm run setup` - Copies git hooks and run workspace setup.

Live-compile source changes as you develop:

- `npm run watch`

When needed, lint your code. Will happen automatically on commit.

- `npm run lint`
