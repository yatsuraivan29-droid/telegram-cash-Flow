// AI doom 
const app = document.getElementById("app")

// conect js
import './js/initTelegram.js'
import { data } from './js/data.js'
import { bottomMenu } from './js/BotomMenu.js'
import { renderPage } from './js/router.js'

function getCurrentPage() {
    const page = window.location.hash.slice(1)
    const availablePages = data.bottomMenu.navigation.map(item => item.href.slice(1))

    return availablePages.includes(page) ? page : 'dashboard'
}

function renderApp() {
    const currentPage = getCurrentPage()

    if (window.location.hash !== `#${currentPage}`) {
        window.history.replaceState(null, '', '#dashboard')
    }

    app.innerHTML = `
        <div class="app_container">
            ${renderPage(currentPage)}
            ${bottomMenu(data, currentPage)}
        </div>
    `
}

window.addEventListener('hashchange', renderApp)
renderApp()