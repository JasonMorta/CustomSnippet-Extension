const stringArray = "Task: Task 4 - Beginner Control Structures - if, else, and else-if Statements";
console.log(stringArray.split(""))
console.log(stringArray.split('-', 2))//returns trimmed array ar the second(2) "-".
console.log(stringArray.split('-', 2).join('-'))
console.log(stringArray.split('-', 2).join('-').split(""));
console.log(stringArray.split('-', 2).join('-').length)



//Get the index of the second "-" in stringArray
function getPosition(stringArray, string, index) {
  return stringArray.split(string, index).join(string).length;
}

console.log(
  getPosition(stringArray, '-', 2) // --> 16
)

//let txt2 = stringArray.slice(0, 3) + "bar" + txt1.slice(3);