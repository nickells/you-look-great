function waitForElement (selectorFunc) {
  return new Promise((resolve, reject) => {
    try {
      let int
      const checkIfExists = () => {
        if (!selectorFunc()) return
        else {
          if (int !== undefined) clearInterval(int)
          resolve(selectorFunc())
        }
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

function startScript (returnedElement) {
  const block = createBlock()
  returnedElement.appendChild(block)
}

const self = () => document.querySelectorAll('div[jsname="Nl0j0e"]')[0]

waitForElement(self)
.then((elem) => startScript(elem))
.catch(console.warn)
