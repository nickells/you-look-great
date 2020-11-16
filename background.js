const flag = 'ylg-active'
let active

const current = localStorage.getItem(flag)
if (current === null) {
  localStorage.setItem(flag, false)
  active = false
} else {
  active = current
}

const sendStatus = () => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {status: active});
  });
}

const setActive = () => {
  localStorage.setItem(flag, true)
  active = true
  chrome.browserAction.setIcon({path: 'icons/ylg-48.png'});
}

const setInactive = () => {
  localStorage.setItem(flag, false)
  active = false
  chrome.browserAction.setIcon({path: 'icons/ylg2-48.png'});
}

chrome.browserAction.onClicked.addListener(() => {
  if (active) setInactive()
  else setActive()
  sendStatus()
})

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.type === 'boot') {
    sendStatus()
  }
})