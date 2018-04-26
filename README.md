# hypernova-styled-components [![Build Status](https://travis-ci.org/viatsko/hypernova-styled-components.svg?branch=master)](https://travis-ci.org/viatsko/hypernova-styled-components)

[Styled Components](https://github.com/styled-components/styled-components) 💅 bindings for [Hypernova](https://github.com/airbnb/hypernova).

## Install

```sh
npm install hypernova-styled-components
```

## Usage

Here's how use use it in your module:

```js
import { renderReactWithStyledComponents } from 'hypernova-styled-components';
import MyComponent from './src/MyComponent.jsx';

export default renderReactWithStyledComponents(
  'MyComponent.hypernova.js', // this file's name (or really any unique name)
  MyComponent,
);
```
