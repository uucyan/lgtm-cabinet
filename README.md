<div style="text-align: center;">
  <img width="691" alt="lgtm cabinet readme logo" src="https://user-images.githubusercontent.com/19953599/52172881-3c44fd80-27bc-11e9-8912-236ab408db8d.png">
</div>
<img width="1291" alt="lgtm cabinet readme logo2" src="https://user-images.githubusercontent.com/19953599/52173094-1883b680-27c0-11e9-805c-83aca2142879.png">

## LGTM Cabinet とは*
自分が保存している画像を簡単に LGTM 画像として利用できるようにするための画像管理アプリです。  
ローカル PC 内にあるフォルダ（ディレクトリ）から画像を一覧表示し、その中から簡単に画像をクリップボードへコピーすることが可能です。
  
このアプリのコンセプトとして、ローカル PC 内にあるデータの変更は一切行いません。  
なので、画像データが勝手に変わってしまったりフォルダが消えてしまうなどの事象は発生しません。  
その代わり、フォルダの作成や画像自体の管理はご自身で行っていただく必要がございます。
  
## 機能*
### 主な機能
----------------------------
- ローカルフォルダにある画像を簡単にコピーできる
- 外部サービスの [TheCatAPI.com](https://thecatapi.com/) から画像を取得し、マークダウンまたは URL 形式で簡単にコピーできる
- 外部サービスの [TheDogAPI.com](https://thedogapi.com/) から画像を取得し、マークダウンまたは URL 形式で簡単にコピーできる
----------------------------
  
### ローカルフォルダにある画像のサポート形式
----------------------------
- PNG
- JPEG
----------------------------
  
### GIF 画像について
残念ながら GIF 画像のコピーには対応できておりません。  
これは技術的な問題です。  
[Electron](https://electronjs.org/) が提供する [clipboard](https://electronjs.org/docs/api/clipboard) を利用してクリップボードへの画像のコピーを実現していますが、 [nativeImage](https://electronjs.org/docs/api/native-image) が GIF 形式の画像をサポートしていないため実現できませんでした。  
いつかサポートされたら対応したいと思います。  
※ 外部サービスから取得した GIF 形式の画像はコピー可能です。
  
## 今後*
今後実装したいと思っている機能です。  
期待せず待っていてください。  
  
  ----------------------------
- 画像の編集機能
    - 「LGTM」などのテキストを画像に加えれるようにする
    - 恐らく [Jimp](https://github.com/oliver-moran/jimp) を使って実装する
----------------------------
