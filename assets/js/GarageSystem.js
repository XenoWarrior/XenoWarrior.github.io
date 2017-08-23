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
                return "[" + this.reg + ", " + this.brand + ", " + this.model + ", " + this.faults + "]";
            }
        }

        return v;
    }
};

var GarageSystem = {
    vehicleList: [],

    addVehicle: function (reg, brand, model, faults) {
        var tempVehicle = Vehicle.make(reg, brand, model, faults);
        $('#output').append("<p>Added vehicle: " + tempVehicle.serialise() + "</p>");

        this.vehicleList.push(tempVehicle);
    },

    checkInVehicle: function (id) {
        this.vehicleList[id].checkIn();
    },

    checkOutVehicle: function (id) {
        this.vehicleList[id].checkOut();
    },

    printInventory: function () {

    },

    calculatePrice: function (id) {

    }
};