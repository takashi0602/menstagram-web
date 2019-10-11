# menstagram-web

**🍜 SUSURU FOREVER, SUSURU ANYWHERE 🍜**

menstagram-webはMenstagramのフロントエンド開発のためのリポジトリです。

## 環境構築

```bash
$ git clone https://github.com/uyupun/menstagram-web.git

$ cd menstagram-web

$ yarn install

$ yarn start
```

フォルダ構成
```text
/src
    /actions       // アクション
    /assets
        /images    // 画像
        /scss      // scssファイル
    /components    // コンポーネント
    /containers    // stateを受け取る層
    /middleware    // ミドルウェア
    /reducers      // リデューサー
    /sagas         // 非同期処理
    /store         // storeの生成
    /tests         // テスト
    routes.js      // ルーティング
    index.js       // アプリの起点
```
