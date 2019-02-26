import Vue from 'vue'
import {
  Dialog,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Option,
  OptionGroup,
  Button,
  Tag,
  Table,
  TableColumn,
  DatePicker,
  Popover,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tree,
  Icon,
  Row,
  Col,
  Upload,
  Container,
  Header,
  Main,
  MessageBox,
  Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Dialog);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(Tag);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(Popover);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tree);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;
