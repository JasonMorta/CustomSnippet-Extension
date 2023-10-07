
let input = document.querySelectorAll('input')
let content = document.querySelector('.content')


let listObj = getList() || []

console.log('listObj', listObj)


//add to array and LS
function Add() {
    const now = new Date();
    let currentDate = date.format(now, 'YYYY/MM/DD HH:mm:ss')


    let newItem = {
        heading: input[0].value,
        text: input[1].value,
        date: currentDate,
        id: listObj.length
    }

    //CHeck if item with same heading exists
    if (checkExistence(input[0].value)) return console.log("Heading already exist")


    listObj.push(newItem)

    const noteContent = JSON.stringify(newItem)

    //save not to local storage, including data
    const uniqueKey = `${localStorage.length} ${newItem.heading}-${currentDate} mySnippet`;

    localStorage.setItem(uniqueKey, noteContent)


    //Clear inputs
    input[0].value = ""
    input[1].value = ""

    return contentUI()
}


//Update UI
function contentUI() {
    content.innerHTML = ""

    sortArray(listObj)
    for (let i = 0; i < listObj.length; i++) {

        //DIV Container
        const container = document.createElement('div')

        //the heading element
        let heading = document.createElement('h2')
        heading.textContent = listObj[i].heading

        // the text element
        let text = document.createElement('p')
        text.textContent = listObj[i].text

        //append both elements to div container
        container.appendChild(heading)
        container.appendChild(text)

        //append div to HTML
        content.appendChild(container)
    }

}
contentUI()

//Compile array from notes stored in local storage
function getList() {
    let obj = []
    //find all snippets by key name
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i)
        if (key.includes("mySnippet")) {
            //push all snips into array
            obj.push(JSON.parse(localStorage.getItem(key)))
        }
    }
    return obj

}

//sort array in descending order
function sortArray(array) {
    array.sort(function (a, b) { return b.id - a.id });
}

//check if the added item heading already exist
function checkExistence(currentItem) {
    const exists = listObj.some(obj => obj.heading === currentItem);
    return exists
}
