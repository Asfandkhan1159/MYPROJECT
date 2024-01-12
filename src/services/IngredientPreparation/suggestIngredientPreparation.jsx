// suggestionsService.js
const suggestIngredientPreparation = (menuItems) => {
    const newSuggestions = [];
  
    menuItems.forEach((menuItem) => {
      const averageOrders =
        menuItem.orders.reduce((sum, orders) => sum + orders, 0) /
        menuItem.orders.length;
  
      if (averageOrders > 7) {
        // Assuming 20% extra for preparation
        const suggestedQuantity = Math.ceil(averageOrders * 1.2);
        const ingredientsToPrepare = [];
  
        // Suggest all ingredients for preparation with units specified
        menuItem.ingredients.forEach((ingredient) => {
          // For items like 'Bun', specify 'units' as the unit
          const unit =
            ingredient === "Bun" || ingredient === "Lettuce" ? "units" : "kg";
  
          ingredientsToPrepare.push({
            name: ingredient,
            quantity: suggestedQuantity,
            unit: unit,
          });
        });
  
        newSuggestions.push({
          menuItemName: menuItem.name,
          ingredientsToPrepare,
        });
      }
    });
  
    return newSuggestions;
  };
  
  export { suggestIngredientPreparation };
  