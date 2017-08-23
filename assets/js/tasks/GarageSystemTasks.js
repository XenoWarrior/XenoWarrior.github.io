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
        if(this.vehicleList[id]) {
            this.vehicleList[id].fault.push(fault);
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
            case "create": 
                this.debugPrint(`-> Command: create`);
                this.debugPrint(`--> has parameter '${cmdParams[1]}'`);

                if(cmdParams[1] && cmdParams[2] && cmdParams[3] && cmdParams[4]) {
                    this.debugPrint(`---> has three valid parameters for [reg, make, model]`);

                    switch(cmdParams[1]) {
                        case "car":
                            this.debugPrint(`--> has valid parameter '${cmdParams[1]}'`);
                            this.addVehicle(cmdParams[2], cmdParams[3], cmdParams[4], ['None Registered'], 'Car');
                        break;
                        
                        case "motorcycle":
                            this.debugPrint(`--> has valid parameter '${cmdParams[1]}'`);
                            this.addVehicle(cmdParams[2], cmdParams[3], cmdParams[4], ['None Registered'], 'Motorcycle');
                        break;
                        
                        case "van":
                            this.debugPrint(`--> has valid parameter '${cmdParams[1]}'`);
                            this.addVehicle(cmdParams[2], cmdParams[3], cmdParams[4], ['None Registered'], 'Van');
                        break;

                        case "unknown":
                            this.debugPrint(`--> has valid parameter '${cmdParams[1]}'`);
                            this.addVehicle(cmdParams[2], cmdParams[3], cmdParams[4], ['None Registered'], 'Unknown Type');
                        break;
    
                        default:
                            this.debugPrint(`--> has invalid parameter '${cmdParams[1]}'`);
                            this.cmdPrint(` >> Command: [create], Available Types: [car, motorcycle, van, unknown].`);
                        break;
                    }
                }
                else {
                    this.cmdPrint(` >> Command: [create], Required Parameters: [type, registration, make, model].`);
                }

                GarageEvents.onInventoryClick();
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
                        this.cmdPrint(` >> Command: [print][vehicle], Not yet implemented.`);
                    break;

                    default:
                        this.debugPrint(`--> has invalid parameter '${cmdParams[1]}'`);
                        this.cmdPrint(` >> Command: [print], Available Parameters: [inventory, vehicle].`);
                    break;
                }
            break;

            case 'help': 
                this.debugPrint(`-> Command: print`);
                this.cmdPrint(` >> Available commands: [create, print, help].`);
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