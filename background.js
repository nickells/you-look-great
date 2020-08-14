let active = true
chrome.browserAction.onClicked.addListener(() => {
  if (active) {
    console.log('test')
    chrome.browserAction.setIcon({path: 'icons/ylg2-48.png'});
    chrome.tabs.executeScript({
      code: `document.body.getElementsByClassName('you-look-great')[0].style.display = 'none'`
    });
    active = false
  } else {
    active = true
    chrome.browserAction.setIcon({path: 'icons/ylg-48.png'});
    chrome.tabs.executeScript({
      code: `document.body.getElementsByClassName('you-look-great')[0].style.display = 'block'`
    });
  }
})