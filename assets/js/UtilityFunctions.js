var UtilityFunctions = { 
    clear: function() {
        $('#output').text("");
    },
    scroll: function(selector) {

        if(selector) {
            var element = $(selector);
        }
        else {
            var element = $('#output');
        }
        var height = element[0].scrollHeight;
        element.scrollTop(height);
    },
    size: function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    }
}