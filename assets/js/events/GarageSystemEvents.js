"use strict";

// Tried to declare these in the object, but there was some strange issue. This works for now.
var previousCommands = [];
var getCommandNum = 0;

var GarageEvents = {

    onAddVehicleClick() {
        $("#error-target").text("");
        if($("#l2_gs_reg").val() && $("#l2_gs_make").val() && $("#l2_gs_model").val() && $("#l2_gs_type").find(":selected").text()) {
            var f = 0;
            
            switch($("#l2_gs_type").find(":selected").text()) {
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

            GarageSystem.addVehicle(f, $("#l2_gs_reg").val(), $("#l2_gs_make").val(), $("#l2_gs_model").val(), ["None"]);

            $("#l2_gs_reg").val("");
            $("#l2_gs_make").val("");
            $("#l2_gs_model").val("");
            $("#error-target").append("<br/><p>Vehicle added successfully!</p>");
        }
        else {
            $("#error-target").append("<br/><p>All fields must be filled out before registering a vehicle.</p>");
        }

        UtilityFunctions.scroll();
    },

    onAddFaultClick() {
        GarageSystem.addFault();
        UtilityFunctions.scroll();
    },

    onPrintInventoryClick() {
        GarageSystem.printInventory();
        UtilityFunctions.scroll();
    },

    onInventoryClick() {
        $("#inventory-render-target").text("");
        if(Object.keys(GarageSystem.getInventory()).length > 0) {
            Object.keys(GarageSystem.getInventory()).forEach((key) => {
                let finalPrice = getBillPrice(key);

                $("#inventory-render-target").append(`
                    <li class="collection-item">
                        <ul class="collection">
                            <li class="collection-item"><strong>Vehicle ID</strong>: <span style="float: right;">${GarageSystem.getInventory()[key].id}</span></li>
                            <li class="collection-item"><strong>Vehicle Type</strong>: <span style="float: right;">${GarageSystem.getInventory()[key].type}</span></li>
                            <li class="collection-item"><strong>Registration Number</strong>: <span style="float: right;">${GarageSystem.getInventory()[key].reg}</span></li>
                            <li class="collection-item"><strong>Vehicle Make (Model)</strong>: <span style="float: right;">${GarageSystem.getInventory()[key].make} (${GarageSystem.getInventory()[key].model})</span></li>
                            <li class="collection-item"><strong>Known Faults</strong>: <span style="float: right;">${GarageSystem.getInventory()[key].faults}</span></li>
                            <li class="collection-item"><strong>Status</strong>: <span style="float: right;">${GarageSystem.getInventory()[key].checkedIn ? "Checked In" : "Checked Out"}</span></li>
                        </ul>
                        <div class="row center-align">
                            <a style="width: 180px;" class="waves-effect waves-light btn" onclick="GarageSystem.getInventory()[${GarageSystem.getInventory()[key].id}].checkIn(); GarageEvents.onInventoryClick();">Check-In</a>
                            <a style="width: 180px;" class="waves-effect waves-light btn" onclick="GarageSystem.getInventory()[${GarageSystem.getInventory()[key].id}].checkOut(); GarageEvents.onInventoryClick();">Check-Out</a>
                        </div>
                        <div class="row center-align">
                            <a style="width: 180px;" class="waves-effect waves-light btn" onclick="$('#modal-addfault-${GarageSystem.getInventory()[key].id}').modal('open');">Add Faults</a>
                            <a style="width: 180px;" class="waves-effect waves-light btn" onclick="$('#modal-delfault-${GarageSystem.getInventory()[key].id}').modal('open');">Remove Faults</a>
                        </div>
                        <div class="row center-align">
                            <a style="width: 180px;" class="waves-effect waves-light btn" onclick="$('#modal-${GarageSystem.getInventory()[key].id}').modal('open');">Get Bill</a>
                            <a style="width: 180px;" class="waves-effect waves-light btn" onclick="GarageSystem.delVehicle(${GarageSystem.getInventory()[key].id});">Delete</a>
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
                            <h4>Add Faults</h4>
                            <div class="row">
                                <p>
                                    When "Add" is pressed, it will add the fault and show the form again to add more faults.<br/>
                                    Click "Close" when done adding faults.
                                </p>
                                <div class="input-field col s12">
                                    <input placeholder="Enter description here..." id="l2_gs_fault_${GarageSystem.getInventory()[key].id}" type="text" class="validate" />
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat" onclick="GarageSystem.addFault(${GarageSystem.getInventory()[key].id}, $('#l2_gs_fault_${GarageSystem.getInventory()[key].id}').val()); $('#modal-addfault-${GarageSystem.getInventory()[key].id}').modal('open');">Add</a>
                            <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
                        </div>
                    </div>
                    
                    
                    <div id="modal-delfault-${GarageSystem.getInventory()[key].id}" class="modal bottom-sheet">
                        <div class="modal-content">
                            <h4>Remove Faults</h4>
                            <div class="row">
                                <p>
                                    When "Delete" is pressed, it will delete the fault and show the form again to delete more faults.<br/>
                                    Click "Close" when done deleting faults.
                                </p>
                                <ul id="fault-target-${GarageSystem.getInventory()[key].id}" class="collection"></ul> 
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
                        </div>
                    </div>
                `);
                
                for(let i = 0; i < GarageSystem.getInventory()[key].faults.length; i++) {
                    $(`#fault-target-${GarageSystem.getInventory()[key].id}`).append(`<li class="collection-item"><strong>${GarageSystem.getInventory()[key].faults[i]}</strong><span style="float: right;"><div class="waves-effect waves-light btn-small" onclick="$('#modal-delfault-${GarageSystem.getInventory()[key].id}').modal('close'); GarageSystem.delFault(${GarageSystem.getInventory()[key].id}, ${i+1}); GarageEvents.onInventoryClick(); $('#modal-delfault-${GarageSystem.getInventory()[key].id}').modal('open');">Delete</div></span></li>`);
                }
                
                $(`#modal-${GarageSystem.getInventory()[key].id}`).modal();
                $(`#modal-addfault-${GarageSystem.getInventory()[key].id}`).modal();
                $(`#modal-delfault-${GarageSystem.getInventory()[key].id}`).modal();
            });
        }
        else {
            $("#inventory-render-target").append(`<a href="#!" class="collection-item">No vehicles found.</a>`);
        }

    },

    sendCommand() {
        previousCommands.push($("#aicli_input").val());
        getCommandNum = previousCommands.length;

        GarageSystem.handleCommand($("#aicli_input").val());
        UtilityFunctions.scroll("#admin-output");
    },
    
    sendCommandKey() {
        document.onkeydown = function(e) {
            switch (e.keyCode) {
                case 13:
                    if($("#aicli_input").val() != "") {
                        previousCommands.push($("#aicli_input").val());
                        getCommandNum = previousCommands.length;
                    }
            
                    GarageSystem.handleCommand($("#aicli_input").val());
                    UtilityFunctions.scroll("#admin-output");    
                break;

                case 38:
                    if(previousCommands.length > 0) {
                        if(getCommandNum > 0) {
                            getCommandNum--;
                            console.log(`Getting command at ${getCommandNum}`);
                            $("#aicli_input").val(previousCommands[getCommandNum]);
                        }
                    }
                break;
            
                case 40:
                    if(previousCommands.length > 0) {
                        if(getCommandNum < previousCommands.length) {
                            getCommandNum++;
                            console.log(`Getting command at ${getCommandNum}`);
                            $("#aicli_input").val(previousCommands[getCommandNum]);
                        }
                    }
                break;
            }
        };
    }
};
