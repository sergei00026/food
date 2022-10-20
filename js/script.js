import tabs from './modules/tabs';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer';
import calc from './modules/calc';
import { openModal } from "./modules/modal";

window.addEventListener('DOMContentLoaded', () => {
	// Появление модалки спустя несколько секунд после загрузки страницы
	const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 113000);

	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	cards();
	forms('form', modalTimerId);
	modal('[data-modal]', '.modal', modalTimerId);
	slider({
		container: '.offer__slider',
		slide: '.offer__slide',
		prevArrow: '.offer__slider-prev',
		nextArrow: '.offer__slider-next',
		totalCounter: '#total',
		currentCounter: '#current',
		wrapper: '.offer__slider-wrapper',
		field: '.offer__slider-inner',
	});
	timer('.timer', '2022-12-31');
	calc();
});
