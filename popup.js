let copyThis = ""
let snippetArray = [];

let textBox = document.querySelector("#snips-textarea");
textBox.addEventListener('input', ()=>{
  //After loosing focus the input text will still persist
  localStorage.setItem("snipInput", JSON.stringify(textBox.value)) 
}
)

let list = document.querySelector(".snips-inner");
let mainSnip = document.querySelector('.snips-main')
console.log('mainSnip', mainSnip)

          
//get the cogrammer textfield
let field = document.querySelectorAll('.form-control')
//console.log('field', field)


//get snippets from localStorage
getStorage()
function getStorage() {
  if (localStorage.getItem("snippet") != null) {
    snippetArray = JSON.parse(localStorage.getItem("snippet"));
    //textBox.value = JSON.parse(localStorage.getItem("snipInput"));
    snips();
  }
}

//SAVE custom snippet to local storage
let saveBtn = document.querySelector("#snips-save-btn")
saveBtn.className="btn-grad"
saveBtn.addEventListener("click", function () {
  if (!textBox.value == " "){
    snippetArray.unshift(textBox.value);
    localStorage.setItem("snippet", JSON.stringify(snippetArray));
    snips()
    
    textBox.value = ""
  }
  textBox.value = ""
  localStorage.setItem("snipInput", " ")
});

//CREATE snippet list
function snips() {
    list.innerHTML = ""

    for (let i = 0; i < snippetArray.length; i++) {
        //snippet
        let snipCon = document.createElement("div")
        snipCon.className = "snippet-container"

        let snip = document.createElement("p");
        snip.className = "my-snippet";
        snip.innerHTML = snippetArray[i];
        snipCon.appendChild(snip);

        //DELETE snippet btn
        let del = document.createElement("img");
        del.src="./del.png"
        del.alt="delete"
        del.title="Delete"
        del.className = "delete-snip snip-btn";
        title = "double click to delete"
        del.addEventListener("dblclick", () => {
          snipCon.className += " slide-out-left"
          snippetArray.splice(snippetArray.indexOf(snippetArray[i]), 1);
          localStorage.setItem("snippet", JSON.stringify(snippetArray));

          setTimeout(() => {
            getStorage()
          }, 500);
          //console.log(snippetArray);
        });
        snipCon.appendChild(del);
    
        //COPY text to clipboard
        let copy = document.createElement("img")
        copy.className = "copy-snip snip-btn"
        copy.src="./copy.png"
        copy.alt="copy"
        copy.title="Copy"
        copy.addEventListener('click', async (e) => {
          const data = await chrome.storage.sync.get("contentData");

          // Copy the text inside the p tag
          //Use regEx to remove all the HTML elements from the string(.replace(/<.*>/,''))
          //use regEx to remove the first line break from string(.replace(/\r?\n|\r/, ''))
          copyThis = snippetArray[i]
            .toString()
            .replace(/<.*>/, "")
            .replace(/\r?\n|\r/, "");

          //extract name only
          let trimmed1 = data.contentData.names[0]
            .replace("Student: ", "")
            .trim();
          let trimmed2 = trimmed1.split(" ");
          let nameOnly = trimmed2[0];

          //Extract the task topic name
          let trimmedT1 = data.contentData.names[2].trim();

          //Get the index of the second "-" in stringArray
          function getPosition(trimmedT1, string, index) {
            return trimmedT1.split(string, index).join(string).length;
          }//returns the index number for "-"

                    //Count the "-" occurrence
                    let count = 0;
                    for (let i = 0; i < trimmedT1.length; i++) {
                      if (trimmedT1.charAt(i) === "-") {
                        count++;
                      }
                    }
                    //Keep count less then 2 only if 3 "-" is found
                    if (count > 2) {
                      count = 2
                    }

          //only get the topic by cutting away the rest of string.
          let topic = trimmedT1.slice(getPosition(trimmedT1, "-", count) + 1);

          //add student name and/or topic name to snippet text
          let filteredName = copyThis.replace("{name}", nameOnly.trim());
          let filterComplete = filteredName.replace("{topic}",topic.toLowerCase().trim());

          navigator.clipboard.writeText(filterComplete);
        })
        snipCon.appendChild(copy);

        //MOVE snip up btn
        let up = document.createElement("img")
        up.src="./up.png"
        up.className="move-snip snip-btn"
        up.alt="up"
        up.title="Move up"
        up.addEventListener('click', ()=>{
       
            //get selected snip index
            let fromIndex = snippetArray.indexOf(snippetArray[i])//index number

            //extract the selected snip
            let extracted = snippetArray.splice(fromIndex, 1, snippetArray[i]);
      
            //prevent reaching into index -1
            if (!fromIndex-1 == -1) {
            //replace selected index item with the previous index item,
            //making both the same
            snippetArray.splice(fromIndex, 1, snippetArray[fromIndex-1]);

            //when selecting an item, target the previous ones index,
            //and replace it with extracted snip
            snippetArray.splice(fromIndex-1, 1, extracted);
            }
   
 
      
            //Cal updated list
            localStorage.setItem("snippet", JSON.stringify(snippetArray));
            getStorage()
     
        })
        snipCon.appendChild(up);

        list.appendChild(snipCon);
      }


      
}//create snippet end



  
