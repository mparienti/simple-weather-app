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
      positions: undefined,
      labels: undefined,
      classes: undefined,
      className: 'vt-mnt-line'
    };

    var VerticalLine = function (chart, chartRect, options) {

      // var labelClassName = options.className + '-label';
      // var $label = $('.' + labelClassName);

      // if (!$label.length) {
      //   $label = $('<span class="' + labelClassName + '" style="position: absolute"></span>')
      //     .appendTo(chart.container);
      // }

      // $('.' + labelClassName).hide();

      this.show = function (x, className) {

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
    };

    Chartist.plugins = Chartist.plugins || {};
    Chartist.plugins.verticalMomentLines = function (options) {

      options = Chartist.extend({}, defaultOptions, options);

      return function (chart) {

        if (!(chart instanceof Chartist.Line)) {
          return;
        }

        chart.on('created', function (data) {
          var verticalline = new VerticalLine(chart, data.chartRect, options);//all options is useless
          var x = 0;
          var className = '';
          for (var i=0; i<options.positions.length; i++) {
            className = (options.classes[i] != undefined) ? options.classes[i] : options.className;
            if ( (x = data.axisX.projectValue(options.positions[i].getTime())) > 0) {
              verticalline.show(data.chartRect.x1 + x, className);
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
