import ReactHtmlParser, { domToReact } from 'html-react-parser';

import ScriptTag from '@/components/ScriptTag';

import Link from './link';
import { isEmpty, omit } from './lodash';

import type { DOMNode } from 'html-react-parser';
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
        if (!isEmpty(node.children)) {
          return (
            <ScriptTag key={index} {...node.attribs}>
              {domToReact(node.children as DOMNode[])}
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
              {domToReact(node.children as DOMNode[])}
            </Link>
          );
        }
      }
      return reactNode as ReactElement | null;
    },
  });
}
