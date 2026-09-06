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

export async function ensureTelegramUser() {
	const telegramId = data.user?.id?.toString?.();
	if (!telegramId) return null;

	const users = Array.isArray(data.supabase.user) ? data.supabase.user : [];
	const existingUser = users.find((user) => String(user?.['telegram-id'] ?? '') === String(telegramId));

	if (existingUser) {
		return existingUser;
	}

	const newUser = {
		'telegram-id': telegramId,
		username: data.user?.username || data.user?.first_name || 'telegram-user',
		first_name: data.user?.first_name || '',
		last_name: data.user?.last_name || '',
		photo_url: data.user?.photo_url || null,
	};

	const { data: insertedUser, error } = await supabase
		.from('user')
		.insert([newUser])
		.select('*')
		.single();

	if (error) {
		throw error;
	}

	data.supabase.user = [...users, insertedUser];
	return insertedUser;
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

	await ensureTelegramUser();
}