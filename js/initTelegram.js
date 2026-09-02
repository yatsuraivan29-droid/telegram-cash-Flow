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