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

        if(this.vehicleList[parseInt(id)]) {
            if(this.vehicleList[parseInt(id)].faults[0] == "None") {
                this.vehicleList[parseInt(id)].faults.splice(0, 1);
            }

            this.vehicleList[parseInt(id)].faults.push(fault);
        }
        
        this.debugPrint(this.vehicleList[parseInt(id)].faults);
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
            case "create": 
                this.debugPrint(`-> Command: create`);
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
                            this.cmdPrint(` >> Command: [create][Unknown Type], Available Types: [car, motorcycle, van, unknown].`);
                            this.cmdPrint(` >> Exclude the [] and {} brackets from your commands.`);
                        break;
                    }
                }
                else {
                    this.cmdPrint(` >> Command: [create], Usage: create [type] {values ...}, Available Types: [car, motorcycle, van, unknown], Available Values: {registration, make, model}.`);
                    this.cmdPrint(` >> Exclude the [] and {} brackets from your commands.`);
                }

                GarageEvents.onInventoryClick();
            break;

            case 'add':
                this.debugPrint(`-> Command: add`);
                this.debugPrint(`--> has parameter '${cmdParams[1]}'`);
                
                if(cmdParams[1] && cmdParams[2] && cmdParams[3]) {
                    this.debugPrint(`---> has two valid parameters for [id, fault]`);
                    switch(cmdParams[1]) {
                        case 'fault':
                            this.debugPrint(`--> has valid parameter '${cmdParams[1]}'`);

                        break;

                        default:
                            this.debugPrint(`--> has invalid parameter '${cmdParams[1]}'`);
                            this.cmdPrint(` >> Command: [add][fault], Required Parameters: {id, fault}.`);
                            this.cmdPrint(` >> Exclude the [] and {} brackets from your commands.`);
                        break;
                    }
                }
                else {
                    this.cmdPrint(` >> Command: [add], Available Subcommands: [fault].`);
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
                        this.cmdPrint(` >> Command: [print][vehicle], Not yet implemented.`);
                    break;

                    default:
                        this.debugPrint(`--> has invalid parameter '${cmdParams[1]}'`);
                        this.cmdPrint(` >> Command: [print], Available Parameters: [inventory, vehicle].`);
                        this.cmdPrint(` >> Exclude the [] and {} brackets from your commands.`);
                    break;
                }
            break;

            case 'help': 
                this.debugPrint(`-> Command: print`);
                this.cmdPrint(` >> Available commands: [create, print, help].`);
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