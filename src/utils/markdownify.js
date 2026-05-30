import { marked } from 'marked';
import htmlToReact from './htmlToReact';

/**
 * @param {string} markdown
 */
export default function markdownify(markdown) {
  if (!markdown) return null;
  return htmlToReact(marked(markdown));
}
