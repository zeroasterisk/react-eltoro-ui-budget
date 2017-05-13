import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import BudgetInput from '../index';

// this isn't importing - getting funky errors
// import 'react-widgets/dist/css/react-widgets.css';
//   getting:
//   ERROR in ./~/css-loader!./~/raw-loader!./~/react-widgets/dist/css/react-widgets.css
//    Module build failed: Unknown word (1:1)
//    > 1 | module.exports = ".rw-btn,.rw-input{color:inherit;font:inherit;margin:0}

// want to try this in a mock form
class DemoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cpm: props.cpm || 10,
      totalImpressions: props.totalImpressions || 1000,
    };
  }
  onChange = (name, value) => this.setState({ [name]: value });
  render() {
    return (
      <BudgetInput
        cpm={this.state.cpm}
        totalImpressions={this.state.totalImpressions}
        onChange={this.onChange}
      />
    );
  }
}

storiesOf('BudgetInput', module)
  .add('default view', () => (
    <BudgetInput
      cpm={15}
      totalImpressions={1000}
      onChange={action('onChange fired')}
    />
  ))
  .add('inside a fake-form', () => (
    <DemoForm />
  ))
  ;
