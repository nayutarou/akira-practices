# Next.js キャッシュデモ & アプリケーション集

このプロジェクトは、Next.js の App Router における異なるキャッシュ戦略の挙動を理解するためのデモンストレーションと、いくつかのシンプルなアプリケーションをまとめたものです。

## 概要

Next.js は、ウェブアプリケーションのパフォーマンスを最適化するために様々なキャッシュメカニズムを提供しています。このプロジェクトでは、主に以下のキャッシュ戦略に焦点を当ててその挙動を視覚的に確認できます。

1.  **トップレベルキャッシュ (Full Route Cache)**
    ビルド時にページ全体が静的に生成され、キャッシュされる挙動を示します。主に頻繁に更新されないコンテンツに適しています。

2.  **関数キャッシュ (Data Cache)**
    `React.cache` を使用して、サーバーコンポーネント内で実行される非同期関数の結果を、単一のリクエストのライフサイクル内でキャッシュする挙動を示します。

また、これらのキャッシュ戦略についてまとめた解説ページも含まれています。

さらに、以下のシンプルなアプリケーションも実装されています。

*   **天気アプリ:** OpenWeatherMap API を利用して、指定した都市の天気情報を表示します。日本語での都市名入力に対応しています。
*   **ホテル検索アプリ:** 楽天トラベルAPIを利用して、日本のホテルを検索し、結果をページネーションや並び替え機能付きで表示します。

## セットアップ

1.  リポジトリをクローンします。
    ```bash
    git clone <リポジトリのURL>
    cd <プロジェクトディレクトリ>
    ```
2.  依存関係をインストールします。
    ```bash
    npm install
    ```
3.  **APIキーの設定:**
    `.env.local` ファイルを作成し、以下の環境変数を設定してください。
    *   **OpenWeatherMap API Key (天気アプリ用):**
        `NEXT_PUBLIC_OPENWEATHER_API_KEY=あなたのOpenWeatherMapAPIキー`
    *   **楽天トラベルAPI Application ID (ホテル検索アプリ用):**
        `RAKUTEN_TRAVEL_API_APP_ID=あなたの楽天トラベルAPIアプリケーションID`

## 実行方法

### 開発モード

開発サーバーを起動します。コードの変更が即座に反映されます。

```bash
npm run dev
```

ブラウザで `http://localhost:3000` にアクセスしてください。

**注意:** 開発モードでは、パフォーマンス最適化のためのキャッシュが完全に適用されない場合があります。特に「トップレベルキャッシュ」の真の挙動を確認するには、本番モードでの実行が必要です。

### 本番モード

アプリケーションをビルドし、本番サーバーを起動します。これにより、Next.js のすべての最適化（キャッシュを含む）が適用されます。

1.  アプリケーションをビルドします。
    ```bash
    npm run build
    ```
2.  本番サーバーを起動します。
    ```bash
    npm run start
    ```

ブラウザで `http://localhost:3000` にアクセスしてください。

## デモの確認

トップページ (`/`) から以下のデモページにアクセスできます。

*   **トップレベルキャッシュ (Full Route Cache) のデモ:** (`/cache-demos/top-cache`)
    *   **本番モード (`npm run start`) で確認:** ページに表示される時刻が、リロードしても更新されないことを確認してください。これは、ビルド時に一度だけ生成されたHTMLがキャッシュされているためです。

*   **動的レンダリング + 関数キャッシュ (Data Cache) のデモ:** (`/cache-demos/func-cache`)
    *   **開発モード (`npm run dev`) または本番モード (`npm run start`) で確認:** ブラウザをリロードするとページに表示される時刻が更新されることを確認してください。しかし、サーバー側のコンソール（`npm run dev` や `npm run start` を実行しているターミナル）を見ると、`getServerTimeJST` のログが1回しか表示されないことを確認してください。これは、`React.cache` によって同一リクエスト内での関数呼び出しがキャッシュされているためです。

*   **キャッシュ戦略のまとめ:** (`/cache-demos/cache-summary`)
    *   トップレベルキャッシュと関数キャッシュの概要、使い分けのポイントについて解説しています。

## アプリケーション

### 天気アプリ

OpenWeatherMap API を利用して、指定した都市の現在の天気情報を表示します。日本語での都市名入力に対応しています。

*   **アクセス方法:** [http://localhost:3000/weather-demos/weather-app](http://localhost:3000/weather-demos/weather-app)
*   **概要:** [http://localhost:3000/weather-demos/summary](http://localhost:3000/weather-demos/summary)

### ホテル検索アプリ

楽天トラベルAPIを利用して、日本のホテルを検索し、結果をページネーションや並び替え機能付きで表示します。評価の星表示にはSVGを使用し、小数点以下の評価も正確に表現しています。

*   **アクセス方法:** [http://localhost:3000/hotel-search-demos/hotel-search-app](http://localhost:3000/hotel-search-demos/hotel-search-app)
*   **概要:** [http://localhost:3000/hotel-search-demos/summary](http://localhost:3000/hotel-search-demos/summary)

## 技術スタック

*   Next.js
*   React
*   TypeScript
*   **API連携:**
    *   OpenWeatherMap API (天気アプリ)
    *   楽天トラベルAPI (ホテル検索アプリ)
*   **日本語処理:** `kuroshiro` および `kuromoji` (天気アプリの日本語入力対応)
*   **画像最適化:** Next.js Image コンポーネント (`next.config.ts` で外部ドメイン設定)
*   **UI/UX:** SVGによるカスタムコンポーネント (ホテル検索アプリの星評価)