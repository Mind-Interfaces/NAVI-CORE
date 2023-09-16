const styles = {
  modal: {
    label: 'passcode-modal',
    width: 300,
    height: 200,
    color: 'white',
    p: 5 ,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  formContainer: {
    flexDirection: 'column'
  },
  errorContainer: {
    flexDirection: 'column'
  },
  title: {
    fontSize: 2,
    fontWeight: 600
  },
  passcodeInputContainer: {
    mt: 8,
    position: 'relative',
    '& input': {
      borderRadius: 'button',
      background: 'white',
      color: 'text'
    }
  },
  toggleButton: {
    position: 'absolute',
    cursor: 'pointer',
    right: '4px',
    top: '8px',
    p: 0,
    color: 'black',
    backgroundColor: 'transparent',
    '& svg': {
      pointerEvents: 'none'
    }
  },
  nextButton: {
    mt: 13
  }
}

export default styles
