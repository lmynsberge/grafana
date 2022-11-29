import { load } from 'rudder-sdk-js';

// ⚠️ POC plugin CDN stuffs! ⚠️
export const cdnHost = 'https://plugin-cdn.storage.googleapis.com';

function extractPluginDeets(address: string) {
  const match = /public\/plugin-cdn\/(.+)\/(.+)\/module\.js/i.exec(address);
  if (!match) {
    return;
  }
  const [_, name, version] = match;
  return { name, version };
}

export function locateFromCDN(load: { address: string }): string {
  const { address } = load;
  // http://localhost:3000/public/plugin-cdn/pluginID/version/module
  const pluginPath = address.split('/public/plugin-cdn/');
  // https://plugin-cdn.storage.googleapis.com/pluginID/version/module
  return `${cdnHost}/${pluginPath[1]}`;
}

export function translateForCDN(load: any): any {
  const { address, name, source } = load;

  // console.log('--------------------- translateForCDN ------------------------');
  // console.log({ load });
  // console.log('^^ ---------------------');

  // Change paths into something that a CDN can work with?
  // http://localhost:3000/public/plugins/grafana-worldmap-panel/data <-- current plugin dist path
  // http://plugin-cdn.storageapi.google.com/grafana-worldmap-panel/0.2.2/data <-- current plugin-cdn path
  // http://plugin-cdn.storageapi.google.com/grafana-worldmap-panel/0.2.2/grafana-worldmap-panel/data <-- proposed cdn path
  // public/plugins -> http://plugin-cdn.storageapi.google.com/grafana-worldmap-panel/0.2.2 <-- replacement

  return load;
}
