import { translateForCDN } from './pluginCDN';

describe('Plugin CDN', () => {
  describe('translateForCDN', () => {
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

    it('should update the default local path to use the CDN path', () => {
      const translatedLoad = translateForCDN({ ...load, source: 'public/plugins/template.html' });
      expect(translatedLoad).toBe(
        'https://plugin-cdn.storage.googleapis.com/grafana-worldmap-panel/0.3.3/grafana-worldmap-panel/template.html'
      );
    });

    it('should replace the default path in a multi-line source code', () => {
      const source = `
        const a = "public/plugins/template.html";
        const img = "<img src='public/plugins/data/myimage.jpg'>";
      `;
      const expectedSource = `
        const a = "https://plugin-cdn.storage.googleapis.com/grafana-worldmap-panel/0.3.3/grafana-worldmap-panel/template.html";
        const img = "<img src='https://plugin-cdn.storage.googleapis.com/grafana-worldmap-panel/0.3.3/grafana-worldmap-panel/data/myimage.jpg'>";
      `;
      const translatedLoad = translateForCDN({ ...load, source });
      expect(translatedLoad).toBe(expectedSource);
    });

    it('should cater for local paths starting with a slash', () => {
      const source = `
        const a = "/public/plugins/template.html";
        const img = "<img src='public/plugins/data/myimage.jpg'>";
      `;
      const expectedSource = `
        const a = "https://plugin-cdn.storage.googleapis.com/grafana-worldmap-panel/0.3.3/grafana-worldmap-panel/template.html";
        const img = "<img src='https://plugin-cdn.storage.googleapis.com/grafana-worldmap-panel/0.3.3/grafana-worldmap-panel/data/myimage.jpg'>";
      `;
      const translatedLoad = translateForCDN({ ...load, source });
      expect(translatedLoad).toBe(expectedSource);
    });

    it('should cater for angular templateUrl', () => {
      const source = `
        e.templateUrl="partials/module.html"
      `;
      const expectedSource = `
        e.templateUrl="https://plugin-cdn.storage.googleapis.com/grafana-worldmap-panel/0.3.3/grafana-worldmap-panel/partials/module.html"
      `;

      const translatedLoad = translateForCDN({ ...load, source });
      expect(translatedLoad).toBe(expectedSource);
    });

    it('should cater for angular templateUrl2', () => {
      const source = `
        e.templateUrl:"partials/module.html"
      `;
      const expectedSource = `
        e.templateUrl:"https://plugin-cdn.storage.googleapis.com/grafana-worldmap-panel/0.3.3/grafana-worldmap-panel/partials/module.html"
      `;

      const translatedLoad = translateForCDN({ ...load, source });
      expect(translatedLoad).toBe(expectedSource);
    });
  });
});
