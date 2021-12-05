# MSLoader

MSLoaderはシンプルなローディング表示用のJavaScriptライブラリです。

## 使用方法

### npmでのダウンロード

```bash
$ npm i msloader
```

### ファイル読み込み

css読み込み
```html
<link rel="stylesheet" href="./src/css/msloader.min.css">
```

JavaScript読み込み
```html
<script src="./src/js/msloader.js"></script>
```

node.jsを使用して読み込み
```js
window.MSLoader = require('msloader');
```

## 最もシンプルなローディング表示方法

```html
<script>
    let msloader = new MSLoader();
    // ローディング開始
    msloader.start();
    // 5秒後にローディングを閉じる
    setTimeout(function () {
        msloader.stop();
    }, 5000);
</script>
```
デフォルトでは画面全体を覆うようにして、モーダルが表示されます。

## Methods 

以下のmethodが使用可能です。

| method | 内容 | 引数 | 戻り値 |
----|----|----|---- 
| start() | ローディング開始 | 無し | MSLoader |
| stop() | ローディング終了 | 無し | MSLoader |
| setOption(options) | ローディングのoptionを更新 | options | MSLoader |
| init(options) | ローディング自身やoptionを初期化| options | MSLoader |
| detach() | ローディングDOM要素を削除 | 無し | MSLoader |

## Options

以下のoptionが設定可能です。

| option | 内容 | デフォルト |
----|----|---- 
| position | ローディング要素のposition | 'fixed' |
| target | ローディングが表示される要素 | document.querySelector('html body') |
| timeout | ローディングtimeout時間 | null |
| isDetached | ローディング終了時に要素を取り除くか | false |
| type | ローディングタイプ | 'type-1' |
| zIndex | ローディング全体（透過背景も含む）のz-index | null |
| bgColor | ローディングの背景色 | '#000000' |
| bgOpacity | ローディングの背景透過度 | 0.5 |
| content | ローディング内容 | null |
| onStart | ローディング開始直前の処理 | function(){} |
| onStarted | ローディング開始直後の処理 | function(){} |
| onStop | ローディング終了直前の処理 | function(){} |
| onStoped | ローディング終了直後の処理 | function(){} |