var WorkBookL2 = {
    iterationThree: function(maxNum, div3Text, div5Text) {
        for(var i = 1; i <= 100; i++) {
            if(i % 3 === 0) {
                $('#output').append("<p>" + div3Text + "</p>");
            }
            else if(i % 5 === 0) {
                $('#output').append("<p>" + div5Text + "</p>");
            }

            if(i % 5 === 0 && i % 3 === 0) {
                $('#output').append("<p>" + div3Text + "" + div5Text + "</p>");
            }
        }
    },

    iterationFour: function(input) {
        var loops = 0;
        var input = parseInt(input);
        while(true) {

            if(input % 3 === 0) {
                console.log(input + " is divisible by 3, dividing it...");
                $('#output').append("<p>" + input + " is divisible by 3, dividing it...</p>");
                input /= 3;
            }
            else {
                console.log(input + " is not divisible by 3, adding one then dividing it...");
                $('#output').append("<p>" + input + " is not divisible by 3, adding one then dividing it...</p>");
                input += 1;
            }

            if(input == 1) {
                console.log(input + " is now 1, ending task...");
                $('#output').append("<p>" + input + " is now 1, ending task...</p>");
                break;
            }

            loops++;
        }
        
        console.log("Reached " + input + " in " + loops + " iterations.");
        $('#output').append("<p>Reached " + input + " in " + loops + " iterations.</p>");

    },

    stringsFour: function() {

    }
}