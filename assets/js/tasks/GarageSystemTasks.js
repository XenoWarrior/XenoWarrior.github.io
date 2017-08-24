'use strict';

var GarageSystem = {
    vehicleList: {},
    uniqueId: 1,

    carFactory: Vehicle.factory("Car"),
    motorcycleFactory: Vehicle.factory("Motorcycle"),
    vanFactory: Vehicle.factory("Van"),
    unknownFactory: Vehicle.factory("Unknown Type"),

    addVehicle: function (maker, reg, make, model, faults) {
        let tempVehicle = maker(this.uniqueId, reg, make, model, faults);

        this.vehicleList[this.uniqueId] = tempVehicle;
        this.debugPrint(`Added vehicle: ${tempVehicle.serialiseVehicle()}`);
        this.uniqueId++;
    },

    delVehicle: function(id) {
        if(this.getInventory()[id]) {
            delete this.getInventory()[parseInt(id)];
            this.cmdPrint(` >> Vehicle removed.`);

            GarageEvents.onInventoryClick();
        }
        else {
            this.cmdPrint(` >> Vehicle not found.`);
        }
    },

    addFault: function(id, fault) {
        if(fault != "none") {
            let vehicleID = parseInt(id);
            
            this.debugPrint(`Adding fault to vehicle ID ${vehicleID}, the description is ${fault}`);
    
            if(this.getInventory()[vehicleID]) {
                if(this.getInventory()[vehicleID].faults[0] == "None") {
                    this.getInventory()[vehicleID].faults.splice(0, 1);
                }
    
                this.getInventory()[vehicleID].faults.push(fault);
            }
            
            this.debugPrint(this.getInventory()[vehicleID].faults);
            GarageEvents.onInventoryClick();
        }
        else {
            this.cmdPrint(` >> Fault cannot be "None".`);
        }
    },

    delFault: function(id, fault) {
        let vehicleID = parseInt(id);
        let faultID = parseInt(fault) - 1;

        if(faultID >= 0) {
            this.debugPrint(`Removing fault from vehicle ID ${faultID}, the fault id is ${faultID}`);
    
            if(this.getInventory()[vehicleID]) {
                if(this.getInventory()[vehicleID].faults[faultID] != "None") {
                    this.getInventory()[vehicleID].faults.splice(faultID, 1);
                    
                    if(this.getInventory()[vehicleID].faults.length == 0) {
                        this.getInventory()[vehicleID].faults.push("None");
                    }
                    this.cmdPrint(` >> Removed fault from vehicle.`);
                }
                else {
                    this.cmdPrint(` >> Fault not found.`);
                }
            }
    
            this.debugPrint(this.getInventory()[vehicleID].faults);
            GarageEvents.onInventoryClick();
        }
        else {
            this.cmdPrint(` >> Fault ID must be 1 or more.`);
        }

    },

    checkInVehicle: function (id) {
        this.vehicleList[id].checkIn();
    },

    checkOutVehicle: function (id) {
        this.vehicleList[id].checkOut();
    },

    getInventory: function() {
        return this.vehicleList;
    },

    printInventory: function () {
        if(UtilityFunctions.size(this.getInventory()) > 0) {
            Object.keys(this.getInventory()).forEach(function(key) {
                this.cmdPrint(` >> Found vehicle: REFERENCE ID: ${this.getInventory()[key].id} | ${this.getInventory()[key].serialiseVehicle()}`);
            }, this);
        }
        else {
            this.cmdPrint(` >> No vehicles found.`);
        }
    },

    calculatePrice: function (id) {

    },
    
    handleCommand: function(raw) {
        if(raw == "") {
            return;
        }

        let commandList = [];

        if(raw.includes(";")) {
            commandList = raw.split(";");
        }
        else {
            commandList.push(raw);
        }

        for(let i = 0; i < commandList.length; i++) {
            let cmd = commandList[i].toLowerCase();

            if(raw == "") {
                continue;
            }

            if(cmd.startsWith(" ")) {
                cmd = cmd.substring(1);
            }

            this.debugPrint(`Execute: ${cmd}`);
            this.cmdPrint(` > ${cmd}`);

            let cmdParams = cmd.split(" ");
            cmdParams.forEach((part) => {
                this.debugPrint(`Command Part: ${part}`);
            });
            $('#aicli_input').val("");

            switch(cmdParams[0]) {
                case "register": 
                    this.debugPrint(`-> Command: register`);
                    this.debugPrint(`--> has parameter(s) '${cmdParams[1]}', '${cmdParams[2]}', '${cmdParams[3]}', '${cmdParams[4]}'`);
                    if(cmdParams[1] && cmdParams[2] && cmdParams[3] && cmdParams[4]) {
                        this.debugPrint(`---> has three valid parameters for [type] {registration, make, model}`);

                        switch(cmdParams[1]) {
                            case "car":
                                this.debugPrint(`--> has valid parameter(s) '${cmdParams[1]}', '${cmdParams[2]}', '${cmdParams[3]}', '${cmdParams[4]}'`);

                                this.addVehicle(this.carFactory, cmdParams[2], cmdParams[3], cmdParams[4], ['None']);
                                this.cmdPrint(` >> Successfully added the vehicle, you can reference it with the ID: ${(this.uniqueId-1)}`);
                            break;
                            
                            case "motorcycle":
                                this.debugPrint(`--> has valid parameter '${cmdParams[1]}', '${cmdParams[2]}', '${cmdParams[3]}', '${cmdParams[4]}'`);

                                this.addVehicle(this.motorcycleFactory, cmdParams[2], cmdParams[3], cmdParams[4], ['None']);
                                this.cmdPrint(` >> Successfully added the vehicle, you can reference it with the ID: ${(this.uniqueId-1)}`);
                            break;
                            
                            case "van":
                                this.debugPrint(`--> has valid parameter '${cmdParams[1]}', '${cmdParams[2]}', '${cmdParams[3]}', '${cmdParams[4]}'`);

                                this.addVehicle(this.vanFactory, cmdParams[2], cmdParams[3], cmdParams[4], ['None']);
                                this.cmdPrint(` >> Successfully added the vehicle, you can reference it with the ID: ${(this.uniqueId-1)}`);
                            break;

                            case "unknown":
                                this.debugPrint(`--> has valid parameter '${cmdParams[1]}', '${cmdParams[2]}', '${cmdParams[3]}', '${cmdParams[4]}'`);

                                this.addVehicle(this.unknownFactory, cmdParams[2], cmdParams[3], cmdParams[4], ['None']);
                                this.cmdPrint(` >> Successfully added the vehicle, you can reference it with the ID: ${(this.uniqueId-1)}`);
                            break;
        
                            default:
                                this.debugPrint(`--> has invalid parameter(s) '${cmdParams[1]}', '${cmdParams[2]}', '${cmdParams[3]}', '${cmdParams[4]}'`);

                                this.cmdPrint(` >> Command: [register][Unknown Type].`);
                                this.cmdPrint(` >> Available Types (one of the following): [car, motorcycle, van, unknown].`);
                                this.cmdPrint(` >> Exclude the [] and {} brackets from your commands.`);
                            break;
                        }
                    }
                    else {
                        this.cmdPrint(` >> Command: [register], Usage: register [type] {values ...}.`);
                        this.cmdPrint(` >> Available Types (one of the following): [car, motorcycle, van, unknown]. `);
                        this.cmdPrint(` >> Required Values (all of the following): {registration, make, model}.`);
                        this.cmdPrint(` >> Exclude the [] and {} brackets from your commands.`);
                    }

                    GarageEvents.onInventoryClick();
                break;

                case 'add':
                    this.debugPrint(`-> Command: add`);
                    this.debugPrint(`--> has parameter(s) '${cmdParams[1]}', '${cmdParams[3]}', '${cmdParams[3]}'`);
                    
                    if(cmdParams[1] && cmdParams[2] && cmdParams[3]) {
                        this.debugPrint(`---> has two valid parameters for [id, fault]`);

                        switch(cmdParams[1]) {
                            case 'fault':
                                this.debugPrint(`--> has valid parameter(s) '${cmdParams[1]}', '${cmdParams[3]}', '${cmdParams[3]}'`);

                                if(this.getInventory()[parseInt(cmdParams[2])]) {
                                    this.addFault(parseInt(cmdParams[2]), cmdParams[3]);
                                    this.cmdPrint(` >> Added fault to vehicle.`);
                                }
                                else {
                                    this.cmdPrint(` >> Vehicle not found.`);
                                }
                            break;

                            default:
                                this.debugPrint(`--> has invalid parameter '${cmdParams[1]}'`);
                                this.cmdPrint(` >> Command: [add] [fault].`);
                                this.cmdPrint(` >> Required Values (all of the following): {vehicle_id, vehicle_fault}.`);
                                this.cmdPrint(` >> Exclude the [] and {} brackets from your commands.`);
                            break;
                        }
                    }
                    else {
                        this.cmdPrint(` >> Command: [add].`);
                        this.cmdPrint(` >> Usage: [add] [subcommand] {values ...}.`);
                        this.cmdPrint(` >> Available Subcommands (one of the following): [fault].`);
                        this.cmdPrint(` >> Required Values (all of the following): {vehicle_id, vehicle_fault}.`);
                        this.cmdPrint(` >> Exclude the [] and {} brackets from your commands.`);
                    }
                break;

                case 'remove':
                    this.debugPrint(`-> Command: remove`);
                    this.debugPrint(`--> has parameter(s) '${cmdParams[1]}', '${cmdParams[2]}', '${cmdParams[3]}'`);
                    
                    if(cmdParams[1] && cmdParams[2] && cmdParams[3]) {
                        this.debugPrint(`---> has two valid parameters for [vehicle_id, fault_index_id]`);
                        switch(cmdParams[1]) {
                            case 'fault':
                                this.debugPrint(`--> has valid parameter(s) '${cmdParams[1]}', '${cmdParams[3]}', '${cmdParams[3]}'`);

                                if(this.getInventory()[parseInt(cmdParams[2])]) {
                                    this.delFault(parseInt(cmdParams[2]), parseInt(cmdParams[3]));
                                }
                                else {
                                    this.cmdPrint(` >> Vehicle not found.`);
                                }
                            break;

                            default:
                                this.debugPrint(`--> has invalid parameter '${cmdParams[1]}'`);
                                this.cmdPrint(` >> Command: [remove] [fault].`);
                                this.cmdPrint(` >> Required Values (all of the following): {vehicle_id, fault_index_id}.`);
                                this.cmdPrint(` >> Usage Example: "remove fault 1 1" - this will remove the first fault from the first vehicle.`);
                                this.cmdPrint(` >> Exclude the [] and {} brackets from your commands.`);
                            break;
                        }
                    }
                    else {
                        this.cmdPrint(` >> Command: [remove].`);
                        this.cmdPrint(` >> Usage: [remove] [subcommand] {values ...}.`);
                        this.cmdPrint(` >> Available Subcommands (one of the following): [fault].`);
                        this.cmdPrint(` >> Required Values (all of the following): {vehicle_id, fault_index_id}.`);
                        this.cmdPrint(` >> Usage Example: "remove fault 1 1" - this will remove the first fault from the first vehicle.`);
                        this.cmdPrint(` >> Exclude the [] and {} brackets from your commands.`);
                    }
                break;

                case "print":
                    this.debugPrint(`-> Command: print`);
                    this.debugPrint(`--> has parameter '${cmdParams[1]}'`);
                    switch(cmdParams[1]) {
                        case "inventory":
                            this.debugPrint(`--> has valid parameter '${cmdParams[1]}'`);
                            this.printInventory();
                        break;

                        case 'vehicle':
                            if(cmdParams[2] != "" && parseInt(cmdParams[2]) > 0) {
                                this.debugPrint(`--> has valid parameter '${cmdParams[2]}'`);

                                if(this.getInventory()[parseInt(cmdParams[2])]) {
                                    let v = this.getInventory()[parseInt(cmdParams[2])];
                                        
                                    this.cmdPrint(` >> Vehicle ID: ${v.id}`);
                                    this.cmdPrint(` >> Vehicle Type: ${v.type}`);
                                    this.cmdPrint(` >> Vehicle Registration Number: ${v.reg}`);
                                    this.cmdPrint(` >> Vehicle Make (Model): ${v.make} (${v.model})`);
                                    this.cmdPrint(` >> Vehicle Faults: ${v.faults}`);
                                }
                                else {
                                    this.cmdPrint(` >> Vehicle not found.`);
                                }
                            }
                            else {
                                this.cmdPrint(` >> Command: [print] [vehicle].`);
                                this.cmdPrint(` >> Required Values (all of the following): {vehicle_id}.`);
                                this.cmdPrint(` >> Usage Example: "print vehicle 1" - this show the vehicle with the ID 1.`);
                                this.cmdPrint(` >> Exclude the [] and {} brackets from your commands.`);
                            }

                        break;

                        case 'bill':

                            if(cmdParams[2] != "" && parseInt(cmdParams[2]) > 0) {
                                this.debugPrint(`--> has valid parameter '${cmdParams[2]}'`);

                                if(this.getInventory()[parseInt(cmdParams[2])]) {
                                    let v = this.getInventory()[parseInt(cmdParams[2])];

                                    let finalPrice = 0;
                    
                                    if(v.faults[0] != "None") {
                                        finalPrice = v.faults.length * 50;
                                    }
                                        
                                    this.cmdPrint(` >> Total Price: ${finalPrice} GBP`);
                                    this.cmdPrint(` >> Fixed Faults: ${v.faults}`);
                                    this.cmdPrint(` >> Bill Date: 00/00/0000`);
                                }
                                else {
                                    this.cmdPrint(` >> Vehicle not found.`);
                                }
                            }
                            else {
                                this.cmdPrint(` >> Command: [print] [bill].`);
                                this.cmdPrint(` >> Required Values (all of the following): {vehicle_id}.`);
                                this.cmdPrint(` >> Usage Example: "print bill 1" - this show the bill for the vehicle with the ID 1.`);
                                this.cmdPrint(` >> Exclude the [] and {} brackets from your commands.`);
                            }

                        break;

                        default:
                            this.debugPrint(`--> has invalid parameter '${cmdParams[1]}'`);

                            this.cmdPrint(` >> Command: [print].`);
                            this.cmdPrint(` >> Available Parameters: [inventory, vehicle].`);
                            this.cmdPrint(` >> Exclude the [] and {} brackets from your commands.`);
                        break;
                    }
                break;

                case 'clear': 
                    $('#admin-output').text("");
                break;

                case 'help': 
                    this.debugPrint(`-> Command: help`);

                    this.cmdPrint(` >> Command: [help].`);
                    this.cmdPrint(` >> Available commands: [register, add, remove, print, clear, help].`);
                    this.cmdPrint(` >> Exclude the [] and {} brackets from your commands.`);
                break;

                default:
                    this.cmdPrint(` >> Unknown command: ${cmd}`);
                break;
            }
        }
    },
    cmdPrint: (val) => {
        $('#admin-output').append(`<p>${val}</p>`);
    },
    debugPrint: (val) => {
        $('#output').append(`<p>${val}</p>`);
    }
};