const styles = {
  modal: {
    // TODO can we use a generic style for this?
    width: [296, 296, 526, 526, 850, 850],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: [
      'flex-start',
      'flex-start',
      'flex-start',
      'flex-start',
      'center',
      'center'
    ],
    fontSize: 4
  },
  recommendationContainer: {
    width: '100%',
    mt: 3
  },
  numbersContainer: {
    position: 'relative',
    width: ['100%', '100%', '100%', 333],
    height: ['100%', '100%', '100%', 42],
    margin: [0, 0, 0, 0, '0 auto', '0 auto'],
    justifyContent: [
      'center',
      'center',
      'flex-start',
      'flex-start',
      'space-between',
      'space-between'
    ],
    color: 'secondary',
    display: 'flex',
    flexWrap: 'wrap',
    '& div:nth-of-type(7)': {
      display: ['flex', 'flex', 'none', 'none', 'none', 'none'],
      flexBasis: '100%',
      width: 0,
      height: '1px',
      maxHeight: '1px',
      m: 0,
      p: 0,
      border: 'none',
      backgroundColor: 'white',
      color: 'white'
    }
  },
  numberLabels: {
    width: 333,
    justifyContent: 'space-between',
    color: 'secondary',
    margin: [0, 0, 0, 0, '0 auto', '0 auto']
  },
  notLikely: {
    fontSize: '12px',
    display: ['none', 'none', 'block']
  },
  extremelyLikely: {
    fontSize: '12px',
    display: ['none', 'none', 'block']
  },
  number: {
    py: 3,
    height: 24,
    width: 24,
    fontSize: 1,
    cursor: 'pointer',
    borderRadius: 'button',
    border: '1px solid transparent',
    borderColor: 'secondary',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.5s',
    mr: [0, 0, '6px', '6px', 0, 0],
    mb: ['10px', '10px', '10px', 0]
  },
  starsContainer: {
    color: 'primary'
  },
  textArea: {
    width: ['100%', '100%', '100%', '100%', 418, 418],
    height: [47, 47, 90, 90, 90, 90],
    mt: [2, 2, 2, 2, 3, 3],
    mb: [4, 4, 4, 4, 10, 10],
    fontSize: 2,
    fontFamily: 'body',
    border: '1px solid transparent',
    borderColor: 'grey',
    borderRadius: 'button'
  },
  title: {
    mt: [0, 0, 0, 0, 1, 1],
    mb: [0, 0, 0, 0, 4, 4],
    mx: [0, 0, 0, 0, '12px', '12px'],
    width: '100%',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 1
  }
}

export default styles
