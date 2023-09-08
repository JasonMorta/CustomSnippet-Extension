let snippetObject = [

];

//Get the html elements
let list = document.querySelector(".snips-inner");
let mainSnip = document.querySelector(".snips-main");
let data = null;
let trimmed1 = "";
let trimmed2 = "";
let nameOnly = "";
let trimmedT1 = "";
let count = 0;

//!Render list
async function renderList(array) {

  list.innerHTML = "";
  let updatedText = "";
  let prevVal = [];

  //! loop
  await array.forEach((item, i) => {
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
    snip.setAttribute("contenteditable", "true");
    snip.value = item.text;
    snip.style.fontFamily = `${item.hide ? "barcode" : "FiraCode"}`;
    snip.style.fontSize = `${item.hide ? "initial" : "inherit"}`;
    prevVal[i] = snip.value; //store current text in array

    //Handle textarea auto sizing on load
    const textLength = snip.value.length;
    const colWidth = 38; // Adjust this value to your liking
    const numCols = Math.ceil(textLength / colWidth);
    snip.rows = numCols



    //! Update item
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
        item.text = snip.value;
        //UPDATE list
        storeArrayData(snippetObject);
      }
    });





    snipCon.appendChild(snip);

    //!  DELETE
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

      snippetObject.splice(snippetObject.indexOf(item), 1);

      setTimeout(() => {
        storeArrayData(snippetObject);
      }, 500);
    });
    snipCon.appendChild(del);

    //! COPY item
    let copy = document.createElement("img");
    copy.className = "copy-snip snip-btn";
    copy.src = "./copy.png";
    copy.alt = "copy";
    copy.title = "Copy";
    copy.addEventListener("click", async (e) => {
      //Change image
      copy.src = "./copyFill.png";

      //"COGRAMMER ONLY" URL. Filter out student and topic name.
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
        let filteredName = item.text.replaceAll("{name}", nameOnly.trim());

        let filterComplete = filteredName.replaceAll(
          "{topic}",
          topic.toLowerCase().trim()
        );
        navigator.clipboard.writeText(filterComplete);
      } else {
        //Copy plain text
        navigator.clipboard.writeText(item.text);
      }
    });
    snipCon.appendChild(copy);

    //! Move up
    let up = document.createElement("img");
    up.src = "./up.png";
    up.className = "move-snip snip-btn";
    up.alt = "up";
    up.title = "Move up";
    up.addEventListener("click", async () => {
      //extract the selected snip
      let extracted = snippetObject.splice(i, 1, item[i]);
      //prevent reaching into index -1
      //When snip is at indx 0, it can be moved up anymore

      //replace selected index item with the previous index item,
      //making both the same
      snippetObject.splice(i, 1, snippetObject[i - 1]);

      //when selecting an item, target the previous ones index,
      //and replace it with extracted snip
      snippetObject.splice(i - 1, 1, extracted[0]);
      //}

      //Call updated list
      storeArrayData(snippetObject);
    });

    //! HIDE
    let hide = document.createElement("img");
    hide.src = `./static/images/${item.hide ? "eye" : "invisible"}.png`;
    hide.className = "hide-snip snip-btn";
    hide.alt = "hide & show text";
    hide.title = item.hide ? "Show" : "Hide";
    hide.addEventListener("click", async () => {
      if (item.hide == true) {
        item.hide = false;
        hide.src = "./static/images/invisible.png";
      } else {
        item.hide = true;
        hide.src = "./static/images/eye.png";
      }

      //Call updated list
      storeArrayData(snippetObject);
    });

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
  }); //For each end
  bottomLine();
} //end of renderList func

//!  Store to chrome storage
//only called when updating array
async function storeArrayData(array, title) {
  const now = new Date();
  let currentDate = date.format(now, 'YYYY/MM/DD HH:mm:ss')
  let storageLength = 0
  //check if array is empty

    //chrome.storage.sync.set({ [key]: array });

    await chrome.storage.sync.get(null, function(items) { 
      storageLength = Object.keys(items).length
      });
  
    const noteContent = JSON.stringify(array)

    //save not to local storage, including data
    const uniqueKey = `${storageLength} ${title ?? " "}-${currentDate} mySnippet`;


    chrome.storage.sync.set({ uniqueKey: noteContent }).then(() => {
      console.log("Value is set");
    });




  //after storing new data, get the array again
  retrieveArrayData(uniqueKey);
}

//! Get chrome data
async function retrieveArrayData() {
//chrome.storage.sync.clear()

    //find all snippets by key name
    chrome.storage.sync.get(null, function(items) {
         console.log('Object.keys(items)', Object.keys(items))
     for (let i = 0; i < Object.keys(items).length; i++) {
   
      console.log('items', items)
       //push all snips into array
       snippetObject.push(JSON.parse(items))
     
     }
      
    });
    console.log('snippetObject', snippetObject)

  // await chrome.storage.sync.get(null, (data) => {
  //   // Get all the stored chunks
  //   const keys = Object.keys(data).filter((key) =>
  //     key.startsWith("myArrayChunk")
  //   );
  //   if (keys.length > 0) {
  //     // Combine the chunks into a single array
  //     const storedArray = keys
  //       .sort()
  //       .map((key) => data[key])
  //       .flat();
  //     // Do something with the array...
  //     snippetObject = storedArray;

  //     renderList(snippetObject);
  //   } else {
  //     // No array was found in chrome.storage.sync
  //     console.log("snippetsObject not found");
  //   }
  // });
}

//! SAVE new item element
function saveUserInput() {
  let getHeading = "";
  let textOnly;

  //Save the input values to storage
  let textBox = document.querySelector("#snips-textarea");
  let wordCountEl = document.createElement("span");
  wordCountEl.className = "wordCountEl";

  textBox.addEventListener("input", () => {
    //After loosing focus the input text will still persist
    localStorage.setItem("snipInput", JSON.stringify(textBox.value));

    //handle auto sizing
    textBox.style.height = "auto";
    textBox.style.height = textBox.scrollHeight + "px";
  });

  let saveBtn = document.querySelector("#snips-save-btn");
  saveBtn.className = "btn-grad";
  saveBtn.addEventListener("click", () => {
    const now = new Date();
    let currentDate = date.format(now, 'YYYY/MM/DD HH:mm:ss')
    //Check if heading was added
    //remove heading and first line break if added
    if (textBox.value.match(/^<.*>/gi)) {
      //place heading and color in array  ['HeaderName', 'color']
      getHeading = textBox.value
        .match(/^<.*>/gi)
        .toString()
        .replace(/<|>/g, "", "")
        .split(","); //get heading & color as array
      textOnly = textBox.value.replace(/^<.*>/gi, "").replace("\n", ""); //gets all the text



      let snip = {
        text: textOnly,
        title: [getHeading],
        date: currentDate,
        id: snippetObject.length,
        hide: false
      }

      //! Check if item with same heading exists
      if (checkExistence(getHeading)) return alert("Heading already exist")

      //replace heading/color name with custom heading
      snippetObject.unshift(snip); //!Create snip array object
      storeArrayData(snippetObject, snip.title[0]);
      textBox.value = "";

      //Just for plain text
    } else if (textBox.value != " ") {
      snippetObject.unshift({ text: textBox.value, title: [], hide: false, date: currentDate, id: snippetObject.length }); //!Create snip array object
      storeArrayData(snippetObject, " ");
      textBox.value = "";
    }
    //Store any text that was'nt saved of when popup lost focus
    localStorage.setItem("snipInput", JSON.stringify(textBox.value));
    console.log(snippetObject)
  });
}

//! Check if the added item heading already exist
function checkExistence(currentItem) {
  let exists
  for (let i = 0; i < snippetObject.length; i++) {
    exists = snippetObject[i].title.includes(currentItem[0]);
    return exists  //return exists // return a boolean
  }
}

//! Get snippets from localStorage
async function getLastInput() {
  let textBox = document.querySelector("#snips-textarea");
  //load in previous text if it was not saved or popup lost focus
  if (localStorage.getItem("snipInput") != "") {
    textBox.value = JSON.parse(localStorage.getItem("snipInput"));
  }
  await chrome.storage.sync.get("contentData").then((result) => {
    if (result.contentData != null) {
      data = result;
    }
  });
}

//! CSS heading
//insert CSS heading elements into textarea
function addHeading() {
  let textBox = document.querySelector("#snips-textarea");
  let insertHeading = document.querySelector(".add-heading");
  insertHeading.addEventListener("click", () => {
    textBox.value = "<HeaderName,colorCode>\n";
    //.replace(/[.*]/, '')
  });
}

function bottomLine() {
  //Add a line at bottom of list
  let lastSnip = document.querySelectorAll(".snippet-container");
  if (lastSnip.length !== 0) {
    lastSnip[lastSnip.length - 1].style = "border-bottom: 3px solid #f44336;";
  }
}
addHeading();
getLastInput();
retrieveArrayData(); //get array
saveUserInput();
