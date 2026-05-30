// @flow
import { Component, createElement } from 'react';
import PropTypes from 'prop-types';

import type { ScriptTagProps } from './ScriptTag.types';

const TEST_ENV = process.env.NODE_ENV === 'test';
const noop = () => {};

class ScriptTag extends Component<ScriptTagProps> {
  domRef: HTMLScriptElement | null;
  state: {
    isHydrated: boolean | undefined;
    additionalNode: HTMLScriptElement | null;
    removeAdditionalNode: HTMLScriptElement | null;
  };
  static propTypes = {
    /**
     * True if the <ScriptTag> is being hydrated on the client, otherwise false.
     */
    isHydrating: PropTypes.bool,

    // Standard <script> tag props
    async: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    crossOrigin: PropTypes.string,
    defer: PropTypes.bool,
    integrity: PropTypes.string,
    nonce: PropTypes.string,
    src: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.string,
    dangerouslySetInnerHTML: PropTypes.object,

    // globals
    onError: PropTypes.func,
    onLoad: PropTypes.func,
  };

  static defaultProps = {
    isHydrating: false,
    onError: noop,
    onLoad: noop,
  };

  /**
   * @param {HTMLElement} node
   */
  static removeNode(node: HTMLElement | null) {
    if (node) {
      node.parentNode.removeChild(node);
    }
  }

  constructor(props: ScriptTagProps) {
    super(props);
    this.domRef = null;
    this.state = {
      isHydrated: props.isHydrating,
      additionalNode: null,
      removeAdditionalNode: null,
    };
  }

  appendAdditionalElement() {
    const { onError, onLoad, nonce } = this.props;

    // Create a new HTML script element
    let newElement = document.createElement('script');

    // Copy all attribute values
    if (!this.domRef) {
      return null;
    }

    for (let i = 0, len = this.domRef.attributes.length; i < len; i++) {
      const attr = this.domRef.attributes[i];
      if (attr.nodeName === 'nonce') {
        // The browser clears the nonce value - grab from props
        newElement.setAttribute(attr.nodeName, nonce);
      } else {
        newElement.setAttribute(attr.nodeName, attr.nodeValue);
      }
    }

    // Copy the inner script
    if (
      this.domRef.src === '' &&
      this.domRef.innerHTML &&
      this.domRef.innerHTML !== ''
    ) {
      newElement.innerHTML = this.domRef.innerHTML;
    }

    if (TEST_ENV) {
      newElement.setAttribute('data-appended', 'true');
    }

    // Bind event listeners
    newElement.addEventListener('load', onLoad);
    newElement.addEventListener('error', onError);

    // Append the new script tag
    if (this.domRef.parentNode) {
      this.domRef.parentNode.appendChild(newElement);
    }
    return newElement;
  }

  componentDidMount() {
    const { isHydrated } = this.state;
    if (isHydrated) {
      // was rendered on server, don't replace elements when hydrating
      return;
    }

    this.setState({
      additionalNode: this.appendAdditionalElement(),
      removeAdditionalNode: null,
    });
  }

  /**
   * @param {Object} nextProps
   */
  componentWillReceiveProps(nextProps: ScriptTagProps) {
    // This logic assumes that the <script> only need to be updated if the 'src' or 'innerHTML' has changed
    //  - this prevents the <script> from updating unnecessarily, which prevents additional 'onload' events

    // This isn't perfect - but it keeps the component very simple, and should cover most use-cases
    // Other props SHOULD be assigned at the same time as either the 'src' or 'innerHTML' property
    // -> If this is to change and support updating on ANY prop change, the 'appendAdditionalElement()' method
    //    and state management will need to be modified to manipulate the DOM script tag based on each prop change.
    //    This really complicates the component - for now we'll leave it as is.
    const { src, dangerouslySetInnerHTML } = this.props;
    if (src && src === nextProps.src) {
      // The 'src' attribute has not changed
      return;
    }

    if (
      dangerouslySetInnerHTML &&
      dangerouslySetInnerHTML.__html ===
        nextProps.dangerouslySetInnerHTML.__html
    ) {
      // The 'dangerouslySetInnerHTML' attribute has not changed
      return;
    }

    this.setState({
      removeAdditionalNode: this.state.additionalNode,
      additionalNode: null,
    });
  }

  /**
   * @param {Object} nextProps
   * @param {Object} nextState
   */
  componentWillUpdate(
    nextProps: ScriptTagProps,
    nextState: { removeAdditionalNode: HTMLScriptElement | null },
  ) {
    ScriptTag.removeNode(nextState.removeAdditionalNode);
  }

  componentDidUpdate() {
    const { additionalNode, removeAdditionalNode } = this.state;
    if (additionalNode === null) {
      this.setState({
        additionalNode: this.appendAdditionalElement(),
      });
    }

    if (removeAdditionalNode !== null) {
      // Was removed in 'componentWillUpdate', but can not update state there
      this.setState({
        removeAdditionalNode: null,
      });
    }
  }

  componentWillUnmount() {
    ScriptTag.removeNode(this.state.removeAdditionalNode);
    ScriptTag.removeNode(this.state.additionalNode);
  }

  render() {
    const { additionalNode } = this.state;
    if (additionalNode !== null) {
      return null;
    }

    // The 'isHydrating' prop must NOT be passed to the script tag
    // eslint-disable-next-line no-unused-vars
    const { isHydrating, ...tagProps } = this.props;
    return createElement('script', {
      ...tagProps,
      ref: (tag: HTMLScriptElement | null) => {
        this.domRef = tag;
      },
    });
  }
}

export default ScriptTag;
