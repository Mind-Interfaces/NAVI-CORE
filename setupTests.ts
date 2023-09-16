// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'

window.AudioContext = jest.fn().mockImplementation(() => ({
  createAnalyser: () => ({
    connect: jest.fn(),
    smoothingTimeConstant: null,
    fftSize: null,
    getByteFrequencyData: () => {}
  }),
  createScriptProcessor: () => ({
    connect: jest.fn()
  }),
  destination: null,
  createMediaStreamSource: () => ({
    connect: jest.fn()
  })
}))

window.navigator.mediaDevices = {
  getUserMedia: jest.fn(() => Promise.resolve({}))
}
