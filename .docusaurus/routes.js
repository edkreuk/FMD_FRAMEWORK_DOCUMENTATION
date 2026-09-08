import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/blog',
    component: ComponentCreator('/blog', '98b'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '53a'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'b85'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '755'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '2e8'),
            routes: [
              {
                path: '/docs/',
                component: ComponentCreator('/docs/', '4a8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/explanation/architecture',
                component: ComponentCreator('/docs/explanation/architecture', 'a5b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/explanation/business-domains',
                component: ComponentCreator('/docs/explanation/business-domains', '60d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/explanation/enterprise-integration',
                component: ComponentCreator('/docs/explanation/enterprise-integration', '291'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/explanation/load-flow',
                component: ComponentCreator('/docs/explanation/load-flow', '4f2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/explanation/why-fmd',
                component: ComponentCreator('/docs/explanation/why-fmd', '82a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/how-to/add-an-entity',
                component: ComponentCreator('/docs/how-to/add-an-entity', 'ce2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/how-to/create-materialized-lake-views',
                component: ComponentCreator('/docs/how-to/create-materialized-lake-views', '148'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/how-to/create-onelake-shortcuts-in-gold',
                component: ComponentCreator('/docs/how-to/create-onelake-shortcuts-in-gold', '5eb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/how-to/deploy',
                component: ComponentCreator('/docs/how-to/deploy', '683'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/how-to/diagnose-a-failed-load',
                component: ComponentCreator('/docs/how-to/diagnose-a-failed-load', 'f28'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/how-to/operator-cheat-sheet',
                component: ComponentCreator('/docs/how-to/operator-cheat-sheet', '4f3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/how-to/run-fmd-in-production',
                component: ComponentCreator('/docs/how-to/run-fmd-in-production', '8ea'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/how-to/schedule-the-load',
                component: ComponentCreator('/docs/how-to/schedule-the-load', '3dc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/how-to/upgrade-the-framework',
                component: ComponentCreator('/docs/how-to/upgrade-the-framework', 'd45'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '89a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/reference/data-cleansing',
                component: ComponentCreator('/docs/reference/data-cleansing', '626'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/reference/data-model',
                component: ComponentCreator('/docs/reference/data-model', 'a7d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/reference/logging-and-auditing',
                component: ComponentCreator('/docs/reference/logging-and-auditing', 'bc0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/reference/notebooks',
                component: ComponentCreator('/docs/reference/notebooks', '61d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/reference/pipelines',
                component: ComponentCreator('/docs/reference/pipelines', 'e55'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/reference/supported-sources',
                component: ComponentCreator('/docs/reference/supported-sources', '477'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/reference/variable-libraries',
                component: ComponentCreator('/docs/reference/variable-libraries', '57f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/reference/version-differences',
                component: ComponentCreator('/docs/reference/version-differences', '7cd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial/getting-started',
                component: ComponentCreator('/docs/tutorial/getting-started', '44d'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
