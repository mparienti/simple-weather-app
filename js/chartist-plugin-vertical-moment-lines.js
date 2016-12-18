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

        // $label
        //   .html(options.label || '')
        //   .css({ left: x - $label.width() / 2 })
        //   .show();

        chart.svg.elem('line', {
          x1: x,
          x2: x,
          y1: chartRect.y1,
          y2: chartRect.y2// + $label.height()
        }, className);
      };
      this.showrect = function (value, className) {
        var xmin = Math.min(data.axisX.projectValue(value[0].getTime()), data.axisX.projectValue(value[2].getTime()));
        var ymin = Math.min(value[1], value[3]);
        var xmax = Math.max(data.axisX.projectValue(value[0].getTime()), data.axisX.projectValue(value[2].getTime()));
        var ymax = Math.max(value[1], value[3]);
        chart.svg.elem('rect', {
          x: chartRect.x1 + xmin,
          y: chartRect.y2, //value[1] if not NaN
          width: xmax-xmin,//,
          height: chartRect.y1 - chartRect.y2 // value[3] if not NaN
        }, className);
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
            if ( (x = data.axisX.projectValue(options.lines[i].value.getTime())) > 0) {//this test should be include in plugin
              verticalzone.showline(data.chartRect.x1 + x, className);
            }
          }
          for (var i=0; i<options.rectangles.length; i++) {
            className = options.rectangles[i].className;
            if ( (x = data.axisX.projectValue(options.rectangles[i].value[0].getTime())) > 0) {//this test should be include in plugin
              verticalzone.showrect(options.rectangles[i].value, className);
            }
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
