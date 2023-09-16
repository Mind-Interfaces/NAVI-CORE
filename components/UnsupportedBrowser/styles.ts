export const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'text',
    textAlign: 'center'
  },
  heading: {
    display: 'inline-flex',
    width: 'fit-content',
    fontSize: 5,
    mb: 5,
    textAlign: 'center'
  },
  paragraph: {
    my: 5,
    textAlign: 'center'
  },
  browserIcons: {
    mt: 3,
    justifyContent: 'center'
  },
  buttons: {
    mt: 10,
    justifyContent: 'center',
    flexDirection: [
      'column-reverse',
      'column-reverse',
      'column-reverse',
      'column-reverse',
      'row',
      'row'
    ],
    alignItems: 'center'
  },
  backToHomeButton: {
    mr: 3,
    mt: [5, 5, 5, 5, 0, 0]
  }
}
export default styles
