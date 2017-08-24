var WorkBookL2 = {

    jsonFeed: "",
    jsonObject: {},
    kingResults: [],
    currKing: 0,

    iterationThree (maxNum, div3Text, div5Text) {
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

    iterationFour (i) {
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

    stringsFour (input) {
        let text = input.split("");
        $('#output').append(`<p>${text} -> ${text.some(function(v,i,a) {
            console.log(`${v} ${i} ${a}`);
            $('#output').append(`<p>${v} ${i} ${a}</p>`);
            return a.lastIndexOf(v) != i;
        })}</p>`);
    },

    createParagraph () {
        $('#output').append("<p>Created new paragraph.</p>");
        
        let block = document.getElementById("create-target");
        block.innerHTML = "<p id=\"paragraph-target\">Test</p>";
    },

    saveParagraph (input) {
        let block = document.getElementById("paragraph-target");

        if(block) {
            $('#output').append("<p>Saved text into paragraph.</p>");
            block.innerHTML = input;
        }
        else {
            $('#output').append("<p>Paragraph does not exist, create it first.</p>");
        }
    },

    deleteParagraph () {
        $('#output').append("<p>Deleted paragraph.</p>");
        let block = document.getElementById("paragraph-target");
        block.remove();
    },

    jsonOne () {
        let url = "https://raw.githubusercontent.com/ewomackQA/JSONDataRepo/master/example.json";

        // Should use async
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                WorkBookL2.jsonFeed = this.responseText;
                WorkBookL2.jsonObject = JSON.parse(this.responseText);

                $('#output').append(`<p>${WorkBookL2.jsonFeed}</p>`);
                console.log(WorkBookL2.jsonObject);

                // JSX here would benefit for things like this!
                $('#render-target-heroes').text("");
                $('#render-target-heroes').append(
                    `
                    <div>
                        <h4 class="left-align">${WorkBookL2.jsonObject.squadName}</h4> 
                        <p><strong>Home Town</strong>: ${WorkBookL2.jsonObject.homeTown}</p>
                        <p><strong>Secret Base</strong>: ${WorkBookL2.jsonObject.secretBase}</p>
                        <p><strong>Formed</strong>: ${WorkBookL2.jsonObject.formed}</p>
                        <p><strong>Active</strong>: ${(WorkBookL2.jsonObject.active ? "Yes" : "No")}</p>
                    </div>
                    <br/><br/>`
                );

                $('#render-target-heroes').append("<h4 class=\"left-align\">Team Members</h4>");
                for(let player in WorkBookL2.jsonObject.members) {
                    $('#render-target-heroes').append(
                        `<div>
                            <p><strong>Player Name</strong>: ${WorkBookL2.jsonObject.members[player].name}</p>
                            <p><strong>Player Age</strong>: ${WorkBookL2.jsonObject.members[player].age}</p>
                            <p><strong>Player Secret Identity</strong>: ${WorkBookL2.jsonObject.members[player].secretIdentity}</p>
                            <p><strong>Player Powers</strong>: ${WorkBookL2.jsonOneGetPowers(WorkBookL2.jsonObject.members[player].powers)}</p>
                        </div>
                        <br/><br/>`
                    );
                }
            }
        }
        xhr.send();
    },

    jsonOneGetPowers (powers) {
        let final = "";
        for(let i = 0; i < powers.length; i++) {
            final += `<p>>> Power ${i}: ${powers[i]}</p>`;
        }
        return final;
    },

    jsonTwo (input) {
        this.currKing = 0;
        let url = "https://raw.githubusercontent.com/ewomackQA/JSONDataRepo/master/kings.json";

        // Should use async
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                WorkBookL2.jsonFeed = this.responseText;
                WorkBookL2.jsonObject = JSON.parse(this.responseText);
                
                $('#output').append(`<p>${WorkBookL2.jsonFeed}</p>`);
                console.log(WorkBookL2.jsonObject);
        
                WorkBookL2.kingResults = [];
        
                for(let king in WorkBookL2.jsonObject) {
                    let kingStr = `${WorkBookL2.jsonObject[king].nm} ${WorkBookL2.jsonObject[king].cty} ${WorkBookL2.jsonObject[king].hse} ${WorkBookL2.jsonObject[king].yrs}`;
                    
                    if(kingStr.toLowerCase().includes(input.toLowerCase())) {
                        WorkBookL2.kingResults.push(WorkBookL2.jsonObject[king]);
                        console.log(`"Found: ${kingStr}`);
                    }
                }
        
                console.log(`Found ${WorkBookL2.kingResults.length} results for search term ${input}`);
                $('#output').append(`<p>Found ${WorkBookL2.kingResults.length} results for search term ${input}</p>`);
                $('#render-target-kings').text(`Found ${WorkBookL2.kingResults.length} results for search term ${input}`);
        
                WorkBookL2.jsonTwoShowKings();
            }
        };
        xhr.send();
    },

    jsonTwoShowKings () {
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

    jsonTwoPrevKing () {
        this.currKing--;

        if(this.currKing < 0) {
            this.currKing = 0;
        }

        $('#render-target-result').remove();
        this.jsonTwoShowKings();
    },

    jsonTwoNextKing () {
        this.currKing++;

        if(this.currKing > this.kingResults.length-1) {
            this.currKing = this.kingResults.length-1;
        }
        
        $('#render-target-result').remove();
        this.jsonTwoShowKings();
    }
}