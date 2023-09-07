
let input = document.querySelectorAll('input')
let content = document.querySelector('.content')





let listObj = getList() || []

console.log('listObj', listObj)


//add to array and LS
function Add() {
    const now = new Date();
    let currentDate = date.format(now, 'YYYY/MM/DD HH:mm:ss')

    console.log('heading', input[0].value)
    console.log('para', input[1].value)

    let newItem = {
        heading: input[0].value,
        text: input[1].value
    }
    listObj.push(newItem)


    const noteContent = JSON.stringify(newItem)

    const uniqueKey = `${localStorage.length} ${newItem.heading}-${currentDate} mySnippet`;

    localStorage.setItem(uniqueKey, noteContent)



    console.log('listObj', listObj)




    input[0].value = ""
    input[1].value = ""
    contentUI()
}


//Update UI
function contentUI() {
    content.innerHTML = ""


    for (let i = 0; i < listObj.length; i++) {

        const container = document.createElement('div') 
        let heading = document.createElement('h2')
        heading.textContent = listObj[i].heading
     

        let text = document.createElement('p')
        text.textContent = listObj[i].text

        container.appendChild(heading)
        container.appendChild(text)
        content.appendChild(container)
    }

}
contentUI()

//Load LS

function getList() {
    let obj=[]
    //find all snippets
    for (let i = 0; i < localStorage.length; i++) {
        
        let key = localStorage.key(i)
      
        
        if (key.includes("mySnippet")){
        
           obj.push(JSON.parse(localStorage.getItem(key)))
        }

        
    }
    return obj
}
