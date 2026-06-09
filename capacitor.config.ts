import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.company.app',
  appName: 'My App',
  webDir: 'public',

  server: {
    url: 'http://192.168.1.100:3000',
    cleartext: true,
  },
};

export default config;
