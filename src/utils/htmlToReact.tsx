import ReactHtmlParser, { domToReact } from 'html-react-parser';

import ScriptTag from '../components/ScriptTag';
import Link from './link';
import { isEmpty, omit } from './lodash';

import type { DOMNode, Element } from 'html-react-parser';
import type { ReactElement, ReactNode } from 'react';

export default function htmlToReact(html: string) {
  if (!html) return null;

  return ReactHtmlParser(html, {
    transform: (
      reactNode: ReactNode,
      node: DOMNode,
      index: number,
    ): ReactElement | undefined | null => {
      if (node.type === 'script') {
        const domNode = node as Element;
        if (!isEmpty(domNode.children)) {
          return (
            <ScriptTag key={index} {...domNode.attribs}>
              {domToReact(domNode.children as DOMNode[])}
            </ScriptTag>
          );
        } else {
          return <ScriptTag key={index} {...domNode.attribs} />;
        }
      }
      if (node.type === 'tag' && node.name === 'a') {
        const domNode = node as Element;
        const href = domNode.attribs.href;
        const props = omit(domNode.attribs, 'href');
        // use Link only if there are no custom attributes like style, class, and what's not that might break react
        if (isEmpty(props)) {
          return (
            <Link key={index} href={href} {...props}>
              {domToReact(domNode.children as DOMNode[])}
            </Link>
          );
        }
      }
      return reactNode as ReactElement | null;
    },
  });
}
