'use strict';

var GarageSystem = {
    vehicleList: {},
    uniqueId: 0,

    addVehicle: function (reg, make, model, faults, type) {
        var tempVehicle = Vehicle.make(this.uniqueId, reg, make, model, faults, type);

        this.vehicleList[this.uniqueId] = tempVehicle;
        this.debugPrint(`Added vehicle: ${tempVehicle.serialiseVehicle()}`);
        this.uniqueId++;
    },

    addFault: function(fault, id) {
        this.debugPrint(`Adding fault to vehicle ID ${id}, the description is ${fault}`);

        if(this.getInventory()[parseInt(id)]) {
            if(this.getInventory()[parseInt(id)].faults[0] == "None") {
                this.getInventory()[parseInt(id)].faults.splice(0, 1);
            }

            this.getInventory()[parseInt(id)].faults.push(fault);
        }
        
        this.debugPrint(this.getInventory()[parseInt(id)].faults);
        GarageEvents.onInventoryClick();
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
                this.cmdPrint(` >> Found vehicle: ${this.getInventory()[key].serialiseVehicle()}`);
            }, this);
        }
        else {
            this.cmdPrint(` >> No vehicles found.`);
        }
    },

    calculatePrice: function (id) {

    },
    
    handleCommand: function(raw) {

        let cmd = raw.toLowerCase();

        this.debugPrint(`Execute: ${cmd}`);
        this.cmdPrint(` > ${cmd}`);

        let cmdParams = cmd.split(" ");

        cmdParams.forEach((part) => {
            this.debugPrint(`Command Part: ${part}`);
        });

        if(cmd == "") {
            return;
        }

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
                            this.addVehicle(cmdParams[2], cmdParams[3], cmdParams[4], ['None'], 'Car');
                            this.cmdPrint(` >> Successfully added the vehicle, you can reference it with the ID: ${(this.uniqueId-1)}`);
                        break;
                        
                        case "motorcycle":
                            this.debugPrint(`--> has valid parameter '${cmdParams[1]}', '${cmdParams[2]}', '${cmdParams[3]}', '${cmdParams[4]}'`);
                            this.addVehicle(cmdParams[2], cmdParams[3], cmdParams[4], ['None'], 'Motorcycle');
                            this.cmdPrint(` >> Successfully added the vehicle, you can reference it with the ID: ${(this.uniqueId-1)}`);
                        break;
                        
                        case "van":
                            this.debugPrint(`--> has valid parameter '${cmdParams[1]}', '${cmdParams[2]}', '${cmdParams[3]}', '${cmdParams[4]}'`);
                            this.addVehicle(cmdParams[2], cmdParams[3], cmdParams[4], ['None'], 'Van');
                            this.cmdPrint(` >> Successfully added the vehicle, you can reference it with the ID: ${(this.uniqueId-1)}`);
                        break;

                        case "unknown":
                            this.debugPrint(`--> has valid parameter '${cmdParams[1]}', '${cmdParams[2]}', '${cmdParams[3]}', '${cmdParams[4]}'`);
                            this.addVehicle(cmdParams[2], cmdParams[3], cmdParams[4], ['None'], 'Unknown Type');
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
                                this.addFault(cmdParams[3], cmdParams[2]); //oops reversed the params, should be id, fault. todo: fix addFault()
                                this.cmdPrint(` >> Added fault to vehicle.`);
                            }
                            else {
                                this.cmdPrint(` >> Vehicle not found.`);
                            }
                        break;

                        default:
                            this.debugPrint(`--> has invalid parameter '${cmdParams[1]}'`);
                            this.cmdPrint(` >> Command: [add] [fault].`);
                            this.cmdPrint(` >> Required Values (all of the following): {id, fault}.`);
                            this.cmdPrint(` >> Exclude the [] and {} brackets from your commands.`);
                        break;
                    }
                }
                else {
                    this.cmdPrint(` >> Command: [add].`);
                    this.cmdPrint(` >> Usage: [add] [subcommand] {values ...}.`);
                    this.cmdPrint(` >> Available Subcommands (one of the following): [fault].`);
                    this.cmdPrint(` >> Required Values (all of the following): {id, fault}.`);
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
                        this.debugPrint(`--> has valid parameter '${cmdParams[1]}'`);
                        this.cmdPrint(` >> Command: [print] [vehicle], not yet implemented.`);
                    break;

                    default:
                        this.debugPrint(`--> has invalid parameter '${cmdParams[1]}'`);

                        this.cmdPrint(` >> Command: [print].`);
                        this.cmdPrint(` >> Available Parameters: [inventory, vehicle].`);
                        this.cmdPrint(` >> Exclude the [] and {} brackets from your commands.`);
                    break;
                }
            break;

            case 'help': 
                this.debugPrint(`-> Command: help`);

                this.cmdPrint(` >> Command: [help].`);
                this.cmdPrint(` >> Available commands: [register, add, print, help].`);
                this.cmdPrint(` >> Exclude the [] and {} brackets from your commands.`);
            break;

            default:
                this.cmdPrint(` >> Unknown command: ${cmd}`);
            break;
        }
    },
    cmdPrint: (val) => {
        $('#admin-output').append(`<p>${val}</p>`);
    },
    debugPrint: (val) => {
        $('#output').append(`<p>${val}</p>`);
    }
};