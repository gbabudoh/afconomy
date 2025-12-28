/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mux-video': any;
    }
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'mux-video': any;
      }
    }
  }
}

export {};
