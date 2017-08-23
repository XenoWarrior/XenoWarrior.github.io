'use strict';

var GarageEvents = {
    onAddVehicleClick: () => {
        GarageSystem.addVehicle($('#l2_gs_reg').val(), $('#l2_gs_brand').val(), $('#l2_gs_model').val(), 'No Faults');
        UtilityFunctions.scroll();
    },
    onAddFaultClick: () => {
        GarageSystem.addFault();
        UtilityFunctions.scroll();
    }
};

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

var LevelTwoEvents = {
    onFizzBuzzTestClick: () => {
        WorkBookL2.iterationThree($('#l2_fb_maxnum').val(), $('#l2_fb_3text').val(), $('#l2_fb_5text').val());
        UtilityFunctions.scroll();
    },
    onIterationFourClick: () => {
        WorkBookL2.iterationFour($('#l2_i4_maxnum').val());
        UtilityFunctions.scroll();
    },
    onStringsFourClick: () => {
        WorkBookL2.stringsFour($('#l2_s4_string').val());
        UtilityFunctions.scroll();
    },
    onAddParagraphClick: () => {
        WorkBookL2.createParagraph(); UtilityFunctions.scroll();
    },
    onSaveParagraphClick: () => {
        WorkBookL2.saveParagraph($('#l2_d1_string').val()); UtilityFunctions.scroll();
    },
    onDeleteParagraph: () => {
        WorkBookL2.deleteParagraph(); UtilityFunctions.scroll();
    },
    onGetHeroesClick: () => {
        WorkBookL2.jsonOne();
        UtilityFunctions.scroll()
    },
    onGetKingsClick: () => {
        WorkBookL2.jsonTwo($('#l2_searchterm').val());
        UtilityFunctions.scroll();
    },

    onNextResultClick: () => {
        WorkBookL2.jsonTwoPrevKing(); UtilityFunctions.scroll();
    },

    onPreviousResultClick: () => {
        WorkBookL2.jsonTwoNextKing(); UtilityFunctions.scroll();
    }
};