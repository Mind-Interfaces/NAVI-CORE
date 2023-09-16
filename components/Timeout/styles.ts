export const styles = {
  heading: {
    color: 'text',
    fontSize: 5,
    fontWeight: 'normal',
    mb: 5
  },
  text: {
    fontSize: 1,
    color: 'text',
    textAlign: 'center'
  },
  time: {
    fontWeight: '400',
    fontSize: 3,
    pr: 3
  },
  progress: {
    mt: 4,
    mb: 10,
    alignItems: 'center',
    '& .react-sweet-progress-symbol': { display: 'none' },
    '& .react-sweet-progress': {
      width: '10rem',
      ml: 1
    },
    '& .react-sweet-progress-line-inner': {
      minHeight: '5px'
    },
    '& .react-sweet-progress-line-inner-status-active:before': {
      animation: 'none'
    }
  },
  instructions: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    color: '#333',
    my: 3,
    fontSize: 2
  },
  buttonsContainer: {
    flexDirection: [
      'column-reverse',
      'column-reverse',
      'column-reverse',
      'column-reverse',
      'row',
      'row'
    ]
  },
  leaveChatButton: {
    width: '8rem',
    mr: 2
  },
  backToChatButton: {
    width: '8rem',
    mb: [8, 8, 8, 8, 0, 0]
  }
}

export default styles
