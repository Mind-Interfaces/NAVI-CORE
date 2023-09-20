import React, { createElement, useRef, useContext } from 'react'
// import ReactHtmlParser from 'react-html-parser'
import { Image, Link, Text, Heading } from 'rebass'
import { UneeqContext, useUneeqState } from '../../'
import { debounce } from 'lodash'
// @ts-ignore
import marksy from 'marksy'

const headingStyles = {
  fontSize: 2,
  fontWeight: 'bold',
  m: 0,
  p: 0
}

export const getUtteranceFromURI = (uri: string) => {
  const match = uri.match(/^say\:(.*)$/)
  console.log(match)
  if (!match) {
    return undefined
  }
  return match[1]
}

const compile = (
  markdown: string,
  send: (text: string) => void,
  sendCallback: (text: string) => void
) => {
  const parser = marksy({
    elements: {
      a: (props: any) => {
        const utterance = getUtteranceFromURI(props.href)
        return utterance ? (
          <a
            {...props}
            rel="noopener noreferrer"
            onClick={(event: Event) => {
              event.preventDefault()
              send(utterance)
              sendCallback(utterance)
            }}
          />
        ) : (
          <a {...props} rel="noopener noreferrer" />
        )
      },
      h1: ({ children }: any) => (
        <Heading sx={headingStyles}>{children}</Heading>
      ),
      h2: ({ children }: any) => (
        <Heading sx={headingStyles}>{children}</Heading>
      ),
      h3: ({ children }: any) => (
        <Heading sx={headingStyles}>{children}</Heading>
      ),
      h4: ({ children }: any) => (
        <Heading sx={headingStyles}>{children}</Heading>
      )
    },
    createElement
  })

  return parser(markdown, {})
}

interface HeadingInformation {
  type: 'heading'
  text: string
}
interface TextInformation {
  type: 'text'
  text: string
}
interface HTMLInformation {
  type: 'html'
  html: string
}
interface MarkdownInformation {
  type: 'markdown'
  markdown: string
}
interface ImageInformation {
  type: 'image'
  source: string
  label: string
  width: string
}
interface VideoInformation {
  type: 'video'
  source: string
  width: string
  height: string
}
export interface LinkInformation {
  type: 'link'
  href: string
  label: string
}

export type InformationItemWithoutList =
  | HeadingInformation
  | TextInformation
  | HTMLInformation
  | ImageInformation
  | VideoInformation
  | LinkInformation
  | MarkdownInformation

interface ListInformation {
  type: 'list'
  items: InformationItemWithoutList[]
}

type InformationItem =
  | ListInformation
  | HeadingInformation
  | TextInformation
  | HTMLInformation
  | ImageInformation
  | VideoInformation
  | LinkInformation
  | MarkdownInformation

const renderInformationItem = (item: InformationItem, index: number, sendText, debouncedSend, dispatch): any => {
  switch (item.type) {
    case 'html':
      console.warn('HTML type used')
      return null //ReactHtmlParser(item.html)
    case 'text':
      return <Text key={index}>{item.text}</Text>
    case 'heading':
      return (
        <Text fontSize={3} key={index}>
          {item.text}
        </Text>
      )
    case 'markdown':
      const compiled = compile(
        item.markdown, 
        debouncedSend, 
        (text: string) => {
          dispatch({ type: 'suggestedResponseSent', payload: text })
        }
      );
      return compiled.tree;
    case 'list':
      return (
        <ul key={index}>
          {item.items.map((child, index) =>
            renderInformationItem(child, index)
          )}
        </ul>
      )
    case 'link':
      return (
        <Link href={item.href} rel="external" target="_blank" key={index}>
          <Text>{item.label}</Text>
        </Link>
      )
    case 'image':
      return <Image src={item.source} alt={item.label} key={index} />
    case 'video':
      return (
        <iframe
          src={item.source}
          width={item.width || '100%'}
          height={item.height || '375'}
          key={index}
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )
  }
}

import { useContext, useRef } from 'react';  // Import the required hooks
import debounce from 'lodash.debounce';  // Import debounce if it's not already imported

interface InformationProps {
  information: InformationItem[];
}

const InformationContent: React.FC<InformationProps> = ({ information }) => {
  // Move these lines to the top of your function component
  const { sendText, dispatch } = useContext(UneeqContext);
  const debouncedSend = useRef(
    debounce((text: string) => sendText(text), 2000)
  ).current;

  if (!information?.length) return null;

  return (
    <>
      {information.map((item: InformationItem, index: number) => {
        return renderInformationItem(item, index, sendText, debouncedSend, dispatch);
      })}
    </>
  );
};

export default InformationContent;
