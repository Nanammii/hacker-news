import { createRoot } from 'react-dom/client';
import vkBridge from '@vkontakte/vk-bridge';
import { AppConfig } from './AppConfig.js';
import {store} from "./store/index.js";
import {fetchNews} from "./store/api-actions.js";

vkBridge.send('VKWebAppInit');

store.dispatch(fetchNews());

const root = createRoot(document.getElementById('root'));
root.render(
    <AppConfig />
);

if (import.meta.env.MODE === 'development') {
  import('./eruda.js');
}
