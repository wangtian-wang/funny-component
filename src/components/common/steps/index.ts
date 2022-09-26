import Step from './steps/src/index';
import StepItem from './steps-item/src/index';
import './styles/index.css';
export default {
  install(app) {
    app.component('Step', Step);
    app.component('StepItem', StepItem);
  },
};
