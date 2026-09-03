// AI doom 
const app = document.getElementById("app")

// conect js
import './js/initTelegram.js'
import { data } from './js/data.js'
import { bottomMenu } from './js/BotomMenu.js'
import { renderPage } from './js/router.js'

function getCurrentPage() {
    return window.location.hash.slice(1) || 'dashboard'
}

function renderApp() {
       const currentPage = getCurrentPage()

    app.innerHTML = `
        <div class="app_container">
            ${renderPage(currentPage)}
            ${bottomMenu(data, currentPage)}
        </div>
    `
}

window.addEventListener('hashchange', renderApp)
renderApp()