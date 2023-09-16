const styles = {
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 1s'
  },
  inner: {
    fontWeight: '400',
    textAlign: 'left',
    background: 'white',
    borderRadius: 'button',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    mb: 6,
    position: 'absolute',
    minHeight: [44, 44, 44, 44, 73, 73],
    maxHeight: [184, 184, 144, 144, 168, 168],
    minWidth: 144,
    maxWidth: ['90%', '90%', '90%', '90%', 634, 634],
    overflow: 'ellipsis',
    bottom: 85,
    py: [4, 4, 4, 4, 10, 10],
    px: [6, 6, 6, 6, 10, 10],
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    '& span': {
      minWidth: 'auto'
    }
  }
}

export default styles
