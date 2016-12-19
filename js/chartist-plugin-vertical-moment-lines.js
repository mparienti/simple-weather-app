(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function () {
      return (root.returnExportsGlobal = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['Chartist.plugins.verticalMomentLines'] = factory();
  }
}(this, function () {
  /**
   * Chartist.js plugin to insert vertical lines at precise moment data in a line chart.
   *
   * Inspired from https://github.com/zubenkoivan/chartist-plugin-vertical-line/
   *
   * by Michael Parienti
   *
   */
  /* global Chartist */
  (function (window, document, Chartist) {
    'use strict';

    var defaultOptions = {
      lines: undefined,
      rectangles: undefined,
      className: 'vt-mnt-line'
    };

    var VerticalZone = function (chart, chartRect, data) {

      this.showline = function (x, className) {
        x = data.axisX.projectValue(x.getTime());
        if ( x > 0 &&
             (x + data.chartRect.x1) < data.chartRect.x2 ) {
          chart.svg.elem('line', {
            x1: data.chartRect.x1 + x,
            x2: data.chartRect.x1 + x,
            y1: chartRect.y1,
            y2: chartRect.y2// + $label.height()
          }, className);
        }
      };
      this.showrect = function (value, className) {
        var x1, x2;
        if (typeof value.x1 == 'undefined' ||
            (x1 = data.axisX.projectValue(value.x1.getTime())) < 0 )  {
              x1 = chartRect.x1;
            } else {
              x1 = chartRect.x1 + x1;
            }
        if (typeof value.x2 == 'undefined' ||
            (x2 = data.axisX.projectValue(value.x2.getTime())) > chartRect.x2 )  {//faux
              x2 = chartRect.x2;
            } else {
              x2 = chartRect.x1 + x2;
            }
        if (x2-x1 > 0) {
          chart.svg.elem('rect', {
            x: x1,
            y: chartRect.y2, //should be value.x1
            width: x2-x1,//,
            height: chartRect.y1 - chartRect.y2 //should be abs(value.y1 - value.y2)
          }, className);
        }
      };
    };

    Chartist.plugins = Chartist.plugins || {};
    Chartist.plugins.verticalMomentLines = function (options) {

      options = Chartist.extend({}, defaultOptions, options);

      return function (chart) {

        if (!(chart instanceof Chartist.Line)) {
          return;
        }

        chart.on('created', function (data) {
          var verticalzone = new VerticalZone(chart, data.chartRect, data);
          var x = 0;
          var className = '';
          for (var i=0; i<options.lines.length; i++) {
            className = options.lines[i].className;
            verticalzone.showline(options.lines[i].value, className);
          }
          for (var i=0; i<options.rectangles.length; i++) {
            className = options.rectangles[i].className;
            verticalzone.showrect(options.rectangles[i].value, className);
          }
        });
      };
    };

  }(window, document, Chartist));
  return Chartist.plugins.verticalMomentLines;

}));


/*
 https://github.com/gionkunz/chartist-js/issues/90

*/
