import React from 'react'
import { render } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import {
  getUtteranceFromURI,
  default as InformationContent
} from '../InformationContent'
import { fireEvent } from '@testing-library/react'
import { useUneeqState } from 'uneeq-react-core'
import {
  HeadingInformation,
  MarkdownInformation,
  InformationItem
} from '../Information'
jest.mock('uneeq-react-core')
const information = [
  {
    type: 'heading',
    text: 'Contact Details'
  },
  {
    type: 'text',
    text: 'For further information call'
  },
  {
    type: 'link',
    label: 'Link',
    href: 'https://example.com'
  },
  {
    type: 'list',
    items: [
      {
        type: 'link',
        label: 'Link',
        href: 'https://example.com'
      },
      {
        type: 'text',
        text: 'Children for further information call'
      }
    ]
  },
  {
    type: 'image',
    source: 'https://picsum.photos/100',
    label: 'Yep, its an image',
    width: '100%'
  },
  {
    type: 'video',
    source: 'https://www.youtube.com/embed/rF2u7RTPsHI',
    width: '100%',
    height: '375'
  }
] as InformationItem[]

const markdownInformation = [
  {
    type: 'markdown',
    markdown:
      '#Choose An Option: \n\n[Accept the deal](say:Yes I would like the deal)'
  }
] as MarkdownInformation[]
;(useUneeqState as jest.Mock).mockReturnValue({
  savedItems: [],
  onScreenInfo: {
    suggestedResponses: {}
  }
})

describe('InformationContent', () => {
  it('should render correctly', () => {
    const { container } = render(
      <InformationContent information={information} />
    )

    expect(container).toHaveTextContent(
      (information[0] as HeadingInformation).text
    )
  })

  it('should extract utterance from say: uri', () => {
    const utterance = getUtteranceFromURI('say:utterance to speak')
    expect(utterance).toEqual('utterance to speak')
  })

  it('should not extract utterance from other uri', () => {
    const utterance = getUtteranceFromURI('http://www.google.com/')
    expect(utterance).toEqual(undefined)
  })
})
