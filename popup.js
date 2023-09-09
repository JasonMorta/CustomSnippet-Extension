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
  console.log(`%c Build List`, 'color: teal')

  console.log('array', array)


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
    if (item.title?.length > 0) {
      head.innerHTML = `<b style='color:${item.title[0][1]}'>${item.title[0][0]}</b>`; // add heading about snip

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

      //Console.log CSS 
      let logCss = `
       background-color: white; 
       font-size: 13px; 
       color: black;
       `
      console.log(`%c enterText ${item}`, logCss)

      //ONLY UPDATE LIST IF CHANGES WERE MADE
      if (prevVal[i] != snip.value) {

        //EXTRACT UPDATED TEXT FROM SNIP ELEMENT
        item.text = snip.value;
        //UPDATE list
        storeArrayData(item, item.title);
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
      console.log('item', item)

      setTimeout(() => {
        // storeArrayData(snippetObject);
        deleteFromStorage(item?.title[0])
        console.log('item', item.title[0])
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
      //extract the selected snip and id
      let extracted = snippetObject.splice(i, 1, item[i]);
      let itemId = snippetObject.splice(i, 1, item[i].id)
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
      console.log(`%c Hide Text`, 'color: orange')
      if (item.hide == true) {
        item.hide = false;
        hide.src = "./static/images/invisible.png";
      } else {
        item.hide = true;
        hide.src = "./static/images/eye.png";
      }



      //Call updated list
      updatedStorageItem(item.title, item)

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

//!  Store NEW item to chrome storage
//only called when updating array
async function storeArrayData(snip, dateStamp) {


  console.log(`%c Set Storage`, 'color: #2196f3')
  //const now = new Date();
  //let currentDate = date.format(now, 'YYYY/MM/DD HH:mm:ss')
  //check if array is empty

  //chrome.storage.sync.set({ [key]: array });

  // await chrome.storage.sync.get(null, function(items) { 
  //   storageLength = .keys(items).length
  //   console.log('storageLength', storageLength)Object
  //   });


  //save not to local storage, including data

  const uniqueKey = `${dateStamp}`;


  //since storage wont contains any other keys, special keys are not required.(however, a key that uses the same name, will replace existing ones)

  chrome.storage.sync.set({ [uniqueKey]: snip }).then(() => {
    console.log("Snip saved");
  });




  //after storing new data, get the array again
  renderList(snippetObject);
}

//! Get chrome data
function retrieveArrayData() {
  console.log(`%c GET Storage`, 'color: #2196f3')
  //chrome.storage.sync.clear()

  //find all snippets by key name
  chrome.storage.sync.get(null, function (snips) {
    //console.log('items', snips)// returns an object(s)

    // loop though the storage object,, extract the value object, push it to array
    for (const key in snips) {
      const value = snips[key];
      snippetObject.unshift(value)

    }

    //render updated list
    renderList(snippetObject.sort(function (a, b) { return b.id - a.id }));
  });

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
    let snip;
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

       snip = {
        text: textOnly,
        title: [getHeading],
        date: currentDate,
        id: snippetObject.length,
        hide: false
      }

      //! Check if item with same heading exists
      //if (checkExistence(getHeading)) return alert("Heading already exist")

      //replace heading/color name with custom heading
      snippetObject.unshift(snip); //!Create snip array object
      storeArrayData(snip, currentDate);
      textBox.value = "";

      //Just for plain text
    } else if (textBox.value != " ") {
      snip = { 
        text: textBox.value, 
        title: [], 
        hide: false, 
        date: currentDate, 
        id: snippetObject.length 
      }

      snippetObject.unshift(snip); //!Create snip array object

      //save to storage
      storeArrayData(snip, currentDate);
      textBox.value = "";
    }
    //Store any text that was'nt saved of when popup lost focus
    localStorage.setItem("snipInput", JSON.stringify(textBox.value));
    console.log('snippetObject')
    console.log(snippetObject)

    //render updated list
    renderList(snippetObject);
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

//remove a snip/key from Chrome storage after delete
async function deleteFromStorage(data) {
  console.log(`%c deleteFromStorage`, 'color: green')

  console.log('name', data)
  let keyName = '';

  // loop though the storage find the keyName or the related item
  chrome.storage.sync.get(null, function (snips) {

    for (const key in snips) {
      const value = snips[key]; //key all values
      console.log('value', value)
      //extracts the key name of queried object
      if (value.data.includes(data)) {
        keyName = key
      }


    }
    // pass keyName to remove function
    removeStorageItem(keyName)

  })



}

//update existing snippets
function updatedStorageItem(keyName, newValues) {

  //2. Create a new key with updated values

  // 1. Retrieve the current value from storage
  chrome.storage.sync.get(keyName[0], function (result) {
    console.log('result', result)
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError);
      return;
    }

    const updateData = {
      [keyName]: newValues,
    };

    chrome.storage.sync.set(updateData, function () {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        renderList(snippetObject)
      }
    });
  });
  /* 
  We first use chrome.storage.sync.get to retrieve the current value associated with the key 'your_key_name_here'.
  
  Inside the callback function, we modify the retrieved value. In this example, we assume that the value is an 
  object and update a specific property within that object (keyToUpdate: 'new_value').
  
  We then create an update data object (updateData) with the key 'your_key_name_here' and the updated value (newValue).
  
  Finally, we use chrome.storage.sync.set to update the value in storage. The callback function for 
  chrome.storage.sync.set is used to handle any errors or log a success message.
  
  Make sure to replace 'your_key_name_here' with the actual key you want to update and modify the update 
  logic to suit your specific use case.
  
  */

}

//Find and returns single item [key: value] form localStorage by the fist tile name(keyName use title[0])
function findArrayItemInStorage(title) {
  let item = {
    keyName: '',
    value: ''
  }
  console.log(`%c deleteFromStorage`, 'color: green')

  // loop though the storage find the key or the related item
  chrome.storage.sync.get(null, function (snips) {

    for (const key in snips) {
      item.value = snips[key]; //key all values

      //extracts the key name or queried object
      if (item.value.title[0].includes(title[0])) {
        item.keyName = key
      }
    }
    return item
  })
}


//Remove a snippet from chrome by keyName
function removeStorageItem(keyName) {
  //Remove key from storage
  chrome.storage.sync.remove(keyName, function () {
    // Return any errors if they occur
    if (chrome.runtime.lastError) return console.log(chrome.runtime.lastError);

    // Key has been successfully removed
    console.log(`Snip "${keyName}" has been removed from Chrome storage.`);
    //re-render list
    renderList(snippetObject)
  });
}


addHeading();
getLastInput();
retrieveArrayData(); //get array
saveUserInput();
