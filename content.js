let textBox = document.querySelector("#textarea");
let saveBtn = document.querySelector("#save-btn");
let list = document.querySelector(".inner");
let mainSnip = document.querySelector('.main')
console.log('mainSnip', mainSnip)
let snippetArray = [];

let main = document.getElementsByTagName("body")
console.log('main', main)






//get the cogrammer textfield
let field = document.querySelectorAll('.form-control')
//console.log('field', field)

for (let i = 0; i < field.length; i++) {
    field[i].addEventListener('click', ()=>{
        alert("hello")
      
           main.appendChild(mainSnip)
          
    })
   //console.log( field[i]);
    
}


//get snippets from localStorage
getStorage()
function getStorage() {
  if (localStorage.getItem("snippet") != null) {
    snippetArray = JSON.parse(localStorage.getItem("snippet"));
    snips();
  }
}

//save custom snippet to local storage
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
        let snip = document.createElement("p");
        snip.className = "my-snippet";
        snip.textContent = snippetArray[i];
        snip.addEventListener("click", () => {
         // console.log(snippetArray[i]);
        });
    
        //dele snippet btn
        let del = document.createElement("button");
        del.textContent = "del";
        del.className = "delete-snip";
        del.addEventListener("click", () => {
          snippetArray.splice(snippetArray.indexOf(snippetArray[i]), 1);
          localStorage.setItem("snippet", JSON.stringify(snippetArray));
          getStorage()
          //console.log(snippetArray);
        });
        snip.appendChild(del);
    
        list.appendChild(snip);
      }



}
