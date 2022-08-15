import type { App } from 'vue';
import {
  Modal,
  Table,
  Menu,
  Input,
  Form,
  Card,
  Checkbox,
  Radio,
  Col,
  Row,
  Select,
  DatePicker,
  Button,
} from 'ant-design-vue';
import '../style/index.less';
export function setupAntd(app: App) {
  // app.component('AButton', AButton);
  app
    .use(Form)
    .use(Input)
    .use(Modal)
    .use(Table)
    .use(Menu)
    .use(Card)
    .use(Checkbox)
    .use(Radio)
    .use(Col)
    .use(Row)
    .use(Select)
    .use(DatePicker)
    .use(Button);
}
