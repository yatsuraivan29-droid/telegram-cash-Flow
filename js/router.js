// functions generet page
import { data } from './data.js'
import { dashboard } from './dashbord.js'
import { loading } from './loading.js'
import { money } from './money.js'
import { family } from './family.js'
import { setting } from './setting.js'

export function renderPage(page = 'dashboard') {
	const pages = {
		dashboard: () => dashboard(data),
		money: () => money(data),
		family: () => family(data),
		setting: () => setting(data),
		settings: () => setting(data),
		loading,
	}

	return (pages[page] || pages.dashboard)()
}
