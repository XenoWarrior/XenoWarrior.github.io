'use strict';

var GarageEvents = {
    onAddVehicleClick: () => {
        GarageSystem.addVehicle($('#l2_gs_reg').val(), $('#l2_gs_make').val(), $('#l2_gs_model').val(), ['None Registered'], $('#l2_gs_type').find(":selected").text());

        $('#l2_gs_reg').val("");
        $('#l2_gs_make').val("");
        $('#l2_gs_model').val("");
        $('#l2_gs_type').val("");
        $('#l2_gs_type').find(":selected").text();

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
        if(Object.keys(GarageSystem.getInventory()).length > 0) {
            Object.keys(GarageSystem.getInventory()).forEach((key) => {
                $('#inventory-render-target').append(`
                    <li class="collection-item">
                        <ul class="collection">
                            <li class="collection-item"><strong>Vehicle ID</strong>: <span style="float: right;">${GarageSystem.getInventory()[key].id}</span></li>
                            <li class="collection-item"><strong>Vehicle Type</strong>: <span style="float: right;">${GarageSystem.getInventory()[key].type}</span></li>
                            <li class="collection-item"><strong>Registration Number</strong>: <span style="float: right;">${GarageSystem.getInventory()[key].reg}</span></li>
                            <li class="collection-item"><strong>Vehicle Make (Model)</strong>: <span style="float: right;">${GarageSystem.getInventory()[key].make} (${GarageSystem.getInventory()[key].model})</span></li>
                            <li class="collection-item"><strong>Known Faults</strong>: <span style="float: right;">${GarageSystem.getInventory()[key].faults}</span></li>
                        </ul>
                    </li>
                `);
            });
        }
        else {
            $('#inventory-render-target').append(`<a href="#!" class="collection-item">No vehicles found.</a>`);
        }
    },

    sendCommand: () => {
        GarageSystem.handleCommand($('#aicli_input').val());
        UtilityFunctions.scroll('#admin-output');
    }
};
