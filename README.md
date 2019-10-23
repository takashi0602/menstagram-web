# menstagram-web

**🍜 SUSURU FOREVER, SUSURU ANYWHERE 🍜**

menstagram-webはMenstagramのフロントエンド開発のためのリポジトリです。

### 環境構築

```bash
$ git clone https://github.com/uyupun/menstagram-web.git
$ cd menstagram-web
$ yarn install
$ yarn start
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
│ └ scss        // scssファイル
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
