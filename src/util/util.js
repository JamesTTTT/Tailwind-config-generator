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
