const inlineTags = {
  code: 'CODE',
  del: 'STRIKETHROUGH',
  i: 'ITALIC',
  b: 'BOLD',
  ins: 'UNDERLINE',
  sub: 'SUBSCRIPT',
  sup: 'SUPERSCRIPT',
};

export default function processInlineTag(
  tag: string,
  node: Object,
  currentStyle: Object
): Object {
  const styleToCheck = inlineTags[tag];
  let inlineStyle;
  if (styleToCheck) {
    inlineStyle = currentStyle.add(styleToCheck).toOrderedSet();
  } else if (node instanceof HTMLElement) {
    inlineStyle = currentStyle;
    const htmlElement = node;
    inlineStyle = inlineStyle.withMutations((style) => {
      const color = htmlElement.style.color;
      const backgroundColor = htmlElement.style.backgroundColor;
      const fontSize = htmlElement.style.fontSize;
      const fontFamily = htmlElement.style.fontFamily.replace(/^"|"$/g, '');
      if (color) {
        style.add(`color-${color.replace(/ /g, '')}`);
      }
      if (backgroundColor) {
        style.add(`bgcolor-${backgroundColor.replace(/ /g, '')}`);
      }
      if (fontSize) {
        style.add(`fontsize-${fontSize.substr(0, fontSize.length - 2)}`);
      }
      if (fontFamily) {
        style.add(`fontfamily-${fontFamily}`);
      }
    }).toOrderedSet();
  }
  return inlineStyle;
}
