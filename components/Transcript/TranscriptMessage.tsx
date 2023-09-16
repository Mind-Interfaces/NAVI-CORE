import React from 'react'
import { Box, Text } from 'rebass'
import InformationContent from '../OnScreenInfo/InformationContent'
import styles from './styles'
import { TranscriptItem } from './Transcript'

interface TranscriptMessageProps {
  line: TranscriptItem
}
const TranscriptMessage: React.FC<TranscriptMessageProps> = ({ line }) => {
  const messageStyle = line.user
    ? styles.message
    : {
        ...styles.message,
        mr: 'auto',
        ml: 0,
        backgroundColor: 'white'
      }

  return (
    <Box
      sx={messageStyle}
      className={line.user ? 'user-message' : 'avatar-message'}
    >
      {line.information ? (
        <InformationContent information={line.information} />
      ) : (
        <Text>{line.message}</Text>
      )}
    </Box>
  )
}

export default TranscriptMessage
