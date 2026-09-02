const tg = window.Telegram.WebApp
import { data } from './data.js'
tg.ready();
if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
           data.user = tg.initDataUnsafe.user;
        } else {
            data.user = { username: "not logged in" };
        }

if (tg.isExpanded) {
    data.fullScreen = true;
} else {
    data.fullScreen = false;
}

export function getDeviceType() {
    const platform = tg.platform;

    if (platform === 'android' || platform === 'ios') {
        data.platform = 'mobile'; // Мобільний телефон
    } 
    
    if (['desktop', 'tdesktop', 'macs', 'weba', 'webk'].includes(platform)) {
        data.platform = 'pc'; // Комп'ютер / Ноутбук
    }

    data.platform = 'unknown'; // Поза Telegram або розробка в звичайному браузері
}