#jQuery.bezierCurve

jQuery.bezierCurveはjQueryのanimateメソッドを拡張して、曲線的な動きを再現するプラグインです。  
[デモページ][DEMO01]

##ブラウザ対応状況
メソッドのいくつかはIE9以上の対応になりますが、基本的な動作はIE8以下でも確認済みです。  
IE8以下で動作しないメソッドは下記の[メソッド]項目で記述します。

##使い方
まず動かしたい要素を絶対配置で指定します。  
```HTML
<style>
#hoge-wrap {
  position: relative;
}

#hoge {
  position: absolute;
}
</style>

<div id="hoge-wrap">
  <div id="hoge"></div>
</div>
```

$.bezierCurveの第一引数にスタート地点のX座標、第二引数にY座標を指定します。  
addPointメソッドで座標を追加していき、animateメソッドで*bezierPath*を実行します。  
```js
var path = $.bezierCurve(x, y)
  .addPoint(x, y)
  .addPoint(angle, length, true)
  .addPoint(x, y);

  $("#hoge").animate({bezierPath: path}, duration, easing, callback);
```

$.bezierCurveはaddPointメソッドで追加された座標を格納し、animateを実行した際に、格納した座標をもとに*N次ベジェ曲線*の公式を用いて曲線的なパスを生成します。
$.bezierCurveの詳細についてはデモページに記載してありますので、詳しくはデモページをどうぞ。  
[デモページ: How to use][DEMO02]

※addPointについては下記のメソッド項目にて詳細を記述します。

##メソッド
ここでは$.bezierCurveのメソッドを一つずつ紹介いたします。  
ここでの説明は簡易的なものになりますので、詳しくはデモページ*Method*項目をご覧ください。  
[デモページ: Method][DEMO03]

###addPoint
$.bezierCurveを動作させるのに*必須*のメソッドになります。  
このメソッドを指定しなかった場合$.bezierCurveは引数で指定した位置から動作することはありません。

指定の仕方は下記になります。  
```js
  $bezierCurve(x, y).addPoint(a, b, is_angle);
```

第三引数*is_angle*が空、もしくは*false*の場合、第一引数*a*はX座標、第二引数*b*はY座標での指定となります。  
第三引数*is_angle*がtrueの場合、$.bezierCurveの引数に指定したスタート地点の座標を基点として、第一引数*a*を角度、第二引数*b*を距離で指定することができます。  
```js
  $.bezierCurve(x, y)
    .addPoint(x, y) //is_angleが空なので、第一引数がX座標、第二引数がY座標
    .addPoint(angle, length, true) //is_angleがtrueなので第一引数が角度、第二引数が距離
```

詳しくはデモページの*addPoint*項目をご確認ください。
[デモページ: addPoint][DEMO04]
[DEMO01]: http://okazaki-takama.github.io/jquery-bezierCurve/
[DEMO02]: http://okazaki-takama.github.io/jquery-bezierCurve/#howto
[DEMO03]: http://okazaki-takama.github.io/jquery-bezierCurve/#method
[DEMO04]: http://okazaki-takama.github.io/jquery-bezierCurve/#addPoint
