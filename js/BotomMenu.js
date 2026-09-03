export function bottomMenu(data) {
    return `
    <div class="bottom-menu">
        ${data.bottomMenu.navigation.map(item => `
            <a href="${item.href}" class="bottom-menu__item ">
                <span class="bottom-menu__icon">${item.icon}</span>
                <span class="bottom-menu__title">${item.title}</span>
            </a>
        `).join('')}    
    </div>`
}