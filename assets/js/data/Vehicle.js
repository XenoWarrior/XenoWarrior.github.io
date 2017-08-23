'use strict';

var Vehicle = {
    make: function (i, r, b, m, f, t) {
        var v = {
            id: i,
            reg: r,
            make: b,
            model: m,
            faults: f,
            type: t ? t : "Unknown Type",

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
                return `[${this.id}, ${this.reg}, ${this.make}, ${this.model}, ${this.faults}, ${this.type}]`;
            }
        }
        return v;
    }
};