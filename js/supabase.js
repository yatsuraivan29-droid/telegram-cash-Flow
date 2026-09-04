// 1. Ваші дані з Supabase Dashboard
const SUPABASE_URL = 'https://kmwxmrjpzqcalclwbjgm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_lQ2sX4VKaJycT0pzgdk5QQ_XvYE3B01';

// 2. Створюємо клієнт
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  global: {
    headers: {
      'x-telegram-id': data.user?.id?.toString()
    }
  }
});
import { data } from './data.js';

export async function loadSupabaseData() {
	const [user, family, money, familyMoney] = await Promise.all([
		supabase.from('user').select('*').throwOnError(),
		supabase.from('family').select('*').throwOnError(),
		supabase.from('Cash').select('*').throwOnError(),
		supabase.from('cash-Family').select('*').throwOnError(),
	]);

	data.supabase.user = user.data;
	data.supabase.family = family.data;
	data.supabase.money = money.data;
	data.supabase.familyMoney = familyMoney.data;
}