let clearStorage = document.querySelector('#snips-clear-btn')
// Change image on hover
clearStorage.addEventListener('mouseover', () => {
  clearStorage.src = "./static/images/clean-hover.png";
})
clearStorage.addEventListener('mouseleave', () => {
  clearStorage.src = "./static/images/clean.png";
})
clearStorage.addEventListener('click', () => {
  let con = confirm('🚨Are you sure you want to clear all snippets? \n🚨This action cannot be undone.')
  if (con) {
    chrome.storage.sync.clear()
    snippetObject = []
    renderList(snippetObject)
  }

})