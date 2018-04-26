import { assert } from 'chai';
import StyledComponent from './components/StyledComponent';
import { renderReactWithStyledComponentsStatic } from '../';

describe('renderReactWithStyledComponentsStatic static styled components css rendering', () => {
  let originalWindow;
  let originalDocument;
  let result;

  beforeEach(() => {
    originalWindow = global.window;
    originalDocument = global.document;
    result = renderReactWithStyledComponentsStatic('StyledComponent', StyledComponent)({
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
});
