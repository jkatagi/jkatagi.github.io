(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{330:function(a,t,e){"use strict";e.r(t);var r=e(33),n=Object(r.a)({},(function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("h1",{attrs:{id:"第2章：衛星画像を見てみよう"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#第2章：衛星画像を見てみよう"}},[a._v("#")]),a._v(" 第2章：衛星画像を見てみよう")]),a._v(" "),e("p",[a._v("みなさんは衛星画像を見たことがありますか？\n身近では、天気予報の画像や、Google\nMapなどの地図アプリで表示される画像で見たことがあるかもしれません。")]),a._v(" "),e("p",[a._v("解析をして見る前に、まずは実際に衛星画像を見てみましょう。 Google Earth\nEngineのページに、"),e("a",{attrs:{href:"https://earthengine.google.com/timelapse/",target:"_blank",rel:"noopener noreferrer"}},[a._v("タイムラプス"),e("OutboundLink")],1),a._v("というページがあります。")]),a._v(" "),e("p",[a._v("このページは1年毎に撮影された衛星画像をタイムラプスで表示させています。\nこのページに飛ぶと、アメリカのMiami付近が表示されます。\n"),e("a",{attrs:{href:a.$withBase("/chap02/timelapse_miami.png"),target:"_blank"}},[e("img",{attrs:{src:a.$withBase("/chap02/timelapse_miami.png"),alt:""}})])]),a._v(" "),e("p",[a._v("西側に着目すると、森のようなものが伐採され、その代わりにプールのようなものが建築されている様子が見て取れます。\nこのページでは、Miami以外にもいくつかの場所が予め用意されています。")]),a._v(" "),e("p",[a._v("ためしにShirase Glacierを表示させてみましょう。\n"),e("a",{attrs:{href:a.$withBase("/chap02/timelapse_shirase_glacier.png"),target:"_blank"}},[e("img",{attrs:{src:a.$withBase("/chap02/timelapse_shirase_glacier.png"),alt:""}})]),a._v("\nこの地域では、2000年ごろから氷河が徐々に動いている様子を観察出来ます。\nバーを右に動かし、Aral Sea（アラル海）というものを見てみましょう。\nアラル海の縮小は、高校で地理を勉強した人は聞き覚えが有るかもしれません。\nこの地域は灌漑農業によって地下水の水を大量に取得してしまった結果、アラル海の縮小を引き起こしてしまいました。\nこのように衛星画像を時系列に表示させることによって、その変化を見て取ることが出来るのが人工衛星画像の強みです。\nこれが可能なのは、人工衛星が定期的に地球を回っていて、どの地域もまんべんなく撮影しているからです。\n下のバーにはいくつか代表的な地点が選択されていますが、自分でスクロールして見たい地域を選ぶことも出来ます。\n自分の地元の30年前からの様子を見てみると、何か面白いことが発見出来るかもしれませんね。")]),a._v(" "),e("p",[a._v("さて、ここまでは人工衛星画像を時系列に表示させることにより、ざっくりとした変化を見てきました。\nしかしながら、氷河がどれだけ融解したか、アラル海の面積がどれだけ縮小したかは、数値で表さないと分かりません。\nそこでGoogle Earth Engineの登場です。\nここからは簡単なプログラミングを行いながら、実際に解析を行っていきます。\nまずはGoogle Earth\nEngineでのプログラミングに慣れていくことから始めましょう。")]),a._v(" "),e("h2",{attrs:{id:"google-earth-engineに登録しよう"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#google-earth-engineに登録しよう"}},[a._v("#")]),a._v(" Google Earth Engineに登録しよう")]),a._v(" "),e("p",[a._v("Google Earth Engineで解析をするには、Googleのアカウントが必要です。\nまだアカウントを持っていない人はここで作ってください。 サイト右上のSIGN\nUPをクリックして、gmailのアドレス、パスワードを入力して次へをクリックします。\nTHANK YOUと表示されたページに移動すれば完了です。KEEP\nEXPLORINGをクリックし、トップページに戻ります。")]),a._v(" "),e("p",[a._v("右上のPLATFORM→ CODE EDITORをクリックします。 今後の解析はCODE\nEDITORというページ上で行っていきますので、このページをブックマーク（お気に入り）に追加しておくと便利です。")]),a._v(" "),e("h3",{attrs:{id:"画面の説明"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#画面の説明"}},[a._v("#")]),a._v(" 画面の説明")]),a._v(" "),e("p",[a._v("実際に解析を始める前に、ざっくりと画面を説明します。\n"),e("a",{attrs:{href:a.$withBase("/chap02/code_editor.png"),target:"_blank"}},[e("img",{attrs:{src:a.$withBase("/chap02/code_editor.png"),alt:""}})])]),a._v(" "),e("p",[a._v("CODE EDITORは、プログラムを書いたりする上画面と、その結果を表示する下画面に分かれています。")]),a._v(" "),e("p",[a._v("使い方としては左上の画面でスクリプトを作成/選択し、Code\nEditorで編集し実行、その後Mapに表示された結果を見て、Code\nEditorに戻って…といった感じです。\n各タブの使い方は本書の要所要所で説明していきます。")]),a._v(" "),e("h3",{attrs:{id:"javascriptの説明"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#javascriptの説明"}},[a._v("#")]),a._v(" JavaScriptの説明")]),a._v(" "),e("p",[a._v("本書ではJavaScriptというプログラミング言語を用いて，コードを書いていきます。\nJavaScriptはWebページに動きをつけたりといった用途に用いられることが多い言語です。\nコードを実行しながら結果を可視化することが出来るので，プログラミングの入門言語としても人気です。\n本書ではJavaScriptの基本的な文法しか用いないので，JavaScriptを知らないという方もご安心を。\n必要に応じてその場その場で説明していきますが，それでも不安という方は"),e("a",{attrs:{href:"https://developers.google.com/earth-engine/tutorial_js_01",target:"_blank",rel:"noopener noreferrer"}},[a._v("Google Earth EngineのJavaScriptチュートリアル"),e("OutboundLink")],1),a._v("を一通り眺めてみるとよいでしょう。")]),a._v(" "),e("h2",{attrs:{id:"まとめ"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#まとめ"}},[a._v("#")]),a._v(" まとめ")]),a._v(" "),e("p",[a._v("（書きかけ）")]),a._v(" "),e("h2",{attrs:{id:"練習問題"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#練習問題"}},[a._v("#")]),a._v(" 練習問題")]),a._v(" "),e("p",[a._v("（書きかけ）")]),a._v(" "),e("h2",{attrs:{id:"コラム：日本の地球観測衛星"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#コラム：日本の地球観測衛星"}},[a._v("#")]),a._v(" コラム：日本の地球観測衛星")]),a._v(" "),e("p",[a._v("（書きかけ）")]),a._v(" "),e("h2",{attrs:{id:"コラム：人工衛星を見てみよう"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#コラム：人工衛星を見てみよう"}},[a._v("#")]),a._v(" コラム：人工衛星を見てみよう")]),a._v(" "),e("p",[a._v("本書では人工衛星で観測した画像を解析していきますが、実際に人工衛星自身を肉眼で観測することも出来ます。画面に向き合って疲れた時は、たまには席から離れて人工衛星を眺めてみるのもいいかもしれません。")]),a._v(" "),e("h2",{attrs:{id:"コラム：pythonでの利用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#コラム：pythonでの利用"}},[a._v("#")]),a._v(" コラム：Pythonでの利用")]),a._v(" "),e("p",[a._v("Google Earth\nEngineはPythonを用いて解析することも出来ますが、本誌ではJavaScriptを使った解析を説明していきます。\nその理由としては、Pythonで実行する場合、Web上で解析が出来ないことと、地図を表示させながらインタラクティブに解析することが難しいためです（Google Cloud Platformを用いることでこれらは解消されるかもしれませんが、本書では割愛します）。")]),a._v(" "),e("p",[a._v("Pythonでの解析に興味が有る方は、"),e("a",{attrs:{href:"https://developers.google.com/earth-engine/python_instal",target:"_blank",rel:"noopener noreferrer"}},[a._v("こちらのチュートリアル"),e("OutboundLink")],1),a._v("をご覧ください。")])])}),[],!1,null,null,null);t.default=n.exports}}]);