// webpack.config.js
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const ZipPlugin = require("zip-webpack-plugin");

module.exports = (env) => {
  const browser = env.browser || "chrome"; // 'chrome' ou 'firefox'

  // Cria uma cópia do manifest base e adiciona configurações específicas
  const baseManifest = require("./src/manifest.json");
  let browserManifest = { ...baseManifest };
  if (browser === "firefox") {
    browserManifest.browser_specific_settings = {
      gecko: {
        id: "YouTube_Grid_Styler@leandrogazoli.com",
        strict_min_version: "109.0",
      },
      gecko_android: {
        strict_min_version: "113.0",
      },
    };
  }

  // A configuração do Webpack
  return {
    mode: "production", // 'development' para depuração, 'production' para o final
    entry: {
      "content_scripts/content": "./src/content_scripts/content.js",
      "popup/popup": "./src/popup/popup.js",
    },
    output: {
      path: path.resolve(__dirname, `dist/${browser}`),
      filename: "[name].js",
      clean: true, // Limpa a pasta de destino antes de cada build
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: "src/icons", to: "icons" },
          { from: "src/popup/popup.html", to: "popup" },
          { from: "src/popup/popup.css", to: "popup" },
          { from: "src/polyfills/browser-polyfill.js", to: "polyfills" },
          { from: "src/_locales", to: "_locales" },
          {
            from: "src/manifest.json",
            to: "manifest.json",
            // Transforma o manifest base no específico do browser
            transform(content) {
              return JSON.stringify(browserManifest, null, 2);
            },
          },
        ],
      }),
      new ZipPlugin({
        path: path.resolve(__dirname, "dist"),
        filename: `${browser}-youtube-grid-styler-v${baseManifest.version}.zip`,
      }),
    ],
    devtool: "cheap-module-source-map", // Ajuda na depuração
  };
};
