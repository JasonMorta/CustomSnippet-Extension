let snippets = [
//   {
//     text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
//     title: "title 1",
//     hide: false,
//   },
//   {
//     text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
//     title: "title 2",
//     hide: false,
//   },
//   {
//     text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
//     title: "title 3",
//     hide: false,
//   },
//   {
//     text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
//     title: "title 4",
//     hide: false,
//   },
];


//only called when updating array
function storeArrayData(array) {
  // Define the chunk size
  const chunkSize = 1000;
  // Calculate the number of chunks
  const numChunks = Math.ceil(snippets.length / chunkSize);
  // Store each chunk separately
  for (let i = 0; i < numChunks; i++) {
    const chunkStart = i * chunkSize;
    const chunkEnd = (i + 1) * chunkSize;
    const chunk = array.slice(chunkStart, chunkEnd);
    const key = `myArrayChunk${i}`;
    chrome.storage.sync.set({ [key]: chunk });
  }

  //after storing new data, get the array again
  retrieveArrayData();
}

function retrieveArrayData() {
    chrome.storage.sync.get(null, (data) => {
        // Get all the stored chunks
        const keys = Object.keys(data).filter((key) => key.startsWith("myArrayChunk"));
        if (keys.length > 0) {
          // Combine the chunks into a single array
          const storedArray = keys
            .sort()
            .map((key) => data[key])
            .flat();
          // Do something with the array...
          snippets = storedArray;
          console.log("retrieved from storage", snippets);
          
        } else {
          // No array was found in chrome.storage.sync
          console.log("snippets not found");
        }
      });

      
}

retrieveArrayData();//get array



//add item to front of array
function addToArray(i) {

  snippets.unshift({
    text: "This was added v0.2",
    title: "title 12",
    hide: true,
  });
  console.log('added item', snippets)
  storeArrayData(snippets);//update array
}

//delete array item by index number
function deleteArrayItem(array) {
    array.splice(0, 100); //remove an item
    console.log('snippets', array)
    storeArrayData(array);//update array
}
