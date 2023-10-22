//gitの使い方
//https://qiita.com/A__Matsuda/items/f71a935612a55d6e674e
//https://magazine.techacademy.jp/magazine/6235
//https://backlog.com/ja/git-tutorial/stepup/29/

//expressの読み込み
const express = require("express")
const app = express()
const {createProxyMiddleware} = require("http-proxy-middleware")

//windowMsアクセス数の制限をもうける時間幅ミリビョウ
//15分で受けるアクセうすうう
const rateLimit = require("express-rate-limit")

//環境変数を用いる時
require("dotenv").config()


const limiter = rateLimit({windowMs:15*60*1000, max:10000})

//この場合すべてのURLに適合
//もし個別にしたい場合はreqresの間にlimiterを挟み込む
app.use(limiter)

//getリクエスト、/がurl、reqがブラウザからのリクエスrと、resがブラウザに返すレスポンス、
app.get("/", (req,res) => {
    res.send("This is my proxy server")
})

//フロントとバックエンドを結ぶサーバー
//urlは的着替える
//targetにはこのプロキシサーバーからアクセスしたいデータの供給下のurlを記載
//changeoriginフロントエンドからのリクエスト、それに対するレスポンスにはヘッダーという追加情報尾を開き込むスペースはあり、これに関係
//pathreは設定したURLをtargetのurlに追加したり置き換えたりする
app.use("/corona-tracker-world-data",(req,res,next) => {createProxyMiddleware({target: process.env.BASE_API_URL_CORONA_WORLD, changeOrigin: true,
    pathRewrite: {[`^/corona-tracker-world-data`]:"",
    },
})(req,res,next)
})

const port = process.env.PORT || 5000

//実行ポートの選択
app.listen(port, () => {
    console.log("Listening on localhost port ${port}")
})

module.exports = app