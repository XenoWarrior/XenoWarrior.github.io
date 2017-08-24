'use strict';

var Vehicle = {
    factory: function(type) { 
        var make = function(i, r, b, m, f) {
            return {
                id: i,
                reg: r,
                make: b,
                model: m,
                faults: f,
                type: type,
    
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
                    return `[${this.id}, ${this.reg}, ${this.make}, ${this.model}, [${this.faults}], ${this.type}]`;
                }
            };
        }
        
        return make;
    }
};