---
sidebar: auto
prev: ../chap05/
next: ../chap07/
---

# 第6章：土地利用をマッピング

本章では土地利用を記述した地図である土地利用・土地被覆図（以下，まとめて土地被覆図）を作成していきます。
この地図は様々な研究の入力データとして使われている重要な地図です。
実際に作成してみることで，その問題点を探ってみましょう。

## 土地被覆図とは

土地利用図は先程も述べましたが、どのように土地が利用されているかを記述した地図です。
この地図は目的によって記述してあるカテゴリが異なりますが、一般的に10数カテゴリが多いです。
土地利用図は、手で作成することも可能です。
その一例として中学の地理で習った地形図が挙げられます。
地形図には果樹園や水田などの土地利用を記号で表し、マッピングしています。

このように土地被覆図は手で作成することも可能ではありますが、例えば地球全体の土地被覆を地図にしてと言われたら、ちょっと尻込みしてしまいます。
仮にやる気があって手で作成しようと思い立っても、土地被覆は日々変化していくので、作成している間にまた作り直さなければいけません。

そこで人工衛星の登場です。
人工衛星は度々説明していますが、その特徴として全世界をまんべんなく、定期的に観測することが出来ます。
人工衛星で観測された情報をうまく活用することにより、土地被覆図を少ない労力で定期的に作成することが出来るのです。
実際にJAXAや国土地理院では人工衛星の観測画像（+
それ以外の情報）を活用し、土地被覆図を作成・公開しています。
一般に土地被覆図を衛星画像から作成する場合、機械学習の手法を用います。
機械学習とは、（書きかけ）
機械学習は教師なし分類と教師あり分類の2つに分けられます。
教師なし分類は教師情報（ここではその土地が何かを人間が教える情報）を用いずに分類する手法です。
一方で教師あり分類は教師情報を用いて分類する手法です。

まずは教師なし分類から試していきましょう。

## 教師なし分類

Sentinel-2衛星を用いて土地被覆図を作成していきます。
Sentinel-2は光学衛星なのでまずは雲の影響を取り除かなければなりません。
GEEのExamplesの中に，CloudMasking → Sentinel2という例があります。
このスクリプトを改造していきましょう。

<!--
``` {caption="unsuperpised" 1=""}
-->
```javascript
// Load Sentinel-2 TOA reflectance data.
var s2 = ee.ImageCollection('COPERNICUS/S2');

// Function to mask clouds using the Sentinel-2 QA band.
function maskS2clouds(image) {
  var qa = image.select('QA60');

  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = ee.Number(2).pow(10).int();
  var cirrusBitMask = ee.Number(2).pow(11).int();

  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));

  // Return the masked and scaled data.
  return image.updateMask(mask).divide(10000);
}

// Map the function over one year of data and take the median.
var composite = s2.filterDate('2016-01-01', '2016-12-31')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .map(maskS2clouds)
                  .median();

var roi = ee.Geometry.Rectangle(140.05, 36.05, 140.40, 36.25);
// Display the results.
Map.setCenter(140.25, 36.12, 11);
Map.addLayer(composite.clip(roi), {bands: ['B3', 'B2', 'B1'], min: 0, max: 0.3});
```

対象領域の追加と緯度経度の変更以外はGEEのExampleのままです。
軽く説明をしていきます。
5行目でSentinel-2の雲マスク処理関数を定義しています。
Sentinel-2ではQA60というバンドに雲の情報が入っているようです。 10 Bit (=
1024)，11 Bit（= 2048）の値を取るときが雲ということです。 9,
10行目では1024, 2048という数字を変数に代入しています。
そして13行目でQA60が10
Bitでも11Bitでもないときに1（＝雲がない）を，それ以外を0（＝雲）としています。
17行目では各バンドの値を10000で割ることで0から1へとスケールさせています。
21行目ではまずはじめに日付でフィルターをし，次に雲被覆率が20%以上のものを選び，そして先程定義した関数を適用し，最後に中央値を取っています。
27行目からはいつもの処理を行って可視化をしています。

<!--
``` {caption="unsuperpised" 2=""}
-->
```javascript
// Load Sentinel-2 TOA reflectance data.
var s2 = ee.ImageCollection('COPERNICUS/S2');

// Function to mask clouds using the Sentinel-2 QA band.
function maskS2clouds(image) {
  var qa = image.select('QA60');

  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = ee.Number(2).pow(10).int();
  var cirrusBitMask = ee.Number(2).pow(11).int();

  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));

  // Return the masked and scaled data.
  return image.updateMask(mask).divide(10000);
}

// Map the function over one year of data and take the median.
var composite = s2.filterDate('2016-01-01', '2016-12-31')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .map(maskS2clouds)
                  .median();
                  
var roi = ee.Geometry.Rectangle(140.05, 36.05, 140.40, 36.25);
var input = composite.clip(roi);
// Make the training dataset.
var training = input.sample({
  region: roi,
  scale: 10,
  numPixels: 50
});

// Instantiate the clusterer and train it.
var clusterer = ee.Clusterer.wekaKMeans(3).train(training);

// Cluster the input using the trained clusterer.
var result = input.cluster(clusterer);

// Display the results.
Map.setCenter(140.25, 36.12, 11);
Map.addLayer(input, {bands: ['B3', 'B2', 'B1'], min: 0, max: 0.3});
Map.addLayer(result.randomVisualizer());
```

GEEではkMeansという手法が実装されています。
ここでは50点のサンプル点を取り（30-34行目），その情報をもとに3クラスで学習をしています（37行目）。
その後40行目で分類をし，45行目で可視化しています。
randomVisualizer()メソッドはカラーパレットを適当に決めるときのメソッドです。

結果は霞ヶ浦が分類されているカテゴリが水域で，森や畑地が同じカテゴリに分類され，都市などはその他のカテゴリとして分類されています。
ここで筑波山の斜面に着目すると，霞ヶ浦と同じカテゴリに分類されていることがわかります。
これは斜面が日影の影響で暗くなり，水面と類似した反射特性を示すためです。

# 教師あり分類

次に教師あり分類を試してみます。
ここでは1:水域，2:都市,3:植生,4:その他として教師点を取得していきます。
教師点の取得はマーカーを用います。
マーカーは地図の左上のバルーンマークをクリックします。
クリックするとgeometryと書かれたウィンドウが追加されます。
geometryにカーソルを合わせると縦にびよっと伸び，geometryの右にカーソルを持っていくとギアマークが現れます。
このギアマークをクリックすると名前や色を変えることができます。
まずは水域の教師点を取りたいので，NameをWaterとし色を青色にしGeometryをFeatureCollectionにし，Add
propertyでnameをlandcover,valueを1と入力してOKを押します。
Sentinel-2の画像を参考にしながら水域と思われる箇所をポチポチクリックしていきます。
間違ってプロットしてしまった場合はバルーンの横の手のマークをクリックし，当該の地点をクリック
→ Deleteで削除できます。

続いて都市の教師点を追加していきます。
Waterの文字にカーソルを合わせると+new
layerという文字が現れるのでクリックします。
先ほどと同様の手順で名前をUrban，色を赤色，GeometryをFeatureCollection，Propertyのnameをlandcover，valueを2にします。
植生はVegetationで緑色（value 3)，その他をOther(value
4)で黄色として同様に教師点を追加していきます。
アルゴリズムはランダムフォレストを使用し，カテゴリは4カテゴリとしました。

<!--
``` {caption="superpised"}
-->
```javascript
// Load Sentinel-2 TOA reflectance data.
var s2 = ee.ImageCollection('COPERNICUS/S2');

// Function to mask clouds using the Sentinel-2 QA band.
function maskS2clouds(image) {
  var qa = image.select('QA60');

  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = ee.Number(2).pow(10).int();
  var cirrusBitMask = ee.Number(2).pow(11).int();

  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));

  // Return the masked and scaled data.
  return image.updateMask(mask).divide(10000);
}

// Map the function over one year of data and take the median.
var composite = s2.filterDate('2016-01-01', '2016-12-31')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .map(maskS2clouds)
                  .median();
                  
var roi = ee.Geometry.Rectangle(140.05, 36.05, 140.40, 36.25);
var input = composite.clip(roi);
// Make the training dataset.
var training = input.sample({
  region: roi,
  scale: 10,
  numPixels: 50
});

// Cluster the input using the trained clusterer.

// Display the results.
Map.setCenter(140.25, 36.12, 11);
Map.addLayer(input, {bands: ['B3', 'B2', 'B1'], min: 0, max: 0.3});


var training_points = Water.merge(Urban).merge(Vegetation).merge(Other);
var bands = ['B1', 'B2', 'B3', 'B4'];

var training = input.select(bands).sampleRegions({
  collection: training_points, 
  properties: ['landcover'], 
  scale: 10
});

var classifier = ee.Classifier.randomForest(4).train({
  features: training, 
  classProperty: 'landcover', 
  inputProperties: bands,
});

var classified = input.select(bands).classify(classifier);
Map.addLayer(classified, {min: 1, max: 4, palette: ['blue', 'red', 'green', 'yellow']}) 
```

## まとめ

## 練習問題

## コラム：大気補正・地形補正

## コラム：精度評価の話
