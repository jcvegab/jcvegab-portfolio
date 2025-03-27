import React from 'react';
import _ from 'lodash';
import ReactHtmlParser, { domToReact } from 'html-react-parser';

import ScriptTag from '../components/ScriptTag';
import Link from './link';

export default function htmlToReact(html) {
  if (!html) return null;

  return ReactHtmlParser(html, {
    transform: (reactNode, node, index) => {
      if (node.type === 'script') {
        if (!_.isEmpty(node.children)) {
          return (
            <ScriptTag key={index} {...node.attribs}>
              {domToReact(node.children)}
            </ScriptTag>
          );
        } else {
          return <ScriptTag key={index} {...node.attribs} />;
        }
      }
      if (node.type === 'tag' && node.name === 'a') {
        const href = node.attribs.href;
        const props = _.omit(node.attribs, 'href');
        // use Link only if there are no custom attributes like style, class, and what's not that might break react
        if (_.isEmpty(props)) {
          return (
            <Link key={index} href={href} {...props}>
              {domToReact(node.children)}
            </Link>
          );
        }
      }
      return reactNode;
    },
  });
}
