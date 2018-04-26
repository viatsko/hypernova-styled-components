import jsdom from 'jsdom/lib/old-api';
import { assert } from 'chai';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import ifReact from 'enzyme-adapter-react-helper/build/ifReact';
import StyledComponent from './components/StyledComponent';
import {
  renderReactWithStyledComponents,
  renderReactWithStyledComponentsStatic,
} from '../';

describe('renderReactWithStyledComponents aphrodite css rendering', () => {
  let originalWindow;
  let originalDocument;
  let result;

  beforeEach(() => {
    originalWindow = global.window;
    originalDocument = global.document;
    result = renderReactWithStyledComponents('StyledComponent', StyledComponent)({
      children: ['Zack'],
      onPress() { console.log('Clicked'); },
    });
  });

  afterEach(() => {
    global.window = originalWindow;
    global.document = originalDocument;
  });

  it('the markup looks good', () => {
    assert.isString(result);

    assert.ok(/style data-styled-components/.test(result));
    assert.ok(/Zack/.test(result));
  });

  ifReact('>= 16', it, it.skip)('does not blow up when calling renderReactWithStyledComponents on the client', (done) => {
    jsdom.env(result, (err, window) => {
      if (err) {
        done(err);
        return;
      }

      global.window = window;
      global.document = window.document;

      const hydrateMethod = sinon.spy(ReactDOM, 'hydrate');

      renderReactWithStyledComponents('StyledComponent', StyledComponent);

      assert(hydrateMethod.calledOnce);

      delete global.window;
      delete global.document;

      hydrateMethod.restore();

      done();
    });
  });

  it('does not blow up when calling renderReactWithStyledComponents on the client (render method)', (done) => {
    jsdom.env(result, (err, window) => {
      if (err) {
        done(err);
        return;
      }

      global.window = window;
      global.document = window.document;

      const sandbox = sinon.createSandbox();
      if (ReactDOM.hydrate) {
        sandbox.stub(ReactDOM, 'hydrate').value(undefined);
      }

      const renderMethod = sinon.spy(ReactDOM, 'render');

      renderReactWithStyledComponents('StyledComponent', StyledComponent);

      assert(renderMethod.calledOnce);

      sandbox.restore();

      delete global.window;
      delete global.document;

      done();
    });
  });
});

describe('renderReactWithStyledComponentsStatic static styled components css rendering', () => {
  let originalWindow;
  let originalDocument;
  let result;

  beforeEach(() => {
    originalWindow = global.window;
    originalDocument = global.document;
    result = renderReactWithStyledComponentsStatic(
      'StyledComponent',
      StyledComponent,
    )({
      children: ['Steven'],
      onPress() {},
    });
  });

  afterEach(() => {
    global.window = originalWindow;
    global.document = originalDocument;
  });

  describe('on the server', () => {
    it('the output contains styles and component content', () => {
      assert.isString(result);

      assert.ok(/style data-styled-components/.test(result));
      assert.ok(/Steven/.test(result));
    });
  });

  describe('on the client', () => {
    it('returns nothing', (done) => {
      jsdom.env(result, (err, window) => {
        if (err) {
          done(err);
          return;
        }

        global.window = window;
        global.document = window.document;

        assert.isUndefined(renderReactWithStyledComponentsStatic(
          'StyledComponent',
          StyledComponent,
        ));

        done();
      });
    });
  });
});
