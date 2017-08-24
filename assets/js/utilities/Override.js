var GarageSystem = {};

// this function would not work where it was placed for some reason?
function getBillPrice (key) {
    let finalPrice = 0;
    
    if(GarageSystem.getInventory()[key].faults[0] != "None") {
        return GarageSystem.getInventory()[key].faults.length * (GarageSystem.getInventory()[key].type == "Motorcycle" ? 50 : 75);
    }

    return finalPrice;
}