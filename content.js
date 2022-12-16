let textBox = document.querySelector("#textarea");
textBox.addEventListener('input', ()=>{
  //After loosing focus the input text will still persist
  localStorage.setItem("snipInput", JSON.stringify(textBox.value)) 
}
)

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
    textBox.value = JSON.parse(localStorage.getItem("snipInput"));
    snips();
  }
}

//SAVE custom snippet to local storage
let saveBtn = document.querySelector("#save-btn")
saveBtn.className="btn-grad"
saveBtn.addEventListener("click", function () {
  if (!textBox.value == " "){
    snippetArray.unshift(textBox.value);
    localStorage.setItem("snippet", JSON.stringify(snippetArray));
    snips()
    textBox.value = ""
  }
  textBox.value = ""
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
          snippetArray.splice(snippetArray.indexOf(snippetArray[i]), 1);
          localStorage.setItem("snippet", JSON.stringify(snippetArray));
          getStorage()
          //console.log(snippetArray);
        });
        snipCon.appendChild(del);
    
        //COPY text to clipboard
        let copy = document.createElement("img")
        copy.className = "copy-snip snip-btn"
        copy.src="./copy.png"
        copy.alt="copy"
        copy.title="Copy"
        copy.addEventListener('click', (e) => {
          // Copy the text inside the p tag
          navigator.clipboard.writeText(snippetArray[i].replace(/<.*>/,'').replace(/\r?\n|\r/, ''));
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


      
}
