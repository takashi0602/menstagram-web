# menstagram-web

**🍜 SUSURU FOREVER, SUSURU ANYWHERE 🍜**

menstagram-webはMenstagramのフロントエンド開発のためのリポジトリです。

### 環境構築

```bash
$ git clone https://github.com/uyupun/menstagram-web.git
$ cd menstagram-web
$ yarn install
```

### コマンド一覧

```bash
$ yarn start       // 起動
$ yarn build       // ビルド
$ yarn test        // テスト
$ yarn lint        // コード修正
```

### ディレクトリ構造

```text
src
├ actions       // アクション
├ assets
│ ├ images      // 画像
│ └ scss        // scssファイル(FLOCSS)
├ components    // コンポーネント
├ containers    // stateを受け取る層
├ middleware    // ミドルウェア
├ reducers      // リデューサー
├ sagas         // 非同期処理
├ store         // storeの生成
├ tests         // テスト
├ routes.js     // ルーティング
├ history.js    // history
└ index.js      // アプリの起点
```

### FLOCSS
https://github.com/hiloki/flocss

scssディレクトリ以下の構造はFLOCSSで記述する.

```text
scss
├ foundation    // ブラウザのデフォルトスタイルの初期化
├ layout        // ページを構成するコンテナーブロックのスタイルの定義
└ object        // プロジェクトにおける繰り返されるビジュアルパターンを3つのレイヤーで定義
　 ├ component   // 再利用できる小さな単位のモジュールを定義
　 ├ project     // いくつかのcomponentと、それに該当しない要素によって構成されるコンテンツを定義
　 └ utility     // わずかなスタイルの調整を定義
```
