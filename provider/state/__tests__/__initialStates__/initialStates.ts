// Prevent "must contain at least one test"
test.skip('skip', () => {})

export const avatarTextInputFinished1 = {
  ready: true,
  selectedDevices: {
    videoInput: null,
    audioInput:
      'ba95b79abaf54e1a8e67cb0e5ffecf8bf1156750ecd3f0f6ef25a020b7ae7d62',
    audioOutput:
      '9317392e0254113442a0c01ba8b5b0a9d95ecfed57eb33031e0ab33239a7936e'
  },
  question: 'What is UneeQ?',
  inputMode: 'speech',
  timedOut: false,
  sessionEnded: false,
  selectedSavedItem: null,
  avatarSpeaking: true,
  lastActivity: 1592501097462,
  timeLeft: 300000,
  permissionAllowed: true,
  transcript: [
    {
      message: 'Hi, I’m a Digital Human, I’m here to help you.',
      user: false,
      time: '2020-06-18T17:24:45.552Z'
    },
    {
      message: 'What is UneeQ?',
      user: true,
      time: '2020-06-18T17:24:56.087Z'
    },
    {
      message: 'testing!',
      user: false,
      time: '2020-06-18T17:24:57.442Z'
    }
  ],
  transcriptHasOpened: false,
  feedbackGiven: false,
  contactDetailsGiven: false,
  savedItems: [],
  loadingPercentage: 100,
  menuOpen: false,
  settingsOpen: false,
  endConfirmOpen: false,
  feedbackOpen: false,
  escalationFormOpen: false,
  escalationFormFromServer: false,
  timeoutOpen: false,
  privacyOpen: false,
  error: null,
  onScreenInfo: {
    nextSuggestedResponses: {
      id: 1592501097441,
      mainTitle: 'I can help you with:',
      suggestedResponses: [
        {
          label: 'Benefits of UneeQ',
          utterance: 'Benefits of UneeQ'
        },
        {
          label: 'Who can join UneeQ?',
          utterance: 'Who can join UneeQ?'
        },
        {
          label: 'Why shall I choose UneeQ?',
          utterance: 'Why shall I choose UneeQ?'
        }
      ]
    },
    suggestedResponses: {
      id: 1592501085551,
      mainTitle: 'You can ask me about:',
      suggestedResponses: [
        {
          label: 'Tell me about you',
          utterance: 'Tell me about you'
        },
        {
          label: 'What is UneeQ?',
          utterance: 'What is UneeQ?'
        },
        {
          label: 'First home withdrawal',
          utterance: 'First home withdrawal'
        }
      ],
      chosenResponse: 'What is UneeQ?'
    }
  },
  expandedInfo: null,
  transcriptOpen: false,
  savedOpen: false,
  noInput: false,
  devices: {
    audioInput: [
      {
        deviceId: 'default',
        kind: 'audioinput',
        label: 'Default - Internal Microphone (Built-in)',
        groupId:
          'aa79400c2d0f743c4a61e2fbb333f4a5404452be504ae40f4348974ec919286d'
      },
      {
        deviceId:
          'ba95b79abaf54e1a8e67cb0e5ffecf8bf1156750ecd3f0f6ef25a020b7ae7d62',
        kind: 'audioinput',
        label: 'Internal Microphone (Built-in)',
        groupId:
          'aa79400c2d0f743c4a61e2fbb333f4a5404452be504ae40f4348974ec919286d'
      },
      {
        deviceId:
          '62e5e22f24536f254861461860c624f6004dc57760f01c92d2c599ddbd33c427',
        kind: 'audioinput',
        label: 'C922 Pro Stream Webcam (046d:085c)',
        groupId:
          'e90a461be7cb23663fde54d579b9aa65ee1b8e992ff6b060da96bef42384d65d'
      },
      {
        deviceId:
          '9317392e0254113442a0c01ba8b5b0a9d95ecfed57eb33031e0ab33239a7936e',
        kind: 'audioinput',
        label: 'Apowersoft Audio Device (Virtual)',
        groupId:
          '1029f8d77f6239d8624c1a7bd690b24888fd7f101b6746a3a9097d856cdb767f'
      }
    ],
    audioOutput: [
      {
        deviceId: 'default',
        kind: 'audiooutput',
        label: 'Default - Headphones (Built-in)',
        groupId:
          'aa79400c2d0f743c4a61e2fbb333f4a5404452be504ae40f4348974ec919286d'
      },
      {
        deviceId:
          '90f8a468b5755eb5412af16da7f8c8550a960c7956d7960d3b0d921f445fcb88',
        kind: 'audiooutput',
        label: 'Headphones (Built-in)',
        groupId:
          'aa79400c2d0f743c4a61e2fbb333f4a5404452be504ae40f4348974ec919286d'
      },
      {
        deviceId:
          'c48eb4f05adaeea6e2c093747905fdb820133354b37def64e42a2805c1d9bb32',
        kind: 'audiooutput',
        label: 'PHL 237E7 (HDMI)',
        groupId:
          '2a3f27ae1ca76897ee944331bcad64f170175f847672838495397bf91adf4ae3'
      },
      {
        deviceId:
          '26d6c890808e09bf99a29d4e675a777e4493b49699e655a30cc73ada06e6cc64',
        kind: 'audiooutput',
        label: '23MP55 (HDMI)',
        groupId:
          'e231d1350818cff6a644a8547b9b86c50d9125bda0b91c660afa1e8a3145ae53'
      },
      {
        deviceId:
          '9317392e0254113442a0c01ba8b5b0a9d95ecfed57eb33031e0ab33239a7936e',
        kind: 'audiooutput',
        label: 'Apowersoft Audio Device (Virtual)',
        groupId:
          '1029f8d77f6239d8624c1a7bd690b24888fd7f101b6746a3a9097d856cdb767f'
      }
    ],
    videoInput: [
      {
        deviceId:
          'b3efd418cf4c46db0c9800d4315820fbd77570ab9c64f9672c71c0931f3ddfce',
        kind: 'videoinput',
        label: 'C922 Pro Stream Webcam (046d:085c)',
        groupId:
          'e90a461be7cb23663fde54d579b9aa65ee1b8e992ff6b060da96bef42384d65d'
      }
    ]
  },
  unavailable: false,
  answer: '<speak version="1.0"><prosody rate=".45">Testing!</prosody></speak>',
  sending: false,
  spacebarTapped: false
}

export const avatarTextInputFinished2 = {
  ready: true,
  selectedDevices: {
    videoInput: null,
    audioInput:
      'ba95b79abaf54e1a8e67cb0e5ffecf8bf1156750ecd3f0f6ef25a020b7ae7d62',
    audioOutput:
      '9317392e0254113442a0c01ba8b5b0a9d95ecfed57eb33031e0ab33239a7936e'
  },
  question: 'What is UneeQ?',
  inputMode: 'speech',
  timedOut: false,
  sessionEnded: false,
  selectedSavedItem: null,
  avatarSpeaking: true,
  lastActivity: 1592501097462,
  timeLeft: 300000,
  permissionAllowed: true,
  transcript: [
    {
      message: 'Hi, I’m a Digital Human.',
      user: false,
      time: '2020-06-18T17:24:45.552Z'
    },
    {
      message: 'What is UneeQ?',
      user: true,
      time: '2020-06-18T17:24:56.087Z'
    },
    {
      message: 'Testing!',
      user: false,
      time: '2020-06-18T17:24:57.442Z'
    }
  ],
  transcriptHasOpened: false,
  feedbackGiven: false,
  contactDetailsGiven: false,
  savedItems: [],
  loadingPercentage: 100,
  menuOpen: false,
  settingsOpen: false,
  endConfirmOpen: false,
  feedbackOpen: false,
  escalationFormOpen: false,
  escalationFormFromServer: false,
  timeoutOpen: false,
  privacyOpen: false,
  error: null,
  onScreenInfo: {
    nextSuggestedResponses: undefined,
    suggestedResponses: {
      id: 1592501085551,
      mainTitle: 'You can ask me about:',
      suggestedResponses: [
        {
          label: 'Tell me about you',
          utterance: 'Tell me about you'
        },
        {
          label: 'What is UneeQ?',
          utterance: 'What is UneeQ?'
        },
        {
          label: 'First home withdrawal',
          utterance: 'First home withdrawal'
        }
      ],
      chosenResponse: 'What is UneeQ?'
    }
  },
  expandedInfo: null,
  transcriptOpen: false,
  savedOpen: false,
  noInput: false,
  devices: {
    audioInput: [
      {
        deviceId: 'default',
        kind: 'audioinput',
        label: 'Default - Internal Microphone (Built-in)',
        groupId:
          'aa79400c2d0f743c4a61e2fbb333f4a5404452be504ae40f4348974ec919286d'
      },
      {
        deviceId:
          'ba95b79abaf54e1a8e67cb0e5ffecf8bf1156750ecd3f0f6ef25a020b7ae7d62',
        kind: 'audioinput',
        label: 'Internal Microphone (Built-in)',
        groupId:
          'aa79400c2d0f743c4a61e2fbb333f4a5404452be504ae40f4348974ec919286d'
      },
      {
        deviceId:
          '62e5e22f24536f254861461860c624f6004dc57760f01c92d2c599ddbd33c427',
        kind: 'audioinput',
        label: 'C922 Pro Stream Webcam (046d:085c)',
        groupId:
          'e90a461be7cb23663fde54d579b9aa65ee1b8e992ff6b060da96bef42384d65d'
      },
      {
        deviceId:
          '9317392e0254113442a0c01ba8b5b0a9d95ecfed57eb33031e0ab33239a7936e',
        kind: 'audioinput',
        label: 'Apowersoft Audio Device (Virtual)',
        groupId:
          '1029f8d77f6239d8624c1a7bd690b24888fd7f101b6746a3a9097d856cdb767f'
      }
    ],
    audioOutput: [
      {
        deviceId: 'default',
        kind: 'audiooutput',
        label: 'Default - Headphones (Built-in)',
        groupId:
          'aa79400c2d0f743c4a61e2fbb333f4a5404452be504ae40f4348974ec919286d'
      },
      {
        deviceId:
          '90f8a468b5755eb5412af16da7f8c8550a960c7956d7960d3b0d921f445fcb88',
        kind: 'audiooutput',
        label: 'Headphones (Built-in)',
        groupId:
          'aa79400c2d0f743c4a61e2fbb333f4a5404452be504ae40f4348974ec919286d'
      },
      {
        deviceId:
          'c48eb4f05adaeea6e2c093747905fdb820133354b37def64e42a2805c1d9bb32',
        kind: 'audiooutput',
        label: 'PHL 237E7 (HDMI)',
        groupId:
          '2a3f27ae1ca76897ee944331bcad64f170175f847672838495397bf91adf4ae3'
      },
      {
        deviceId:
          '26d6c890808e09bf99a29d4e675a777e4493b49699e655a30cc73ada06e6cc64',
        kind: 'audiooutput',
        label: '23MP55 (HDMI)',
        groupId:
          'e231d1350818cff6a644a8547b9b86c50d9125bda0b91c660afa1e8a3145ae53'
      },
      {
        deviceId:
          '9317392e0254113442a0c01ba8b5b0a9d95ecfed57eb33031e0ab33239a7936e',
        kind: 'audiooutput',
        label: 'Apowersoft Audio Device (Virtual)',
        groupId:
          '1029f8d77f6239d8624c1a7bd690b24888fd7f101b6746a3a9097d856cdb767f'
      }
    ],
    videoInput: [
      {
        deviceId:
          'b3efd418cf4c46db0c9800d4315820fbd77570ab9c64f9672c71c0931f3ddfce',
        kind: 'videoinput',
        label: 'C922 Pro Stream Webcam (046d:085c)',
        groupId:
          'e90a461be7cb23663fde54d579b9aa65ee1b8e992ff6b060da96bef42384d65d'
      }
    ]
  },
  unavailable: false,
  answer: '<speak version="1.0"><prosody rate=".45">Testing!</prosody></speak>',
  sending: false,
  spacebarTapped: false
}
