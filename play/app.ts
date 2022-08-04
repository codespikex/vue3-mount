import "./style.css"
import {createApp} from "vue"
import App         from "play/App.vue"
import Mount       from "~/index"

createApp(App)
    .use(Mount)
    .mount("#app")
