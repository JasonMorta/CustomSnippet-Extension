let infoOpen = document.querySelector('.snip-info-btnO')
let infoClose = document.querySelector('.snip-info-btnC')
let infoBlock = document.querySelector('.snip-info')

let open = false


//OPEN
infoOpen.addEventListener("click", ()=>{
  infoBlock.style.display = "block"
  mainSnip.style.opacity = ".3"

  open = true
  // console.log('open', open)
  // console.log("open button");
})

//CLOSE
infoClose.addEventListener("click", ()=>{
  infoBlock.style.display = "none"
  mainSnip.style.opacity = "initial"
  open = false
  // console.log("close inner");
  // console.log('open', open)
})

  //CLOSE outer
  mainSnip.addEventListener('click', ()=> {

    if (open == false) {
      infoBlock.style.display = "none"
      mainSnip.style.opacity = "initial"
      // console.log('open', open)
      // console.log("outer close");
    }
    open = false
    // console.log("close outer");
    // console.log('open', open)
  })