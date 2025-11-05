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

    case "Filters":
      delete newTheme.blur;
      delete newTheme.brightness;
      delete newTheme.contrast;
      delete newTheme.dropShadow;
      delete newTheme.grayscale;
      delete newTheme.hueRotate;
      delete newTheme.invert;
      delete newTheme.saturate;
      delete newTheme.sepia;
      break;

    case "Backdrop Filters":
      delete newTheme.backdropBlur;
      delete newTheme.backdropBrightness;
      delete newTheme.backdropContrast;
      delete newTheme.backdropGrayscale;
      delete newTheme.backdropHueRotate;
      delete newTheme.backdropInvert;
      delete newTheme.backdropOpacity;
      delete newTheme.backdropSaturate;
      delete newTheme.backdropSepia;
      break;

    case "Transitions":
      delete newTheme.transitionProperty;
      delete newTheme.transitionDuration;
      delete newTheme.transitionTimingFunction;
      delete newTheme.transitionDelay;
      break;

    case "Transforms":
      delete newTheme.scale;
      delete newTheme.rotate;
      delete newTheme.skew;
      break;

    case "Animations":
      delete newTheme.animation;
      delete newTheme.keyframes;
      break;

    case "Other Utilities":
      delete newTheme.zIndex;
      delete newTheme.aspectRatio;
      delete newTheme.columns;
      delete newTheme.cursor;
      delete newTheme.accentColor;
      delete newTheme.caretColor;
      delete newTheme.scrollMargin;
      delete newTheme.scrollPadding;
      delete newTheme.fill;
      delete newTheme.stroke;
      delete newTheme.strokeWidth;
      delete newTheme.textIndent;
      delete newTheme.textDecorationColor;
      delete newTheme.textDecorationThickness;
      delete newTheme.textUnderlineOffset;
      delete newTheme.textShadow;
      delete newTheme.outlineWidth;
      delete newTheme.outlineColor;
      delete newTheme.outlineOffset;
      delete newTheme.outlineStyle;
      delete newTheme.fontFamily;
      delete newTheme.backgroundImage;
      delete newTheme.backgroundSize;
      delete newTheme.backgroundPosition;
      delete newTheme.screens;
      break;
  }

  return newTheme;
};
