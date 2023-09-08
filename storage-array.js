// Suppose you have an array of test objects like this:
console.log("StorageArray");
const testObjectsArray = [
      {
        heading: 'Heading 1',
        value:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut diam vel mauris feugiat eleifend vel id elit. Vivamus pellentesque, dui eu faucibus finibus, elit ex tincidunt justo, in tempus magna magna sit amet libero. Nulla consectetur neque at eleifend elementum. Fusce vel vestibulum nisl, eget rhoncus est. Fusce ultricies turpis vel orci tempus feugiat. Sed et nibh lacus. Nullam ac lectus vel est consectetur finibus vitae ac est. Sed ultricies interdum tincidunt. Sed non bibendum erat. Suspendisse facilisis a nulla quis venenatis. Aenean quis tortor nec eros interdum venenatis eget nec nunc. Sed vitae odio vel arcu accumsan vulputate a eu ante. Nulla euismod in neque quis facilisis. Quisque nec odio ac justo interdum accumsan.',
      },
      {
        heading: 'Heading 2',
        value:
          'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Nullam dapibus dolor in mi vehicula, nec venenatis nisi dignissim. Nullam ut volutpat metus. Nulla facilisi. Duis viverra vitae libero euismod blandit. Aenean tincidunt, mi eget euismod volutpat, dolor ipsum gravida ipsum, a sagittis magna felis nec sapien. Fusce volutpat magna nec laoreet condimentum. Sed eget nunc nec nisi iaculis fermentum sit amet at lorem. Vestibulum nec odio a neque feugiat condimentum. Curabitur in orci mi. Fusce scelerisque interdum justo, quis interdum lectus. Suspendisse dictum eros sit amet velit bibendum, non mattis sem convallis. Etiam et ullamcorper nibh, nec ultricies sapien. Nullam vitae vulputate turpis, vel sollicitudin enim.',
      },
      {
        heading: 'Heading 3',
        value:
          'Phasellus eget velit id purus rutrum elementum. Quisque consectetur, libero eget laoreet pharetra, felis nisl facilisis velit, ac rhoncus tellus purus nec lectus. Fusce fermentum ultricies venenatis. Pellentesque auctor malesuada lectus et consectetur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer rhoncus, urna id rhoncus varius, nulla erat ullamcorper ligula, ut gravida risus augue eget est. Maecenas pulvinar augue a nulla vestibulum, et finibus lectus semper. Quisque at ipsum et arcu venenatis tristique eu et odio. Aliquam eu lacinia velit. Nullam eget arcu quis odio posuere posuere eu at quam. Fusce a tortor vitae nisi sagittis efficitur. Sed congue consectetur aliquet. Nam fermentum neque nec metus vulputate, a finibus orci venenatis.',
      },
      {
        heading: 'Heading 4',
        value:
          'Phasellus eget velit id purus rutrum elementum. Quisque consectetur, libero eget laoreet pharetra, felis nisl facilisis velit, ac rhoncus tellus purus nec lectus. Fusce fermentum ultricies venenatis. Pellentesque auctor malesuada lectus et consectetur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer rhoncus, urna id rhoncus varius, nulla erat ullamcorper ligula, ut gravida risus augue eget est. Maecenas pulvinar augue a nulla vestibulum, et finibus lectus semper. Quisque at ipsum et arcu venenatis tristique eu et odio. Aliquam eu lacinia velit. Nullam eget arcu quis odio posuere posuere eu at quam. Fusce a tortor vitae nisi sagittis efficitur. Sed congue consectetur aliquet. Nam fermentum neque nec metus vulputate, a finibus orci venenatis.',
      },
      {
        heading: 'Heading 5',
        value:
          'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Nullam dapibus dolor in mi vehicula, nec venenatis nisi dignissim. Nullam ut volutpat metus. Nulla facilisi. Duis viverra vitae libero euismod blandit. Aenean tincidunt, mi eget euismod volutpat, dolor ipsum gravida ipsum, a sagittis magna felis nec sapien. Fusce volutpat magna nec laoreet condimentum. Sed eget nunc nec nisi iaculis fermentum sit amet at lorem. Vestibulum nec odio a neque feugiat condimentum. Curabitur in orci mi. Fusce scelerisque interdum justo, quis interdum lectus. Suspendisse dictum eros sit amet velit bibendum, non mattis sem convallis. Etiam et ullamcorper nibh, nec ultricies sapien. Nullam vitae vulputate turpis, vel sollicitudin enim.',
      },
      {
        heading: 'Heading 6',
        value:
          'Phasellus eget velit id purus rutrum elementum. Quisque consectetur, libero eget laoreet pharetra, felis nisl facilisis velit, ac rhoncus tellus purus nec lectus. Fusce fermentum ultricies venenatis. Pellentesque auctor malesuada lectus et consectetur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer rhoncus, urna id rhoncus varius, nulla erat ullamcorper ligula, ut gravida risus augue eget est. Maecenas pulvinar augue a nulla vestibulum, et finibus lectus semper. Quisque at ipsum et arcu venenatis tristique eu et odio. Aliquam eu lacinia velit. Nullam eget arcu quis odio posuere posuere eu at quam. Fusce a tortor vitae nisi sagittis efficitur. Sed congue consectetur aliquet. Nam fermentum neque nec metus vulputate, a finibus orci venenatis.',
      },
      {
        heading: 'Heading 7',
        value:
          'Phasellus eget velit id purus rutrum elementum. Quisque consectetur, libero eget laoreet pharetra, felis nisl facilisis velit, ac rhoncus tellus purus nec lectus. Fusce fermentum ultricies venenatis. Pellentesque auctor malesuada lectus et consectetur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer rhoncus, urna id rhoncus varius, nulla erat ullamcorper ligula, ut gravida risus augue eget est. Maecenas pulvinar augue a nulla vestibulum, et finibus lectus semper. Quisque at ipsum et arcu venenatis tristique eu et odio. Aliquam eu lacinia velit. Nullam eget arcu quis odio posuere posuere eu at quam. Fusce a tortor vitae nisi sagittis efficitur. Sed congue consectetur aliquet. Nam fermentum neque nec metus vulputate, a finibus orci venenatis.',
      },
      {
        heading: 'Heading 8',
        value:
          'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Nullam dapibus dolor in mi vehicula, nec venenatis nisi dignissim. Nullam ut volutpat metus. Nulla facilisi. Duis viverra vitae libero euismod blandit. Aenean tincidunt, mi eget euismod volutpat, dolor ipsum gravida ipsum, a sagittis magna felis nec sapien. Fusce volutpat magna nec laoreet condimentum. Sed eget nunc nec nisi iaculis fermentum sit amet at lorem. Vestibulum nec odio a neque feugiat condimentum. Curabitur in orci mi. Fusce scelerisque interdum justo, quis interdum lectus. Suspendisse dictum eros sit amet velit bibendum, non mattis sem convallis. Etiam et ullamcorper nibh, nec ultricies sapien. Nullam vitae vulputate turpis, vel sollicitudin enim.',
      },
      {
        heading: 'Heading 9',
        value:
          'Phasellus eget velit id purus rutrum elementum. Quisque consectetur, libero eget laoreet pharetra, felis nisl facilisis velit, ac rhoncus tellus purus nec lectus. Fusce fermentum ultricies venenatis. Pellentesque auctor malesuada lectus et consectetur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer rhoncus, urna id rhoncus varius, nulla erat ullamcorper ligula, ut gravida risus augue eget est. Maecenas pulvinar augue a nulla vestibulum, et finibus lectus semper. Quisque at ipsum et arcu venenatis tristique eu et odio. Aliquam eu lacinia velit. Nullam eget arcu quis odio posuere posuere eu at quam. Fusce a tortor vitae nisi sagittis efficitur. Sed congue consectetur aliquet. Nam fermentum neque nec metus vulputate, a finibus orci venenatis.',
      },
      {
        heading: 'Heading 10',
        value:
          'Phasellus eget velit id purus rutrum elementum. Quisque consectetur, libero eget laoreet pharetra, felis nisl facilisis velit, ac rhoncus tellus purus nec lectus. Fusce fermentum ultricies venenatis. Pellentesque auctor malesuada lectus et consectetur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer rhoncus, urna id rhoncus varius, nulla erat ullamcorper ligula, ut gravida risus augue eget est. Maecenas pulvinar augue a nulla vestibulum, et finibus lectus semper. Quisque at ipsum et arcu venenatis tristique eu et odio. Aliquam eu lacinia velit. Nullam eget arcu quis odio posuere posuere eu at quam. Fusce a tortor vitae nisi sagittis efficitur. Sed congue consectetur aliquet. Nam fermentum neque nec metus vulputate, a finibus orci venenatis.',
      },
      {
        heading: 'Heading 11',
        value:
          'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Nullam dapibus dolor in mi vehicula, nec venenatis nisi dignissim. Nullam ut volutpat metus. Nulla facilisi. Duis viverra vitae libero euismod blandit. Aenean tincidunt, mi eget euismod volutpat, dolor ipsum gravida ipsum, a sagittis magna felis nec sapien. Fusce volutpat magna nec laoreet condimentum. Sed eget nunc nec nisi iaculis fermentum sit amet at lorem. Vestibulum nec odio a neque feugiat condimentum. Curabitur in orci mi. Fusce scelerisque interdum justo, quis interdum lectus. Suspendisse dictum eros sit amet velit bibendum, non mattis sem convallis. Etiam et ullamcorper nibh, nec ultricies sapien. Nullam vitae vulputate turpis, vel sollicitudin enim.',
      },
      {
        heading: 'Heading 12',
        value:
          'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Nullam dapibus dolor in mi vehicula, nec venenatis nisi dignissim. Nullam ut volutpat metus. Nulla facilisi. Duis viverra vitae libero euismod blandit. Aenean tincidunt, mi eget euismod volutpat, dolor ipsum gravida ipsum, a sagittis magna felis nec sapien. Fusce volutpat magna nec laoreet condimentum. Sed eget nunc nec nisi iaculis fermentum sit amet at lorem. Vestibulum nec odio a neque feugiat condimentum. Curabitur in orci mi. Fusce scelerisque interdum justo, quis interdum lectus. Suspendisse dictum eros sit amet velit bibendum, non mattis sem convallis. Etiam et ullamcorper nibh, nec ultricies sapien. Nullam vitae vulputate turpis, vel sollicitudin enim.',
      },
      {
        heading: 'Heading 13',
        value:
          'Phasellus eget velit id purus rutrum elementum. Quisque consectetur, libero eget laoreet pharetra, felis nisl facilisis velit, ac rhoncus tellus purus nec lectus. Fusce fermentum ultricies venenatis. Pellentesque auctor malesuada lectus et consectetur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer rhoncus, urna id rhoncus varius, nulla erat ullamcorper ligula, ut gravida risus augue eget est. Maecenas pulvinar augue a nulla vestibulum, et finibus lectus semper. Quisque at ipsum et arcu venenatis tristique eu et odio. Aliquam eu lacinia velit. Nullam eget arcu quis odio posuere posuere eu at quam. Fusce a tortor vitae nisi sagittis efficitur. Sed congue consectetur aliquet. Nam fermentum neque nec metus vulputate, a finibus orci venenatis.',
      },
      {
        heading: 'Heading 14',
        value:
          'Phasellus eget velit id purus rutrum elementum. Quisque consectetur, libero eget laoreet pharetra, felis nisl facilisis velit, ac rhoncus tellus purus nec lectus. Fusce fermentum ultricies venenatis. Pellentesque auctor malesuada lectus et consectetur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer rhoncus, urna id rhoncus varius, nulla erat ullamcorper ligula, ut gravida risus augue eget est. Maecenas pulvinar augue a nulla vestibulum, et finibus lectus semper. Quisque at ipsum et arcu venenatis tristique eu et odio. Aliquam eu lacinia velit. Nullam eget arcu quis odio posuere posuere eu at quam. Fusce a tortor vitae nisi sagittis efficitur. Sed congue consectetur aliquet. Nam fermentum neque nec metus vulputate, a finibus orci venenatis.',
      },
      {
        heading: 'Heading 15',
        value:
          'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Nullam dapibus dolor in mi vehicula, nec venenatis nisi dignissim. Nullam ut volutpat metus. Nulla facilisi. Duis viverra vitae libero euismod blandit. Aenean tincidunt, mi eget euismod volutpat, dolor ipsum gravida ipsum, a sagittis magna felis nec sapien. Fusce volutpat magna nec laoreet condimentum. Sed eget nunc nec nisi iaculis fermentum sit amet at lorem. Vestibulum nec odio a neque feugiat condimentum. Curabitur in orci mi. Fusce scelerisque interdum justo, quis interdum lectus. Suspendisse dictum eros sit amet velit bibendum, non mattis sem convallis. Etiam et ullamcorper nibh, nec ultricies sapien. Nullam vitae vulputate turpis, vel sollicitudin enim.',
      },
      {
        heading: 'Heading 16',
        value:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut diam vel mauris feugiat eleifend vel id elit. Vivamus pellentesque, dui eu faucibus finibus, elit ex tincidunt justo, in tempus magna magna sit amet libero. Nulla consectetur neque at eleifend elementum. Fusce vel vestibulum nisl, eget rhoncus est. Fusce ultricies turpis vel orci tempus feugiat. Sed et nibh lacus. Nullam ac lectus vel est consectetur finibus vitae ac est. Sed ultricies interdum tincidunt. Sed non bibendum erat. Suspendisse facilisis a nulla quis venenatis. Aenean quis tortor nec eros interdum venenatis eget nec nunc. Sed vitae odio vel arcu accumsan vulputate a eu ante. Nulla euismod in neque quis facilisis. Quisque nec odio ac justo interdum accumsan.',
      },
      {
        heading: 'Heading 22',
        value:
          'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Nullam dapibus dolor in mi vehicula, nec venenatis nisi dignissim. Nullam ut volutpat metus. Nulla facilisi. Duis viverra vitae libero euismod blandit. Aenean tincidunt, mi eget euismod volutpat, dolor ipsum gravida ipsum, a sagittis magna felis nec sapien. Fusce volutpat magna nec laoreet condimentum. Sed eget nunc nec nisi iaculis fermentum sit amet at lorem. Vestibulum nec odio a neque feugiat condimentum. Curabitur in orci mi. Fusce scelerisque interdum justo, quis interdum lectus. Suspendisse dictum eros sit amet velit bibendum, non mattis sem convallis. Etiam et ullamcorper nibh, nec ultricies sapien. Nullam vitae vulputate turpis, vel sollicitudin enim.',
      },
      {
        heading: 'Heading 23',
        value:
          'Phasellus eget velit id purus rutrum elementum. Quisque consectetur, libero eget laoreet pharetra, felis nisl facilisis velit, ac rhoncus tellus purus nec lectus. Fusce fermentum ultricies venenatis. Pellentesque auctor malesuada lectus et consectetur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer rhoncus, urna id rhoncus varius, nulla erat ullamcorper ligula, ut gravida risus augue eget est. Maecenas pulvinar augue a nulla vestibulum, et finibus lectus semper. Quisque at ipsum et arcu venenatis tristique eu et odio. Aliquam eu lacinia velit. Nullam eget arcu quis odio posuere posuere eu at quam. Fusce a tortor vitae nisi sagittis efficitur. Sed congue consectetur aliquet. Nam fermentum neque nec metus vulputate, a finibus orci venenatis.',
      },
      {
        heading: 'Heading 24',
        value:
          'Phasellus eget velit id purus rutrum elementum. Quisque consectetur, libero eget laoreet pharetra, felis nisl facilisis velit, ac rhoncus tellus purus nec lectus. Fusce fermentum ultricies venenatis. Pellentesque auctor malesuada lectus et consectetur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer rhoncus, urna id rhoncus varius, nulla erat ullamcorper ligula, ut gravida risus augue eget est. Maecenas pulvinar augue a nulla vestibulum, et finibus lectus semper. Quisque at ipsum et arcu venenatis tristique eu et odio. Aliquam eu lacinia velit. Nullam eget arcu quis odio posuere posuere eu at quam. Fusce a tortor vitae nisi sagittis efficitur. Sed congue consectetur aliquet. Nam fermentum neque nec metus vulputate, a finibus orci venenatis.',
      },
      {
        heading: 'Heading 25',
        value:
          'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Nullam dapibus dolor in mi vehicula, nec venenatis nisi dignissim. Nullam ut volutpat metus. Nulla facilisi. Duis viverra vitae libero euismod blandit. Aenean tincidunt, mi eget euismod volutpat, dolor ipsum gravida ipsum, a sagittis magna felis nec sapien. Fusce volutpat magna nec laoreet condimentum. Sed eget nunc nec nisi iaculis fermentum sit amet at lorem. Vestibulum nec odio a neque feugiat condimentum. Curabitur in orci mi. Fusce scelerisque interdum justo, quis interdum lectus. Suspendisse dictum eros sit amet velit bibendum, non mattis sem convallis. Etiam et ullamcorper nibh, nec ultricies sapien. Nullam vitae vulputate turpis, vel sollicitudin enim.',
      },
      {
        heading: 'Heading 26',
        value:
          'Phasellus eget velit id purus rutrum elementum. Quisque consectetur, libero eget laoreet pharetra, felis nisl facilisis velit, ac rhoncus tellus purus nec lectus. Fusce fermentum ultricies venenatis. Pellentesque auctor malesuada lectus et consectetur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer rhoncus, urna id rhoncus varius, nulla erat ullamcorper ligula, ut gravida risus augue eget est. Maecenas pulvinar augue a nulla vestibulum, et finibus lectus semper. Quisque at ipsum et arcu venenatis tristique eu et odio. Aliquam eu lacinia velit. Nullam eget arcu quis odio posuere posuere eu at quam. Fusce a tortor vitae nisi sagittis efficitur. Sed congue consectetur aliquet. Nam fermentum neque nec metus vulputate, a finibus orci venenatis.',
      },
      {
        heading: 'Heading 27',
        value:
          'Phasellus eget velit id purus rutrum elementum. Quisque consectetur, libero eget laoreet pharetra, felis nisl facilisis velit, ac rhoncus tellus purus nec lectus. Fusce fermentum ultricies venenatis. Pellentesque auctor malesuada lectus et consectetur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer rhoncus, urna id rhoncus varius, nulla erat ullamcorper ligula, ut gravida risus augue eget est. Maecenas pulvinar augue a nulla vestibulum, et finibus lectus semper. Quisque at ipsum et arcu venenatis tristique eu et odio. Aliquam eu lacinia velit. Nullam eget arcu quis odio posuere posuere eu at quam. Fusce a tortor vitae nisi sagittis efficitur. Sed congue consectetur aliquet. Nam fermentum neque nec metus vulputate, a finibus orci venenatis.',
      },
      {
        heading: 'Heading 28',
        value:
          'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Nullam dapibus dolor in mi vehicula, nec venenatis nisi dignissim. Nullam ut volutpat metus. Nulla facilisi. Duis viverra vitae libero euismod blandit. Aenean tincidunt, mi eget euismod volutpat, dolor ipsum gravida ipsum, a sagittis magna felis nec sapien. Fusce volutpat magna nec laoreet condimentum. Sed eget nunc nec nisi iaculis fermentum sit amet at lorem. Vestibulum nec odio a neque feugiat condimentum. Curabitur in orci mi. Fusce scelerisque interdum justo, quis interdum lectus. Suspendisse dictum eros sit amet velit bibendum, non mattis sem convallis. Etiam et ullamcorper nibh, nec ultricies sapien. Nullam vitae vulputate turpis, vel sollicitudin enim.',
      },
      {
        heading: 'Heading 29',
        value:
          'Phasellus eget velit id purus rutrum elementum. Quisque consectetur, libero eget laoreet pharetra, felis nisl facilisis velit, ac rhoncus tellus purus nec lectus. Fusce fermentum ultricies venenatis. Pellentesque auctor malesuada lectus et consectetur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer rhoncus, urna id rhoncus varius, nulla erat ullamcorper ligula, ut gravida risus augue eget est. Maecenas pulvinar augue a nulla vestibulum, et finibus lectus semper. Quisque at ipsum et arcu venenatis tristique eu et odio. Aliquam eu lacinia velit. Nullam eget arcu quis odio posuere posuere eu at quam. Fusce a tortor vitae nisi sagittis efficitur. Sed congue consectetur aliquet. Nam fermentum neque nec metus vulputate, a finibus orci venenatis.',
      },
    
  ];
  
  // Loop through the array and store each object separately
  testObjectsArray.forEach((obj) => {
    const key = `testObject_${obj.heading}`;
    chrome.storage.sync.set({ [key]: JSON.stringify(obj) }, function() {
      console.log(`Data for ${key} saved successfully.`);
    });
  });


  // Retrieve the data from chrome.storage.sync
chrome.storage.sync.get(null, function(result) {
    const retrievedArray = [];
  
    // Loop through the result object to extract the stored data for each key
    Object.keys(result).forEach((key) => {
      // Check if the key is for a testObject item
      if (key.startsWith('testObject_')) {
        const obj = JSON.parse(result[key]);
        retrievedArray.push(obj);
      }
    });
  
    // Now, you have the array of objects
    console.log(retrievedArray);
  });
  