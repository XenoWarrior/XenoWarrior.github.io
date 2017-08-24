"use strict";

var GarageSystem = {
    vehicleList: {},
    uniqueId: 1,

    carFactory: Vehicle.factory("Car"),
    motorcycleFactory: Vehicle.factory("Motorcycle"),
    vanFactory: Vehicle.factory("Van"),
    unknownFactory: Vehicle.factory("Unknown Type"),

    addVehicle  (maker, reg, make, model, faults) {
        let tempVehicle = maker(this.uniqueId, reg, make, model, faults);

        this.vehicleList[this.uniqueId] = tempVehicle;
        this.debugPrint(`Added vehicle: ${tempVehicle.serialiseVehicle()}`);
        this.uniqueId++;
    },

    delVehicle (id) {
        if(this.getInventory()[id]) {
            delete this.getInventory()[parseInt(id)];
            this.debugPrint(` >> Vehicle removed.`);

            GarageEvents.onInventoryClick();
        }
        else {
            this.debugPrint(` >> Vehicle not found.`);
        }
    },

    addFault (id, fault) {
        if(fault !== "none" && fault) {
            let vehicleID = parseInt(id);
            
            this.debugPrint(`Adding fault to vehicle ID ${vehicleID}, the description is ${fault}`);
    
            if(this.getInventory()[vehicleID]) {
                if(this.getInventory()[vehicleID].faults[0] === "None") {
                    this.getInventory()[vehicleID].faults.splice(0, 1);
                }
    
                this.getInventory()[vehicleID].faults.push(fault);
            }
            
            this.debugPrint(this.getInventory()[vehicleID].faults);
            GarageEvents.onInventoryClick();
        }
        else {
            this.debugPrint(` >> Fault cannot be "None".`);
        }
    },

    delFault (id, fault) {
        let vehicleID = parseInt(id);
        let faultID = parseInt(fault) - 1;

        if(faultID >= 0) {
            this.debugPrint(`Removing fault from vehicle ID ${faultID}, the fault id is ${faultID}`);
    
            if(this.getInventory()[vehicleID]) {
                if(this.getInventory()[vehicleID].faults[faultID] !== "None") {
                    this.getInventory()[vehicleID].faults.splice(faultID, 1);
                    
                    if(this.getInventory()[vehicleID].faults.length === 0) {
                        this.getInventory()[vehicleID].faults.push("None");
                    }
                    this.debugPrint(` >> Removed fault from vehicle.`);
                }
                else {
                    this.debugPrint(` >> Fault not found.`);
                }
            }
    
            this.debugPrint(this.getInventory()[vehicleID].faults);
            GarageEvents.onInventoryClick();
        }
        else {
            this.debugPrint(` >> Fault ID must be 1 or more.`);
        }
    },

    checkInVehicle  (id) {
        this.vehicleList[id].checkIn();
    },

    checkOutVehicle  (id) {
        this.vehicleList[id].checkOut();
    },

    getInventory () {
        return this.vehicleList;
    },

    printInventory () {
        if(UtilityFunctions.size(this.getInventory()) > 0) {
            Object.keys(this.getInventory()).forEach(function(key) {
                this.cmdPrint(` >> Found vehicle: REFERENCE ID: ${this.getInventory()[key].id} | ${this.getInventory()[key].serialiseVehicle()}`);
            }, this);
        }
        else {
            this.cmdPrint("` >> No vehicles found.");
        }
    },
    
    handleCommand (raw) {
        if(raw !== "") {

            let commandList = [];
            if(raw.includes(";")) {
                commandList = raw.split(";");
            }
            else {
                commandList.push(raw);
            }

            for(let i = 0; i < commandList.length; i++) {
                let cmd = commandList[i].toLowerCase();

                if(cmd.startsWith(" ")) {
                    cmd = cmd.substring(1);
                }

                if(cmd !== "") {
                    this.debugPrint(`Execute: ${cmd}`);
                    this.cmdPrint(` > ${cmd}`);

                    let cmdParams = cmd.split(" ");
                    cmdParams.forEach((part) => {
                        this.debugPrint(`Command Part: ${part}`);
                    });
                    $("#aicli_input").val("");

                    switch(cmdParams[0]) {
                        case "register": 
                            this.debugPrint(`-> Command: register`);
                            this.debugPrint(`--> has parameter(s) "${cmdParams[1]}", "${cmdParams[2]}", "${cmdParams[3]}", "${cmdParams[4]}"`);
                            if(cmdParams[1] && cmdParams[2] && cmdParams[3] && cmdParams[4]) {
                                this.debugPrint(`---> has three valid parameters for [type] {registration, make, model}`);

                                switch(cmdParams[1]) {
                                    case "car":
                                        this.debugPrint(`--> has valid parameter(s) "${cmdParams[1]}", "${cmdParams[2]}", "${cmdParams[3]}", "${cmdParams[4]}"`);

                                        this.addVehicle(this.carFactory, cmdParams[2], cmdParams[3], cmdParams[4], ["None"]);
                                        this.cmdPrint(` >> Successfully added the vehicle, you can reference it with the ID: ${(this.uniqueId-1)}`);
                                    break;
                                    
                                    case "motorcycle":
                                        this.debugPrint(`--> has valid parameter "${cmdParams[1]}", "${cmdParams[2]}", "${cmdParams[3]}", "${cmdParams[4]}"`);

                                        this.addVehicle(this.motorcycleFactory, cmdParams[2], cmdParams[3], cmdParams[4], ["None"]);
                                        this.cmdPrint(` >> Successfully added the vehicle, you can reference it with the ID: ${(this.uniqueId-1)}`);
                                    break;
                                    
                                    case "van":
                                        this.debugPrint(`--> has valid parameter "${cmdParams[1]}", "${cmdParams[2]}", "${cmdParams[3]}", "${cmdParams[4]}"`);

                                        this.addVehicle(this.vanFactory, cmdParams[2], cmdParams[3], cmdParams[4], ["None"]);
                                        this.cmdPrint(` >> Successfully added the vehicle, you can reference it with the ID: ${(this.uniqueId-1)}`);
                                    break;

                                    case "unknown":
                                        this.debugPrint(`--> has valid parameter "${cmdParams[1]}", "${cmdParams[2]}", "${cmdParams[3]}", "${cmdParams[4]}"`);

                                        this.addVehicle(this.unknownFactory, cmdParams[2], cmdParams[3], cmdParams[4], ["None"]);
                                        this.cmdPrint(` >> Successfully added the vehicle, you can reference it with the ID: ${(this.uniqueId-1)}`);
                                    break;
                
                                    default:
                                        this.debugPrint(`--> has invalid parameter(s) "${cmdParams[1]}", "${cmdParams[2]}", "${cmdParams[3]}", "${cmdParams[4]}"`);

                                        this.cmdPrint(" >> Command: [register][Unknown Type].");
                                        this.cmdPrint(" >> Available Types (one of the following): [car, motorcycle, van, unknown].");
                                        this.cmdPrint(" >> Exclude the [] and {} brackets from your commands.");
                                    break;
                                }
                            }
                            else {
                                this.cmdPrint(" >> Command: [register].");
                                this.cmdPrint(" >> Usage: register [type] {values ...}.");
                                this.cmdPrint(" >> Available Types (one of the following): [car, motorcycle, van, unknown]. ");
                                this.cmdPrint(" >> Required Values (all of the following): {registration, make, model}.");
                                this.cmdPrint(" >> Exclude the [] and {} brackets from your commands.");
                            }

                            GarageEvents.onInventoryClick();
                        break;
                        
                        case "unregister":
                            this.debugPrint(`-> Command: unregister`);
                            this.debugPrint(`--> has parameter(s) "${cmdParams[1]}"`);

                            if(cmdParams[1]) {
                                this.debugPrint(`---> has valid parameters for {id}`);
                                this.delVehicle(parseInt(cmdParams[1]));
                            }
                            else {
                                this.cmdPrint(" >> Command: [unregister].");
                                this.cmdPrint(" >> Usage: unregister {value}.");
                                this.cmdPrint(" >> Required Values (all of the following): {vehicle_id}.");
                                this.cmdPrint(" >> Exclude the [] and {} brackets from your commands.");
                            }

                            GarageEvents.onInventoryClick();
                        break;

                        case "check":
                            this.debugPrint(`-> Command: check`);
                            this.debugPrint(`--> has parameter(s) "${cmdParams[1]}"`);

                            if(cmdParams[1] && cmdParams[2]) {
                                switch(cmdParams[1]) {
                                    case "in":
                                        if(this.getInventory()[parseInt(cmdParams[2])]) {
                                            this.getInventory()[parseInt(cmdParams[2])].checkIn();
                                            this.cmdPrint(this.getInventory()[parseInt(cmdParams[2])].checkedIn ? ">> Vehicle has been checked in." : " >> Vehicle has been checked out.");
                                        }
                                        else { 
                                            this.cmdPrint(" >> Vehicle not found.");
                                        }
                                    break;
                                    
                                    case "out":
                                        if(this.getInventory()[parseInt(cmdParams[2])]) {
                                            this.getInventory()[parseInt(cmdParams[2])].checkOut();
                                            this.cmdPrint(this.getInventory()[parseInt(cmdParams[2])].checkedIn ? ">> Vehicle has been checked in." : " >> Vehicle has been checked out.");
                                        }
                                        else { 
                                            this.cmdPrint(" >> Vehicle not found.");
                                        }
                                    break;
                                }
                            }
                            else{ 
                                this.cmdPrint(" >> Command: [check].");
                                this.cmdPrint(" >> Usage: check [type] {value}.");
                                this.cmdPrint(" >> Available Types (one of the following): [in, out].");
                                this.cmdPrint(" >> Required Values (all of the following): {vehicle_id}.");
                                this.cmdPrint(" >> Exclude the [] and {} brackets from your commands.");
                            }

                        break;

                        case "add":
                            this.debugPrint("-> Command: add");
                            this.debugPrint(`--> has parameter(s) "${cmdParams[1]}", "${cmdParams[3]}", "${cmdParams[3]}"`);
                            
                            if(cmdParams[1] && cmdParams[2] && cmdParams[3]) {
                                this.debugPrint("---> has two valid parameters for [id, fault]");

                                switch(cmdParams[1]) {
                                    case "fault":
                                        this.debugPrint(`--> has valid parameter(s) "${cmdParams[1]}", "${cmdParams[3]}", "${cmdParams[3]}"`);

                                        if(this.getInventory()[parseInt(cmdParams[2])]) {
                                            this.addFault(parseInt(cmdParams[2]), cmdParams[3]);
                                            this.cmdPrint(" >> Fault has been added.");
                                        }
                                        else {
                                            this.cmdPrint(" >> Vehicle not found.");
                                        }
                                    break;

                                    default:
                                        this.debugPrint(`--> has invalid parameter "${cmdParams[1]}"`);
                                        this.cmdPrint(" >> Command: [add] [fault].");
                                        this.cmdPrint(" >> Required Values (all of the following): {vehicle_id, vehicle_fault}.");
                                        this.cmdPrint(" >> Exclude the [] and {} brackets from your commands.");
                                    break;
                                }
                            }
                            else {
                                this.cmdPrint(" >> Command: [add].");
                                this.cmdPrint(" >> Usage: [add] [subcommand] {values ...}.");
                                this.cmdPrint(" >> Available Subcommands (one of the following): [fault].");
                                this.cmdPrint(" >> Required Values (all of the following): {vehicle_id, vehicle_fault}.");
                                this.cmdPrint(" >> Exclude the [] and {} brackets from your commands.");
                            }
                        break;

                        case "remove":
                            this.debugPrint("-> Command: remove");
                            this.debugPrint(`--> has parameter(s) "${cmdParams[1]}", "${cmdParams[2]}", "${cmdParams[3]}"`);
                            
                            if(cmdParams[1] && cmdParams[2] && cmdParams[3]) {
                                this.debugPrint("---> has two valid parameters for [vehicle_id, fault_index_id]");
                                switch(cmdParams[1]) {
                                    case "fault":
                                        this.debugPrint(`--> has valid parameter(s) "${cmdParams[1]}", "${cmdParams[3]}", "${cmdParams[3]}"`);

                                        if(this.getInventory()[parseInt(cmdParams[2])]) {
                                            this.delFault(parseInt(cmdParams[2]), parseInt(cmdParams[3]));
                                            
                                            this.cmdPrint(" >> Fault has been removed.");
                                        }
                                        else {
                                            this.cmdPrint(" >> Vehicle not found.");
                                        }
                                    break;

                                    default:
                                        this.debugPrint(`--> has invalid parameter "${cmdParams[1]}"`);
                                        this.cmdPrint(" >> Command: [remove] [fault].");
                                        this.cmdPrint(" >> Required Values (all of the following): {vehicle_id, fault_index_id}.");
                                        this.cmdPrint(" >> Usage Example: \"remove fault 1 1\" - this will remove the first fault from the first vehicle.");
                                        this.cmdPrint(" >> Exclude the [] and {} brackets from your commands.");
                                    break;
                                }
                            }
                            else {
                                this.cmdPrint(" >> Command: [remove].");
                                this.cmdPrint(" >> Usage: [remove] [subcommand] {values ...}.");
                                this.cmdPrint(" >> Available Subcommands (one of the following): [fault].");
                                this.cmdPrint(" >> Required Values (all of the following): {vehicle_id, fault_index_id}.");
                                this.cmdPrint(" >> Usage Example: "remove fault 1 1" - this will remove the first fault from the first vehicle.");
                                this.cmdPrint(" >> Exclude the [] and {} brackets from your commands.");
                            }
                        break;

                        case "print":
                            this.debugPrint("-> Command: print");
                            this.debugPrint(`--> has parameter "${cmdParams[1]}"`);
                            switch(cmdParams[1]) {
                                case "inventory":
                                    this.debugPrint(`--> has valid parameter "${cmdParams[1]}"`);
                                    this.printInventory();
                                break;

                                case "vehicle":
                                    if(cmdParams[2] != "" && parseInt(cmdParams[2]) > 0) {
                                        this.debugPrint(`--> has valid parameter "${cmdParams[2]}"`);

                                        if(this.getInventory()[parseInt(cmdParams[2])]) {
                                            let v = this.getInventory()[parseInt(cmdParams[2])];
                                                
                                            this.cmdPrint(` >> Vehicle ID: ${v.id}`);
                                            this.cmdPrint(` >> Vehicle Type: ${v.type}`);
                                            this.cmdPrint(` >> Vehicle Registration Number: ${v.reg}`);
                                            this.cmdPrint(` >> Vehicle Make (Model): ${v.make} (${v.model})`);
                                            this.cmdPrint(` >> Vehicle Faults: ${v.faults}`);
                                        }
                                        else {
                                            this.cmdPrint(" >> Vehicle not found.");
                                        }
                                    }
                                    else {
                                        this.cmdPrint(" >> Command: [print] [vehicle].");
                                        this.cmdPrint(" >> Required Values (all of the following): {vehicle_id}.");
                                        this.cmdPrint(" >> Usage Example: \"print vehicle 1\" - this show the vehicle with the ID 1.");
                                        this.cmdPrint(" >> Exclude the [] and {} brackets from your commands.");
                                    }

                                break;

                                case "bill":

                                    if(cmdParams[2] != "" && parseInt(cmdParams[2]) > 0) {
                                        this.debugPrint(`--> has valid parameter "${cmdParams[2]}"`);

                                        if(this.getInventory()[parseInt(cmdParams[2])]) {
                                            let v = this.getInventory()[parseInt(cmdParams[2])];
                                            let finalPrice = getBillPrice(parseInt(cmdParams[2]));
                                                
                                            this.cmdPrint(` >> Total Price: ${finalPrice} GBP`);
                                            this.cmdPrint(` >> Fixed Faults: ${v.faults}`);
                                            this.cmdPrint(" >> Bill Date: 00/00/0000");
                                        }
                                        else {
                                            this.cmdPrint(" >> Vehicle not found.");
                                        }
                                    }
                                    else {
                                        this.cmdPrint(" >> Command: [print] [bill].");
                                        this.cmdPrint(" >> Required Values (all of the following): {vehicle_id}.");
                                        this.cmdPrint(" >> Usage Example: \"print bill 1\" - this show the bill for the vehicle with the ID 1.");
                                        this.cmdPrint(" >> Exclude the [] and {} brackets from your commands.");
                                    }

                                break;

                                default:
                                    this.debugPrint(`--> has invalid parameter "${cmdParams[1]}"`);

                                    this.cmdPrint(" >> Command: [print].");
                                    this.cmdPrint(" >> Available Parameters: [inventory, vehicle, bill].");
                                    this.cmdPrint(" >> Exclude the [] and {} brackets from your commands.");
                                break;
                            }
                        break;

                        case "clear": 
                            $("#admin-output").text("");
                        break;

                        case "help": 
                            this.debugPrint("-> Command: help");

                            this.cmdPrint(" >> Command: [help].");
                            this.cmdPrint(" >> Available commands: [register, unregister, add, remove, check, print, clear, help].");
                            this.cmdPrint(" >> Exclude the [] and {} brackets from your commands.");
                        break;

                        default:
                            this.cmdPrint(" >> Unknown command: ${cmd}");
                        break;
                    }
                }
            }
        }
    },
    cmdPrint: (val) => {
        $("#admin-output").append(`<p>${val}</p>`);
    },
    debugPrint: (val) => {
        $("#output").append(`<p>${val}</p>`);
    }
};