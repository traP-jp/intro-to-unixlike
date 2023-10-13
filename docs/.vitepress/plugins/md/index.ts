import MarkdownIt from 'markdown-it';
import { ContainerOpts } from 'markdown-it-container';

const containerMdExtend = (md: MarkdownIt): ContainerOpts => ({
  validate: (params) => {
    return /^spoiler\s+(.*)$/.test(params.trim());
  },

  render: (tokens, idx) => {
    var match = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);

    if (match === null) return '';

    if (tokens[idx].nesting === 1) {
      // opening tag
      return '<details><summary>' + md.utils.escapeHtml(match[1]) + '</summary>\n';
    } else {
      // closing tag
      return '</details>\n';
    }
  },
});

export default containerMdExtend;