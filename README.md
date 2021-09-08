# Web Components
## Description

This is a project for building a standalone Web Component using Stencil, to use in any Frontend.

## Getting Started

To start building a new web component, clone this repo to a new directory and execute the following commands and run:

```bash
npm install
npm build:watch
```

To run the unit tests for the components, run:

```bash
npm test
```

## Using the components

If you want develop with any Frontend you need to link the projects to see the changes locally, check the following link https://flaviocopes.com/npm-local-package/

Here the documentation how we can integrate the Web Component with any Framework https://stenciljs.com/docs/overview

React Example:


```React
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// test-component is the name of our made up Web Component that we have
// published to npm:
import { applyPolyfills, defineCustomElements } from 'test-components/loader';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

applyPolyfills().then(() => {
  defineCustomElements();
});

```