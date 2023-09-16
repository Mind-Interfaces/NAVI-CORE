import React from 'react'
import { render } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import Information, { InformationItem } from '../Information'
import { useUneeqState } from 'uneeq-react-core'
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
;(useUneeqState as jest.Mock).mockReturnValue({
  savedItems: [],
  onScreenInfo: {
    suggestedResponses: {}
  }
})

describe('Information', () => {
  it('should render correctly', () => {
    const { container } = render(<Information information={information} />)

    expect(container).toHaveTextContent('For further information call')
  })
})
