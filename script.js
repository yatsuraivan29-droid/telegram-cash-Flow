// AI doom 
const app = document.getElementById("app")

// conect js
import './js/initTelegram.js'
import { dashboard } from './js/dashbord.js'
import { data } from './js/data.js'
import { bottomMenu } from './js/BotomMenu.js'


app.innerHTML = `
    <div class="app_container">
        ${dashboard(data)}
        ${bottomMenu(data)}
    </div>
`