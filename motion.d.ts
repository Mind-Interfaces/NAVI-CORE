declare module 'framer-motion' {
  interface CustomMotionMethods {
    custom: any; // consider being more specific with the type if possible
  }
  
  export interface AnimatePresenceProps {
    // ... Your custom properties here
  }
  
  export const motion: typeof motion & CustomMotionMethods;
  export const AnimatePresence: React.FC<AnimatePresenceProps>;
}
