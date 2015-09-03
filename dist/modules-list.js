
var React = require('react');
var classnames = require('classnames');

var ModulesList = React.createClass({displayName: "ModulesList",

  getDefaultProps: function() {
    return {
      modules: [],
      included: [],
      toggleActive: function() {},
    }
  },

  renderModule: function(m, i) {
    var self = this;
    var active = this.props.included[i];
    var ast = JSON.stringify(m.ast, null, 2);
    var handleChange = function(e) {
      self.props.toggleActive(i);
    };
    return (
      React.createElement("li", {key: 'module-'+m.name, className: "u-mV0 u-borderB u-borderGrayLighter", style: {listStyleType: 'none'}}, 
        React.createElement("label", {className: classnames('u-block u-pA3 u-cf', { 'u-bgBlueLighter': active })}, 
            React.createElement("input", {type: "checkbox", 
              checked: active, 
              onChange: handleChange, 
              className: "u-inlineBlock u-alignMiddle"}
            ), 
          React.createElement("div", {className: "u-inlineBlock u-mL3"}, 
            React.createElement("span", {className: "u-fontBold u-fontSansSerif u-inlineBlock u-alignMiddle"}, m.name), 
            React.createElement("div", {className: "u-fontSmall u-fontSansSerif u-inlineBlock u-alignMiddle u-mL6 u-fontGrayLight"}, m.description)
          ), 
          React.createElement("div", {className: "u-fontSmall u-fontSansSerif u-inlineBlock u-mT1 u-floatRight u-fontGrayLight"}, "v", m.version)
        )
      )
    )
  },

  render: function() {
    return (
      React.createElement("div", {className: this.props.className + 'overflow-hidden'}, 
        React.createElement("div", {className: ""}, 
          React.createElement("h3", {className: ""}, "Components"), 
          React.createElement("div", {className: "u-textRight u-mB3"}, 
            React.createElement("button", {className: "Button Button--small Button--link", 
              onClick: this.props.selectAll}, 
              "Select All"
            ), 
            React.createElement("button", {className: "Button Button--small Button--link", 
              onClick: this.props.selectNone}, 
              "Select None"
            )
          )
        ), 
        React.createElement("ul", {className: "u-mL0"}, 
          this.props.modules.map(this.renderModule)
        )
      )
    )
  }

});

module.exports = ModulesList;
