import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import hypernova, { serialize, load } from 'hypernova';
import { ServerStyleSheet } from 'styled-components';

export const renderReactWithStyledComponents = (name, component) =>
  hypernova({
    server() {
      return (props) => {
        const sheet = new ServerStyleSheet();
        const element = React.createElement(component, props);
        const html = ReactDOMServer.renderToString(element);
        const css = sheet.getStyleTags();
        const markup = serialize(name, html, props);
        return `${css}\n${markup}`;
      };
    },

    client() {
      const payloads = load(name);
      if (payloads) {
        payloads.forEach((payload) => {
          const { node, data } = payload;
          if (node) {
            const element = React.createElement(component, data);
            if (ReactDOM.hydrate) {
              ReactDOM.hydrate(element, node);
            } else {
              ReactDOM.render(element, node);
            }
          }
        });
      }

      return component;
    },
  });

export const renderReactWithStyledComponentsStatic = (name, component) =>
  hypernova({
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
