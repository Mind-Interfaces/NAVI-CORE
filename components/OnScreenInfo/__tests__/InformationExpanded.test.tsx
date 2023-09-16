import React from 'react'
import { render } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import InformationExpanded from '../InformationExpanded'
import { useUneeqState } from 'uneeq-react-core'
import { InformationItem } from '../Information'
import { fireEvent } from '@testing-library/react'
import * as core from 'uneeq-react-core'
jest.spyOn(core, 'useUneeqState')

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
  }
] as InformationItem[]

describe('InformationExpanded', () => {
  it('should render correctly', () => {
    core.useUneeqState.mockImplementation(() => ({
      onScreenInfo: {
        information
      },
      savedItems: [information[0], information[1], information[2]],
      expandedInfo: {
        type: 'information'
      },
      selectedSavedItem: null
    }))
    const { container } = render(<InformationExpanded />)

    expect(container).toHaveTextContent('Contact Details')
  })

  it('should move next correctly', () => {
    ;(useUneeqState as jest.Mock).mockReturnValue({
      onScreenInfo: {
        information
      },
      savedItems: [information[0], information[1], information[2]],
      expandedInfo: {
        type: 'savedItem'
      },
      selectedSavedItem: 0
    })
    const { container, getByTestId } = render(<InformationExpanded />)
    fireEvent.click(getByTestId('next-item'))
    ;(useUneeqState as jest.Mock).mockReturnValue({
      onScreenInfo: {
        information
      },
      savedItems: [information[0], information[1], information[2]],
      expandedInfo: {
        type: 'savedItem'
      },
      selectedSavedItem: 1
    })
    expect(container).toHaveTextContent('1 of 3')
  })
})
