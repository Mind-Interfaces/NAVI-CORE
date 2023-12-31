/// <reference types="react-scripts" />

declare module '*.mp4' {
  const src: string
  export default src
}

declare module '*.mp3' {
  const src: string
  export default src
}

declare module '*.webm' {
  const src: string
  export default src
}

declare module '*.json' {
  const value: any
  export default value
}

declare module "*.svg" {
    import React from "react"
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    const src: string
    export default src
}
