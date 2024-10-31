import { addComponent, addComponentsDir, addPlugin, createResolver, defineNuxtModule } from "@nuxt/kit";
import { name, version } from "../package.json";

// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * @default 'PU'
   */
  prefix?: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: "ploraUi",
    compatibility: {
      nuxt: ">=3.13.2",
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {
    prefix: "PU",
  },
  async setup(_options, _nuxt) {
    const { resolve } = createResolver(import.meta.url);

    const runtimeDir = resolve("./runtime");
    _nuxt.options.build.transpile.push(runtimeDir);

    // Components
    addComponentsDir({
      path: resolve(runtimeDir, "components"),
      prefix: _options.prefix,
      watch: false,
    });
  },
});
