// AI doom 
const app = document.getElementById("app")
let classContainer = 'app_container';

// conect js
import './js/initTelegram.js'
import { getDeviceType } from './js/initTelegram.js'
import { dashboard } from './js/dashbord.js'
import { data } from './js/data.js'

if (data.platform === 'mobile') {
    classContainer = data.fullScreen ? 'app_container_fullSkrin' : 'app_container';
} else {
    classContainer = 'app_container';
}
app.innerHTML = `
    <div class="${classContainer}">
        ${dashboard(data)}
    </div>
`
