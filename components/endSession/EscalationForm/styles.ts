const styles = {
  radioLabel: {
    alignItems: 'center'
  },
  radio: {
    width: 11,
    height: 11,
    color: 'secondary',
    marginRight: '5px'
  },
  modal: {
    minHeight: 344,
    px: ['5%', '5%', '5%', 127],
    fontSize: 1
  },
  subtitle: {
    textAlign: 'center'
  },
  heading: {
    fontSize: 4,
    mb: 10
  },
  optionsContainer: {
    justifyContent: 'center',
    mt: 6,
    '& label': {
      mr: 4,
      width: 'auto'
    }
  },
  emailPrompt: {
    mb: [0, 0, 0, 0, 4, 4],
    fontSize: 0
  },
  emailWrapper: {
    flexDirection: ['column', 'column', 'column', 'column', 'row', 'row'],
    alignItems: [
      'center',
      'center',
      'center',
      'center',
      'flex-start',
      'flex-start'
    ]
  },
  emailInput: {
    fontFamily: 'body'
  },
  emailContainer: {
    display: 'inline-flex',
    flexDirection: 'column',
    maxWidth: 380,
    mb: 10,
    '& input': {
      maxWidth: 379,
      borderRadius: 'button',
      border: '1px solid transparent',
      borderColor: 'grey'
    },
    '&.error': {
      color: 'error'
    },
    '&.error input': {
      border: '1px solid transparent',
      borderColor: 'error'
    }
  },
  label: {
    width: 'fit-content',
    display: 'inline-flex',
    whiteSpace: 'nowrap',
    mt: 3,
    mr: 2
  }
}

export default styles
