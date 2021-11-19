import {createApp,h} from "vue";

const App={
  render(){
    return h('div',null,[h('div',null ,'123')])
  }
}
createApp(App).mount("#app")
