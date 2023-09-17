declare module 'framer-motion' {
  interface CustomMotionMethods {
    custom: any;
  }
  export const motion: typeof motion & CustomMotionMethods;
}

declare module 'framer-motion' {
  export interface AnimatePresenceProps {
    // ... Your custom properties here
  }
  export const AnimatePresence: React.FC<AnimatePresenceProps>;
}
