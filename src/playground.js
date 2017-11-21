import GoPro from './index'

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
