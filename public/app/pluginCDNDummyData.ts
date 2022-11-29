import { PluginType, PluginState, PluginSignatureStatus } from '@grafana/data';

import { cdnHost } from './features/plugins/pluginCDN';

const baseUrl = 'plugin-cdn';

const dummyPanel = {
  info: {
    author: {
      name: 'Grafana Labs',
      url: 'https://grafana.com',
    },
    links: [
      {
        name: 'Project site',
        url: 'https://github.com/grafana/clock-panel',
      },
      {
        name: 'MIT License',
        url: 'https://github.com/grafana/clock-panel/blob/master/LICENSE',
      },
    ],
    build: {
      time: 1657138674187,
      repo: 'https://github.com/grafana/clock-panel',
      branch: 'master',
      hash: 'dfcdaf668efc3a5a5845b245313832b2eaa8df2f',
    },
    screenshots: [
      {
        name: 'Showcase',
        path: `/img/screenshot-showcase.png`,
      },
      {
        name: 'Options',
        path: `/img/screenshot-clock-options.png`,
      },
    ],
    updated: '2022-07-06',
  },
  hideFromList: false,
  sort: 100,
  skipDataQuery: true,
  state: PluginState.stable,
  signature: PluginSignatureStatus.valid,
  type: PluginType.panel,
};

const dummyData = [
  {
    id: 'grafana-worldmap-panel',
    name: 'Worldmap Panel',
    info: {
      description:
        'World Map panel for Grafana. Displays time series data or geohash data from Elasticsearch overlaid on a world map.',
      logos: {
        small: `${cdnHost}/grafana-worldmap-panel/0.3.3/grafana-worldmap-panel/images/worldmap_logo.svg`,
        large: `${cdnHost}/grafana-worldmap-panel/0.3.3/grafana-worldmap-panel/images/worldmap_logo.svg`,
      },
      version: '0.3.3',
    },
    baseUrl: `${baseUrl}/grafana-worldmap-panel/0.3.3/grafana-worldmap-panel`,
    module: `${baseUrl}/grafana-worldmap-panel/0.3.3/grafana-worldmap-panel/module`,
  },
];

export const remotePanels = dummyData.reduce((acc, item) => {
  // @ts-ignore YOLO!!!!!!
  acc[item.id] = {
    ...dummyPanel,
    ...item,
    info: {
      ...dummyPanel.info,
      ...item.info,
    },
  };
  return acc;
}, {});
