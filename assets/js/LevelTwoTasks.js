var WorkBookL2 = {

    jsonFeed: "",
    jsonObject: {},

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

            if(input === 1) {
                console.log(input + " is now 1, ending task...");
                $('#output').append("<p>" + input + " is now 1, ending task...</p>");
                break;
            }

            loops++;
        }
        
        console.log("Reached " + input + " in " + loops + " iterations.");
        $('#output').append("<p>Reached " + input + " in " + loops + " iterations.</p>");

    },

    stringsFour: function(input) {
        var text = input.split("");
        $('#output').append("<p>" + text + " -> " + text.some(function(v,i,a) {
            console.log(v + " " + i + " " + a);
            $('#output').append("<p>" + v + " " + i + " " + a + "</p>");
            return a.lastIndexOf(v) != i;
        }) + "</p>");
    },

    createParagraph: function() {
            $('#output').append("<p>Created new paragraph.</p>");
        var block = document.getElementById("create-target");
        block.innerHTML = "<p id=\"paragraph-target\">Test</p>";
    },

    saveParagraph: function(input) {
        var block = document.getElementById("paragraph-target");

        if(block) {
            $('#output').append("<p>Saved text into paragraph.</p>");
            block.innerHTML = input;
        }
            $('#output').append("<p>Paragraph does not exist, create it first.</p>");
        }
    },

    deleteParagraph: function() {
        $('#output').append("<p>Deleted paragraph.</p>");
        var block = document.getElementById("paragraph-target");
        block.remove();
    },

    jsonOne: function() {
        var url = "https://raw.githubusercontent.com/ewomackQA/JSONDataRepo/master/example.json";

        // Should use async
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                WorkBookL2.jsonFeed = this.responseText;
                WorkBookL2.jsonObject = JSON.parse(this.responseText);
            }
        };
        xhr.send();

        $('#output').append("<p>" + this.jsonFeed + "</p>");
        console.log(this.jsonObject);

        $('#render-target-heroes').append(
            "<div><h4>" + this.jsonObject.squadName + "</h4>" + 
            "<p><strong>Home Town</strong>:" + this.jsonObject.homeTown + "</p>" + 
            "<p><strong>Secret Base</strong>:" + this.jsonObject.secretBase + "</p>" + 
            "<p><strong>Formed</strong>:" + this.jsonObject.formed + "</p>" + 
            "<p><strong>Active</strong>:" + (this.jsonObject.active ? "Yes" : "No") + "</p></div><br/><br/>"
        );

        $('#render-target-heroes').append("<h4>Team Members</h4>");
        for(var player in this.jsonObject.members) {
            $('#render-target-heroes').append(
                "<div><p><strong>Player Name</strong>: " + this.jsonObject.members[player].name + "</p>" + 
                "<p><strong>Player Age</strong>: " + this.jsonObject.members[player].age + "</p>" + 
                "<p><strong>Player Secret Identity</strong>: " + this.jsonObject.members[player].secretIdentity + "</p>" + 
                "<p><strong>Player Powers</strong>: " + this.jsonOneGetPowers(this.jsonObject.members[player].powers) + "</p></div><br/><br/>"
            );
        }
    },

    jsonOneGetPowers: function(powers) {
        var final = "";
        for(var i = 0; i < powers.length; i++) {
            final += "<p>>> Power " + i + ": " + powers[i] + "</p>";
        }
        return final;
    },

    jsonTwo: function() {
        var url = "https://raw.githubusercontent.com/ewomackQA/JSONDataRepo/master/kings.json";

        // Should use async
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                WorkBookL2.jsonFeed = this.responseText;
                WorkBookL2.jsonObject = JSON.parse(this.responseText);
            }
        };
        xhr.send();

        $('#output').append("<p>" + this.jsonFeed + "</p>");
        console.log(this.jsonObject);
    }
}