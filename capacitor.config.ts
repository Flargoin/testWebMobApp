import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.plastika-okon.app",
  appName: "ЛК 'Пластика Окон'",
  webDir: "dist",
  plugins: {
    CapacitorUpdater: {
      autoUpdate: false,
    },
  },
};

export default config;
