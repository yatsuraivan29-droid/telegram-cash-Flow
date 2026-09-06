// functions generet page
import { data } from './data.js'
import { dashboard } from './dashbord.js'
import { loading } from './loading.js'
import { money } from './money.js'
import { family } from './family.js'
import { setting } from './setting.js'
import { formMoney } from './money.js'
import { app } from '../script.js'

export function renderPage(page = 'dashboard') {
	const pages = {
		dashboard: () => dashboard(data),
		money: () => money(data),
		family: () => family(data),
		setting: () => setting(data),
		loading: () => loading(),
	}

	return (pages[page] || pages.dashboard)()
}
// функція для активації всіх кнопок на сторінках
export function activatePageButtons(data) {
	let addMoneyButton = document.getElementById('add-money')
	if (addMoneyButton) {
		addMoneyButton.addEventListener('click', () => {
			app.innerHTML += formMoney(data)
		})
	}	
}
