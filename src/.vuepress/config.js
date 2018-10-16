module.exports = {
    title: "jkatagi's pages",
    base: '/',
    ga: 'UA-127509180-1',
    dest: 'docs',
    markdown: {
        config: md => {
            md.use(require("markdown-it-katex"));
        }
    },
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'GoogleEarthEngine入門-ゼロから始める衛星画像解析-', link: '/contents/google_earth_engine/' },
            { text: '論文メモ', link: '/contents/paper_review/' },
            { text: 'Github', link: 'https://github.com/jkatagi' }
        ],
        sidebar: {
            '/contents/google_earth_engine/': [
                {
                    title: 'GoogleEarthEngine入門-ゼロから始める衛星画像解析-',
                    collapsable: false,
                    children: [
                        ['/contents/google_earth_engine/chap01/', '第1章：はじめに'],
                        ['/contents/google_earth_engine/chap02/', '第2章：衛星画像を見てみよう'],
                        ['/contents/google_earth_engine/chap03/', '第3章：衛星画像の表示'],
                        ['/contents/google_earth_engine/chap04/', '第4章：植生指数の計算'],
                        ['/contents/google_earth_engine/chap05/', '第5章：夜間光の解析'],
                        ['/contents/google_earth_engine/chap06/', '第6章：土地利用をマッピング'],
                        ['/contents/google_earth_engine/chap07/', '第7章：マイクロ波による解析'],
                        ['/contents/google_earth_engine/chap08/', '第8章：熱赤外による解析'],
                        ['/contents/google_earth_engine/chap09/', '第9章：空間解像度を上げる手法　パンシャープンの実践'],
                        ['/contents/google_earth_engine/chap10/', '第10章：セグメンテーション'],
                        ['/contents/google_earth_engine/chap11/', '第11章：おわりに'],
                    ]
                },
            ]
        }
    }
}
