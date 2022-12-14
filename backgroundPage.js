chrome.runtime.onMessage.addListener(request => {

    if (request == "OpenPopup") {
  
        chrome.windows.open({
            url: "popup.html",
            type: "popup",
            focused: true,
            width: 400,
            height: 600,
            top: 0,
            left: screen.width - 400,
        }, () => {
            console.log("Opened popup!")
        })
  
    }
  
  })