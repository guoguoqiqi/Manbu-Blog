/*
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-01 21:30:11
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-04 22:49:21
 */
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  // mode: "spa",
  head: {
    title: "漫步",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "漫步博客，web前端，Javascript，Vue，Node，React",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "ant-design-vue/dist/antd.css",
    "element-ui/lib/theme-chalk/index.css",
    "~assets/less/index.less",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~plugins/antd-ui",
    "~plugins/axios",
    "~plugins/mixins",
    {
      src: "~plugins/router",
      ssr: false,
    },
    {
      src: "~plugins//vueMarkdown.js",
      ssr: false,
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/style-resources",
    "@nuxtjs/axios",
    "cookie-universal-nuxt",
  ],
  styleResources: {
    sass: [],
    scss: [],
    less: ["@/assets/less/*.less"],
    stylus: [],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  rootDir: process.cwd(),
  buildDir: process.cwd() + "/.nuxt/",
};
