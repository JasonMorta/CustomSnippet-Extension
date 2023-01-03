let infoOpen = document.querySelector('.snip-info-btnO')
let infoClose = document.querySelector('.snip-info-btnC')
let infoBlock = document.querySelector('.snip-info')

infoOpen.addEventListener("click", ()=>{
  infoBlock.style.display = "block"
})

infoClose.addEventListener("click", ()=>{
  infoBlock.style.display = "none"
})