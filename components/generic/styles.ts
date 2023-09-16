import { keyframes } from '@emotion/core'

const fadeintext = keyframes`
  from {
    opacity: 0;
  }
`

const movetriangle = keyframes`
  from {
    transform: translateX(-50%)
  }
`

const triangleStyles = {
  position: 'absolute',
  bottom: ['auto', 0],
  top: [0, 'auto'],
  width: 0,
  animation: `${movetriangle} 1s forwards`
}
export const styles = {
  triangle1: {
    ...triangleStyles,
    left: [0, 'auto'],
    height: 0,
    borderBottom: '103% solid rgba(255,255,255,0.5)',
    borderRight: '103% solid transparent'
  },
  triangle2: {
    ...triangleStyles,
    left: ['-20px', 'auto'],
    height: ['100%', 0],
    borderBottom: '99% solid rgba(255,255,255,0.7)',
    borderRight: '99% solid transparent'
  },
  content: {
    position: 'absolute',
    top: '30%',
    bottom: 0,
    left: 0,
    width: '50%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    animation: `${fadeintext} 2s forwards`
  }
}

export default styles
