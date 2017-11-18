import GoPro from './index'

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
  .deleteLast(2) // Deletes the last 2 files
  .powerOff() // Power Off
