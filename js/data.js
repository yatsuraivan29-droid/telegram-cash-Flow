export const data = {
    user: {},
    bottomMenu: {
        navigation: [
            {
                //icon dashboard
            icon: "📊",
            title: "Dashboard",
            href: "#dashboard",
            },
            {
                //icon money
            icon: "💷",
            title: "Money",
            href: "#money",
            },
            {
                //icon family
            icon: "👨‍👩‍👧‍👦",
            title: "Family",
            href: "#family",
            },
            {
                //icon settings
            icon: "⚙️",
            title: "Settings",
            href: "#settings",
            },
    ]
    },
    ollButons: {
        addMoney: {
            dataMoney: {
                type: "data",
                value: "new Date().toISOString().slice(0, 10)",
                class: "form-money__input date",
            },
            sumMoney: {
                type: "number",
                placeholder: "Сумма",
                class: "form-money__input",
            },
            typeMoney: {
                type: "select",
                options: ["Дохід", "Витрати"],
                placeholder: "Тип",
                class: "form-money__input",
            },
            categoryMoney: {
                type: "select",
                options: ["Необхідні", "Бажані", "Інвестиції"],
                placeholder: "Категорія",
                class: "form-money__input",
            },
            subCategoryMoney: {
                type: "select",
                options: ["Продукти", "Транспорт", "Розваги", "data.supabase.money.subCategory"],
                placeholder: "Підкатегорія",
                class: "form-money__input",
            },
            buuttonAddMoney: {
                type: "button",
                text: "Додати",
                class: "form-money__button",
                id: "addMoney",
            },
        },
    },
    supabase: {
        user: {},
        family: {},
        money: {},
        familyMoney: {},
    }
};