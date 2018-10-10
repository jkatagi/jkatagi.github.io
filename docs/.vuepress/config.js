module.exports = {
    title: "jkatagi's pages",
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'ゼロから始める衛星画像解析', link: '/contents/google_earth_engine/' },
            { text: 'GitHub', link: 'https://github.com/jkatagi' }
        ]
    },
    markdown: {
        config: md => {
            md.use(require("markdown-it-katex"));
        }
    }
}
