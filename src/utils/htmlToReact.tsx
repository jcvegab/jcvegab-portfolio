import ReactHtmlParser, { domToReact } from 'html-react-parser';

import ScriptTag from '../components/ScriptTag';
import Link from './link';
import { isEmpty, omit } from './lodash';

import type { ReactElement, ReactNode } from 'react';

export default function htmlToReact(html: string) {
  if (!html) return null;

  return ReactHtmlParser(html, {
    transform: (
      reactNode: ReactNode,
      node: import('html-react-parser').DOMNode,
      index: number,
    ): ReactElement | void | null => {
      if (node.type === 'script') {
        if (!isEmpty((node as any).children)) {
          return (
            <ScriptTag key={index} {...node.attribs}>
              {domToReact((node as any).children)}
            </ScriptTag>
          );
        } else {
          return <ScriptTag key={index} {...node.attribs} />;
        }
      }
      if (node.type === 'tag' && node.name === 'a') {
        const href = node.attribs.href;
        const props = omit(node.attribs, 'href');
        // use Link only if there are no custom attributes like style, class, and what's not that might break react
        if (isEmpty(props)) {
          return (
            <Link key={index} href={href} {...props}>
              {domToReact((node as any).children)}
            </Link>
          );
        }
      }
      return reactNode as ReactElement | null;
    },
  });
}
