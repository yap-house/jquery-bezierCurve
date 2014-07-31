jQuery(function($){
  var ua = window.navigator.userAgent.toLowerCase();

  var first_view = $("#first-view");
  var first = $("#first-demo");
  var second = $("#second-demo");
  var third = $("#third-demo");
  var fourth = $("#fourth-demo");

  var first_view_path = $.bezierCurve(980, 180)
    .addPoint(260, 140, true)
    .addPoint(220, 280, true)
    .addPoint(200, 340, true)
    .addPoint(190, 380, true)
    .addPoint(150, 200, true)
    .addPoint(140, 280, true)
    .addPoint(145, 380, true)
    .addPoint(152, 540, true)
    .addPoint(160, 550, true)
    .addPoint(165, 620, true)
    .addPoint(170, 620, true)
    .addPoint(180, 600, true)
    .addPoint(190, 430, true)
    .addPoint(195, 460, true)
    .addPoint(200, 600, true)
    .addPoint(202, 660, true)
    .addPoint(198, 760, true)
    .addPoint(194, 900, true)
    .addPoint(186, 920, true)
    .addPoint(184, 720, true)
    .addPoint(172, 740, true)
    .addPoint(170, 780, true)
    .addPoint(168, 900, true)
    .addPoint(170, 1000, true)
    .addPoint(-100, 160);

  var first_path = $.bezierCurve(820, 380)
    .addPoint(600, 40)
    .addPoint(280, 20)
    .addPoint(80, 120)
    .addPoint(300, 360).canvasSimulator(first.find(".view"));

  var second_path = $.bezierCurve(0, 0).addPoint(400, 200).addPoint(0, 370);

  var third_path = $.bezierCurve(980, 200)
    .addPoint(140, 800, true)
    .addPoint(260, 400, true)
    .addPoint(200, 800, true)
    .addPoint(160, 800, true)
    .addPoint(100, 800, true)
    .addPoint(270, 800, true)
    .addPoint(175, 1400, true);


  var first_view_anime = function(){
    var dur = 4000;
    var p1 = first_view_path;
    var p2 = first_view_path.reverse();

    first_view.find(".target1").delay(800)
      .animate({bezierPath: p1.rotate()}, dur, "linear")
      .delay(800).animate(
        {bezierPath: p2.rotate()},
        dur,
        "linear"
      );

    first_view.find(".target2").delay(1600)
      .animate({bezierPath: p1.rotate()}, dur, "linear")
      .delay(800).animate(
        {bezierPath: p2.rotate()},
        dur,
        "linear",
        first_view_anime
      );
  };

  var first_demo = function(){
    first.find(".target").animate({bezierPath: first_path}, 2000, "linear")
      .animate({bezierPath: first_path.reverse()}, 2000, "linear", first_demo);
  };

  var second_demo = function(){
    var p = second_path;
    second.find(".target").delay(500)
      .animate({bezierPath: p}, 3000).delay(500)
      .animate({bezierPath: p.reverse()}, 3000, second_demo);
  };

  var third_demo = function(){
    third.find(".target").animate(
      {bezierPath: third_path.rotate()},
      5000, "easeInSine", third_demo
    );
  };

  var fourth_demo = function(){
    var path = $.bezierCurve(
      Math.round(Math.random()*890+10), Math.round(Math.random()*360+10)

    ).addPoint(
      Math.round(Math.random()*890+10), Math.round(Math.random()*360+10)

    ).addPoint(
      Math.round(Math.random()*890+10), Math.round(Math.random()*360+10)

    ).addPoint(
      Math.round(Math.random()*890+10), Math.round(Math.random()*360+10)
    );

    fourth.find(".target").animate(
      {bezierPath: path.canvasSimulator(fourth.find(".view"))},
      2000, fourth_demo
    );
  };

  first_view_anime();
  first_demo();
  second_demo();
  third_demo();
  fourth_demo();


  $("#glo-nav").on("mouseenter", "li", function(){
    if(!$(this).hasClass("has-child")) return;
    $(this).find(".child").show();

  }).on("mouseleave", "li", function(){
    if(!$(this).hasClass("has-child")) return;
    $(this).find(".child").hide();

  });

  $(document).on("click", "a", function(e){
    var href = $(this).attr("href");
    if(!href.match(/^#.*/)) return;
    e.preventDefault();
    var top = $(href).offset().top;

    $(ua.match(/webkit/)?"body":"html").animate({scrollTop: top});
  });
});