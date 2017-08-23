'use strict';

var GarageEvents = {
    onAddVehicleClick: () => {
        GarageSystem.addVehicle($('#l2_gs_reg').val(), $('#l2_gs_brand').val(), $('#l2_gs_model').val(), 'No Faults');

        $('#l2_gs_reg').val("");
        $('#l2_gs_brand').val("");
        $('#l2_gs_model').val("");

        UtilityFunctions.scroll();
    },
    onAddFaultClick: () => {
        GarageSystem.addFault();
        UtilityFunctions.scroll();
    },
    onPrintInventoryClick: () => {
        GarageSystem.printInventory();
        UtilityFunctions.scroll();
    },

    onInventoryClick: () => {
        $('#inventory-render-target').text("");

        Object.keys(GarageSystem.getInventory()).forEach((key) => {
            $('#inventory-render-target').append(`<a href="#!" class="collection-item">${GarageSystem.getInventory()[key].serialiseVehicle()}</a>`);
        });
    },

    sendCommand: () => {
        GarageSystem.handleCommand($('#aicli_input').val());
        UtilityFunctions.scroll('#admin-output');
    }
};
