export const styles = {
  container: {
    maxHeight: ['75%', '75%', '50%', '50%', 385, 385],
    maxWidth: ['none', 'none', 'none', 440, 850, 850],
    py: [5, 5, 5, 5, 10, 10],
    px: [6, 6, 6, 6, 14, 14],
    fontSize: 1
  },
  headingTwo: {
    fontSize: [3, 3, 3, 3, 4, 4],
    fontWeight: '600',
    mb: [3, 3, 3, 3, 6, 6],
    textAlign: 'center'
  },
  explanation: {
    textAlign: 'center',
    width: ['85%', '85%', '85%', '85%', 'auto', 'auto'],
    mb: [4, 4, 4, 4, 0, 0]
  },
  privacyPolicyLink: {
    textDecoration: 'underline',
    color: 'currentColor'
  },
  notice: {
    flexDirection: 'column',
    my: [3, 3, 3, 3, 10, 10],
    p: [3, 3, 3, 3, 10, 10],
    background: 'rgba(252, 189, 28, 0.1)',
    border: '1px solid transparent',
    borderColor: 'grey',
    textAlign: 'center'
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
  reloadButton: {
    mb: [7, 7, 7, 7, 0, 0],
    mt: [7, 7, 7, 7, 0, 0]
  },
  backButton: {
    mr: [0, 0, 0, 0, 4, 4]
  }
}
export default styles
