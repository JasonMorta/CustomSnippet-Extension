
//  <"R:","Awesome work!","Great Job!","Random3">

//remove brackets from string

let randomArr =  ["R:","Awesome work!","Great Job!","Random3"];


//Get the random words
let userRWords = []


if (randomArr[0] == "R:") {
  randomWordGen()
}

function randomWordGen() {
  for (let i = 1; i < randomArr.length; i++) {
    //Don't include the "Random" word.
    if (!randomArr[i].match(/Random./)) {
      userRWords.push(randomArr[i]);
    }
  }
  console.log(userRWords);
}
