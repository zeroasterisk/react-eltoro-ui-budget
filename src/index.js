import React from 'react';
import NumberPicker from 'react-widgets/lib/NumberPicker';

const BtnDone = ({ onClick, className, style, iconClassName }) => (
  <btn onClick={onClick} className={className}>
    <i className={iconClassName} />
  </btn>
);
BtnDone.propTypes = {
  onClick: React.PropTypes.func,
  className: React.PropTypes.string,
  iconClassName: React.PropTypes.string,
  style: React.PropTypes.object,
};
BtnDone.defaultProps = {
  className: 'small text-muted',
  iconClassName: 'fa fa-check',
  style: { cursor: 'pointer' },
};

class ClickToEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'view',
    };
  }
  setModeEdit = () => this.setState({ mode: 'edit' });
  setModeView = () => this.setState({ mode: 'view' });
  setValue = (newValue) => {
    if (this.props.money) {
      this.props.onChange(parseFloat(newValue, 10));
    } else {
      this.props.onChange(parseInt(newValue, 10));
    }
  }
  render() {
    const {
      money,
      value,
      onChange,
      classNameView,
      styleView,
      step,
      min,
      max,
    } = this.props;
    const { mode } = this.state;
    const valueLabel = money ? `\$${parseFloat(value, 10).toFixed(2)}` : value;
    if (mode === 'view') {
      return (
        <abbr
          style={styleView}
          className={classNameView}
          onClick={this.setModeEdit}
        >{valueLabel}</abbr>
      );
    }
    if (mode === 'edit' && money) {
      return (
        <span>
          <NumberPicker
            value={value}
            onChange={this.setValue}
            precision={2}
            format="-$#,###.00"
            step={step || 0.25}
            min={min || 3}
            max={max || 999}
            style={{ maxWidth: 150 }}
          />
          <BtnDone onClick={this.setModeView} />
        </span>
      );
    }
    if (mode === 'edit') {
      return (
        <span>
          <NumberPicker
            value={value}
            onChange={this.setValue}
            step={step || 1000}
            min={min || 1000}
            max={max || undefined}
            style={{ maxWidth: 150 }}
          />
          <BtnDone onClick={this.setModeView} />
        </span>
      );
    }
    return null;
  }
}
ClickToEdit.propTypes = {
  money: React.PropTypes.bool,
  value: React.PropTypes.number,
  onChange: React.PropTypes.func,
  styleView: React.PropTypes.object,
  classNameView: React.PropTypes.string,
};
ClickToEdit.defaultProps = {
  styleView: {
    cursor: 'pointer',
    borderBottomStyle: 'dotted',
    borderBottomColor: '#bbb',
    borderBottomWidth: 2,
    textDecoration: 'none',
  },
};

const Lbl = ({ title, children }) => (
  <small className="text-muted" title={title}> {children} </small>
);

const BudgetInput = ({ cpm, totalImpressions, onChange, style = {} }) => {
  const cost = (parseFloat(cpm) * parseFloat(totalImpressions) / 1000);
  return (
    <div
      style={{...style}}
      onClick={onChange}
    >
      <ClickToEdit money onChange={onChange.bind(null, 'cpm')} value={cpm} />
      <Lbl title="Cost per mil (1000)">cpm</Lbl>
      <Lbl>*</Lbl>
      <ClickToEdit onChange={onChange.bind(null, 'totalImpressions')} value={totalImpressions} />
      <Lbl title="Max ordered impressions">imps</Lbl>
      <Lbl>=</Lbl>
      <ClickToEdit
        money
        onChange={(newCost) => {
          const newTotalImps = Math.ceil(parseInt(newCost, 10) / cpm);
          onChange('totalImpressions', newTotalImps)
        }}
        value={cost}
      />
      <Lbl title="max budget">budget</Lbl>
    </div>
  )
};

BudgetInput.propTypes = {
  cpm: React.PropTypes.number.isRequired,
  totalImpressions: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func,
  style: React.PropTypes.object,
};
BudgetInput.defaultProps = {
  onChange: () => {},
};

export default BudgetInput;
