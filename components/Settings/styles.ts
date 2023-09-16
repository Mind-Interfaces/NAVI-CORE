const styles = {
  modal: {
    minHeight: [326, 326, 326, 422, 256, 256]
  },
  header: {
    backgroundColor: 'white',
    height: '3rem',
    alignItems: 'center'
  },
  closeButton: {
    px: 17
  },
  headingContainer: {
    borderBottom: '2px solid transparent',
    borderBottomColor: 'primary',
    mb: 4
  },
  heading: {
    fontSize: 5,
    fontWeight: '600',
    lineHeight: '31px',
    pb: 2,
    mt: 3,
    mx: 4
  },
  title: { fontWeight: 'bold' },
  content: {
    flex: 1,
    alignItems: 'center'
  },
  contentWrapper: {
    flexDirection: 'column'
  },
  deviceList: {
    flexDirection: ['column', 'column', 'column', 'column', 'row', 'row'],
    background: 'white',
    my: 4,
    mr: 6,
    alignItems: 'initial',
    overflow: 'auto',
    '& label': {
      width: '70px',
      alignItems: 'center',
      mb: ['15px', '15px', '15px', '15px', 'unset', 'unset']
    },
    '& svg': {
      ml: '-36px'
    },
    '& select': {
      width: ['160px', '160px', '160px', '389px'],
      ml: [0, 0, 0, 0, 4, 4],
      mr: 4
    }
  },
  select: {
    fontFamily: 'body',
    border: '1px solid transparent',
    borderColor: 'grey',
    borderRadius: '5px',
    pr: '20px'
  },
  device: {
    fontSize: 2,
    cursor: 'pointer',
    px: 2,
    py: 1
  },

  localVideo: { ml: 3, width: '224px', mt: 2 },

  volume: {
    graph: {
      display: ['none', 'none', 'none', 'flex'],
      justifyContent: 'center',
      alignItems: 'center',
      height: '25px',
      mr: '15px',
      alignSelf: [
        'flex-end',
        'flex-end',
        'flex-end',
        'flex-end',
        'auto',
        'auto'
      ],
      mb: [20, 20, 20, 20, 0, 0]
    },
    shortBar: {
      mr: '2px',
      transition: 'height 0.1s',
      width: '5px',
      minHeight: '5px',
      maxHeight: '8px',
      bg: 'primary',
      borderRadius: '4px'
    },
    longBar: {
      mr: '2px',
      transition: 'height 0.1s',
      width: '5px',
      borderRadius: '4px',
      minHeight: '5px',
      maxHeight: '20px',
      bg: 'primary'
    }
  },

  testAudio: {
    wrapper: {
      cursor: 'pointer',
      height: '24px',
      '& img': {
        width: '24px'
      },
      color: 'secondary',
      fontSize: 0,
      alignItems: 'center',
      alignSelf: [
        'flex-end',
        'flex-end',
        'flex-end',
        'flex-end',
        'auto',
        'auto'
      ],
      mb: [20, 20, 20, 20, 0, 0]
    }
  }
}
export default styles
