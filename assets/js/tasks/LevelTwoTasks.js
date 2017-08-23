var WorkBookL2 = {

    jsonFeed: "",
    jsonObject: {},
    kingResults: [],
    currKing: 0,

    iterationThree: function(maxNum, div3Text, div5Text) {
        for(let i = 1; i <= 100; i++) {
            if(i % 3 === 0) {
                $('#output').append(`<p>${div3Text}</p>`);
            }
            else if(i % 5 === 0) {
                $('#output').append(`<p>${div5Text}</p>`);
            }

            if(i % 5 === 0 && i % 3 === 0) {
                $('#output').append(`<p>${div3Text}${div5Text}</p>`);
            }
        }
    },

    iterationFour: function(i) {
        let loops = 0;
        let input = parseInt(i);
        while(true) {

            if(input % 3 === 0) {
                console.log(`${input} is divisible by 3, dividing it...`);
                $('#output').append(`<p>${input} is divisible by 3, dividing it...</p>`);
                input /= 3;
            }
            else {
                console.log(`${input} is not divisible by 3, adding one then dividing it...`);
                $('#output').append(`<p>${input} is not divisible by 3, adding one then dividing it...</p>`);
                input += 1;
            }

            if(input === 1) {
                console.log(`${input} is now 1, ending task...`);
                $('#output').append(`<p>${input} is now 1, ending task...</p>`);
                break;
            }

            loops++;
        }
        
        console.log(`Reached ${input} in ${loops} iterations.`);
        $('#output').append(`<p>Reached ${input} in ${loops} iterations.</p>`);

    },

    stringsFour: function(input) {
        let text = input.split("");
        $('#output').append(`<p>${text} -> ${text.some(function(v,i,a) {
            console.log(`${v} ${i} ${a}`);
            $('#output').append(`<p>${v} ${i} ${a}</p>`);
            return a.lastIndexOf(v) != i;
        })}</p>`);
    },

    createParagraph: function() {
        $('#output').append("<p>Created new paragraph.</p>");
        
        let block = document.getElementById("create-target");
        block.innerHTML = "<p id=\"paragraph-target\">Test</p>";
    },

    saveParagraph: function(input) {
        let block = document.getElementById("paragraph-target");

        if(block) {
            $('#output').append("<p>Saved text into paragraph.</p>");
            block.innerHTML = input;
        }
        else {
            $('#output').append("<p>Paragraph does not exist, create it first.</p>");
        }
    },

    deleteParagraph: function() {
        $('#output').append("<p>Deleted paragraph.</p>");
        let block = document.getElementById("paragraph-target");
        block.remove();
    },

    jsonOne: function() {
        let url = "https://raw.githubusercontent.com/ewomackQA/JSONDataRepo/master/example.json";

        // Should use async
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                WorkBookL2.jsonFeed = this.responseText;
                WorkBookL2.jsonObject = JSON.parse(this.responseText);
            }
        }
        xhr.send();

        $('#output').append(`<p>${this.jsonFeed}</p>`);
        console.log(this.jsonObject);

        // JSX here would benefit for things like this!
        $('#render-target-heroes').append(
            `
            <div>
                <h4 class="left-align">${this.jsonObject.squadName}</h4> 
                <p><strong>Home Town</strong>: ${this.jsonObject.homeTown}</p>
                <p><strong>Secret Base</strong>: ${this.jsonObject.secretBase}</p>
                <p><strong>Formed</strong>: ${this.jsonObject.formed}</p>
                <p><strong>Active</strong>: ${(this.jsonObject.active ? "Yes" : "No")}</p>
            </div>
            <br/><br/>`
        );

        $('#render-target-heroes').append("<h4 class=\"left-align\">Team Members</h4>");
        for(let player in this.jsonObject.members) {
            $('#render-target-heroes').append(
                `<div>
                    <p><strong>Player Name</strong>: ${this.jsonObject.members[player].name}</p>
                    "<p><strong>Player Age</strong>: ${this.jsonObject.members[player].age}</p>
                    "<p><strong>Player Secret Identity</strong>: ${this.jsonObject.members[player].secretIdentity}</p>
                    "<p><strong>Player Powers</strong>: ${this.jsonOneGetPowers(this.jsonObject.members[player].powers)}</p>
                </div>
                <br/><br/>`
            );
        }
    },

    jsonOneGetPowers: function(powers) {
        let final = "";
        for(let i = 0; i < powers.length; i++) {
            final += `<p>>> Power ${i}: ${powers[i]}</p>`;
        }
        return final;
    },

    jsonTwo: function(input) {
        this.currKing = 0;
        let url = "https://raw.githubusercontent.com/ewomackQA/JSONDataRepo/master/kings.json";

        // Should use async
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                WorkBookL2.jsonFeed = this.responseText;
                WorkBookL2.jsonObject = JSON.parse(this.responseText);
            }
        };
        xhr.send();

        $('#output').append(`<p>${this.jsonFeed}</p>`);
        console.log(this.jsonObject);

        this.kingResults = [];

        for(let king in this.jsonObject) {
            let kingStr = `${this.jsonObject[king].nm} ${this.jsonObject[king].cty} ${this.jsonObject[king].hse} ${this.jsonObject[king].yrs}`;
            
            if(kingStr.toLowerCase().includes(input.toLowerCase())) {
                this.kingResults.push(this.jsonObject[king]);
                console.log(`"Found: ${kingStr}`);
            }
        }

        console.log(`Found ${this.kingResults.length} results for search term ${input}`);
        $('#output').append(`<p>Found ${this.kingResults.length} results for search term ${input}</p>`);
        $('#render-target-kings').text(`Found ${this.kingResults.length} results for search term ${input}`);

        this.jsonTwoShowKings();
    },

    jsonTwoShowKings: function() {
        if(this.kingResults.length > 0) {
            $('#render-target-kings').append(
                `<div id="render-target-result">
                    <p><strong>Current Result</strong>: ${(parseInt(this.currKing) + 1)}</p>
                    <p><strong>King Name</strong>: ${this.kingResults[this.currKing].nm}</p>
                    <p><strong>King City</strong>: ${this.kingResults[this.currKing].cty}</p>
                    <p><strong>King House</strong>: ${this.kingResults[this.currKing].hse}</p>
                    <p><strong>King Years</strong>: ${this.kingResults[this.currKing].yrs}</p>
                </div>`
            );
        }
    },

    jsonTwoPrevKing: function() {
        this.currKing--;

        if(this.currKing < 0) {
            this.currKing = 0;
        }

        $('#render-target-result').remove();
        this.jsonTwoShowKings();
    },

    jsonTwoNextKing: function() {
        this.currKing++;

        if(this.currKing > this.kingResults.length-1) {
            this.currKing = this.kingResults.length-1;
        }
        
        $('#render-target-result').remove();
        this.jsonTwoShowKings();
    }
}