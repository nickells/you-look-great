const getDivsToMask = () => [
  document.querySelectorAll('div[jsname="Nl0j0e"]')[0], // upper-right thumb  
  // document.querySelectorAll('div[jsname="fniDcc"]')[0] // not sure what this was supposed to be
]

const masks = []

chrome.runtime.onMessage.addListener((request, sender, sendMessage) => {
  const status = request.status
  if (status === true) {
    masks.forEach(elem => elem.classList.remove('hidden'))
  }
  else {
    masks.forEach(elem => elem.classList.add('hidden'))
  }
})

function waitForElements() {
  return new Promise((resolve, reject) => {
    try {
      let int
      const checkIfExists = () => {
        if (getDivsToMask().every(item => item === undefined)) return
          console.log('its ready!', getDivsToMask())
          resolve(getDivsToMask())
      }
      checkIfExists()
      int = setInterval(checkIfExists, 50)
    } catch (e) {
      reject(new Error('problem with waitForElement function', e))
    }
  })
}

function createBlock() {
  const mask = document.createElement('div')
  mask.innerHTML = 'YOU LOOK GREAT'
  mask.classList.add('you-look-great')
  return mask
}

function startScript() {
  const block = createBlock()
  getDivsToMask().forEach(elem => {
    masks.push(block)
  })
  chrome.runtime.sendMessage({
    type: 'boot'
  })
}

waitForElements()
  .then(startScript)
  .catch(console.warn)