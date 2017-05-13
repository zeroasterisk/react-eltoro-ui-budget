// IMPORTANT
// ---------
// This is an auto generated file with React CDK.
// Do not modify this file.

import { configure } from '@kadira/storybook';
import numberLocalizer from 'react-widgets/lib/localizers/simple-number';

numberLocalizer();

function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
