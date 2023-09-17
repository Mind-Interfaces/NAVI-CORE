declare module 'framer-motion' {
  interface CustomMotionMethods {
    custom: any;
  }
  export const motion: typeof motion & CustomMotionMethods;
}
