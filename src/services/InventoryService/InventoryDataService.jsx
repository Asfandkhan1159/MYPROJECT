// InventoryDataService.js
export const calculateDynamicThreshold = (historicalConsumption) => {
    const averageConsumption =
      historicalConsumption.reduce((sum, value) => sum + value, 0) /
      historicalConsumption.length;
    return Math.floor(averageConsumption);
  };
  
  export const isOutOfStock = (quantity, dynamicThreshold) => {
    console.log('Checking item:', 'Quantity:', quantity, 'Dynamic Threshold:', dynamicThreshold);
    const result = quantity <= dynamicThreshold;
    console.log('Result:', result);
    return result;
  };
  