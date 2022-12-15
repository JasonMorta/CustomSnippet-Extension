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

//SAVE custom snippet to local storage
let saveBtn = document.querySelector("#save-btn")
saveBtn.addEventListener("click", function () {
  snippetArray.unshift(textBox.value);
  localStorage.setItem("snippet", JSON.stringify(snippetArray));
  snips()
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
        snip.textContent = snippetArray[i];
        snipCon.appendChild(snip);

        //DELETE snippet btn
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
    
        //COPY text to clipboard
        let copy = document.createElement("button")
        copy.className = "copy-snip snip-btn"
        copy.textContent = "copy";
        copy.addEventListener('click', (e) => {
          // Copy the text inside the p tag
          navigator.clipboard.writeText(snippetArray[i]);
        })
        snipCon.appendChild(copy);

        //MOVE snip up btn
        let up = document.createElement("img")
        up.src="./up.png"
        up.className="move-snip snip-btn"
        up.alt="up"
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
