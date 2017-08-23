'use strict';

var LevelOneEvents = {
    onSetClick: () => {
        WorkBookL1.createPersonByForm($('#l1_f3_e2_name').val(), $('#l1_f3_e2_age').val(), $('#l1_f3_e2_job').val());
        UtilityFunctions.scroll();
    },
    onGetClick: () => {
        WorkBookL1.getPersonByForm();
        UtilityFunctions.scroll();
    },
    onHelloWorldClick: () => {
        WorkBookL1.createScript();
    },
    onVariablesOneClick: () => {
        WorkBookL1.variablesOutput();
        UtilityFunctions.scroll();
    },
    onVariablesTwoClick: () => {
        WorkBookL1.createPerson();
        UtilityFunctions.scroll();
    },
    onFunctionsOneClick: () => {
        WorkBookL1.squareNumber(5);
        UtilityFunctions.scroll();
    },
    onFunctionsTwoClick: () => {
        WorkBookL1.sumOfThree(1, 2, 3);
        UtilityFunctions.scroll();
    },
    onEventsOneClick: () => {
        WorkBookL1.incrementAge();
        UtilityFunctions.scroll();
    },
    onStringsOneClick: () => {
        WorkBookL1.heSaidMyName();
        UtilityFunctions.scroll();
    },
    onStringsTwoClick: () => {
        WorkBookL1.concatStringNum();
        UtilityFunctions.scroll();
    },
    onArrayOneStringThreeClick: () => {
        WorkBookL1.arrayStringsTask();
        UtilityFunctions.scroll();
    },
    onConditionalsOneClick: () => {
        WorkBookL1.checkAge(); 
        UtilityFunctions.scroll();
    },
    onIterationOneClick: () => {
        WorkBookL1.iterationOne();
        UtilityFunctions.scroll();
    },
    onIterationTwoClick: () => {
        WorkBookL1.iterationTwo();
        UtilityFunctions.scroll();
    },
};