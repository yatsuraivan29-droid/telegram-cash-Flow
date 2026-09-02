// AI doom 
const app = document.getElementById("app")

// conect js
import './js/initTelegram.js'
import { dashboard } from './js/dashbord.js'
import { data } from './js/data.js'


app.innerHTML = `
    <div class="${data.fullScreen ? 'app_container_fullSkrin' : 'app_container'}">
        ${dashboard(data)}
    </div>
`
