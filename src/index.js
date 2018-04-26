import React from 'react';
import ReactDOMServer from 'react-dom/server';
import hypernova from 'hypernova';
import { ServerStyleSheet } from 'styled-components';

export const renderReactWithStyledComponentsStatic = (name, component) => hypernova({
  server() {
    return (props) => {
      const sheet = new ServerStyleSheet();
      const element = React.createElement(component, props);
      const html = ReactDOMServer.renderToStaticMarkup(element);
      const css = sheet.getStyleTags();
      return `${css}\n${html}`;
    };
  },

  client() {},
});
