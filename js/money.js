export function money(data) { 
    return `
    <div class="money">
        <button id="add-money" class="money__button">+</button>
    </div>
    `
}  

export function formMoney(data) {
    return `
    <div class="form-money">
        <a href ="#money" class="form-money__close">X</a>
        ${Object.entries(data.ollButons.addMoney).map(([key, value]) => {
            if (value.type === 'data') {
                return `<input type="${value.type}" value="${eval(value.value)}" class="${value.class}">`
            } else if (value.type === 'number') {
                return `<input type="${value.type}" placeholder="${value.placeholder}" class="${value.class}">`
            } else if (value.type === 'button') {
                return `<button class="${value.class}" id="${value.id}">${value.text}</button>`
            } else if (value.type === 'select') {
                return `
                    <select class="${value.class}" placeholder="${value.placeholder}">
                        ${value.options.map(option => `<option value="${option}">${option}</option>`).join('')}
                    </select>
                `
            }
        }).join('')}
    </div>
    `
}
