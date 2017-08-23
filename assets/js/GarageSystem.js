'use strict';

var Vehicle = {
    make: function (r, b, m, f) {
        var v = {
            reg: r,
            brand: b,
            model: m,
            faults: f,

            checkedIn: true,
            checkIn: function () {
                this.checkedIn = true;
            },
            checkOut: function () {
                this.checkedIn = true;
            },
            serialise: function () { 
                return `[${this.reg}, ${this.brand}, ${this.model}, ${this.faults}]`;
            }
        }

        return v;
    }
};

var GarageSystem = {
    vehicleList: {},
    uniqueId: 0,

    addVehicle: function (reg, brand, model, faults) {
        var tempVehicle = Vehicle.make(reg, brand, model, faults);

        this.vehicleList[this.uniqueId] = tempVehicle;
        this.debugPrint(`<p>Added vehicle: ${tempVehicle.serialise()}</p>`);
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

    printInventory: function () {
        if(UtilityFunctions.size(this.vehicleList) > 0) {
            Object.keys(this.vehicleList).forEach(function(key) {
                this.cmdPrint(`<p> >> Found vehicle: ${this.vehicleList[key].reg}, ${this.vehicleList[key].brand}, ${this.vehicleList[key].model}, ${this.vehicleList[key].faults}</p>`);
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
                this.cmdPrint(`<p> >> Available commands: [print, help].</p>`);
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