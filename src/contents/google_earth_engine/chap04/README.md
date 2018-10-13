---
sidebar: auto
prev: ../chap03/
next: ../chap05/
---


# 第4章：植生指数の計算
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css"/>

本章では植物の状態を表す指標の1つである，正規化植生指数（Normalized
Difference Vegetation Index; NDVI）を計算します。
またNDVIを地図に表示することによって，各地域の植物分布をざっくり把握してみます。

NDVIとは
--------

前章では様々な衛星画像を表示させました。
その中でナチュラルカラー・フォールスカラーという色の組み合わせで植物を強調して表示する手法を学びました。
これらの概念は植物が強く反射する近赤外の反射率を特定の色の表示に割り当てることにより、植物を強調して示するというものでした。
この植物の「近赤外の波長の光を反射し、赤色の波長の光を吸収する」という特性に着目し、以下のNDVIという指標が一般的に用いられています([Tucker, 1979](https://www.sciencedirect.com/science/article/pii/0034425779900130))。

$$NDVI = \frac{NIR - R}{NIR + R}$$

ここで$NIR:$近赤外の反射率、$R:$赤色の反射率です。
NDVIは上の式から-1から+1までの値を取り、また+1に近いほど植物が多いことを表しています。

東南アジアの森林事情
--------------------

ここからは東南アジアの森林事情をNDVIを用いて見ていきます。
東南アジアでは近年森林伐採が叫ばれ、希少生物の保全や地球環境の観点から植物の分布を知ることは重要です。
さてここで皆さんに一つ問題を出します。
近年発展が著しい中国では、ここ20年で植生が増えているでしょうか、減っているでしょうか。
その答えをNDVIを通じて探ってみましょう。

この問題に取り組んだ論文として([小柳ら, 2008](https://www.jstage.jst.go.jp/article/rssj/28/1/28_1_36/_article))があります。
論文では2000年から2005年までの間の植生の変化を，SPOT/VegitatoinとTerra/MODISの２つの衛星を用いて，それぞれ独立に解析を行って植生の動向を追っています。
まずはじめにこの論文の手法をGEEで実際に実装してみます。
次にこの論文の解析対象より後の衛星画像（2005年以降の衛星画像）も追加して解析を行ってみます。

さて熱帯・亜熱帯地方を解析する場合に避けて通れない問題として雲があります。
光学センサではその特性から雲を透過することはできないため，雲が多いと地上の様子をほとんど得ることができません。
上記の論文では8日間あるいは10日間で晴天時と思われる部分をつなぎ合わせる処理（これをコンポジットと言います）が施された画像を用い，
さらにそこから年間の最大のNDVIを抽出するという処理をしています。
これに習って実際にコードを書いてみましょう。

### NDVIの計算（一枚の場合）

まずはじめに2005年のMODIS画像を一枚表示させてみましょう。
論文と同じく8日間コンポジットのMOD09A1プロダクトを使用します。

<!--
``` {caption="MODISの表示"}
-->
```javascript
var start = ee.Date('2005-01-01');
var finish = ee.Date('2005-12-31');

var roi = ee.Geometry.Rectangle(90, 5, 150, 55);

var images = ee.ImageCollection('MODIS/006/MOD09A1')
    .filterDate(start, finish);
    
// need to cast as ee.Image
var image = ee.Image(images.first());

Map.setCenter(120, 35, 4);
Map.addLayer(image.clip(roi));
```

roiはRegion of
interesetの略で、ee.Geometry.Rectangle()で四角形で指定しています。
指定した領域で画像を切り出す処理はMap.addLayer()内のimage.clip(roi)で行っています。
また今回は試しに一枚の画像を表示させるために、ee.ImageCollectionのインスタンス（images）に対して.first()メソッドを呼び出しています。
このメソッドはee.ImageCollectionの一番初めの画像を取り出します。
なおfirst()の返り値（関数呼び出しによって返される値）はElement型というものなので、そのままではMap.addLayer()で表示できません。
そのためee.Image()で囲むことによって型をee.Image型に変換させています。
このスクリプトを走らせるとroiの範囲で切りだされた画像が表示されるかと思います。

ここから実際にNDVIの計算をしてみましょう。
まずはじめにMOD09A1における赤・近赤外の波長に対応するバンドを調べます。
SearchにMOD09A1と入力し、確認するとsur\_refl\_b01が赤色（red）でsur\_refl\_b02が近赤外（Near
Infra Red; nir)であることが分かります。
あるバンドに対して何かしらの処理を行い時はee.Image.select()メソッドを使います。
それでは赤・近赤外のバンドを実際に変数として指定してみましょう。

<!--
``` {caption="NDVIの計算" 1="" startFrom="12"}
-->
```javascript
var red = image.select('sur_refl_b01');
var nir = image.select('sur_refl_b02'); 
```

続いて指定したバンドに対して引き算・足し算を行います。
それにはee.Image.subtract()・ee.Image.add()メソッドを使います。

<!--
``` {caption="NDVIの計算" 2="" startFrom="14"}
-->
```javascript
// (NIR - R)
var nir_minus_red = nir.subtract(red);
// (NIR + R)
var nir_plus_red = nir.add(red);
```

最後にそれらを割り算します。 これはee.Image.divide()メソッドを使います。

<!--
``` {caption="NDVIの計算" 4="" startFrom="18"}
-->
```javascript
// (NIR - R) / (NIR + R)
var ndvi = nir_minus_red.divide(nir_plus_red).rename("NDVI"); 
```

割り算の結果（NDVI）に対してrename()メソッドを用いて“NDVI”というバンド名を割り当てています。
では実際に計算結果を表示させてみましょう。

<!--
``` {caption="NDVIの計算" 5="" startFrom="21"}
-->
```javascript
Map.setCenter(120, 35, 4);
Map.addLayer(ndvi.clip(roi));
```

カラーパレットを割り当てていないので、NDVIが高いところは白っぽく、NDVIが低いところは黒っぽく表示されています。
論文では最小値0から最大値1.0まで青・黄色・赤の順に割り当てていたので、それに合わせせ色を変えてみます。

<!--
``` {caption="NDVIの計算" 6="" startFrom="21"}
-->
```javascript
Map.setCenter(120, 35, 4);

var visParams = {
  bands: ['NDVI'], 
  min:0.0, max:1.0, 
  palette: ['0000FF', 'FFFF00', 'FF0000']
};
Map.addLayer(ndvi.clip(roi), visParams);
```

日本に着目してみると、全体的に青みがかかっていると思います。
この部分は雲に覆われてしまっていることによるものです。

ここまでの処理をまとめたスクリプトが以下です。

<!--
``` {caption="NDVIの計算" 7=""}
-->
```javascript
var start = ee.Date('2005-01-01');
var finish = ee.Date('2005-12-31');

var roi = ee.Geometry.Rectangle(90, 5, 150, 55);

var images = ee.ImageCollection('MODIS/006/MOD09A1')
    .filterDate(start, finish);
    
// need to cast as ee.Image
var image = ee.Image(images.first());

var red = image.select('sur_refl_b01');
var nir = image.select('sur_refl_b02'); 
// (NIR - R)
var nir_minus_red = nir.subtract(red);
// (NIR + R)
var nir_plus_red = nir.add(red);
// (NIR - R) / (NIR + R)
var ndvi = nir_minus_red.divide(nir_plus_red).rename("NDVI"); 

Map.setCenter(120, 35, 4);

var visParams = {
  bands: ['NDVI'], 
  min:0.0, max:1.0, 
  palette: ['0000FF', 'FFFF00', 'FF0000']
};
Map.addLayer(image.clip(roi), visParams);
```

### NDVIの計算（複数枚の場合）

NDVIの計算の実装方法が分かったので、今度は複数枚に対してNDVIを計算します。

先ほどのように一枚一枚に対して以下のコードを実行すれば、複数枚に対してNDVIを求めることが出来ます（一枚目をimage1、二枚目をimage2、…とします）。

<!--
``` {caption="NDVIの計算" 8="" numbers="none"}
-->
```javascript
var red1 = image1.select('sur_refl_b01');
var nir1 = image1.select('sur_refl_b02'); 

var nir_minus_red = nir1.subtract(red1);
var nir_plus_red = nir1.add(red1);
var ndvi1 = nir_minus_red.divide(nir_plus_red).rename("NDVI"); 

var red2 = image2.select('sur_refl_b01');
var nir2 = image2.select('sur_refl_b02'); 

var nir_minus_red = nir2.subtract(red2);
var nir_plus_red = nir2.add(red2);
var ndvi2 = nir_minus_red.divide(nir_plus_red).rename("NDVI"); 

. . .
```

しかしながら画像が100枚あった場合には100回同じ処理を書かなければならず、あまりにも非効率です。
このように同じ処理を施す場合には関数を定義して利用すると便利です。
もう一度NDVIを求める部分のコードを見てみましょう。

<!--
``` {caption="NDVIの計算" 9="" numbers="none"}
-->
```javascript
var red = image.select('sur_refl_b01');
var nir = image.select('sur_refl_b02'); 
// (NIR - R)
var nir_minus_red = nir.subtract(red);
// (NIR + R)
var nir_plus_red = nir.add(red);
// (NIR - R) / (NIR + R)
var ndvi = nir_minus_red.divide(nir_plus_red).rename("NDVI"); 
```

このコードを見ると、imageの部分のみが変わってそれ以外は画像ごとに変わらない処理ということが分かります。
そこでimageを引数として受け取ってndviを返す関数を定義します。

<!--
``` {caption="NDVIの計算" 10="" numbers="none"}
-->
```javascript
function calc_MODIS_NDVI(image) {
  var red = image.select('sur_refl_b01');
  var nir = image.select('sur_refl_b02');
  // (NIR - R)
  var nir_minus_red = nir.subtract(red);
  // (NIR + R)
  var nir_plus_red = nir.add(red);
  // (NIR - R) / (NIR + R)
  var ndvi = nir_minus_red.divide(nir_plus_red).rename("NDVI");
  return ndvi;
}
```

関数の名前はcalc\_MODIS\_NDVIとしました。
一枚の画像に対してNDVIを求めるコードを関数を用いて書き直したのが以下のコードです。

<!--
``` {caption="NDVIの計算" 11=""}
-->
```javascript
var start = ee.Date('2005-01-01');
var finish = ee.Date('2005-12-31');

var roi = ee.Geometry.Rectangle(90, 5, 150, 55);

var images = ee.ImageCollection('MODIS/006/MOD09A1')
    .filterDate(start, finish);
    
// need to cast as ee.Image
var image = ee.Image(images.first());

function calc_MODIS_NDVI(image) {
  var red = image.select('sur_refl_b01');
  var nir = image.select('sur_refl_b02');
  // (NIR - R)
  var nir_minus_red = nir.subtract(red);
  // (NIR + R)
  var nir_plus_red = nir.add(red);
  // (NIR - R) / (NIR + R)
  var ndvi = nir_minus_red.divide(nir_plus_red).rename("NDVI");
  return ndvi;
}

var ndvi = calc_MODIS_NDVI(image);

Map.setCenter(120, 35, 4);

var visParams = {
  bands: ['NDVI'], 
  min:0.0, max:1.0, 
  palette: ['0000FF', 'FFFF00', 'FF0000']
};
Map.addLayer(ndvi.clip(roi), visParams);
```

実行結果は関数を用いない場合と同じになります（このように処理の結果を変えずに中身を書き換えることをリファクタリングといいます）。
関数が無事実装出来たことを確認したので、いよいよ複数枚に対してNDVIを計算していきます。
GEEでは、複数枚に対してある関数を適用するときにee.ImageCollection.map()メソッドを使います。

<!--
``` {caption="NDVIの計算" 12="" startFrom="21"}
-->
```javascript
var ndvi_series = images.map(calc_MODIS_NDVI);
Map.addLayer(ndvi_series);
```

Inspectorタブをクリックしてから適当な場所を地図上でクリックし、PixelsのSeriesをクリックするとキチンと複数枚のNDVIを計算できていることが分かります。
論文では一年間のうちの最大値のNDVIを解析に使用しているので、それに習います。

<!--
``` {caption="NDVIの計算" 13="" startFrom="21"}
-->
```javascript
var ndvi_series = images.map(calc_MODIS_NDVI);
var ndvi_max = ndvi_series.max();
Map.addLayer(ndvi_max.clip(roi), visParams);
```

NDVIの最大値を可視化できましたが、どうも海の部分の見た目が良くないです。
今回の解析では陸地のみを対象としているので、海は取り除いてしまいましょう。
人工衛星の分野では、何かしらの画像を重ねあわせて取り除く処理をマスク処理といいます。

今回は海の部分を取り除きたいので、標高が0
m以下の部分を陸地として、陸地でマスクを行います。
標高データは第二章で用いたGTOPO30を用います。

<!--
``` {caption="NDVIの計算" 14="" startFrom="6"}
-->
```javascript
var elev = ee.Image('USGS/GTOPO30');
var land = elev.gte(0); // if elevation is greater than 0 m, then true (land) else false (sea).
```

マスクの適用はee.Image.updateMask()メソッドを用います。

<!--
``` {caption="NDVIの計算" 15="" startFrom="24"}
-->
```javascript
var ndvi_series = images.map(calc_MODIS_NDVI);
var ndvi_max = ndvi_series.max();
var ndvi_max_land = ndvi_max.updateMask(land);
```

マスク処理を行うとtrueの箇所のみ表示される（すなわち陸地のみ表示される）ことになります。
ここまでの処理をまとめたスクリプトが以下です。

<!--
``` {caption="NDVIの計算" 16=""}
-->
```javascript
var start = ee.Date('2005-01-01');
var finish = ee.Date('2005-12-31');

var roi = ee.Geometry.Rectangle(90, 5, 150, 55);

var elev = ee.Image('USGS/GTOPO30');
var land = elev.gte(0); // if elevation is greater than 0 m, then true (land) else false (sea).  

var images = ee.ImageCollection('MODIS/006/MOD09A1')
    .filterDate(start, finish);

function calc_MODIS_NDVI(image) {
  var red = image.select('sur_refl_b01');
  var nir = image.select('sur_refl_b02');
  // (NIR - R)
  var nir_minus_red = nir.subtract(red);
  // (NIR + R)
  var nir_plus_red = nir.add(red);
  // (NIR - R) / (NIR + R)
  var ndvi = nir_minus_red.divide(nir_plus_red).rename("NDVI");
  return ndvi;
}

var ndvi_series = images.map(calc_MODIS_NDVI);
var ndvi_max = ndvi_series.max();
var ndvi_max_land = ndvi_max.updateMask(land);


var visParams = {
  bands: ['NDVI'], 
  min:0.0, max:1.0, 
  palette: ['0000FF', 'FFFF00', 'FF0000']
};


Map.setCenter(120, 35, 4);
Map.addLayer(ndvi_max_land.clip(roi), visParams);
```

ちなみにndviの計算部分はee.Image.normalizedDifference()メソッドを用いると更に簡潔に書くことが出来ます。
今回は説明のため周りくどい書き方をしていました。
リファクタリングした結果が以下です。

<!--
``` {caption="NDVIの計算" 17=""}
-->
```javascript
var start = ee.Date('2005-01-01');
var finish = ee.Date('2005-12-31');

var roi = ee.Geometry.Rectangle(90, 5, 150, 55);

var elev = ee.Image('USGS/GTOPO30');
var land = elev.gte(0); // if elevation is greater than 0 m, then true (land) else false (sea).  

var images = ee.ImageCollection('MODIS/006/MOD09A1')
    .filterDate(start, finish);

function calc_MODIS_NDVI(image) {
  // (NIR - R) / (NIR + R)
  var ndvi = image.normalizedDifference(['sur_refl_b02', 'sur_refl_b01']).rename('NDVI');
  return ndvi;
}

var ndvi_series = images.map(calc_MODIS_NDVI);
var ndvi_max = ndvi_series.max();
var ndvi_max_land = ndvi_max.updateMask(land);


var visParams = {
  bands: ['NDVI'], 
  min:0.0, max:1.0, 
  palette: ['0000FF', 'FFFF00', 'FF0000']
};


Map.setCenter(120, 35, 4);
Map.addLayer(ndvi_max_land.clip(roi), visParams);
```

### UIツールを用いたNDVIトレンドの確認

論文ではこの後2000年から2005年までの各年に対してNDVIの年間最大値を求め、回帰直線を引いてその傾きを地図上にプロットしていました。
これは練習問題に回すとして、GEEのUIツールというものを用いてNDVIトレンドを確認してみましょう
（以下のコードのMap.onClick()はGEE 2018 Tokyo
minisumitのコードをベースに一部変更を加えたものです）。

<!--
``` {caption="NDVIの計算" 17=""}
-->
```javascript
var start = ee.Date('2005-01-01');
var finish = ee.Date('2010-12-31');

var roi = ee.Geometry.Rectangle(90, 5, 150, 55);

var images = ee.ImageCollection('MODIS/006/MOD09A1')
    .filterDate(start, finish);


function calc_MODIS_NDVI(image) {
  // (NIR - R) / (NIR + R)
  var ndvi = image.normalizedDifference(['sur_refl_b02', 'sur_refl_b01']).rename('NDVI');
  
  var elev = ee.Image('USGS/GTOPO30');
  var land = elev.gte(0); // if elevation is greater than 0 m, then true (land) else false (sea).  
  
  return image.addBands(ndvi).updateMask(land);
}

var ndvi_land = images.map(calc_MODIS_NDVI);
var ndvi_max_land = ndvi_land.max(); // from 2005 to 2010

var visParams = {
  bands: ['NDVI'], 
  min:0.0, max:1.0, 
  palette: ['0000FF', 'FFFF00', 'FF0000']
};

// Create and style widgets.
var intro = ui.Panel([
  ui.Label({
    value: 'NDVI Inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a point on the map to inspect NDVI over time.')
]);

var lon = ui.Label();
var lat = ui.Label();

// Add the widgets to a new panel.
var panel = ui.Panel();
panel.add(intro);
panel.add(lon);
panel.add(lat);

// Add the new panel to the root panel.
ui.root.insert(0, panel);

// Setup the map.
Map.setCenter(120, 35, 4);
Map.addLayer(ndvi_max_land, visParams);

Map.onClick(function(coords) {
  lon.setValue('lon: ' + coords.lon);
  lat.setValue('lat: ' + coords.lat);
  
  // Add a red point to the map wherever the user clicks.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'red'});
  Map.layers().set(1, dot);
  
  // Add an NDVI chart.
  var chart = ui.Chart.image.series({
    imageCollection: ndvi_land.select('NDVI'), 
    region: point, 
    reducer: ee.Reducer.mean(), 
    scale: 250
  });
  chart.setOptions({
    title: 'NDVI Over Time',
    vAxis: {title: 'NDVI'},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
    interpolateNulls: true
  });
  panel.widgets().set(3, chart);
});

Map.style().set('cursor', 'crosshair');
```

どこか適当な場所をクリックすると、マップの横に時系列NDVIのチャートが表示されるかと思います。
論文で取り上げられているN36°16′34″E110°45′16″(＝N36.276E110.754)をクリックし、実際にNDVIが増加しているかを調べてみましょう。

まとめ
------

本章では論文の手法を再実装することで東南アジアの植生分布の時系列変化を見てきました。
（書きかけ）

練習問題
--------

1.  論文のように2000年から2005年までの各年に対してNDVIの年間最大値を求め、回帰直線を引いてその傾きをピクセルごとに求めてみましょう。また求めた値をプロットしてみましょう。

コラム：NDVIは本当に植物の分布を表せるのか
------------------------------------------
（書きかけ）

