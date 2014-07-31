/*
*
*Plugin: jQuery bezierCurve
*Version 1.0.0
*Author: Takama Okazaki
*
*Licensed under the MIT license.
*
*/



;(function($){
  var transform_prefix = ["transform", "WebkitTransform", "MozTransform", "msTransform"];

  var factorial = function(n){
    var f = 1;
    for(var i=n; i>0; i--) f = f * i;
    return f;
  };

  var bT = function(t, n){
    var Cd, C, a, b, r;
    var nF = factorial(n);
    var parts = new Array();

    for(r=0; r<=n; r++){
      Cd = factorial(n-r) * factorial(r);
      C = r===0 || r===n ? 1 : nF/Cd;
      a = Math.pow(t, (n-r));
      b = Math.pow((1-t), r);

      parts.push(C * a * b);
    }

    return parts;
  };

  var get_coord = function(x, y){
    return {x: x, y: y};
  };

  var get_angle2coord = function(x, y, angle, length){
    return get_coord(x + Math.round(Math.cos(angle * (Math.PI / 180)) * length),
                     y - Math.round(Math.sin(angle * (Math.PI / 180)) * length));
  };

  var get_css = function(coord){
    var style = {};
    style.coord = coord;
    style.top = coord.y + "px";
    style.left = coord.x + "px";

    return style;
  };

  var get_point = function(t, coords){
    var point = {x: 0, y: 0};
    var parts = bT(t, coords.length-1);

    $.each(coords, function(i, coord){
      point.x = point.x + (parts[i] * coord.x);
      point.y = point.y + (parts[i] * coord.y);
    });

    return point;
  };


  var BezierCurve = function(x, y){
    this._init(x, y);
    return this;
  };
  BezierCurve.prototype = {
    _init: function(x, y){
      this.x = x;
      this.y = y;
      this.coords = [get_coord(this.x, this.y)];
      this.re_coords = new Array();
    },

    _exec: function(p){
      var coord = get_point(p, this.coords);
      return get_css(coord);
    },

    addPoint: function(a, b, is_angle){
      if(is_angle)
        this.coords.push(get_angle2coord(this.x, this.y, a, b));
      else
        this.coords.push(get_coord(a, b));
      return this;
    },

    reverse: function(){
      var re_coords = new Array();

      $.each(this.coords, function(i, coord){
        re_coords.push(coord);
      });
      re_coords.reverse();

      return $.extend({}, this, {coords: re_coords});
    },

    rotate: function(){
      var arr = new Array();
      var did = {x: this.x, y: this.y};

      $.each(this.coords, function(i, coord){
        arr.push(coord);
      });

      return $.extend({}, this, {
        coords: arr,
        rotate: function(){return this;},
        _exec: function(p){
          var coord = get_point(p, this.coords);
          var style = get_css(coord);

          var x = coord.x - did.x,
              y = coord.y - did.y,
              z = Math.sqrt(Math.abs(Math.pow(x, 2) + Math.pow(y, 2)));
          var deg = Math.acos(x/z) * (180/Math.PI);

          style.deg = isNaN(deg) ? 0 : 180 - deg;
          if(coord.y > did.y) style.deg *= -1;

          did.x = coord.x;
          did.y = coord.y;

          return style;
        }
      });
    },

    canvasSimulator: function(parent){
      if(!parent || !parent.length) return this;

      var coords = this.coords;
      var $canvas = $('<canvas class="bezier-simulator" />');
      var canvas = $canvas.get(0);

      if(!canvas.getContext) return this;
      var ctx = canvas.getContext("2d");

      canvas.width = parent.width();
      canvas.height = parent.height();
      $canvas.css({position: "absolute", top: 0, left: 0});

      if(parent.find(".bezier-simulator").length)
        parent.find(".bezier-simulator").remove();
      parent.prepend($canvas);

      ctx.beginPath();
      ctx.strokeStyle = "#cdcdcd";
      $.each(coords, function(i, coord){
        if(i===0) ctx.moveTo(coord.x, coord.y);
        else ctx.lineTo(coord.x, coord.y);
        ctx.fillText("("+coord.x+", "+coord.y+")", coord.x+5, coord.y-5);
      });
      ctx.stroke();

      $.each(coords, function(i,coord){
        ctx.beginPath();
        ctx.arc(coord.x, coord.y, 5, Math.PI*2, false);
        ctx.fill();
      });

      for(var i=0; i<1000; i++){
        var style = this._exec(i/1000);
        ctx.beginPath();
        ctx.arc(style.coord.x, style.coord.y, 0.5, Math.PI*2, false);
        ctx.fill();
      }

      return this;
    }
  };

  $.bezierCurve = function(x, y){
    return new BezierCurve(x, y);
  };

  $.fx.step.bezierPath = function(fx){
    var el = fx.elem;
    var style = fx.end._exec(1 - fx.pos);

    el.style.top = style.top;
    el.style.left = style.left;

    if(style.deg){
      $.each(transform_prefix, function(i, name){
        el.style[name] = "rotate("+ style.deg +"deg)";
      });
    }
  };
})(jQuery);
