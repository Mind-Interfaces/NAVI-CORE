import { keyframes } from '@emotion/core'

const heartFade = keyframes`
    0% {
        opacity: 1;
        transform: translateY(1px) scale(1);
        -webkit-transform: translateY(1px) scale(1);
    }
    100% {
        opacity: 0;
        transform: translateY(-50px) scale(2);
        -webkit-transform: translateY(-50px) scale(2);
    }
`

export const styles = {
  conatianer: {
    label: 'onscreen-info',
    position: 'absolute',
    right: [20, 20, 20, 20, 80, 80],
    maxWidth: ['90%', '90%', '90%', '90%', 560, 560],
    top: [20, 20, 20, 20, 88, 88],
    bottom: [20, 20, 20, 20, 195, 195],
    width: '100%',
    display: ['none', 'none', 'none', 'none', 'flex', 'flex'],
    flexDirection: 'column',
    justifyContent: 'center',
    left: [20, 20, 20, 20, 'auto', 'auto'],
    zIndex: [4, 4, 4, 4, 1, 1]
  },
  card: {
    label: 'info-card',
    color: 'text',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 250
  },
  information: {
    content: {
      label: 'information-content',
      position: 'relative',
      minHeight: 0,
      li: {
        fontSize: 1
      },
      '& a:visited': {
        color: 'secondary'
      },

      // Needed to make sure safari keeps 'information-scroll' from overflowing this
      display: 'flex',
      flexDirection: 'column'
    },
    scroll: {
      label: 'information-scroll',
      overflow: 'auto',
      maxHeight: '100%',
      py: '15px'
    },
    closeButtonContainer: {
      display: ['flex', 'flex', 'flex', 'flex', 'none', 'none'],
      justifyContent: 'flex-end'
    },
    closeButton: {
      p: 0,
      mt: [0, 0, 0, 0, '-10px', '-10px'],
      mr: [0, 0, 0, 0, '-10px', '-10px'],
      zIndex: 2
    },
    topFade: {
      label: 'topFade',
      height: 25,
      left: 0,
      right: 0,
      position: 'absolute',
      top: 0,
      zIndex: 1,
      background:
        'linear-gradient(to bottom, rgba(255, 255, 255, 1) 50%,rgba(255, 255, 255, 0) 100%);'
    },
    bottomFade: {
      label: 'bottomFade',
      bottom: 0,
      height: 25,
      left: 0,
      right: 0,
      position: 'absolute',
      background:
        'linear-gradient(to top, rgba(255, 255, 255, 1) 50%,rgba(255, 255, 255, 0) 100%);'
    },
    buttonsContainer: {
      mt: [0, 0, '10px', '10px', 11, 11],
      justifyContent: 'flex-end',
      '& svg': {
        zIndex: 1
      }
    },
    expandButton: {
      alignItems: 'center',
      display: ['none', 'none', 'none', 'none', 'flex', 'flex'],
      '& svg': {
        mr: '5px',
        mt: ['3px', '3px', '3px', '3px', 0, 0]
      }
    },
    saveButton: {
      alignItems: 'center',
      display: 'flex',
      '& svg': {
        mr: '2px'
      }
    },
    buttonText: {
      fontSize: 1,
      display: ['none', 'none', 'none', 'block']
    }
  },
  savedItems: {
    heartContainer: {
      animation: `${heartFade} 1.5s ease forwards`,
      zIndex: 1,
      position: 'absolute'
    },
    savedItemsButton: {
      display: ['none', 'none', 'none', 'none', 'flex', 'flex'],
      cursor: 'pointer',
      zIndex: 4,
      '& button': {
        alignItems: 'center',
        display: 'flex',
        color: 'primary',
        fontSize: 2
      },
      '& button svg': {
        mr: 1
      }
    },
    mobileSavedItemsButton: {
      display: ['flex', 'flex', 'flex', 'flex', 'none', 'none'],
      cursor: 'pointer',
      zIndex: 4,
      color: 'primary',
      width: [30, 30, 40, 40, 40, 40],
      height: [30, 30, 40, 40, 40, 40],
      p: 0,
      borderRadius: 1000,
      '& svg': {
        mr: 0,
        minWidth: 15
      }
    }
  },
  informationExpanded: {
    container: {
      label: 'info-expanded-container',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 3,
      backdropFilter: 'blur(4px)',
      webkitBackdropFilter: 'blur(4px)',
      backgroundColor: 'rgba(0,0,0,0.7)',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      'h1,h2,h3,h4': {
        fontSize: '18px'
      }
    },
    closeButtonContainer: {
      justifyContent: 'flex-end'
    },
    closeButton: {
      p: 0,
      mt: [0, 0, 0, 0, '-10px', '-10px'],
      mr: [0, 0, 0, 0, '-10px', '-10px']
    },
    contentAndButton: {
      width: ['95%', '95%', '95%', '95%', 850, 850],
      maxHeight: ['95%', '95%', '95%', '95%', 552, 552],
      p: 12,
      flexDirection: 'column'
    },
    scrollContainer: {
      label: 'scroll-containter',
      fontSize: '18px',
      whiteSpace: 'pre-wrap',
      overflow: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none'
      },
      '& a:visited': {
        color: 'secondary'
      },
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
      maxHeight: [350, 350, 350, 350, 550, 550]
    },
    saveButton: {
      width: 82,
      alignItems: 'center',
      display: 'flex',
      '& svg': {
        mr: '2px'
      }
    },
    trashButton: {
      alignItems: 'center',
      display: 'flex',
      '& svg': {
        mr: '5px'
      }
    },
    minimizeButton: {
      color: 'secondary',
      alignItems: 'center',
      display: ['none', 'none', 'none', 'none', 'flex', 'flex'],
      '& svg': {
        mr: '5px'
      }
    },
    downloadButton: {
      alignItems: 'center',
      display: 'flex',
      '& svg': {
        mr: '5px'
      }
    },
    buttonsContainer: {
      mt: [5, 5, 5, 5, 11, 11],
      mb: [5, 5, 5, 5, 0, 0],
      justifyContent: 'flex-end',
      '& button': {
        pb: [6, 6, 6, 6, 2, 2]
      },
      '& svg': {
        zIndex: 1
      }
    },
    paginationContainer: {
      borderTop: '1px solid transparent',
      borderTopColor: 'grey',
      pt: 7,
      px: 14,
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  },
  suggestedResponses: {
    title: {
      color: 'textAlternate',
      label: 'title',
      mb: 6,
      fontWeight: 'bold'
    },
    itemsContainer: {
      label: 'suggestedResponses-itemsContainer',
      width: '100%',
      flexDirection: 'row',
      overflowX: 'auto',
      maxWidth: '100%',
      justifyContent: [
        'flex-start',
        'flex-start',
        'center',
        'center',
        'center',
        'center'
      ]
    },
    item: {
      label: 'suggestedResponses-item',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: 'pointer',
      position: 'relative',
      mx: ['2px', '2px', '2px', '2px', 3, 3],
      textAlign: 'center',
      display: 'inline-flex',
      minWidth: 'auto',
      whiteSpace: 'nowrap'
    }
  }
}
export default styles
