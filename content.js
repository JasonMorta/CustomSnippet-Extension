let allNames = [];

async function changeHeading() {
  //get current url path
  let path = window.location.href;
  console.log('path', path)

  //Get all the names from elements
  let studentBlock = document.querySelector(".student-block")
  
  //FInd the student block, then send the data
  if (studentBlock != null) {
    console.log("Found student block");
    let names = document.querySelectorAll("h6");
    //Filter the names from h2 nodes then push into array
    for (let i = 0; i < names.length; i++) {
      allNames.push(names[i].textContent);
    }
  
    //Store all captured data in object
    const data = {
      names: allNames,
      url: path
    };
  
    //share this data with popup.js
    await chrome.storage.sync.set({ contentData: data });
  } else {
    console.log("No student block found🚫");
  }

}
changeHeading();
