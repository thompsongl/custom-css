
var React = require('react');
var classnames = require('classnames');

var ModulesList = React.createClass({

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
      <li key={'module-'+m.name} className="u-mV0 u-borderB u-borderGrayLighter" style={{listStyleType: 'none'}}>
        <label className={classnames('u-block u-pA3 u-cf', { 'u-bgBlueLighter': active })}>
            <input type="checkbox"
              checked={active}
              onChange={handleChange}
              className="u-inlineBlock u-alignMiddle"
            />
          <div className="u-inlineBlock u-mL3">
            <span className="u-fontBold u-fontSansSerif u-inlineBlock u-alignMiddle">{m.name}</span>
            <div className="u-fontSmall u-fontSansSerif u-inlineBlock u-alignMiddle u-mL6 u-fontGrayLight">{m.description}</div>
          </div>
          <div className="u-fontSmall u-fontSansSerif u-inlineBlock u-mT1 u-floatRight u-fontGrayLight">v{m.version}</div>
        </label>
      </li>
    )
  },

  render: function() {
    return (
      <div className={this.props.className + 'overflow-hidden'}>
        <div className="">
          <h3 className="">Components</h3>
          <div className="u-textRight u-mB3">
            <button className="Button Button--small Button--link"
              onClick={this.props.selectAll}>
              Select All
            </button>
            <button className="Button Button--small Button--link"
              onClick={this.props.selectNone}>
              Select None
            </button>
          </div>
        </div>
        <ul className="u-mL0">
          {this.props.modules.map(this.renderModule)}
        </ul>
      </div>
    )
  }

});

module.exports = ModulesList;
