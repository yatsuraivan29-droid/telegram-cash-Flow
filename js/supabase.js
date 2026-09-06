// 1. Ваші дані з Supabase Dashboard
const SUPABASE_URL = 'https://kmwxmrjpzqcalclwbjgm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_lQ2sX4VKaJycT0pzgdk5QQ_XvYE3B01';

import { data } from './data.js';

export function getTelegramHeaders() {
  const telegramId = data.user?.id?.toString?.() ?? '';

  return {
    'x-telegram-id': telegramId,
  };
}

export function getCurrentUserId() {
  const telegramId = getTelegramHeaders()['x-telegram-id'];

  if (!telegramId) return null;

  return (Array.isArray(data.supabase.user) ? data.supabase.user : []).find((user) => {
    return String(user?.['telegram-id'] ?? '') === String(telegramId);
  })?.id ?? null;
}

// 2. Створюємо клієнт
export const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  global: {
    headers: getTelegramHeaders(),
  }
});

function getRecordsFromLastTwoMonths(records = []) {
	const now = new Date();
	const start = new Date(now.getFullYear(), now.getMonth() - 2, 1);

	return records.filter((record) => {
		const dateValue = ['date', 'created_at', 'createdAt', 'timestamp', 'datetime']
			.map((key) => record?.[key])
			.find((value) => value !== undefined && value !== null && value !== '');

		if (!dateValue) return false;

		const itemDate = new Date(dateValue);
		if (Number.isNaN(itemDate.getTime())) return false;

		return itemDate >= start && itemDate <= now;
	});
}

export async function loadSupabaseData() {
	const [user, family, money, familyMoney] = await Promise.all([
		supabase.from('user').select('*').throwOnError(),
		supabase.from('family').select('*').throwOnError(),
		supabase.from('Cash').select('*').throwOnError(),
		supabase.from('cash-Family').select('*').throwOnError(),
	]);

	data.supabase.user = user.data;
	data.supabase.family = family.data;
	data.supabase.money = getRecordsFromLastTwoMonths(money.data);
	data.supabase.familyMoney = getRecordsFromLastTwoMonths(familyMoney.data);
}