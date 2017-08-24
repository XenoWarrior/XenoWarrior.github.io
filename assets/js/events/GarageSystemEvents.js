'use strict';

// Tried to declare these in the object, but there was some strange issue. This works for now.
var previousCommands = [];
var getCommandNum = 0;

var GarageEvents = {
    onAddVehicleClick: () => {
        $('#error-target').text("");
        if($('#l2_gs_reg').val() && $('#l2_gs_make').val() && $('#l2_gs_model').val() && $('#l2_gs_type').find(":selected").text()) {
            var f = 0;
            switch($('#l2_gs_type').find(":selected").text()) {
                case "Car": 
                    f = GarageSystem.carFactory;
                break;
                
                case "Motorcycle": 
                    f = GarageSystem.motorcycleFactory;
                break;

                case "Van": 
                    f = GarageSystem.vanFactory;
                break;

                default: 
                    f = GarageSystem.unknownFactory;
                break;
            }

            GarageSystem.addVehicle(f, $('#l2_gs_reg').val(), $('#l2_gs_make').val(), $('#l2_gs_model').val(), ['None']);

            $('#l2_gs_reg').val("");
            $('#l2_gs_make').val("");
            $('#l2_gs_model').val("");
            $('#error-target').append("<br/><p>Vehicle added successfully!</p>");
        }
        else {
            $('#error-target').append("<br/><p>All fields must be filled out before registering a vehicle.</p>");
        }
        

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

    calculatePrice: function (key) {
    },

    onInventoryClick: () => {
        $('#inventory-render-target').text("");
        if(Object.keys(GarageSystem.getInventory()).length > 0) {
            Object.keys(GarageSystem.getInventory()).forEach((key) => {
                let finalPrice = 0;

                if(GarageSystem.getInventory()[key].faults[0] != "None") {
                    finalPrice = GarageSystem.getInventory()[key].faults.length * 50;
                }

                $('#inventory-render-target').append(`
                    <li class="collection-item">
                        <ul class="collection">
                            <li class="collection-item"><strong>Vehicle ID</strong>: <span style="float: right;">${GarageSystem.getInventory()[key].id}</span></li>
                            <li class="collection-item"><strong>Vehicle Type</strong>: <span style="float: right;">${GarageSystem.getInventory()[key].type}</span></li>
                            <li class="collection-item"><strong>Registration Number</strong>: <span style="float: right;">${GarageSystem.getInventory()[key].reg}</span></li>
                            <li class="collection-item"><strong>Vehicle Make (Model)</strong>: <span style="float: right;">${GarageSystem.getInventory()[key].make} (${GarageSystem.getInventory()[key].model})</span></li>
                            <li class="collection-item"><strong>Known Faults</strong>: <span style="float: right;">${GarageSystem.getInventory()[key].faults}</span></li>
                        </ul>
                        <div class="row center-align">
                            <a class="waves-effect waves-light btn" onclick="function(){};">Check-In</a>
                            <a class="waves-effect waves-light btn" onclick="function(){};">Check-Out</a>
                            <a class="waves-effect waves-light btn" onclick="$('#modal-addfault-${GarageSystem.getInventory()[key].id}').modal('open');">Add Faults</a>
                            <a class="waves-effect waves-light btn" onclick="$('#modal-${GarageSystem.getInventory()[key].id}').modal('open');">Get Bill</a>
                            <a class="waves-effect waves-light btn" onclick="function(){};">Delete</a>
                        </div>
                    </li>

                    <div id="modal-${GarageSystem.getInventory()[key].id}" class="modal bottom-sheet">
                        <div class="modal-content">
                            <h4>Vehicle Bill</h4>
                            <div class="row">
                                <ul class="collection">
                                    <li class="collection-item"><strong>Total Price</strong>: <span style="float: right;">${finalPrice} GBP</span></li>
                                    <li class="collection-item"><strong>Fixed Faults</strong>: <span style="float: right;">${GarageSystem.getInventory()[key].faults}</span></li>
                                    <li class="collection-item"><strong>Bill Date</strong>: <span style="float: right;">00/00/0000</span></li>
                                </ul>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Pay</a>
                            <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
                        </div>
                    </div>
                    
                    <div id="modal-addfault-${GarageSystem.getInventory()[key].id}" class="modal bottom-sheet">
                    <div class="modal-content">
                        <h4>Add Fault</h4>
                        <div class="row">
                            <div class="input-field col s12">
                                <input placeholder="Enter description here..." id="l2_gs_fault_${GarageSystem.getInventory()[key].id}" type="text" class="validate" />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat" onclick="GarageSystem.addFault(${GarageSystem.getInventory()[key].id}, $('#l2_gs_fault_${GarageSystem.getInventory()[key].id}').val())">Add</a>
                        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
                    </div>
                </div>
                `);
                
                $(`#modal-${GarageSystem.getInventory()[key].id}`).modal();
                $(`#modal-addfault-${GarageSystem.getInventory()[key].id}`).modal();
            });
        }
        else {
            $('#inventory-render-target').append(`<a href="#!" class="collection-item">No vehicles found.</a>`);
        }

    },

    sendCommand: () => {
        previousCommands.push($('#aicli_input').val());
        getCommandNum = previousCommands.length;

        GarageSystem.handleCommand($('#aicli_input').val());
        UtilityFunctions.scroll('#admin-output');
    },
    
    sendCommandKey: () => {
        document.onkeydown = function(e) {
            switch (e.keyCode) {
                case 13:
                    if($('#aicli_input').val() != "") {
                        previousCommands.push($('#aicli_input').val());
                        getCommandNum = previousCommands.length;
                    }
            
                    GarageSystem.handleCommand($('#aicli_input').val());
                    UtilityFunctions.scroll('#admin-output');    
                break;

                case 38:
                    if(previousCommands.length > 0) {
                        if(getCommandNum > 0) {
                            getCommandNum--;
                            console.log(`Getting command at ${getCommandNum}`);
                            $('#aicli_input').val(previousCommands[getCommandNum]);
                        }
                    }
                break;
            
                case 40:
                    if(previousCommands.length > 0) {
                        if(getCommandNum < previousCommands.length) {
                            getCommandNum++;
                            console.log(`Getting command at ${getCommandNum}`);
                            $('#aicli_input').val(previousCommands[getCommandNum]);
                        }
                    }
                break;
            }
        };
    }
};
