'use strict';

var GarageSystem = {
    vehicleList: {},
    uniqueId: 0,

    addVehicle: function (reg, brand, model, faults, OPTIONAL_TYPE) {
        var tempVehicle = Vehicle.make(reg, brand, model, faults);

        this.vehicleList[this.uniqueId] = tempVehicle;
        this.debugPrint(`<p>Added vehicle: ${tempVehicle.serialiseVehicle()}</p>`);
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
                this.cmdPrint(`<p> >> Found vehicle: ${this.getInventory()[key].serialiseVehicle()}</p>`);
            }, this);
        }
        else {
            this.cmdPrint(`<p> >> No vehicles found.</p>`);
        }
    },

    calculatePrice: function (id) {

    },
    
    handleCommand: function(cmd) {
        this.debugPrint(`<p>Execute: ${cmd}</p>`);
        this.cmdPrint(`<p> > ${cmd}</p>`);

        let cmdParams = cmd.split(" ");

        cmdParams.forEach((part) => {
            this.debugPrint(`<p>Command Part: ${part}</p>`);
        });

        if(cmd == "") {
            return;
        }

        $('#aicli_input').val("");

        switch(cmdParams[0]) {
            case "create": 
                this.debugPrint(`<p>-> Command: create</p>`);
                this.debugPrint(`<p>--> has parameter '${cmdParams[1]}'</p>`);

                if(cmdParams[2] && cmdParams[3] && cmdParams[4]) {
                    this.debugPrint(`<p>---> has three valid parameters for [reg, brand, model]</p>`);

                    switch(cmdParams[1]) {
                        case "car":
                            this.debugPrint(`<p>--> has valid parameter '${cmdParams[1]}'</p>`);
                            this.addVehicle(cmdParams[2], cmdParams[3], cmdParams[4], [], 'TYPE_CAR');
                        break;
                        
                        case "motorcycle":
                            this.debugPrint(`<p>--> has valid parameter '${cmdParams[1]}'</p>`);
                            this.addVehicle(cmdParams[2], cmdParams[3], cmdParams[4], [], 'TYPE_MOTORCYLE');
                        break;
                        
                        case "van":
                            this.debugPrint(`<p>--> has valid parameter '${cmdParams[1]}'</p>`);
                            this.addVehicle(cmdParams[2], cmdParams[3], cmdParams[4], [], 'TYPE_VAN');
                        break;
    
                        default:
                            this.debugPrint(`<p>--> has invalid parameter '${cmdParams[1]}'</p>`);
                            this.cmdPrint(`<p> >> Command: [create], Available Parameters: [car, motorcycle, van].</p>`);
                        break;
                    }
                }
            break;

            case "print":
                this.debugPrint(`<p>-> Command: print</p>`);
                this.debugPrint(`<p>--> has parameter '${cmdParams[1]}'</p>`);
                switch(cmdParams[1]) {
                    case "inventory":
                        this.debugPrint(`<p>--> has valid parameter '${cmdParams[1]}'</p>`);
                        this.printInventory();
                    break;

                    case 'vehicle':
                        this.debugPrint(`<p>--> has valid parameter '${cmdParams[1]}'</p>`);
                        this.cmdPrint(`<p> >> Command: [print][vehicle], Not yet implemented.</p>`);
                    break;

                    default:
                        this.debugPrint(`<p>--> has invalid parameter '${cmdParams[1]}'</p>`);
                        this.cmdPrint(`<p> >> Command: [print], Available Parameters: [inventory, vehicle].</p>`);
                    break;
                }
            break;

            case 'help': 
                this.debugPrint(`<p>-> Command: print</p>`);
                this.cmdPrint(`<p> >> Available commands: [create, print, help].</p>`);
            break;

            default:
                this.cmdPrint(`<p> >> Unknown command: ${cmd}</p>`);
            break;
        }
    },


    cmdPrint: (val) => {
        $('#admin-output').append(val);
    },
    debugPrint: (val) => {
        $('#output').append(val);
    }
};