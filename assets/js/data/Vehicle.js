'use strict';

var Vehicle = {
    make: function (r, b, m, f) {
        var v = {
            reg: r,
            brand: b,
            model: m,
            faults: f,
            type: "",

            checkedIn: true,
            checkIn: function () {
                this.checkedIn = true;
            },
            checkOut: function () {
                this.checkedIn = true;
            },
            setType: function(val) {
                this.type = val;
            },
            serialiseVehicle: function () { 
                return `[${this.reg}, ${this.brand}, ${this.model}, ${this.faults}]`;
            }
        }
        return v;
    }
};