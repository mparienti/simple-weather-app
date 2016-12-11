var mpm={};
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
    root['mpm.simpleformat'] = factory();
  }
}(this, function () {
  (function () {
    'use strict';

    var spad = function (n) {
      n = String(n);
      return (n.length < 2)? '0'+n :  n ;
    };
    mpm.simpleformat = function (value, format) {
      var d,m,y,m,s = 0;
      value = new Date(value);
      if (format == 'full') {
        return [value.getFullYear(), spad(value.getMonth() + 1), value.getDate(),
                (spad(value.getHours()) + ':' + spad(value.getMinutes()))].join(' ');
      } else {
        return [value.getFullYear(), spad(value.getMonth() + 1), spad(value.getDate())].join(' ');
      }
    };

  }(window, document, mpm));
  return mpm.simpleformat;
}));
