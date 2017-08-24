'use strict';

var LevelTwoEvents = {
    onFizzBuzzTestClick() {
        WorkBookL2.iterationThree($('#l2_fb_maxnum').val(), $('#l2_fb_3text').val(), $('#l2_fb_5text').val());
        UtilityFunctions.scroll();
    },

    onIterationFourClick() {
        WorkBookL2.iterationFour($('#l2_i4_maxnum').val());
        UtilityFunctions.scroll();
    },

    onStringsFourClick() {
        WorkBookL2.stringsFour($('#l2_s4_string').val());
        UtilityFunctions.scroll();
    },

    onAddParagraphClick() {
        WorkBookL2.createParagraph(); UtilityFunctions.scroll();
    },

    onSaveParagraphClick() {
        WorkBookL2.saveParagraph($('#l2_d1_string').val()); UtilityFunctions.scroll();
    },
    
    onDeleteParagraph() {
        WorkBookL2.deleteParagraph(); UtilityFunctions.scroll();
    },

    onGetHeroesClick() {
        WorkBookL2.jsonOne();
        UtilityFunctions.scroll()
    },

    onGetKingsClick() {
        WorkBookL2.jsonTwo($('#l2_searchterm').val());
        UtilityFunctions.scroll();
    },

    onNextResultClick() {
        WorkBookL2.jsonTwoPrevKing(); UtilityFunctions.scroll();
    },
    
    onPreviousResultClick() {
        WorkBookL2.jsonTwoNextKing(); UtilityFunctions.scroll();
    }
};
