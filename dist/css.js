
var React = require('react');
var postcss = require('postcss');
var cssnext = require('cssnext');
var customProperties = require('postcss-custom-properties');
var customMedia = require('postcss-custom-media');
var calc = require('postcss-calc');
var colorFunction = require('postcss-color-function');
var humanize = require('humanize-plus');

var Css = React.createClass({displayName: "Css",

  getDefaultProps: function() {
    return {
      modules: [],
      included: [],
      defaults: {},
      customMedia: {}
    }
  },

  compileCss: function(defaults, customMedia) {
    var self = this;
    var css = '';

    this.props.included.forEach(function(active, i) {
      if (active) {
        var module = self.props.modules[i];
        var src = module.css;
        css += src;
      }
    });

    var result = postcss()
      .use(cssnext({
        features: {
          customMedia: {
            extensions: customMedia
          },
          customProperties: {
            variables: defaults
          }
        },
        browsers: [
          'Last 2 versions',
          'IE >= 9'
        ]
      }))
      .process(css).css;
    var blob = new Blob([result], { type: 'text/plain' });
    var url = (window.URL || window.webkitURL).createObjectURL( blob );
    return { css: result, blob: blob, download: url };
  },


  render: function() {
    var obj = this.compileCss(this.props.defaults, this.props.customMedia);
    var code = { __html: obj.css };
    var fileSize = humanize.fileSize(obj.blob.size);
    var download = obj.download;
    var preStyle = {
      maxHeight: '40vh'
    };
    return (
      React.createElement("div", {className: "Markdown u-nbfc"}, 
        React.createElement("div", {className: ""}, 
          React.createElement("h3", {className: "u-m0 u-pT3"}, "Compiled CSS"), 
          React.createElement("div", {className: "u-textRight u-pB3"}, 
            React.createElement("span", {className: "u-fontStrong u-inlineBlock u-alignMiddle"}, fileSize), 
            React.createElement("a", {href: download, 
              className: "Button Button--primary u-inlineBlock u-alignMiddle u-mL3", 
              download: "style-custom.css"}, 
              "Download"
            )
          )
        ), 
        React.createElement("pre", {dangerouslySetInnerHTML: code, style: preStyle}), 
        React.createElement("a", {href: download, 
          className: "Button Button--primary", 
          download: "style-custom.css"}, 
          "Download"
        )
      )
    )
  }

});

module.exports = Css;
