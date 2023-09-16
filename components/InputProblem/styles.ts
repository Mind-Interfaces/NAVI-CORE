import { keyframes } from '@emotion/core'

const bganimation = keyframes`
    0% {
        background-position: 100% 100%;
    }
    100% {
        background-position: 34% 100%;
    }
`

const removeblur = keyframes`
    to {
        filter: blur(0px);
        -webkit-filter: blur(0px);
        opacity: 1;
    }
`

const tofullopacity = keyframes`
    to {
        opacity: 1;
    }
`
const pulse = keyframes`
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
    `

export const styles = {
  container: {
    fontSize: 2,
    label: 'inputProblemContainer',
    backgroundColor: 'textAlternate',
    position: 'absolute',
    textAlign: 'center',
    bottom: [180, 180, 210, 210, 210, 210],
    width: 'calc(100% - 40px)',
    maxWidth: ['none', 'none', 'none', 'none', 634, 634],
    alignItems: 'center',
    py: 4,
    px: 10,
    borderRadius: 'button'
  },
  errorText: {
    position: 'relative',
    '&::after': {
      backgroundColor: 'textAlternate',
      content: '""',
      display: 'block',
      height: '20px',
      left: 'calc(50% - 10px)',
      bottom: '-17px',
      position: 'absolute',
      transform: 'rotate( 45deg )',
      width: '20px',
      minWidth: '20px'
    }
  },
  background: {
    animation: `${bganimation} 1s forwards`
  },
  text: {
    fontSize: 20,
    filter: 'blur(8px)',
    animation: `${removeblur} 1s 0.3s forwards`,
    opacity: 0
  },
  key: {
    display: 'inline-flex',
    opacity: 0,
    mr: 2,
    animation: `${tofullopacity} 1s 0.3s forwards`
  },
  spacebar: {
    display: 'inline-flex',
    opacity: 0,
    mr: 2,
    animation: `${tofullopacity} 1s 0.3s forwards, ${pulse} 2s 1.3s ease-in-out infinite forwards`
  }
}
export default styles
