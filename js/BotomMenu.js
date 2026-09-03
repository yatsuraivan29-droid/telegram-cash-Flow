export function bottomMenu(data, activePage = 'dashboard') {
    return `
    <div class="bottom-menu">
        ${data.bottomMenu.navigation.map(item => `
            <a href="${item.href}" class="bottom-menu__item ${item.href.slice(1) === activePage ? 'active' : ''}">
                <span class="bottom-menu__icon">${item.icon}</span>
                <span class="bottom-menu__title">${item.title}</span>
            </a>
        `).join('')}    
    </div>`
}