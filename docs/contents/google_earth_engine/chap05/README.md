---
sidebar: auto
---

# 夜間光の解析

本章ではこれまでの観測対象とは一味違う「夜間光」という光を取り扱います。
夜間光を通じて見えるもの，見えないものを探っていきましょう。

夜間光画像を見てみよう
----------------------

まずはじめに米国の軍事衛星であるDMSP衛星の画像を見てみましょう。
GEEでは1996年3月から2011年1月までのデータを利用できるようです。
衛星運用開始の1996年と運用終了間近の2010年の2年のデータを見てみましょう。

<!--
``` {caption="NightLight" 1=""}
-->
```javascript
var image_1996 = ee.ImageCollection("NOAA/DMSP-OLS/CALIBRATED_LIGHTS_V4")
      .filterDate('1996-01-01', '1996-12-31')
      .median();
 
var image_2010 = ee.ImageCollection("NOAA/DMSP-OLS/CALIBRATED_LIGHTS_V4")
      .filterDate('2010-01-01', '2010-12-31')     
      .median();
      
var visParams = {bands: ['avg_vis'], palette: ["000000", "FFFFFF"]};
      
      
Map.setCenter(140, 36, 3);
Map.addLayer(image_1996, visParams, '1996');
Map.addLayer(image_2010, visParams, '2010');
```

平均的な様子を知りたいため中央値（median())を取っています。
このコードを走らせると黒と白のマップが浮かび上がります。
白い箇所が夜間光を発している地域で、黒い箇所は夜間真っ暗な地域です。
Layersから2つのレイヤを表示・非表示させてみると、約15年間で地球全体の夜間光の量が増えていることが分かります。

韓国に注目してみると、北朝鮮との国境線に沿って夜間光の境目を見ることが出来ます。
北朝鮮は平壌が特に強く光り輝いていることも分かります。

続いてSuomi NPP/VIIRSという衛星が観測した夜間光を見てみます。
DMSP/OLSの空間解像度は約1 kmでしたが、Suomi NPP/VIIRSは約500
mなのでより細かく知れます。 また性能もアップしているようです（要出典）。

Suomi
NPP/VIIRSの解析に入る前に、先ほどのコードのリファクタリングをしましょう。
imageだと何の画像かわからないので、imageをDMSPに書き換えます。
この時一つ一つカーソルを合わせて削除して、としても良いですが、GEEにはショートカット機能があるのでそれを使って置換します。
右上のHelpからShortcutsを押すと、GEEで使用できるショートカットの一覧を表示できます。
検索と置換はCtrl+Hです。 Search forにimageを入力し、Replace
withにDMSPを入力します。
またこのままだと大文字小文字を区別されずに置換されてしまう（ee.ImageCollectionがee.DMSPCollectionになってしまう）ので、AaをクリックしAllをクリックすれば置換完了です。
念の為スクリプトを走らせ、リファクタリングができているかを確認しましょう。

<!--
``` {caption="NightLight" 2=""}
-->
```javascript
var DMSP_1996 = ee.ImageCollection("NOAA/DMSP-OLS/CALIBRATED_LIGHTS_V4")
      .filterDate('1996-01-01', '1996-12-31')
      .median();
 
var DMSP_2010 = ee.ImageCollection("NOAA/DMSP-OLS/CALIBRATED_LIGHTS_V4")
      .filterDate('2010-01-01', '2010-12-31')
      .median();
      
var visParams = {bands: ['avg_vis'], palette: ["000000", "FFFFFF"]};
      
      
Map.setCenter(140, 36, 3);
Map.addLayer(DMSP_1996, visParams, '1996');
Map.addLayer(DMSP_2010, visParams, '2010');
```

無事走ることを確認したので、Suomi NPP/VIIRSを

<!--
``` {caption="NightLight" 3=""}
-->
```javascript
var DMSP_1996 = ee.ImageCollection("NOAA/DMSP-OLS/CALIBRATED_LIGHTS_V4")
      .filterDate('1996-01-01', '1996-12-31')
      .median();
 
var DMSP_2010 = ee.ImageCollection("NOAA/DMSP-OLS/CALIBRATED_LIGHTS_V4")
      .filterDate('2010-01-01', '2010-12-31')
      .median();
      
      
var NPP_2014 = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG")
      .filterDate('2014-01-01', '2014-12-31')
      .median();
      
var DMSPVisParams = {bands: ['avg_vis'], palette: ["000000", "FFFFFF"]};
var NPPVisParams = {bands: ['avg_rad'], palette: ["000000", "FFFFFF"]};
      
Map.setCenter(140, 36, 3);
Map.addLayer(DMSP_1996, DMSPVisParams, 'DMSP 1996');
Map.addLayer(DMSP_2010, DMSPVisParams, 'DMSP 2010');

Map.addLayer(NPP_2014, NPPVisParams, 'NPP 2014');
```

DMSP/OLSでは夜間光があるかないか程度しか分かりませんでした。 しかしSuomi
NPP/VIIRSは明るさの度合いがより明瞭に分かります。

NDVIと夜間光の関係
------------------

（書きかけ）

前章ではNDVIという指標を計算し、植生の動態を観察しました。
そこで計算した東南アジアのNDVI図と夜間光を組み合わせ、植生と国の経済状況の関係を探っていきます。

宇宙から見るイカ漁
------------------

（書きかけ）

今度は日本に注目してみましょう。 皆さんはイカ漁をご存知でしょうか。
イカ漁はイカの性質を利用して夜間に強力なライトを照らして行う漁です。
その明るさは宇宙まで届くとも言われており，せっかくなので探してみましょう。

先ほどと同様にSuomi/NPPを利用します。 まずはじめに対象域を絞ります。

メタ知識を活かし，青森県の付近をROIとします。

（コード）

続いて使用する月日を決めます。
国立研究開発法人水産研究・教育機構による発表によると，イカ漁の解禁月はxxで，最も活発なのは統計により11月です。そこで11月を対象としましょう。

（コード）

次に陸地と水域を分けてみます。 そのためには海岸線の情報が必要です。
海岸線は海域は標高が低いという情報を活かし，DEMを使って作成します。

またイカ漁は沖合からxx
m付近で行われる（要出典）とのことなので，海岸線からxx
m付近を削り取ります。

（コード）

さてこの解析により，イカ漁っぽい場所は抽出できました。 使った知識は

-   イカ漁はxx月に活発。

-   イカ漁は青森県で行われている。

-   イカ漁は陸地ではなく海で行われる。

-   イカ漁は海岸からxx m付近で行われる。

です。

ここで考えなければいけないのは，船から発せられる光はどのくらい広がるか，です。
例えば船の大きさをxx mと仮定すると，もしも光が宇宙へ直進した場合，xx
mしか光りません。 今使っているSuomi/NPPは解像度はxx
mなので，もしこれより低い場合はイカ漁から発せられる光を検出できません。
他方光が拡散する場合，都市からの光が海まで届いている可能性も考えなければなりません。

この２つを考慮しつつ，イカ漁が行われていない月は海がくらいに違いないという仮定をおいてイカ漁が行われていない月との差分を取ってみましょう。

（コード）

まとめ
------

練習問題
--------
