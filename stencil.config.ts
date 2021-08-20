import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'uikit-webcomponents',
  testing: {
    collectCoverageFrom: [
      'src/components/ui-list/ui-list.tsx',
      'src/components/ui-list/ui-list.e2e.tsx',
      'src/components/ui-modal/ui-modal.tsx',
      'src/components/ui-modal/ui-modal.e2e.tsx',
      'src/components/ui-paginator/ui-paginator.tsx',
      'src/components/ui-paginator/ui-paginator.e2e.tsx'
    ]
  },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'dist-custom-elements-bundle'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
};
