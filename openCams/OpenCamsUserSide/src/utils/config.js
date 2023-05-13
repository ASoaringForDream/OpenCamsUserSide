module.exports = {
  siteName: 'GlobalOpenCams',
  copyright: '全球在线开放摄像头自动聚合平台 ©2023 ',
  logoPath: '/logo.png',
  apiPrefix: 'http://127.0.0.1:5000',
  fixedHeader: true, // sticky primary layout header

  /* Layout configuration, specify which layout to use for route. */
  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exclude: [/login/],
    },
  ],

  /* I18n configuration, `languages` and `defaultLanguage` are required currently. */
  // i18n: {
  //   /* Countrys flags: https://www.flaticon.com/packs/countrys-flags */
  //   languages: [
  //     {
  //       key: 'zh',
  //       title: '中文',
  //       flag: '/china.svg',
  //     },
  //   ],
  //   defaultLanguage: 'zh',
  // },
}
