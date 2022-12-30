let copyThis = "";
let snippetArray = [];
let data = null;
let trimmed1 = "";
let trimmed2 = "";
let nameOnly = "";
let trimmedT1 = "";
let count = 0;

//Save the input values to storage
let textBox = document.querySelector("#snips-textarea");
textBox.addEventListener("input", () => {
  //After loosing focus the input text will still persist
  localStorage.setItem("snipInput", JSON.stringify(textBox.value));
});

//insert CSS heading elements into textarea
let insertHeading = document.querySelector(".add-heading");
insertHeading.addEventListener("click", () => {
  textBox.value = "<b style='color:hotpink'>Heading</b><br>";
});

//het the html elements
let list = document.querySelector(".snips-inner");
let mainSnip = document.querySelector(".snips-main");

//get snippets from localStorage

async function getStorage() {
  await chrome.storage.sync.get("snippet").then((result) => {

    if (result.snippet != undefined) {
      snippetArray = result.snippet;
    }
  });

  if (snippetArray != undefined) {
    if (localStorage.getItem("snipInput") != "") {
      textBox.value = JSON.parse(localStorage.getItem("snipInput"));
    }

    snips();
  }

  await chrome.storage.sync.get("contentData").then((result) => {
    if (result.contentData != null) {
      data = result;
      console.log("result", data);
    }
  });

  console.log(data);
}
getStorage();
//===================================SAVE============================================
//SAVE custom snippet to local storage
let saveBtn = document.querySelector("#snips-save-btn");
saveBtn.className = "btn-grad";
saveBtn.addEventListener("click", async () => {
  if (textBox.value != " ") {
    snippetArray.unshift(textBox.value);
    await chrome.storage.sync.set({ snippet: snippetArray });
    snips();
    textBox.value = "";
  }
  textBox.value = "";
  localStorage.setItem("snipInput", JSON.stringify(textBox.value));
});
//===============================================================================

//CREATE snippet list
function snips() {
  list.innerHTML = "";
  let updatedText = "";
  let splitSnip = [];
  let newSnip = "";
  let prevVal = [];
  for (let i = 0; i < snippetArray.length; i++) {
    //snippet
    let snipCon = document.createElement("div");
    snipCon.className = "snippet-container";

    let snip = document.createElement("p");
    snip.className = "my-snippet";
    snip.setAttribute("contenteditable", "true");
    snip.innerHTML = snippetArray[i];
    prevVal[i] = snip.textContent; //store current text in array

    //fade out the buttons when editing snip
    snip.addEventListener("click", () => {
      fader("fade-snip-btn");
    });
    snip.addEventListener("blur", async () => {
      //remove opacity from btns
      del.classList.remove("fade-snip-btn");
      copy.classList.remove("fade-snip-btn");
      up.classList.remove("fade-snip-btn");
      //ONLY UPDATE LIST IF CHANGES WERE MADE
      if (prevVal[i] != snip.textContent) {
        //EXTRACT UPDATED TEXT FROM SNIP ELEMENT
        updatedText = snip.textContent.split("\n")[1];

        //SPLIT SNIPPET CONTENT
        splitSnip = snip.innerHTML.split("\n");

        //UPDATE SNIP WITH NEW TEXT
        splitSnip[1] = updatedText;
        newSnip = splitSnip.join().replace(",", "\n");
        snippetArray[i] = newSnip;

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
    function fader(className) {
      del.classList.add(className);
    }
    title = "double click to delete";
    del.addEventListener("dblclick", async () => {
      snipCon.className += " slide-out-left";
      snippetArray.splice(snippetArray.indexOf(snippetArray[i]), 1);
      await chrome.storage.sync.set({ snippet: snippetArray });

      setTimeout(() => {
        getStorage();
      }, 500);
      //console.log(snippetArray);
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
      if (snippetArray[i].toString().includes("<br>")) {
        copyThis = snippetArray[i]
          .toString()
          .replace(/<.*>/, "")
          .replace(/\r?\n|\r/, "");
      } else {
        copyThis = snippetArray[i].toString();
      }
      console.log("data", data);
      //Only works on the cogrammer URL. Filter out student and topic name
      if (data != null) {
        //extract name only
        console.log(data.contentData.names[0]);
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
        let filteredName = copyThis.replace("{name}", nameOnly.trim());

        let filterComplete = filteredName.replace(
          "{topic}",
          topic.toLowerCase().trim()
        );
        navigator.clipboard.writeText(filterComplete);
      } else {
        navigator.clipboard.writeText(copyThis);
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
      let fromIndex = snippetArray.indexOf(snippetArray[i]); //index number

      //extract the selected snip
      let extracted = snippetArray.splice(fromIndex, 1, snippetArray[i]);

      //prevent reaching into index -1
      if (!fromIndex - 1 == -1) {
        //replace selected index item with the previous index item,
        //making both the same
        snippetArray.splice(fromIndex, 1, snippetArray[fromIndex - 1]);

        //when selecting an item, target the previous ones index,
        //and replace it with extracted snip
        snippetArray.splice(fromIndex - 1, 1, extracted);
      }

      //Call updated list
      await chrome.storage.sync.set({ snippet: snippetArray });
      await getStorage();
    });

    //fadeout the buttons when editing snip
    function fader(className) {
      up.classList.add(className);
      copy.classList.add(className);
      del.classList.add(className);
    }

    snipCon.appendChild(up);

    list.appendChild(snipCon);
  }

  //Add a line at bottom of list
  let lastSnip = document.querySelectorAll(".snippet-container");
  lastSnip[lastSnip.length - 1].style = "border-bottom: 3px solid #f44336;";
} //create snippet list end
