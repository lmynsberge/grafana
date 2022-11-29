import { translateForCDN } from './pluginCDN';

describe('Plugin CDN', () => {
  describe('translateForCDN', () => {
    it('', () => {
      const load = {
        name: 'http://localhost:3000/public/plugin-cdn/grafana-worldmap-panel/0.3.3/grafana-worldmap-panel/module.js',
        address:
          'https://plugin-cdn.storage.googleapis.com/grafana-worldmap-panel/0.3.3/grafana-worldmap-panel/module.js',
        source: 'public/plugins/template.html',
        metadata: {
          extension: '',
          deps: [],
          format: 'amd',
          loader: 'cdn-loader',
          encapsulateGlobal: false,
          cjsRequireDetection: true,
          cjsDeferDepsExecute: false,
          esModule: true,
          authorization: false,
        },
      };
      const whatever = translateForCDN(load);
      expect(whatever.source).toBe(
        'https://plugin-cdn.storage.googleapis.com/grafana-worldmap-panel/0.3.3/grafana-worldmap-panel/template.html'
      );
    });
  });
});
