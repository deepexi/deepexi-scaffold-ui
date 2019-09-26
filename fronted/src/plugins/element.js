import Vue from 'vue'
import {
  Button,
  Row,
  Col,
  Loading,
  Message,
  MessageBox,
  Form,
  Tree,
  Input,
  Radio,
  Select,
  FormItem,
  Option,
  RadioGroup
} from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Button)
Vue.use(Col)
Vue.use(Row)
Vue.use(Loading.directive)
Vue.use(Form)
Vue.use(Tree)
Vue.use(Input)
Vue.use(Radio)
Vue.use(Select)
Vue.use(FormItem)
Vue.use(Option)
Vue.use(RadioGroup)

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
