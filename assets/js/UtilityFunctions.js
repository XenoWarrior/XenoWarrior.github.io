var UtilityFunctions = { 
    clear: function() {
        $('#output').text("");
    },
    scroll: function() {
        var element = $('#output');
        var height = element[0].scrollHeight;
        element.scrollTop(height);
    }
}