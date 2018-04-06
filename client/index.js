import 'root/promise-polyfill';
import { app } from 'root/app';

document.addEventListener(`DOMContentLoaded`, () => app.$mount(`#app`));
