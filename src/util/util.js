export const groupByParent = (Items) => {
  const groupedItems = {};

  Items.forEach((Item) => {
    if (!groupedItems[Item.parent]) {
      groupedItems[Item.parent] = [];
    }
    groupedItems[Item.parent].push(Item);
  });

  return groupedItems;
};

export const removePropertiesFromTheme = (componentName, theme) => {
  const newTheme = { ...theme };
  switch (componentName) {
    case "Colors":
      delete newTheme.colors;
      break;

    case "Sizes":
      delete newTheme.width;
      delete newTheme.minWidth;
      delete newTheme.maxWidth;
      delete newTheme.height;
      delete newTheme.minHeight;
      delete newTheme.maxHeight;
      delete newTheme.container;
      break;

    case "Spacing":
      delete newTheme.spacing;
      delete newTheme.margin;
      delete newTheme.padding;
      delete newTheme.space;
      delete newTheme.gap;
      delete newTheme.inset;
      delete newTheme.translateY;
      delete newTheme.translateX;
      break;

    case "Typography":
      delete newTheme.fontSize;
      delete newTheme.fontWeight;
      delete newTheme.lineHeight;
      delete newTheme.letterSpacing;
      break;

    case "Border":
      delete newTheme.borderWidth;
      delete newTheme.borderColor;
      delete newTheme.borderRadius;
      delete newTheme.borderStyle;
      delete newTheme.ringWidth;
      break;

    case "Effects":
      delete newTheme.boxShadow;
      delete newTheme.opacity;
      delete newTheme.backgroundBlendMode;
      delete newTheme.mixBlendMode;
      break;

    case "Flex & Grid":
      delete newTheme.flexGrow;
      delete newTheme.flexShrink;
      delete newTheme.order;
      delete newTheme.gridColumn;
      delete newTheme.gridColumnStart;

      delete newTheme.gridColumnEnd;
      delete newTheme.gridRow;
      delete newTheme.gridRowStart;
      delete newTheme.gridRowEnd;
      delete newTheme.gridAutoFlow;

      delete newTheme.gridAutoColumns;
      delete newTheme.gridAutoRows;
      delete newTheme.gridTemplateColumns;
      delete newTheme.gridTemplateRows;
      delete newTheme.gap;
      break;
  }

  return newTheme;
};
