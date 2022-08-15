import { getDateInfo } from '../../../../utils/index';
import { render, update } from './render.js';
export default () => {
  const oContainer = document.createElement('div');
  oContainer.className = 'my-calendar';
  return {
    render: render(oContainer),
    update,
    getDateInfo,
  };
};
