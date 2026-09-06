export function money(data) {
    const records = Array.isArray(data.supabase.money) ? data.supabase.money : [];

    return `
    <div class="money">
        <button id="add-money" class="money__button">+</button>

        <div class="money__list">
            ${records.length
                ? records.map((item) => `
                    <div class="money__item">
                        <span>${item?.date || '—'}</span>
                        <span>${item?.type || '—'}</span>
                        <span>${item?.category || '—'}</span>
                        <span>${item?.subCategory || '—'}</span>
                        <strong>${item?.sum ?? '0'}</strong>
                    </div>
                `).join('')
                : '<p>Немає записів</p>'}
        </div>
    </div>
    `
}

export function formMoney(data) {
    return `
    <div class="form-money">
        <a href ="#money" id="closeFormMoney" class="form-money__close">X</a>
        ${Object.entries(data.ollButons.addMoney).map(([key, value]) => {
            if (value.type === 'data') {
                return `<input type="${value.type}" id="${value.id}" value="${eval(value.value)}" class="${value.class}">`
            } else if (value.type === 'number') {
                return `<input type="${value.type}" id="${value.id}" placeholder="${value.placeholder}" class="${value.class}">`
            } else if (value.type === 'button') {
                return `<button class="${value.class}" id="${value.id}">${value.text}</button>`
            } else if (value.type === 'select') {
                const isSubCategoryField = value.placeholder === 'Підкатегорія';

                if (isSubCategoryField) {
                    const staticOptions = value.options.filter(option => option !== 'data.supabase.money.subCategory');
                    const dynamicOptions = (Array.isArray(data.supabase.money) ? data.supabase.money : [])
                        .map(money => money?.subCategory)
                        .filter(Boolean);
                    const uniqueOptions = [...new Set([...staticOptions, ...dynamicOptions])];
                    const datalistId = `${value.class || 'datalist'}-${Math.random().toString(36).slice(2, 8)}`;

                    return `
                        <input
                            type="text"
                            class="${value.class}"
                            id="${value.id}"
                            list="${datalistId}"
                            placeholder="${value.placeholder}"
                        >
                        <datalist id="${datalistId}">
                            ${uniqueOptions.map(option => `<option value="${option}"></option>`).join('')}
                        </datalist>
                    `;
                }

                const options = value.options.flatMap(option => [option]);
                const uniqueOptions = [...new Set(options.filter(Boolean))];

                return `
                    <select class="${value.class}" id="${value.id}" placeholder="${value.placeholder}">
                        ${uniqueOptions.map(option => `<option value="${option}">${option}</option>`).join('')}
                    </select>
                `;
            }
        }).join('')}
    </div>
    `
}
