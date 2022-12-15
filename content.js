let textBox = document.querySelector("#textarea");

let list = document.querySelector(".inner");
let mainSnip = document.querySelector('.main')
console.log('mainSnip', mainSnip)
let snippetArray = [];

let main = document.getElementsByTagName("body")

console.log('main', main)

main.className = "dom-body"
          

//get the cogrammer textfield
let field = document.querySelectorAll('.form-control')
//console.log('field', field)


//get snippets from localStorage
getStorage()
function getStorage() {
  if (localStorage.getItem("snippet") != null) {
    snippetArray = JSON.parse(localStorage.getItem("snippet"));
    snips();
  }
}

//save custom snippet to local storage
let saveBtn = document.querySelector("#save-btn")
saveBtn.addEventListener("click", function () {
  snippetArray.unshift(textBox.value);
  localStorage.setItem("snippet", JSON.stringify(snippetArray));
  snips()
});

//creates snippet list
function snips() {
    list.innerHTML = ""

    for (let i = 0; i < snippetArray.length; i++) {
        //snippet
        let snipCon = document.createElement("div")
        snipCon.className = "snippet-container"

        let snip = document.createElement("p");
        snip.className = "my-snippet";
        snip.textContent = snippetArray[i];
        snipCon.appendChild(snip);
        //dele snippet btn
        let del = document.createElement("button");
        del.textContent = "del";
        del.className = "delete-snip snip-btn";
        title = "double click to delete"
        del.addEventListener("dblclick", () => {
          snippetArray.splice(snippetArray.indexOf(snippetArray[i]), 1);
          localStorage.setItem("snippet", JSON.stringify(snippetArray));
          getStorage()
          //console.log(snippetArray);
        });
        snipCon.appendChild(del);
    

        //copy text to clipboard
        let copy = document.createElement("button")
        copy.className = "copy-snip snip-btn"
        copy.textContent = "copy";
        copy.addEventListener('click', (e) => {
          // Copy the text inside the p tag
          navigator.clipboard.writeText(snippetArray[i]);
        })
        snipCon.appendChild(copy);
        list.appendChild(snipCon);
      }


      
}
