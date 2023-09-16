import { keyframes } from '@emotion/core'

const progressBarStripes = keyframes`
    0% {
      background-position: 1rem 0;
    }
    100% {
      background-position: 0 0;
    }
`

export const styles = {
  loading: {
    container: {
      height: '100%',
      width: '100%',
      alignItems: 'flex-end',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: 0
    },
    videoContainer: {
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      color: 'white',
      '& video': {
        width: ['100%', '100%', '60%', '60%', '60%', '60%'],
        height: ['100%', '100%', '60%', '60%', '60%', '60%']
      }
    },
    message: {
      width: ['85%', '85%', '60%', '60%', 628, 628],
      mt: [3, 3, 20, 20, 30, 30],
      color: 'white',
      textAlign: 'center',
      fontSize: [2, 2, 6, 6, 6, 6]
    },
    barContainer: {
      width: ['90%', '90%', '80%', '80%', 628, 628],
      mt: [40, 40, 40, 50, 40, 40],
      mb: [50, 50, 50, 60, 147, 147],
      justifyContent: 'flex-start',
      border: '1px solid transparent',
      borderColor: 'primary',
      borderRadius: '4px'
    },
    barInnerContainer: {
      width: ['95%', '95%', '95%', '95%', 628, 628],
      borderRadius: '3px',
      backgroundColor: 'rgba(0,0,0,0.7)',
      p: '2px'
    },
    bar: {
      height: [5, 5, 14, 14, 7, 7],
      animation: `${progressBarStripes} 1s linear infinite`,
      backgroundImage:
        'linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent)',
      backgroundColor: 'primary',
      transition: 'width .6s ease',
      backgroundSize: '1rem 1rem',
      borderRadius: '4px'
    }
  },
  avatarUnavailable: {
    icon: {
      mb: 7,
      display: 'block',
      color: 'warning'
    },
    heading: {
      display: 'inline-flex',
      width: 'fit-content',
      fontSize: 5
    },
    message: {
      my: 8,
      fontSize: 2
    }
  }
}
export default styles
