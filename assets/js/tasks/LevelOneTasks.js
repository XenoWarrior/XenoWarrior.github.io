'use strict';

var WorkBookL1 = {

    personObject: { 
        name: "Some Name",
        age: 24,
        job: "Some Job"
    },
    createScript: function () {
        alert("Hello World!");
    },
    variablesOutput: function () {
        let someValue = "Level 1 - Basic - Variables";

        window.alert(someValue);
        console.log(someValue);

        $('#output').append(`<p>${someValue}</p>`);

        return someValue;
    },
    squareNumber: function(input) {
        let res = input * input;

        $('#output').append(`<p>Input: ${input}, Result: ${res}</p>`);

        return res;
    },
    sumOfThree: function(a, b, c) {
        let res = a + b + c;

        $('#output').append(`<p>Input: [${a}, ${b}, ${c}], Result: ${res}</p>`);

        return res;
    },
    createPerson: function () {

        $('#output').append("<p>Created Person:</p>");
        $('#output').append(`<p>--- Name: ${this.personObject.name}</p>`);
        $('#output').append(`<p>--- Age: ${this.personObject.age}</p>`);
        $('#output').append(`<p>--- Job: ${this.personObject.job}</p>`);

        this.personObject.name = "New Name";
        this.personObject.age = 21;
        this.personObject.job = "New Job";

        $('#output').append("<br/><p>Edited Person:</p>");
        $('#output').append(`<p>--- Name: ${this.personObject.name}</p>`);
        $('#output').append(`<p>--- Age: ${this.personObject.age}</p>`);
        $('#output').append(`<p>--- Job: ${this.personObject.job}</p>`);
    },
    incrementAge: function () {
        let ageBefore = this.personObject.age;
        this.personObject.age += 1;

        $('#output').append("<br/><p>Increment Age:</p>");
        $('#output').append(`<p>--- Before: ${ageBefore}, After: ${this.personObject.age}</p>`);

        return this.personObject.age;
    },
    createPersonByForm: function(n, a, j) {
        this.personObject.name = n;
        this.personObject.age = parseInt(a);
        this.personObject.job = j;

        $('#output').append("<br/><p>Saving Person...</p>");
        $('#output').append(`<p>--- Name: ${this.personObject.name}</p>`);
        $('#output').append(`<p>--- Age: ${this.personObject.age}</p>`);
        $('#output').append(`<p>--- Job: ${this.personObject.job}</p>`);
    },
    getPersonByForm: function () {
        $('#output').append("<br/><p>Current Person:</p>");
        $('#output').append(`<p>--- Name: ${this.personObject.name}</p>`);
        $('#output').append(`<p>--- Age: ${this.personObject.age}</p>`);
        $('#output').append(`<p>--- Job: ${this.personObject.job}</p>`);
    },

    heSaidMyName: function () {
        let val = "He said \"My name is Elliott\"";

        $('#output').append(`<p>Current: ${val}</p>`);
        $('#output').append(`<p>New: ${val.toUpperCase()}</p>`);

        return val;
    },
    concatStringNum: function () {
        let val = 'The String' + 123;

        $('#output').append(`<p>String + Number: ${val}</p>`);

        return val;
    },
    arrayStringsTask: function () { 
        let arr = ["Hello", "World", "!"];

        $('#output').append(`<p>Starting array: ${arr}</p>`);
        for(let i = 0; i < arr.length; i++) {
            $('#output').append(`<p>--- String Array: ${arr[i]}</p>`);
        }

        arr.push("Some new string added!");

        $('#output').append(`<p>Added new item to array: ${arr}</p>`);
        for(let i = 0; i < arr.length; i++) {
            $('#output').append(`<p>--- String Array: ${arr[i]}</p>`);          
        }

        delete arr.splice(arr.length-1,1);

        $('#output').append(`<p>Removing last item from array: ${arr}</p>`);
        for(let i = 0; i < arr.length; i++) {
            $('#output').append(`<p>--- String Array: ${arr[i]}</p>`);          
        }
    },
    checkAge: function () {
        if(this.personObject.age > 20 && this.personObject.age < 40) {
            $('#output').append("<p>Person's age is between 20 and 40!</p>");
            return true;
        }
        $('#output').append("<p>Person's age is not between 20 and 40!</p>");
        return false;
    },
    iterationOne: function () {
        $('#output').append("<p>Incrementing</p>");
        for(let i = 1; i <= 10; i++) {
            $('#output').append(`<p>--- ${i}</p>`);
        }
    },
    iterationTwo: function () {
        $('#output').append("<p>Checking if is divisible</p>");
        for(let i = 1; i <= 10; i++) {
            if(i % 2 === 0) {
                $('#output').append(`<p>--- ${i}</p>`);
            }
        }
    }
}
