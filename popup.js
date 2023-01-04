let copyThis = "";
let snippetArray = [];
let data = null;
let trimmed1 = "";
let trimmed2 = "";
let nameOnly = "";
let trimmedT1 = "";
let count = 0;
//let wordCount = 0;
//chrome.storage.sync.clear()
//Save the input values to storage
let textBox = document.querySelector("#snips-textarea");
let snipContainer = document.querySelector(".snips-paragraph-container");
let wordCountEl = document.createElement("span");
wordCountEl.className = "wordCountEl";
textBox.maxLength = 600;
textBox.addEventListener("input", () => {
  //After loosing focus the input text will still persist
  localStorage.setItem("snipInput", JSON.stringify(textBox.value));

     //count each word entered
//   let w = textBox.value.split(" ").length;
//   wordCountEl.textContent = `${w} word${w < 2 ? "" : "s"} `;

//   snipContainer.appendChild(wordCountEl);
});

//insert CSS heading elements into textarea
let insertHeading = document.querySelector(".add-heading");
insertHeading.addEventListener("click", () => {
  textBox.value = "<HeaderName,color>\n";
  //.replace(/[.*]/, '')
});

//Get the html elements
let list = document.querySelector(".snips-inner");
let mainSnip = document.querySelector(".snips-main");

//get snippets from localStorage

async function getStorage() {
  await chrome.storage.sync.get("snippet").then((result) => {
    if (result.snippet != undefined) {
      snippetArray = result.snippet;
    }
    snips();
  });

  //load in previous text if it was not saved or popup lost focus
  if (localStorage.getItem("snipInput") != "") {
    textBox.value = JSON.parse(localStorage.getItem("snipInput"));
  }
  await chrome.storage.sync.get("contentData").then((result) => {
    if (result.contentData != null) {
      data = result;
    }
  });

  console.log(snippetArray);
}
getStorage();
//===================================SAVE============================================
//SAVE custom snippet to local storage
let getHeading = "";
let textOnly;
let snipHeading = "";
let color = "";
let saveBtn = document.querySelector("#snips-save-btn");
saveBtn.className = "btn-grad";
saveBtn.addEventListener("click", async () => {
  //Check if heading was added
  //remove heading and first line break if added
  if (textBox.value.match(/^<.*>/gi)) {
    getHeading = textBox.value
      .match(/^<.*>/gi)
      .toString()
      .replace(/<|>/g, "", "")
      .split(","); //get heading & color as array
    textOnly = textBox.value.replace(/^<.*>/gi, "").replace("\n", ""); //gets all the text

    //replace heading/color name with custom heading
    snippetArray.unshift({ text: textOnly, title: getHeading, hide: false });//!Create snip array object
    await chrome.storage.sync.set({ snippet: snippetArray });
    //localStorage.setItem("testSnip", JSON.stringify(textBox.value));

    textBox.value = "";
    //Just for plain text
  } else if (textBox.value != " ") {
    snippetArray.unshift({ text: textBox.value, title: [], hide: false });//!Create snip array object
    await chrome.storage.sync.set({ snippet: snippetArray });
    //localStorage.setItem("testSnip", JSON.stringify(textBox.value));
    textBox.value = "";
  }
  //Store any text that was'nt saved of when popup lost focus
  localStorage.setItem("snipInput", JSON.stringify(textBox.value));
  console.log(snippetArray);
  snips();
});
//===============================================================================

//CREATE snippet list
function snips() {
  list.innerHTML = "";
  let updatedText = "";
  let prevVal = [];

  snippetArray.forEach((item, i) => {
    //!========Start the LOOP

    //snippet
    let snipCon = document.createElement("div");
    snipCon.className = "snippet-container";

    let head = document.createElement("p");
    head.style.textAlign = "left";
    head.style.marginLeft = "10px";
    //Only add the heading if it exists

    if (item.title.length > 0) {
      head.innerHTML = `<b style='color:${item.title[1]}'>${item.title[0]}</b>`; // add heading about snip
      snipCon.prepend(head);
    } else {
      head.innerHTML = ``;
      snipCon.prepend(head);
    }

    let snip = document.createElement("textarea");
    snip.className = "my-snippet";
    snip.cols = "50";
    snip.rows = "4";
    snip.setAttribute("contenteditable", "true");
    snip.value = item.text;
    snip.style.fontFamily = `${item.hide?"barcode": "FiraCode"}`
    prevVal[i] = snip.value; //store current text in array

    //fade out the buttons when editing snip
    snip.addEventListener("click", () => {
      fader("fade-snip-btn");
      //add scrollbar inside textarea
      snip.classList.add("my-snippet-overflow");
    });
    snip.addEventListener("blur", async () => {
      //remove opacity from btns
      del.classList.remove("fade-snip-btn");
      copy.classList.remove("fade-snip-btn");
      up.classList.remove("fade-snip-btn");
      snip.classList.remove("my-snippet-overflow");
      //ONLY UPDATE LIST IF CHANGES WERE MADE
      if (prevVal[i] != snip.value) {
        //EXTRACT UPDATED TEXT FROM SNIP ELEMENT
        updatedText = snip.value;
        //SPLIT SNIPPET CONTENT
        //splitSnip = snip.innerHTML.split("\n");

        //UPDATE SNIP WITH NEW TEXT

        //newSnip = splitSnip.join().replace(",", "\n");
        item.text = updatedText;

        // UPDATE LOCAL STORAGE
        await chrome.storage.sync.set({ snippet: snippetArray });

        //RERENDER LIST
        setTimeout(() => {
          getStorage();
        }, 500);
      }
    });

    snipCon.appendChild(snip);

    //DELETE snippet btn
    let del = document.createElement("img");
    del.src = "./del.png";
    del.alt = "delete";
    del.title = "Delete";
    del.className = "delete-snip snip-btn";
    //increase the opacity on hover of buttons while faded
    function fader(className) {
      del.classList.add(className);
    }
    title = "double click to delete";
    del.addEventListener("dblclick", async () => {
      snipCon.className += " slide-out-left";
      snippetArray.splice(snippetArray.indexOf(item), 1);
      await chrome.storage.sync.set({ snippet: snippetArray });

      setTimeout(() => {
        getStorage();
      }, 500);
    });
    snipCon.appendChild(del);

    //COPY text to clipboard
    let copy = document.createElement("img");
    copy.className = "copy-snip snip-btn";
    copy.src = "./copy.png";
    copy.alt = "copy";
    copy.title = "Copy";
    copy.addEventListener("click", async (e) => {
      //Change image
      copy.src = "./copyFill.png";

      // Copy the text inside the p tag
      //The object needs to converted to  a string to use regEx
      //Use regEx to remove all the HTML elements from the string(.replace(/<.*>/,''))
      //use regEx to remove the first line break from string(.replace(/\r?\n|\r/, ''))

      //If snip has no heading, don't remove line break
      // if (item.heading.toString().includes("<br>")) {

      //     .toString()
      //     .replace(/<.*>/, "")
      //     .replace(/\r?\n|\r/, "");
      // } else {
      //   copyThis = item.text.toString();
      // }

      //"COGRAMMER ONLY" URL. Filter out student and topic name.================
      if (data != null) {
        //extract name only
        trimmed1 = data.contentData.names[0].replace("Student: ", "").trim();
        trimmed2 = trimmed1.split(" ");
        nameOnly = trimmed2[0];

        //Extract the task topic name
        trimmedT1 = data.contentData.names[2].trim();

        //Get the index of the second "-" in stringArray
        function getPosition(trimmedT1, string, index) {
          return trimmedT1.split(string, index).join(string).length;
        } //returns the index number for "-"

        //Count the "-" occurrence

        for (let i = 0; i < trimmedT1.length; i++) {
          if (trimmedT1.charAt(i) === "-") {
            count++;
          }
        }

        //Keep count less then 2 only if 3 "-" is found
        if (count > 2) {
          count = 2;
        }

        //only get the topic by cutting away the rest of string.
        let topic = trimmedT1.slice(getPosition(trimmedT1, "-", count) + 1);

        //add student name and/or topic name to snippet text
        let filteredName = item.text.replace("{name}", nameOnly.trim());

        let filterComplete = filteredName.replace(
          "{topic}",
          topic.toLowerCase().trim()
        );
        navigator.clipboard.writeText(filterComplete);
      } else {
        //==========================================================
        navigator.clipboard.writeText(item.text);
      }
    });
    snipCon.appendChild(copy);

    //MOVE snip up btn
    let up = document.createElement("img");
    up.src = "./up.png";
    up.className = "move-snip snip-btn";
    up.alt = "up";
    up.title = "Move up";
    up.addEventListener("click", async () => {
      //get selected snip index
      //let fromIndex = snippetArray.indexOf(snippetArray[i]); //index number

      //extract the selected snip
      let extracted = snippetArray.splice(i, 1, item[i]);
      //prevent reaching into index -1
      //When snip is at indx 0, it can be moved up anymore
      //if (!fromIndex - 1 == -1) {
      //replace selected index item with the previous index item,
      //making both the same
      snippetArray.splice(i, 1, snippetArray[i - 1]);

      //when selecting an item, target the previous ones index,
      //and replace it with extracted snip
      snippetArray.splice(i - 1, 1, extracted[0]);
      //}

      //Call updated list
      await chrome.storage.sync.set({ snippet: snippetArray });
      await getStorage();
    });

    //Hide text

    let hide = document.createElement('img')
    hide.src = `./static/images/${item.hide ? "eye": "invisible"}.png`
    hide.className = "hide-snip snip-btn";
    hide.alt = "hide & show text";
    hide.title = item.hide ? "Show" : "Hide";
    hide.addEventListener("click", async () => {
      
      if (item.hide == true) {
        item.hide = false
        hide.src = "./static/images/invisible.png";
       
      } else {
        item.hide = true
        hide.src = "./static/images/eye.png";
      }

      console.log(item.hide);
      //Call updated list
      await chrome.storage.sync.set({ snippet: snippetArray });
      await getStorage();
   

    })

    //fadeout the buttons when editing snip
    function fader(className) {
      up.classList.add(className);
      copy.classList.add(className);
      del.classList.add(className);
      hide.classList.add(className);
    }

    snipCon.appendChild(up);
    snipCon.appendChild(hide);
    list.appendChild(snipCon);
  });

  //Add a line at bottom of list
  let lastSnip = document.querySelectorAll(".snippet-container");
  lastSnip[lastSnip.length - 1].style = "border-bottom: 3px solid #f44336;";
} //create snippet list end


