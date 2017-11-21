# GoPro JS
A Promise based JavaScript GoPro Controller/API Wrapper (Unofficial)

### The Idea:
While checking for JavaScript solutions to control my GoPro I found out that the existing ones were too specific to one single model or even written in other languages.

Using ES6 I'm aiming to create a Proxy for different API's in a way that you only need to create an instance of the object and it will discover itself and use the proper API to communicate with the camera.

The API's will implement an interface, making it modularized and easy to mantain and extend. With this approach I'm hoping to be compatible with every model since it can hold different ways to interact with different models.

Initially I will focus on the HERO4 model since is the one I own. But I'm referencing my work on these open-source projects that explore and reverse engineer other models, making it more easy to implement them:

- [goprowifihack](https://github.com/KonradIT/goprowifihack)
- [gopro-py-api](https://github.com/KonradIT/gopro-py-api)
- [goproh4](https://github.com/citolen/goproh4)

### Installation
```bash
npm install gopro-js
```

### Usage:
This package is Promise based, with a simplified chain workflow without the explicit `then` usage.
Attention when using **then** or **catch**: The value returned is a new GoPro instance, with the last promise result attached to lastResult property!

```javascript
import GoPro from 'gopro-js'

const gp = new GoPro() // Instantiate
gp.mode('VIDEO') // Begin chaining (without then)
  .delay(1000) // Delays the next method
  .shutter(0, 2000) // Records 2s video after 0s delay
  .status('Storage.RemainingPhotos')
  .then(instance => { // Chaining with then **ATTENTION**
    // Get result of last execution using instance.lastResult
    const result = instance.lastResult
    console.log(`RemainingPhotos: ${result}`)
    // THEN and CATCH returns instance of GoPro to be used
    // DON'T use gp here, as it will break the chain!!
    if (result > 100) instance.mode('MULTISHOT', 'BURST')
    else instance.mode('PHOTO', 'NIGHT')
    instance.delay(5000)
  })
  .dummy() // Calls and unexistent method, throwing an error
  .catch(instance => {
    console.log(instance.lastResult) // dummy not defined for current API.
    // Catches the error and changes to other mode
    instance.mode('PHOTO', 'SINGLE')
  })
  .set('Photo.Resolution.R5MEDIUM') // Apply some setting
  .status('System.BUSY') // Check camera status
  .then(instance => {
    console.log(`Camera is ${instance.lastResult ? 'BUSY' : 'OK'}`)
  }) // Print previous result
  .shutter(2000) // Activate shutter after 2 seconds delay
  .set('Photo.Resolution.R12WIDE') // Apply some setting
  .listMedia()
  .then(({ lastResult }) => { // Accessing last result with Destructuring
    console.log(lastResult)
  })
  .deleteLast(2) // Deletes the last 2 files
  .powerOff() // Power Off
  .delay(5000)
  .powerOn() // Power On
```

```javascript
import GoPro from 'gopro-js'

const gp = new GoPro({ mac: 'AA:BB:CC:DD:EE:FF'}) // Instantiate with a valid mac address
gp.powerOn().mode('VIDEO') // It can discover itself and powerOn

const gp2 =  new GoPro() // Or without mac(but already turned on) it can powerOn after a powerOff
gp2.powerOff().delay(5000).powerOn()
```
