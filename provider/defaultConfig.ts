export const defaultConfig = {
  debug: false,

  usePasscode: false,
  playWelcome: true,
  sendLocalVideo: false,
  sendLocalAudio: true,
  customData: {},

  // When holding down spacebar, durations shorter that this will trigger
  // a message like "Keep holding spacebar while you talk"
  tapThreshold: 700, // ms

  // How long can the user be inactive before timeout
  timeout: 480 * 1000, // ms
  // How close to the end of the timeout should we show the warning
  timeoutWarning: 180 * 1000, // ms
  // e.g. timeout=90sec, timeoutWarning=30sec - after 60 secs of inactivity warning will show, after 90 secs sessions ends

  informationInTranscript: true,

  // how long to wait until we hide warning messages
  warningHiddenAfter: 5 * 1000, //ms

  // how long to wait until we hide input problem errors (spacebar, etc.)
  inputProblemErrorHiddenAfter: 10 * 1000, //ms

  // How many empty transcripts before an error is shown
  emptyTranscriptThreshold: 3,

  showEscalationForm: true,

  // prettier-ignore
  errorLevels: {
    ignore: [11001, 11002],
    warning: ['ServiceUnavailable', 'AvatarUnavailable', 'ConnectionLost', 'Warning', 4203, 6013],
    error: ['MicActivityError', 'DeviceNotFoundError', 'DeviceError', 'TokenError',
      4200, 4201, 4202, 4204, 4205, 4206, 7006, 7007,
      10001, 10002, 10003, 10004, 11003, 11004, 11005, 12001
    ],
    fatal: ['ErrorEndingSession',
      1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013,
      1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025,
      4001, 4002, 4003, 4004, 4005, 4006, 4007, 4008, 4009,
      5001, 5002, 5003, 5004, 5005, 5006, 5007, 5008, 5009, 5010, 5011,
      5012, 5013, 5014, 5015, 5016, 5017, 5018, 5019, 5020, 5021, 5022,
      6001, 6002, 6003, 6004, 6005, 6006, 6007, 6008, 6009, 6010, 6011, 6012, 6014, 6015,
      7001, 7002, 7003, 7004, 7005,
      13001, 13002, 13003, 13004, 13005, 13006
    ]
  }
}
export default defaultConfig
