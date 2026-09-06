// functions generet page
import { data } from './data.js'
import { dashboard } from './dashbord.js'
import { loading } from './loading.js'
import { money } from './money.js'
import { family } from './family.js'
import { setting } from './setting.js'
import { formMoney } from './money.js'
import { app } from '../script.js'
import { supabase, getCurrentUserId } from './supabase.js'

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
			activatePageButtons(data)
		})
	};
	let closeFormButton = document.getElementById('closeFormMoney')
	if (closeFormButton) {
		closeFormButton.addEventListener('click', () => {
			const formMoneyElement = document.querySelector('.form-money')
			if (formMoneyElement) {
				formMoneyElement.remove()
			}
		})
	}
	let addMoney = document.getElementById('addMoney')
	if (addMoney) {
		addMoney.addEventListener('click', () => {
			const dataMoney = document.getElementById('dataMoney').value
			const sumMoney = document.getElementById('sumMoney').value
			const typeMoney = document.getElementById('typeMoney').value
			const categoryMoney = document.getElementById('categoryMoney').value
			const subCategoryMoney = document.getElementById('subCategoryMoney').value
			const currentUserId = getCurrentUserId()

			if (!currentUserId) {
				console.error('Не знайдено користувача в таблиці user за telegram-id')
				return
			}

			//передати дані в супабаз і в data.supebase.money добавити новий запис
			supabase.from('Cash').insert([
				{
					user_id: currentUserId,
					date: dataMoney,
					sum: sumMoney,
					type: typeMoney,
					category: categoryMoney,
					subCategory: subCategoryMoney
				}
			]).then((response) => {
				if (response.error) {
					console.error('Помилка при додаванні запису:', response.error)
				} else {
					console.log('Запис успішно додано:', response.data)
					data.supabase.money.push(response.data[0])
					const formMoneyElement = document.querySelector('.form-money')
					if (formMoneyElement) {
						formMoneyElement.remove()
					}
				}
			})
		})
	}
}
