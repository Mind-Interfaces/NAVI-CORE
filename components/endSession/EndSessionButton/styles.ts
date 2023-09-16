export const styles = {
  button: {
    position: 'absolute',
    top: [6, 6, 6, 6, 25, 25],
    right: [6, 6, 40, 40, 40, 40],
    width: [28, 28, 40, 40, 'auto', 'auto'],
    height: [28, 28, 40, 40, 'auto', 'auto'],
    '& > svg': {
      mr: [0, 0, 0, 0, '8px', '8px'],
      minWidth: ['11px', '11px', '16px', '16px', '16px', '16px'],
      minHeight: ['11px', '11px', '16px', '16px', '16px', '16px']
    },
    borderRadius: [40, 40, 40, 40, 0, 0],
    py: [0, 0, 0, 0, 4, 4]
  },
  text: {
    display: ['none', 'none', 'none', 'none', 'inline-block', 'inline-block']
  }
}
export default styles
