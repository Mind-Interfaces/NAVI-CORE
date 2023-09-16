export const styles = {
  warning: {
    container: {
      position: 'absolute',
      bottom: 177,
      left: '50%',
      ml: '-317px',
      alignSelf: 'center',
      width: 634,
      zIndex: 1,
      minHeight: 136,
      alignItems: 'center',
      justifyContent: 'center'
    },
    sideBorder: {
      backgroundColor: 'primary',
      borderRadius: '8px 0 0 8px',
      width: '15px',
      minHeight: 136
    },
    warning: {
      minHeight: 136,
      width: 619,
      backgroundColor: 'white',
      borderRadius: '0 8px 8px 0',
      justifyContent: 'center',
      flexDirection: 'column',
      px: 7
    },
    headingContainer: {
      mt: 7
    },
    heading: {
      display: 'inline-flex',
      width: 'fit-content',
      fontSize: 5
    },
    icon: {
      color: 'primary',
      width: '24px',
      alignItems: 'center',
      mr: 2
    },
    message: {
      my: 8,
      fontSize: 2
    }
  },
  error: {
    container: {
      position: 'absolute',
      right: 77,
      top: '50%',
      mt: '-68px',
      alignSelf: 'center',
      width: 634,
      zIndex: 1,
      minHeight: 136,
      alignItems: 'center',
      justifyContent: 'center'
    },
    sideBorder: {
      backgroundColor: 'primary',
      borderRadius: '8px 0 0 8px',
      width: '15px',
      minHeight: 136
    },
    sideBorderError: {
      backgroundColor: 'error',
      borderRadius: '8px 0 0 8px',
      width: '15px',
      minHeight: 136
    },
    warning: {
      minHeight: 136,
      width: 619,
      backgroundColor: 'white',
      borderRadius: '0 8px 8px 0',
      justifyContent: 'center',
      flexDirection: 'column',
      px: 7
    },
    headingContainer: {
      mt: 7
    },
    heading: {
      display: 'inline-flex',
      width: 'fit-content',
      fontSize: 5
    },
    icon: {
      color: 'error',
      alignItems: 'center',
      width: '24px',
      mr: 2
    },
    message: {
      my: 8,
      fontSize: 2,
      textAlign: 'center'
    }
  },
  fatal: {
    container: {
      minHeight: 257,
      px: 15
    },
    childrenContainer: {
      mt: 10
    },
    icon: {
      display: 'block',
      color: 'error'
    },
    heading: {
      display: 'flex',
      textAlign: 'center',
      alignItems: 'center',
      p: 0
    },
    message: {
      mt: 10,
      fontSize: 1,
      textAlign: 'center'
    },
    backButton: {
      mt: 10
    }
  }
}

export default styles
