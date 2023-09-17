import { motion } from 'framer-motion';

declare module 'framer-motion' {
  interface CustomMotion {
    custom: any;
  }

  export const motion: CustomMotion;
}
