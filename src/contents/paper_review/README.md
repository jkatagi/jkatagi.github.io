---
sidebar: auto
---

# このページについて
このページはリモートセンシングやその他気になる論文をレビューした時のメモです。


# テンプレ
[落合メソッド](https://www.slideshare.net/Ochyai/1-ftma15)に従い以下のテンプレに沿ってレビューしていきます。
- 出版: 
- Author:
- 読んだ日：
- ★★★★☆
1. どんなもの？

2. 先行研究と比べてどこがすごい？

3. 技術や手法のキモはどこ？

4. どうやって有効だと検証した？

5. 議論はある？

6. 次に読むべき論文は？

# レビュー

## [Citizens as sensors: the world of volunteered geography](https://link.springer.com/article/10.1007/s10708-007-9111-y)
- 出版: GeoJournal, 2007, 69.4: 211-221
- Author: Michael F. GoodchildEmail author
- 読んだ日：2018/12/06
- ★★☆☆☆
1. どんなもの？
- 市民科学の広がりをWeb2.0やGPS、OSMなどに触れながら述べていく解説論文。
- 引用数が3000を超えていたので読んだ。

2. 先行研究と比べてどこがすごい？
- 解説論文？

3. 技術や手法のキモはどこ？
- 解説論文？

4. どうやって有効だと検証した？
- 解説論文？

5. 議論はある？
- 市民科学の広がりに言及するときに引用するのか？

6. 次に読むべき論文は？
- 特になし

## [The Role of Citizen Science in Earth Observation](https://www.mdpi.com/2072-4292/9/4/357)
- 出版: Remote Sens. 2017, 9(4), 357
- Author: Steffen Fritz, Cidália Costa Fonte, and Linda See
- 読んだ日：2018/12/06
- ★★☆☆☆

1. どんなもの？
- 市民科学と地球観測のレビュー。

2. 先行研究と比べてどこがすごい？
- レビュー論文。

3. 技術や手法のキモはどこ？
- レビュー論文。

4. どうやって有効だと検証した？
- レビュー論文。

5. 議論はある？
- 2.2.4 Land Coverと3. The Future Outlook for Citizen Science and Earth Observationのみを読んだ。
- Land Coverで見落としている論文が無いかと期待したが、特になかった。

6. 次に読むべき論文は？
- 特になし。

## [A global reference database of crowdsourced cropland data collected using the Geo-Wiki platform](https://www.nature.com/articles/sdata2017136)
- 出版:Scientific Data volume 4, Article number: 170136 (2017) 
- 読んだ日：2018/10/19
- ★★★☆☆
1. どんなもの？
- Geo-wikiを使ってCropland参照データを集めた。

2. 先行研究と比べてどこがすごい？
- 既存のデータセット（例えばGOFC-GOLC）はCroplandのためだけの参照データセットではないので、サンプルサイズが不足。
- GEOGLAM/JECAMというCroplandの定義を使用。

3. 技術や手法のキモはどこ？
- 層別サンプリングにおいて、判読が難しいCroplandが25%-75%のピクセルを多めに判読。

4. どうやって有効だと検証した？
- 取得したサンプルとは別に2000点取得し（そのうち207点は除外）、衛星画像判読のトレーニングを受けた3人の学生に判読させた。
- 更に別の点をIIASAの専門家が判読。
- 参加者は20地点ごとに検証点を判読する。

5. 議論はある？ 

6. 次に読むべき論文は？
- [Assessing global land cover reference datasets for different user communities](https://www.sciencedirect.com/science/article/pii/S0924271614000458)

## [Virtual Interpretation of Earth Web-Interface Tool (VIEW-IT) for Collecting Land-Use/Land-Cover Reference Data](https://www.mdpi.com/2072-4292/3/3/601/htmp)
- 出版: Remote Sens. 2011, 3(3), 601-620
- 読んだ日： 2018/10/17
- ★★★☆☆

1. どんなもの？
- Google Earth APIを用いて参照データを取得するプラットフォームを構築

2. 先行研究と比べてどこがすごい？
- 2011年の論文なので、これが初？

3. 技術や手法のキモはどこ？
- Google Earth APIを使用。
- ArcGIS Serverを用いて時系列EVIを表示
- Google Chartsで統計情報を表示
- サンプル同士は1000m以上離れてるようにする。
- 二人のユーザーの判読が異なった場合、エキスパートが判読する。

4. どうやって有効だと検証した？
-　Latin AmericaとCaribbeanの参照データセットをVIEW-ITを用いて取得。
- 18ヶ月かけ、約46,000点判読。

5. 議論はある？ 
- Google Eath APIが廃止されたからか、VIEW-ITのサイト自体を見つけられなかった。

6. 次に読むべき論文は？

## [Crowdsourcing In-Situ Data on Land Cover and Land Use Using Gamification and Mobile Technology](http://www.mdpi.com/2072-4292/8/11/905)
- 出版: 
- 読んだ日：
- ★★★★☆

1. どんなもの？

2. 先行研究と比べてどこがすごい？

3. 技術や手法のキモはどこ？

4. どうやって有効だと検証した？

5. 議論はある？ 

6. 次に読むべき論文は？
- [Virtual Interpretation of Earth Web Interface Tool (VIEW IT) for Collecting Land Use/Land Cover Reference Data](https://pdfs.semanticscholar.org/5b26/f230013d50c01f13b4573962b8474c6fa2b9.pdf)
  -  Geo-Wikiのように高解像度衛星画像を参照して検証情報を集めるプロジェクト？
- [LUCAS 2015](http://ec.europa.eu/eurostat/documents/205002/6786255/LUCAS2015-C1-Instructions-20150227.pdf)
  - ヨーロッパが3年に一度行っている現地調査。ポイントが1500mを超える場合？や衛星画像から判読不能な場合に現地調査。

## [Characterizing the Spatial and Temporal Availability of Very High Resolution Satellite Imagery in Google Earth and Microsoft Bing Maps as a Source of Reference Data](https://www.mdpi.com/2073-445X/7/4/118)
- 出版: Land 2018, 7(4), 118
- 読んだ日：2018/10/18
- ★★★★☆

1. どんなもの？
- 高分解能衛星画像が参照出来る地域を調べた。
- Google EarthとMicrosoft Bing Mapをそれぞれ比較した。

2. 先行研究と比べてどこがすごい？
- 網羅的に調べた論文は初？

3. 技術や手法のキモはどこ？
- APIを叩いてVHRのメタデータを解析した。
  - 2017年1月以降、GoogleEarthのAPI変更によりメタデータは取り出せなくなった模様。
- 地域ごと、用途ごとにまとめている。

4. どうやって有効だと検証した？
- メタデータ解析なので有効性の確認はない。

5. 議論はある？ 
- Globalで考える場合以外にも、地域で土地被覆図を作成する場合にもこの論文で扱っている題材は重要そう。

6. 次に読むべき論文は？
- [A global reference database of crowdsourced cropland data collected using the Geo-Wiki platform](https://www.nature.com/articles/sdata2017136)
  - Geo-Wiki論文。
- [Validation of GIS layers in the EU: getting adapted to available reference data](https://www.tandfonline.com/doi/abs/10.1080/17538947.2010.512746<Paste>)
  - EUのLUCASキャンペーンの論文？読みたいがオープンアクセスじゃない。

## [Collect Earth: Land User and Land Cover Assessment through Augmented Visual Interpretation](https://www.mdpi.com/2072-4292/8/10/807)
- 出版:Remote sens. 2016, 8, 807.
- 読んだ日：2018/10/16
- ★★★★★

1. どんなもの？
- 複数のデータを参照しながら参照データを取得するCollect Earth。

2. 先行研究と比べてどこがすごい？
- 複数の高解像度衛星を用いている。
- GoogleEarthEngineによって年次・年内の植生の変化を図示
- saiku analyticsとの統合による組み込みのデータ解析ツール
- 確率的サンプリングツール

3. 技術や手法のキモはどこ？
- 複数のツールを組み合わせ、複数の情報を参照出来る点。

4. どうやって有効だと検証した？
- 実際のプロジェクトで使った。

5. 議論はある？ 
- 実際に使ってみたが、カテゴリで登録というよりは被覆率で登録するようで、ちょっと使いづらかった。
- ただGEEとの連携は見事。

6. 次に読むべき論文は？

## [A global dataset of crowdsourced land cover and land use reference data](https://www.nature.com/articles/sdata201775)
- 出版: Scientific data
- 読んだ日：2018/10/03
- ★★★★☆

1. どんなもの？
- 4つのキャンペーンで構成されたクラウドデータセット。
  - それぞれデザインによってサンプルのとり方が違う（https://www.nature.com/articles/sdata201775/tables/1）
- カテゴリは明記がない場合以下の10種
  - [1] tree cover; [2] shrub cover; [3] herbaceous vegetation/grassland; [4] cultivated and managed; [5] mosaic of cultivated and managed/natural vegetation; [6] flooded/wetland; [7] urban; [8] snow and ice; [9] barren; and [10] open water. 
- トップ10のコントリビューターは科学出版の共著者とする。


2. 先行研究と比べてどこがすごい？
- データ量、100,000点のユニークな地点数。

3. 技術や手法のキモはどこ？
- 判断時の確度

4. どうやって有効だと検証した？
- 専門家が作った対象データとの比較、データの相互チェック、整合性チェックにより品質を確保。

5. 議論はある？ 

6. 次に読むべき論文は？
- [A global land-cover validation data set, II: augmenting a stratified sampling design to estimate accuracy by region and land-cover class](https://www.tandfonline.com/doi/abs/10.1080/01431161.2012.695092) 
- [ A global land-cover validation data set, II: augmenting a stratified sampling design to estimate accuracy by region and land-cover class](https://www.tandfonline.com/doi/abs/10.1080/01431161.2012.695092) ... 本文で参照されていたグローバルデータセットのプロポーザル。
- [A global reference database from very high resolution commercial satellite data and methodology for application to Landsat derived 30 m continuous field tree cover data](https://www.sciencedirect.com/science/article/pii/S003442571500036X) ... 上に基づいて作られたデータセット？
- [LACO-WIKI: AN OPEN  ACCESS ONLINE PORTAL FOR LAND COVER VALIDATION ](https://www.isprs-ann-photogramm-remote-sens-spatial-inf-sci.net/II-3-W5/167/2015/isprsannals-II-3-W5-167-2015.pdf)

7. 感想
- LandSenceという取り組みが面白そう（https://landsense.eu/）



7. 感想

## [Continuous Change Detection and Classification Using Hidden Markov Model: A Case Study for Monitoring Urban Encroachment onto Farmland in Beijing](http://www.mdpi.com/2072-4292/7/11/15318)
- 出版 : Remote Sens. 2015, 7(11), 15318-15339
- 読んだ日：
- ★★☆☆☆

1. どんなもの？
- 10年分のMODISを使って土地被覆変化抽出。

2. 先行研究と比べてどこがすごい？
- 変化抽出精度が向上。
- 計算リソースも削減。 

3. 技術や手法のキモはどこ？
- ノイズを除去。
  - 雲/雪はMODISのクオリティフラグによって除去。
  - それでも取りきれなかった雲は、青色バンドの反射率が0.2以上であれば取り除いた。
- その後、フーリエ回帰で時系列フィッテイング。
- MODISはK-meansでクラスタリングし、その後土地被覆図（GlobCover 2009）と対応付けることにより、フェノロジーの地域性を確保。
- 隠れマルコフの制約を緩めるために、隠れセミマルコフモデルを採用。

4. どうやって有効だと検証した？

5. 議論はある？

6. 次に読むべき論文は？
- Brooks, E.B.; Thomas, V.A.; Wynne, R.H.; Coulston, J.W. Fitting the multitemporal curve: A Fourier series approach to the missing data problem in remote sensing analysis. IEEE Trans. Geosci. Remote Sens. 2012, 50, 3340&#8211;3353.
- Boriah, S. Time Series Change Detection: Algorithms for Land Cover Change.

7. 感想
- 時系列フィッティングは他の手法でも良さそう。たとえば[[prophet|https://github.com/facebook/prophet]]

## [Predicting Spatial and Decadal LULC Changes Through Cellular Automata Markov Chain Models Using Earth Observation Datasets and Geo-information](https://link.springer.com/article/10.1007/s40710-015-0062-x)
- 出版：Environmental Processes, March 2015, Volume 2, Issue 1, pp 61&#8211;78
- 読んだ日：
- ★☆☆☆☆

1. どんなもの？
- インド。
- 1990年と2000年の2枚の画像を用いて隠れマルコフ・セル・オートマトンを学習し、2010年でテスト。
- その後2020年の土地被覆を予想。

2. 先行研究と比べてどこがすごい？
- 不明

3. 技術や手法のキモはどこ？
- 1990, 2000, 2010年それぞれに対して教師なし分類で土地被覆図を作成。
- IDRISI Kilimanjaro ソフトを使った。

4. どうやって有効だと検証した？
- 読んでない。

5. 議論はある？

6. 次に読むべき論文は？
- なし

7. 感想
- 各パラメータの決定を知りたかったのに、この研究もIDRISIで重みなどを決めたと書かれており、読むのをやめた。
- マルコフ連鎖を使った土地被覆研究は、大体IDRISI頼みなのかもしれない。

## [A Hidden Markov Models Approach for Crop Classification: Linking Crop Phenology to Time Series of Multi-Sensor Remote Sensing Data](http://www.mdpi.com/2072-4292/7/4/3633/htm)
- Remote Sens. 2015, 7(4), 3633-3650
- 読んだ日：2018/02/21
- ★★☆☆☆

1. どんなもの？
- 隠れマルコフ連鎖とフェノロジーモデルを、地中海の農業地域で適用。
- ピクセル分類。
- LPIS(Land Parcel Identification System-LPIS）からトレーニングデータを取得( 55 parcels)。

2. 先行研究と比べてどこがすごい？
- 高解像度（RapidEye）と中解像度（Landsat ETM+）の衛星画像を組み合わせた（パンシャープンした）こと。

3. 技術や手法のキモはどこ？
- 大気補正・ラジオメトリック補正をあえて使用しなかった。
- その代わりに、各画像内の状態の類似性に応じて、ピクセルを畑に割り当て、その後のステップで、時期画像は統計的関係を使用してリンクさせた。


4. どうやって有効だと検証した？
- パンシャープン適用前の分類結果と適用後の分類結果を比較。

5. 議論はある？
- 状態遷移確率 aij(t)の定義が、トレーニングデータと植物季節カレンダーから決めたとしか書かれておらず、不明。

6. 次に読むべき論文は？
- Viovy, N.; Saint, G. Hidden markov models applied to vegetation dynamics analysis using satellite remote sensing. IEEE Trans. Geosci. Remote Sens. 1994, 32, 906&#8211;917.
  - HMMsについてもう少し詳しく書かれていそう。ただIEEEなので、アクセス出来ない。

7. 感想
- HMMsの学習方法を見たかったが、擬似アルゴリズムが書かれておらず、分からなかった。
- そのため、結果と結論は読み飛ばした。
- ただパンシャープン土地被覆図は面白そう。

## [A Markov model of land-use change dynamics in the Niagara Region, Ontario, Canada](https://link.springer.com/content/pdf/10.1007%2FBF00124382.pdf)
- Landscape Ecology vol.9 no. 2 pp 151-157 (1994)
- 読んだ日：2018/02/20
- ★★★☆☆

1. どんなもの？
- マルコフ連鎖モデルでナイアガラの土地被覆変化

2. 先行研究と比べてどこがすごい？
- 不明。

3. 技術や手法のキモはどこ？
- 1:50,000の地形図を5年分使用。
- 1886点それぞれで、250 m半径に占めている土地被覆を判定。
- マルコフ連鎖モデルを適用する前に、土地被覆変化がランダムでないことをχ^2検定で確かめた。

4. どうやって有効だと検証した？
- 不明。

5. 議論はある？
- 各点同士の独立性が微妙。マルコフ連鎖ではマップ全体と各年における遷移確率を計算しているように見えたので、そのへんは考慮されていないのかもしれない。

6. 次に読むべき論文は？
- Bourne (1969)がおそらく元祖。ただ読む必要はなさそう。

7. 感想
- A remote sensing aided multi-layer perceptron-Markov chain analysis for land use and land cover change prediction in Patna district (Bihar), Indiaで参照していたので読んだ。


## [A remote sensing aided multi-layer perceptron-Markov chain analysis for land use and land cover change prediction in Patna district (Bihar), India](https://link.springer.com/article/10.1007/s12517-015-2138-3)
- First Online: 24 March 2016
- 読んだ日：2018/02/20
- ★★☆☆☆

1. どんなもの？
- [[多層パーセプトロン]]による[[マルコフ連鎖]]モデル（MLP-MCA)で土地被覆変化を予想
- Landsat-TMセンサを用いた。
- 3年分の土地被覆図を[[最尤法]]で作成し、2013年の土地被覆図をMLP-MCAで作った。
- さらに2013年の結果を基に、2038年と2050年の土地被覆変化を予想した。

2. 先行研究と比べてどこがすごい？
- 新規性：土地被覆変化モデルは地域によって異なるので、Patna district of Biharを対象にしたこと。

3. 技術や手法のキモはどこ？
- MLPとMCAを組み合わせたこと。
- 土地被覆変化モデルはIDRISIというソフトを使った。
  - マニュアル見てもよく分からなかった。[[この論文|https://www.sciencedirect.com/science/article/pii/S1364815213002016]]で説明されている？
- 主要な土地被覆変化（土地を荒廃させる農地、農地に土地を荒廃させる土地、建設する農地、建設する植生、河床への水域、水域への河床）のみを選択。
- 3つの静的要因（標高、傾斜、aspect）と１つの動的要因（主要道路からの距離）

4. どうやって有効だと検証した？
- コンフュージョンマトリックス。

5. 議論はある？
- 各年のTM画像は衛星画像1枚。
- ASTER-DEM と道路網。
- agricultural land, vegetation, shrubs, fallow land, &#8203;built up, water bodies, and riverbed

6. 次に読むべき論文は？
- [Simulation of land use spatial pattern of towns and villages based on CA&#8211;Markov model](https://www.sciencedirect.com/science/article/pii/S0895717710005108)
  - マルコフ連鎖モデルで土地被覆シミュレーション。本論文よりシンプル？
- [A Markov model of land-use change dynamics in the Niagara Region, Ontario, Canada](https://link.springer.com/content/pdf/10.1007%2FBF00124382.pdf)
  - マルコフ連鎖。1994年の論文。元祖？

7. 感想
- 手法とアイデアを知りたかったが、商用ソフトで行っている計算がいまいち分からなかったため、手法のキモが見えてこなかった。
- そのため後半は読み飛ばした。

