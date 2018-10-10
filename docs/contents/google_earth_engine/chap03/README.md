---
sidebar: auto
---

# 衛星画像の表示
本章では様々な人工衛星の画像を読み込み，実際に表示してみます。
その過程を通じて各衛星の特徴を掴みます。

## そもそも画像って？

著者は初めて人工衛星画像の世界に飛び込んだとき，「え，人工衛星って写真を取ってるのではないの？」と疑問を抱きました。
それは半分正解で，半分不正解です。
人工衛星が観測しているのは，波長に応じた物理量です。
その物理量を電圧として記録し，その電圧値に基づいて「画像を生成する」のです。

画像を生成することを専門用語で再生処理と言います。
この処理は専門の知識を要するので、一般的には衛星画像を配布している団体が処理を行うので、一般の利用者は行いません。
Google Earth Engineでも再生処理済みの画像を使うことなります。

## 標高の表示（SRTM）

では早速画像を表示させてみましょう。 Code Editor → Scripts →
Examplesをクリックしてみましょう。
このレポジトリには、Googleが用意した様々なスクリプトが含まれています。
まずは一番上のImage → From Nameというスクリプトを開いてみましょう。

このようなスクリプトが表示されます。
そうしたら画面中央上部のRUNをクリックしてください。
すると以下のような画像が表示されるはずです。
もし表示されない場合、右側のConsoleに赤い背景で何か文字が表示されるはずです。
考えられるのはインターネットに繋がっていないか、何かソースコードをいじってしまったかです。
その場合はもう一度From Nameを開きなおしましょう。
その時、変更を保存しないで移動するかどうかを聞かれるので、Yesをクリックしてください。

今回表示した画像はSRTM (Shuttle Radar Topography
Mission)というスペースシャトルで観測された地形の高さを表示したデータです。
現在の表示範囲はアメリカになっているので、アメリカ大陸の標高データが表示されています。

さて、今一度スクリプトに戻り、何をやっているかを一行ずつ読み取っていきましょう。
まず1行目はスクリプトの動作を記述したコメントです。
JavaScriptのコメントは半角スラッシュ2つ(//)で始まります。
コメントはコードの実行には影響されません。
スクリプト全体で何をしているのかを簡単に1行目にコメントしておくと良いでしょう。

続いて3行目はimageという変数に画像オブジェクトを代入しています。
プログラミング初心者の方は変数や画像オブジェクトがどういう意味か分からないかもしれませんが、とりあえずはそういうものがあるのだなと思って読み進めていきましょう。

5行目は画像の表示の中心を指定しています。
括弧の中（引数といいます）の左から緯度、経度、ズームレベルです。
試しにこの値を変えてみましょう。
ズームレベルを5から10にすると、先ほどよりズームしたことが分かります。
次に16にしてもう一度実行してみましょう。
すると今度は近すぎて何がなんだか分からない感じになってしまいました。
思い切ってこの値を100にしてみましょう。
すると実行に失敗し、Consoleという画面で“Zoom must be within \[0’,
24\].”というエラーメッセージが表示されます。
どうやらズームレベルは0から24までしか対応していないようです。

このように実行に失敗してもエラーがその原因を教えてくれます。
また万が一直し方が分からなくなっても（保存せずに終了すれば）最初の状態に戻せるので、どんどん試していきましょう。
とりあえず画像が表示されるズームレベルに値を適当に（もちろん0から24の間で）設定しておきましょう。

さて、ズームレベルの次は緯度経度の値を変えてみましょう。
アメリカだと地理感が働かないので、日本に移動してみます。
とりあえず関東地方（北緯36度東経140度）にするために、Map.setCenter()の引数を以下のようにし、実行してみましょう。

```javascript
Map.setCenter(140, 36, 8);
```

黒く見えているところが標高が低い場所で、白く見えているところが標高が高い場所です。
本州の中央付近に白いところ（標高が高い場所）が集中しています。
このあたりは日本アルプスと呼ばれているところで、標高の高い山々が集中しています。
その右下に一際目立っている箇所が、富士山です。

今，関東平野に注目していますが，真っ黒になっています。
これは関東平野が標高が（山々に比べて）標高が低いためです。
そのためにスクリプトを修正します。
まずは修正前のスクリプトを見てみます。

<!--
```  {caption="関東平野" startFrom="7"}
-->
```javascript
Map.addLayer(image, {min: 0, max: 3000}, 'SRTM');
```

この行ではレイヤーに画像（image）を追加し、最小値を0 m、最大値を3000
m、レイヤーの名前を’SRTM’としています。 デフォルトのレイヤーにGoogle
Mapが表示されており、その上にSRTMの画像を重ねて表示させている、ということです。
この値を最小値0 m、最大値100 mとしてみましょう。

<!--
``` {caption="関東平野" startFrom="7"}
-->
```javascript
Map.addLayer(image, {min: 0, max: 100}, 'SRTM');
```

関東平野がはっきり見えました。
こうしてみると関東平野の中でも標高の高い場所・低い場所があることがわかります。
地図の右上にLayersというパネルがあります。
この上にカーソルを持っていくとSRTMという文字が現れます。
SRTMの文字の右側のスライドバーを左に動かしてみましょう。
すると下の地図と重ねて表示することができます。
いろんな都市をズームしてみてみると，いつもとは違った標高という情報が加味され，一味違う地図になります。
試しに東京を見てみましょう。
東京の下町は真っ黒（かなり低地）であることがわかります。
しかしその西側は比較的高地であることがわかります。
地図を確認してみると新宿あたりであることがわかります。
今，山手線に注目して見ると，山手線は台地に沿って線路が引かれていることがわかります。
すなわち山の近くに沿線があるから「山手線」なのです。

次に府中のあたりに注目してみます。 Google Earth
Engineのロゴの右に府中と入力すると（スペースは押さないでください）PLACESに場所の候補が出てきます。ここでいいt版上のJapan,
Tokyo,府中市をクリックします。すると府中に画像の中央が設定されます。
さて，府中に注目してみると北から南に向けて色が三段階（高い→低い）と段上になっていることがわかります。これは河川により形成された河岸段丘です。
このようにレイヤを重ねて解析することはGIS（）では度々行われる手法です。

続いて場所を変えてもう少し富士山を目立たせてみましょう。 最小値3000
m、最大値4000 mとしてみましょう。

<!--
``` {caption="富士山のみ" startFrom="7"}
-->
```javascript
Map.addLayer(image, {min: 3000, max: 4000}, 'SRTM');
```

すると1点だけ白く表示されます。 これが富士山の山頂です。

色を目立たせるために、白と黒を逆転させてみましょう。

```javascript
Map.addLayer(image, {min: 3000, max: 4000, palette: ['FFFFFF', '000000']}, 'SRTM');
```

“max: 4000”の後に、“palette: \[’FFFFFF’, ’000000’\]”を追加しました。
これはカラーパレットと呼ばれるもので、最小値に対応する色（FFFFFF）と最大値に対応する色（000000）をそれぞれ割り当てています。
色の値はそれぞれ6桁の英数字で表され、これをカラーコードと言います（コラムを参照）。
今回は白に対応するFFFFFFと黒に対応する000000を用いました。
実行してみると実際に色が反転したことが分かります。

今度は富士山の標高値を調べてみましょう。
Map.setCenter()を富士山付近に変更してもいいですが，ここではマップ画面にマウスを持って行き、ホイールで拡大してみましょう。
その後右上の画面にInspectorというボタンをクリックしてください。
これは地図上のレイヤーの値を調べるときに使うものです。
黒くなっているところを適当にクリックすると、右上の画面に値が表示されます。
標高はPixels→ SRTM → elevationという欄に表示されます（約3500 m）。

RGB画像の表示（Landsat8）
-------------------------

さて、前節では既存のスクリプトを改良していきました。
本節では前節で学んだことを活かしながら、一からコードを書いてみましょう。

RGB画像の表示の練習として、Landsat 8を使用します。
LandsatはNASAの地球観測衛星シリーズです。
初代のLandsatは1972年に打ち上げられれ、現在は8号が打ち上げられています。
このように長い期間観測することは地球環境をモニタリングする上で非常に重要です。
Landsatで撮られた画像はもともとは有償でしか使えなかったのですが、xxxx年に全部のデータを無償で利用できるようになりました。
まずはスクリプトを格納するレポジトリを作成しましょう。 Code
Editorの左上の画面のNEWをクリックし、Repositoryを選択します。
そして空欄に名前を入力（ここではTutorialとしましょう）し、Createをクリックします。
するとOwnerの中に
users/your\_name/Tutorialというレポジトリが作成されます（your\_nameはあなたのGoogleアカウントです）。

続いてスクリプトを作成しましょう。
再びNEWをクリックし、今度はFileを選択します。
users/your\_name/Tutorialを選択し、UntitledFileを削除してlandsat8\_showingと入力し、OKをクリックします。
これでスクリプトが作成されました。

スクリプトを早速編集してみましょう。
users/your\_name/Tutorialの中のlandsat8\_showingをクリックします。

まずはじめに画像オブジェクトを作成します。 Google Earth
Engineでは、データセットをImageCollection IDというもので識別します。
先ほどの例では、’CGIAR/SRTM90 V4’でした。
このIDを調べるには、検索エンジン（Goolge Earth
Engineのロゴの右隣の欄）を用います。 Landsat
8と入力すると、候補となるデータ名がRASTERという文字の下に出てきます。
RASTERはラスター画像を意味します（コラム参照）。 USGS Landsat 8 Surface
Reflectanceを選びましょう。

するとプロダクトの概要や観測バンドの情報、観測期間などが表示されます。
Importの上にImageCollection
IDという欄があり、そこに’LANDSAT/LC08/T1\_SR’と書かれているので、これをコピーします（なお、その下のImportを押すと自動的に変数が宣言されますが，今回は押しません）。

<!--
``` {caption="Landsat" 8="" startFrom="1"}
-->
```javascript
var landsat8_img = ee.Image('LANDSAT/LC08/C01/T1_SR');
// Center the Map.
Map.setCenter(140, 36, 8);
// Display the image.
Map.addLayer(landsat8_img);
```

おっと、“Layer 1: Layer error: Image.load: Asset
’LANDSAT/LC08/C01/T1\_SR’ is not an
Image.”というエラーが表示されました。
…T1\_SRというのはイメージではないと言っています。
これは日付を指定していなかったためです。

日付を指定する方法は2つあります。
1つは日付に対応するファイル名（例えばxxx）をT1\_SRの下に追加（T1\_SR/xxx）することです。
この方法では各衛星画像のファイル命名規則を知っていなければなりません。

もうひとつの方法は日付の期間を指定する方法です。
今回は後者でやってみましょう。

まずはじめ（landsat8\_imgの前に）に開始日（start）と終了日（finish）をee.Date()という関数で指定します。

<!--
``` {caption="Landsat" 8="" 1="" startFrom="1"}
-->
```javascript
var start = ee.Date('2017-01-01');
var finish = ee.Date('2017-01-31');
```

続いてee.Imageクラスをee.ImageCollectionクラスに変え、filterDate()という関数で検索期間を指定します。

<!--
``` {caption="Landsat" 8="" 2="" startFrom="3"}
-->
```javascript
var landsat8_img = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
  .filterDate(start, finish);
```

最後にbandsとしてRed、Green、Blueを並べます。 Landsat
8はバンド4(B4)がRed、バンド3（B3）がGreen,バンド２（B2）がBlueです。

<!--
``` {caption="Landsat" 8="" 3="" startFrom="5"}
-->
```javascript
Map.addLayer(landsat8_img, {bands: ['B4', 'B3', 'B2']} );
```

これを実行すると、薄暗い色の画像が表示されます。
これは画像の最大値・最小値を適切に設定していなかったためです。
bandsの隣に最小値と最大値を入力してみましょう。
最小値、最大値は適当に設定しました。

<!--
``` {caption="Landsat" 8="" 4="" startFrom="5"}
-->
```javascript
Map.addLayer(landsat8_img, {bands: ['B4', 'B3', 'B2'], min :0, max:3000 });
```

今度はいい感じに表示されました。
色合いを決めるパラメータが少し長くなり、Map.addLayer()の行が長くなってきたので、vizParamsという名前の変数にパラメータをまとめておきましょう。

<!--
``` {caption="Landsat" 8="" 5="" startFrom="5"}
-->
```javascript
var vizParams = {bands: ['B4', 'B3', 'B2'], min:0, max:3000};
Map.addLayer(landsat8_img, vizParams);
```

このようにしておくと、見た目がすっきりします。

さて、せっかく表示することができたので、この画像をじっくり見てみましょう。
一見するとすごく鮮明に見えますが、マウスを使ってズームしてみるとズームレベル14あたりからぼやけて見えてきます。
更に拡大して見ると、かなりギザギザしていることが分かります。

試しに航空写真に切り替え、Layers 1を非表示にしてみましょう。
すると航空写真との差が鮮明に分かります。
このように1画素の大きさを空間解像度と呼びます。
Landsat8の空間解像度は約30 m、すなわち1画素の大きさは約30 mです。

今度は逆にズームアウトしてみましょう。
すると画像同士が重なりあったりしているのが見て取れます。
人工衛星による観測は、一度に地球全体を観測することが出来ません。
そのためある一定の幅を観測しながら、地球をぐるぐる回り続けているのです。
ちなみにLandsat8の場合、この観測幅は約 km です。

なお、今回表示させたかった場所（北緯36度東経140度）以外の画像を読み込みたくない場合、ImageCollection()にfilterBounds()を追加します。
追加した最終バージョンを以下に載せます。

<!--
``` {caption="Landsat" 8="" 6=""}
-->
```javascript
var start = ee.Date('2017-01-01');
var finish = ee.Date('2017-01-31');
var lon = 140;
var lat = 36
var point = ee.Geometry.Point(lon, lat);

var landsat8_img = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
  .filterBounds(point)
  .filterDate(start, finish);
Map.setCenter(lon, lat, 13);
var vizParams = {bands: ['B4', 'B3', 'B2'], min:0, max:3000};
Map.addLayer(landsat8_img, vizParams);
```

表示させたい場所の緯度経度はそれぞれlat、lonという変数に格納しておきました。
今回の例では緯度経度を(1)画像選択；filterBounds()(2)表示範囲の設定；Map.setCenter()の2箇所で使用しています。
変数を使わないと、緯度経度を変更する場合、2箇所とも書きなおさなければなりません。
2箇所くらいなら大丈夫でしょと思うかもしれませんが、これが5箇所・10箇所と増えていくと、直し忘れが出てきたりと大変です。
変数を用いることにより、変数を宣言している箇所のみを修正すればいいことになります。

なお、今回はズームアウトしても、画像が一枚しか表示されていないことが分かります。

高分解能衛星：Sentinel-2
------------------------

今度はLandsat
8より解像度の高い、Sentinel-2という衛星が観測した画像を表示させます。
Sentinel-2はコペルニクス計画という地球観測ミッションを負っているESA（European
Space Agency, 欧州宇宙機関）という機関が打ち上げた衛星です。
全部で12の波長帯を観測していますが、今回はそのうちの可視光（赤・青・緑）と近赤外の合わせて4バンドを使用します。

まずはじめにSentinel-2のプロダクトの仕様を調べてみましょう。
GoogleEarthEngineの横の検索欄に“Sentinel-2”と入力します。
するとRASTERSにSentinel-2
MSIと表示されるので，それをクリックしてください。
先程説明したSentinel-2の概要が最初に書かれており，その下に“Bands”という情報があります。
今回使用する3つのバンド（赤・緑・青）はそれぞれB4（赤）・B3（緑）・B2（青）ということがわかりました。

さてでは実際にSentinel-2が観測した画像を表示させてみましょう。
Landsat8の例ではImportの上のImageCollection
IDをコピペしてScriptに入力しました。 今度は直接Importしてみましょう。
そのためにはImportをクリックします。
するとScriptの上部に以下のような文字列が現れたかと思います。

    Imports (1 entry)
    var imageCollection: ImageCollection "Sentinel-2 MSI: MultiSpectral Instrument, Leve-1C"

これでSentinel-2のMSIデータセットをimageCollectionという変数で宣言したことになります。
imageCollectionをクリックすると名前を変えることもできます。
ここではsentinel2ImageCollectionという名前にしてみましょう。

    Imports (1 entry)
    var sentinel2ImageCollection: ImageCollection "Sentinel-2 MSI: MultiSpectral Instrument, Leve-1C"

そしてLandsat8の例と同じ地点・同じ時期の画像を表示させてみましょう。
先程のScriptを再掲します。
```javascript
var start = ee.Date('2017-01-01');
var finish = ee.Date('2017-01-31');
var lon = 140;
var lat = 36
var point = ee.Geometry.Point(lon, lat);

var landsat8_img = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
.filterBounds(point)
.filterDate(start, finish);
Map.setCenter(lon, lat, 13);
var vizParams = {bands: ['B4', 'B3', 'B2'], min:0, max:3000};
Map.addLayer(landsat8_img, vizParams);
```

このスクリプトのどこを変えればいいでしょうか。
まず表示させる地点と時期は同じなので，1行目から5行目まではそのままです。
次に7行目の画像の宣言ですが，これは変更します。
変数名はlandsat8\_imgにならい，sentinel2\_imgとしましょう。
ee.ImageCollection(’LANDSAT/LC08/C01/T1\_SR’)の部分はすでに変数宣言済み（sentinel2ImageCollection）なのでそれを入れます。
残りの行は先程と同じです。
```javascript
var sentinel2_img = sentinel2ImageCollection
  .filterBounds(point)
  .filterDate(start, finish);
```
最後にMapに追加するレイヤの変数名を変更します。

```javascript
Map.addLayer(sentinel2_img, vizParams);
```
最終的なコードは以下になります。

```javascript
var start = ee.Date('2017-01-01');
var finish = ee.Date('2017-01-31');
var lon = 140;
var lat = 36
var point = ee.Geometry.Point(lon, lat);

var sentinel2_img = sentinel2ImageCollection
  .filterBounds(point)
  .filterDate(start, finish);
Map.setCenter(lon, lat, 13);
var vizParams = {bands: ['B4', 'B3', 'B2'], min:0, max:3000};
Map.addLayer(sentinel2_img, vizParams);
```

これを走らせてみるとLandsat8に比べてSentinel-2のほうが解像度が高いことがわかります。
2つの画像を重ねて表示させるともっと分かりやすいと思われるので，以下に2枚表示させるコードを掲載します。

```javascript
var start = ee.Date('2017-01-01');
var finish = ee.Date('2017-01-31');
var lon = 140;
var lat = 36
var point = ee.Geometry.Point(lon, lat);

var sentinel2_img = sentinel2ImageCollection
  .filterBounds(point)
  .filterDate(start, finish);

var landsat8_img = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
  .filterBounds(point)
  .filterDate(start, finish);

Map.setCenter(lon, lat, 13);
var sentinel2VizParams = {bands: ['B4', 'B3', 'B2'], min:0, max:3000};
var landsat8VizParams = {bands: ['B4', 'B3', 'B2'], min:0, max:3000};
Map.addLayer(sentinel2_img, sentinel2VizParams, "sentinel2");
Map.addLayer(landsat8_img, landsat8VizParams, "landsat8");
```

レイヤをわかりやすくするために，Map.addLayerの3つ目の引数にレイヤ名を渡しました。
MapのLayersから書くレイヤを表示・非表示させたりズームしてみたりして解像度の違いを体感してみましょう。

中分解能衛星：MODIS
-------------------

今度はLandsat
8より解像度が低い、MODISというセンサーが観測した画像を表示させます。
MODISとはNASAが打ち上げたTerra衛星・Aqua衛星の2機の人口衛星に搭載されているセンサーです。
このセンサーがあまりにも有名なためか、人工衛星界隈では衛星名を省略して単にMODIS、あるいはTerra／MODISのように呼びます。
MODISが観測した画像は様々な処理が施され、プロダクトとしてリリースされます。
今回はそのプロダクトの一つであるMOD09A1を使います。
MOD09A1は8日間の平均を取った画像で、空間解像度は500 mです。

先程のLandsat8・Sentinel-2の二枚の画像を表示させるスクリプトに追記していきましょう。
まずはじめにSearchにMOD09A1と入力します。
すると候補が2つ出てくるので，今回はTerra衛星の方（MOD09A1.006）を選びましょう。
Bandsの情報には色情報が書かれていないので，波長から色を考えます。
するとsur\_refl\_b01（赤）・sur\_refl\_b04（緑）・sur\_refl\_b03（青）とわかります。
Importを押してImageCollectionを宣言しましょう。
変数名はmodisImageCollectionとします。

あとは先の例と同じ手順で変数の宣言・色の設定をします。
スクリプトは以下のようになります。

```javascript
var start = ee.Date('2017-01-01');
var finish = ee.Date('2017-01-31');
var lon = 140;
var lat = 36
var point = ee.Geometry.Point(lon, lat);

var sentinel2_img = sentinel2ImageCollection
  .filterBounds(point)
  .filterDate(start, finish);

var landsat8_img = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
  .filterBounds(point)
  .filterDate(start, finish);

var modis_img = modisImageCollection
  .filterBounds(point)
  .filterDate(start, finish);

Map.setCenter(lon, lat, 13);
var sentinel2VizParams = {bands: ['B4', 'B3', 'B2'], min:0, max:3000};
var landsat8VizParams = {bands: ['B4', 'B3', 'B2'], min:0, max:3000};
var modisVizParams = {bands: ['sur_refl_b01', 'sur_refl_b04', 'sur_refl_b03'], min:0, max:3000};
Map.addLayer(sentinel2_img, sentinel2VizParams, "sentinel2");
Map.addLayer(landsat8_img, landsat8VizParams, "landsat8");
Map.addLayer(modis_img, modisVizParams, "modis");
```

おっと，MODISの画像が斜めになっているようです。
これを修正するためにはリプロジェクション（再投影）という概念を学ばなければなりません。

リプロジェクションとは…

（書きかけ）

modis\_imgの下にreproject（）関数を使用してリプロジェクションします。
引数はEPSGコード，crsTransform，scaleの順です。
今回はcrsTransformはnullとしました（なぜか、追記予定）。

```javascript
var modis_reprojected_img = modis_img.reproject('EPSG:4326', null, 500);
```

さてこれを走らせると

    modis_img.reproject is not a function

というエラーメッセージがConsoleに表示されていますが，ちょっとわかりにくいエラーです。
ここでDocsを使ってreproject関数を調べてみましょう。
Scriptsの横のDocsをクリックし，reprojectと入力します。
するとee.Imageというクラスの関数であることがわかります。

もう一度Scriptに戻ってバグを探しましょう。
デバッグの常套手段としてprintデバッグというのがあります。
これはprint()関数を利用して情報を出力し，バグを探すというものです。
modis\_imgの下（modis\_reprojected\_imgの上）に以下を挿入します。

```javascript
print(modis_img);
```

走らせるとConsoleに“ImageCollection MODIS/006/MOD09A1 (4
elements)”という情報が表示されます。
featuresをクリックすると，modis\_imgは4つの画像が収納されていることがわかります。
このように複数の画像が収納されているクラスをImageCollectionといいます。
先程のDocsを思い出すと，reproject関数はImageクラスでした。
そこでImageCollectionをImageに変換すれば良いと推測されます。

今回はImageCollectionの最初の一枚を使用することにします。

```javascript
var modis_img = modisImageCollection
  .filterBounds(point)
  .filterDate(start, finish)
  .first(); // first()を追加し，最初の一枚を選択。

var modis_reprojected_img = ee.Image(modis_img).reproject('EPSG:4326', null, 500);
```

ee.Image(modis\_img)はmodis\_imgをee.Imageクラスにキャストしています。
これはee.ImageCollectionが様々なデータ型を収納しているためだそうです（ソース：https://developers.google.com/earth-engine/tutorial\_api\_04）。

リプロジェクション後のスクリプトは以下のようになります。

```javascript
var start = ee.Date('2017-01-01');
var finish = ee.Date('2017-01-31');
var lon = 140;
var lat = 36
var point = ee.Geometry.Point(lon, lat);

var sentinel2_img = sentinel2ImageCollection
  .filterBounds(point)
  .filterDate(start, finish);

var landsat8_img = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
  .filterBounds(point)
  .filterDate(start, finish);

var modis_img = modisImageCollection
  .filterBounds(point)
  .filterDate(start, finish)
  .first(); // first()を追加し，最初の一枚を選択。

var modis_reprojected_img = ee.Image(modis_img).reproject('EPSG:4326', null, 500);

Map.setCenter(lon, lat, 13);
var sentinel2VizParams = {bands: ['B4', 'B3', 'B2'], min:0, max:3000};
var landsat8VizParams = {bands: ['B4', 'B3', 'B2'], min:0, max:3000};
var modisVizParams = {bands: ['sur_refl_b01', 'sur_refl_b04', 'sur_refl_b03'], min:0, max:3000};
Map.addLayer(sentinel2_img, sentinel2VizParams, "sentinel2");
Map.addLayer(landsat8_img, landsat8VizParams, "landsat8");
Map.addLayer(modis_reprojected_img, modisVizParams, "modis");
```

リプロジェクション前は斜めであった画像がきれいにまっすぐになったかと思います。

トゥルカラー・ナチュラルカラー・フォールスカラー
------------------------------------------------

ここまで画像を表示するときのカラーパレットのRGBそれぞれに対して，対応するバンドを割り当ててきました。
たとえばLandsat8では，赤色にBand4を，緑色にBand3を，青色にBand2を，といった具合です。

<!--
``` {caption="Landsat" 8のトゥルーカラー=""}
-->
```javascript
Map.addLayer(landsat8_img, {bands: ['B4', 'B3', 'B2'], min :0, max:3000 });
```

このように衛星画像が観測した波長と実際に可視化するときの色の組み合わせをトゥルーカラーといいます。
実際に目で見たような色合いになるのでトゥルー（＝実際の）カラーということです。
一方で植物を解析するときにはフォールスカラーやナチュラルカラーを用います。
植物は一般的に近赤外（0.7-2.5 $\mu m$） の光を強く反射します。
この特性を利用し赤色に赤色のバンドを，緑色に近赤外のバンドを，青色に緑色のバンドを対応させたものがナチュラルカラーです。
こうすることで植物が分布している場所が緑色になります。
植物の分布と緑色が対応するのでナチュラルカラーと呼ばれています。

<!--
``` {caption="Landsat" 8のナチュラルカラー=""}
-->
```javascript
Map.addLayer(landsat8_img, {bands: ['B4', 'B5', 'B3'], min :0, max:3000 });
```

またその他にもフォールスカラーという配色もあります。
フォールスカラーの配色には様々な対応関係がありますが（TIP），植物の分布を解析する場合には赤色に近赤外のバンドを，緑色に赤色のバンドを，青色に緑色のバンドを対応させます。

::: tip
例えばNASAのホームページには赤色に短波長赤外を，緑色に近赤外を，青色に緑色を割り当てる組み合わせを紹介しており，他にもいくつか組み合わせを紹介しています。https://earthobservatory.nasa.gov/Features/FalseColor/page6.php
:::

<!--
``` {caption="Landsat" 8のフォールスカラー=""}
-->
```javascript
Map.addLayer(landsat8_img, {bands: ['B5', 'B4', 'B3'], min :0, max:3000 });
```

以上の３つの組み合わせをまとめて表示するのが以下のスクリプトです。

<!--
``` {caption="Landsat8" の様々なカラー表示=""}
-->
```javascript
var start = ee.Date('2017-01-01');
var finish = ee.Date('2017-01-31');
var lon = 140;
var lat = 36
var point = ee.Geometry.Point(lon, lat);

var landsat8_img = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
  .filterBounds(point)
  .filterDate(start, finish);

Map.setCenter(lon, lat, 13);

var trueColorVizParams = {bands: ['B4', 'B3', 'B2'], min:0, max:3000};
var naturalColorVizParams =  {bands: ['B4', 'B5', 'B3'], min :0, max:3000 };
var falseColorVizParams =  {bands: ['B5', 'B4', 'B3'], min :0, max:3000 };

Map.addLayer(landsat8_img, trueColorVizParams, "True color");
Map.addLayer(landsat8_img, naturalColorVizParams, "Natural color");
Map.addLayer(landsat8_img, falseColorVizParams, "False color");
```

植物が生えている箇所を探し，それぞれのカラー表示の見え方を確認してみましょう。

まとめ
------

本章では様々な衛星画像を可視化しました。
まずはじめにSRTM90という標高データを見ました。
続いてLandsat-8が観測した可視光を組み合わせて，RGB合成の基本を学びました。
次に高分解能衛星の一例としてSentinel-2を，中分解能衛星のTerra/MODISを可視化しました。MODISの例ではプロジェクションという大切な概念を学びました。
最後に再びLandsat-8を用いて，トゥルーカラー・フォールスカラー・ナチュラルカラーを学びました。

衛星画像解析の第一歩は「実際に画像を表示させて眺めてみること」です。
今回習ったテクニックで自分の住んでいる地域や海外旅行で行ってみたい場所などを表示させ，色々調べてみましょう。

練習問題
--------

1.  SRTMでカラーパレットの色を変更し、低い箇所を青、高い箇所を赤にしてみましょう。さらにカラーパレットに複数の色を挿入してみましょう。そうすると何が起きますか。

2.  Landsat
    8の画像の取得期間を適当に変えてみましょう。時期によって色合いに変化があるかを確認しましょう。

3.  Landsat
    8の画像を複数重ねてみましょう（ヒント：Map.addLayer()を複数回書きます）。

4.  Importを押すと、自動で変数を挿入してくれます。この機能を使うことのメリット・デメリットをそれぞれ考えてみましょう。

5.  この章で使用した関数のドキュメントを読んでみましょう（ヒント：Code
    Editorの左上のDocsから検索してみましょう）。

## コラム：画像の表示とカラーコード

（書きかけ）

## コラム：ラスターとベクター

（書きかけ）

## コラム：解像度の話

この章では複数の人工衛星で観測された画像を見てきました。
どれも空間解像度が異なっていたと思います。
「空間解像度は細かいほうがはっきりと地球の様子がわかるので、細ければ細かいほうがいいのでは」という疑問が生じるかもしれません。
しかし空間解像度を上げるためには、時間解像度というものを犠牲にしなければなりません。
時間解像度は時間方向の解像度で、同じ地点を次に観測するのに何日かかるか、という指標です。
基本的には空間解像度を細かく見る場合には時間解像度が犠牲になり、時間解像度を細かくする場合には空間解像度が犠牲になります。
そのため地球全体の日々の変化を知りたい場合にはMODISを用いたりし、狭い範囲の細かい情報が知りたい場合はSentinel-2を用いたりといった使い分けをします。

また別の解決策として，空間解像度の高い衛星を大量に打ち上げれば、同じ地点を頻繁に観測することも可能です。
ただこれはお金が非常にかかるため，最近では世界の機関が協力して観測期間の穴を埋めようという動きがあります（参考文献）。
地球観測のために各国が協力し合うという非常に喜ばしい動きです。

## コラム：衛星画像が青く見える理由と山が青く見える理由

xxで見た衛星画像は，ちょっと青っぽく見えました。
これは大気で青色の散乱光が卓越するためです。
これと同じ現象として，遠くの山を見ると青っぽく見えることあります。
この青さを減少させ，自然な色合い（散乱光の影響を減少させる）にするためには，大気補正という前処理が必要です。
大気補正は各波長の光の屈折・反射・散乱をシミュレーションし，その補正を施す処理です。
衛星画像を解析するときには，大気の影響も常に考慮していかなければならないのです。
