#jquery-bezierCurve

bezierCurveはjQueryのanimateメソッドを拡張して、曲線的な動きを再現するプラグインです。  
[デモページ][DEMO01]

##ブラウザ対応状況
メソッドのいくつかはIE9以上の対応になりますが、基本的な動作はIE8以下でも確認済みです。  
IE8以下で動作しないメソッドは下記の[メソッド]項目で記述します。

##使い方
まず動かしたい要素を絶対配置で指定します。  
```HTML
&lt;style&gt;
\#hoge-wrap \{
  position: relative;
\}

\#hoge \{
  position: absolute;
\}
&lt;/style&gt;

&lt;div id=&quot;hoge-wrap&quot;&gt;
  &lt;div id=&quot;hoge&quot;&gt;
&lt;/div&gt;
```

$.bezierCurveの第一引数にスタート地点のX座標、第二引数にY座標を指定します。
addPointメソッドで座標を追加していき、animateメソッドでbezierPathを実行します。
```js
var path = $.bezierCurve(x, y)
  .addPoint(x, y)
  .addPoint(angle, length, true)
  .addPoint(x, y);

  $(&quot;#hoge&quot;).animate({bezierPath: path}, duration, easing, callback);
```

$.bezierCurveはaddPointメソッドで追加された座標を格納し、animateを実行した際に、格納した座標をもとにN次ベジェ曲線の公式を用いて曲線的なパスを生成します。
addPointについては下記のメソッド項目にて詳細を記述します。

##メソッド
ここでは$.bezierCurveのメソッドを一つずつ紹介いたします。  
ここでの説明は簡易的なものになりますので、詳しくはデモページをご覧ください。  
[デモページ: メソッド][DEMO03]
[DEMO01]: http://okazaki-takama.github.io/jquery-bezierCurve/
[DEMO02]: http://okazaki-takama.github.io/jquery-bezierCurve/#howto
[DEMO03]: http://okazaki-takama.github.io/jquery-bezierCurve/#method