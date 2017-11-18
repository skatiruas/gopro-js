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
This package is Promise based, but I've simplified the usage, giving the opportunity to chain methods without the explicit `then` usage, but you can still use it though :)

```javascript
import GoPro from 'gopro-js'

const gp = new GoPro() // Instantiate
gp.mode('VIDEO') // Begin chaining (without then)
  .delay(1000) // Delays the next method
  .shutter(0, 2000) // Records 2s video after 0s delay
  .then(() => gp.mode('MULTISHOT', 'BURST')) // Chaining with then
  .dummy() // Calls and unexistent method, throwing an error
  .catch(() => gp.mode('PHOTO', 'SINGLE')) // Catches the error and fallbacks to other mode
  .set('Photo.Resolution.R5MEDIUM') // Apply some setting
  .status('System.BUSY') // Check camera status
  .then(b => console.log(`Camera is ${b ? 'BUSY' : 'OK'}`)) // Print previous result
  .shutter(2000) // Activate shutter after 2 seconds delay
  .set('Photo.Resolution.R12WIDE') // Apply some setting
  .listMedia().then(m => console.log(m)) // Get JSON of media
  .powerOff() // Power Off
```
