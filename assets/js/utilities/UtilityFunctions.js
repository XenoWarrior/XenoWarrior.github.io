var UtilityFunctions = { 
    clear () {
        $('#output').text("");
    },

    scroll (selector) {
        if(selector) {
            let element = $(selector);
        }
        else {
            let element = $('#output');
        }
        let height = element[0].scrollHeight;
        element.scrollTop(height);
    },
    
    size (obj) {
        let size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    }
}