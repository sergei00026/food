'use strict'
// Создание табов можно разделить на 3 подзадачи 
// 1. Функция которая будет скрывать ненужные табы
// 2. Функция которая будет показывать нужный таб
// 3. Функция - назначит обработличк событий на меню 
// который будет манипулировать этими функциями

window.addEventListener('DOMContentLoaded', () => {
	// tabs ================
	const tabs = document.querySelectorAll('.tabheader__item');
	const tabContent = document.querySelectorAll('.tabcontent');
	const tabsBlock = document.querySelector('.tabheader__items');

	function hideTabContent() {
		tabContent.forEach(el => {
			// el.style.display = 'none';
			el.classList.add('hide');
			el.classList.remove('show', 'anim');
		})

		tabs.forEach(tab => {
			tab.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(i = 0) {
		// tabContent[i].style.display = 'block';
		tabContent[i].classList.add('show', 'anim');
		tabContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent();
	showTabContent();

	tabsBlock.addEventListener("click", (event) => {
		const target = event.target;

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((el, i) => {
				if (target == el) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});

	// timer ================

	// Указываю дату когда остановится таймер
	const deadline = '2022-10-15';

	// Функция для получения остаточного времени
	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor(t / (1000 * 60 * 60) % 24),
			minutes = Math.floor((t / 1000 / 60) % 60),
			seconds = Math.floor((t / 1000) % 60);

		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds,
		};
	}

	// Функция для добавление 0 если число состоит из 1 цирфы
	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	// Функция получения элементов для вставки таймера
	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			// вызов обновления таймера каждую секунду
			timeInterval = setInterval(updateClock, 1000);

		// Делаю чтоб при обновлении страницы таймер не мигал
		updateClock();

		//Функция обновления часов
		function updateClock() {
			const t = getTimeRemaining(endtime);
			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			// Остановка таймера если дедлайн закончился
			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock('.timer', deadline);


	// Modal ================
	const btns = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal');

	// Функция открытия модального окна
	function openModal() {
		modal.classList.add('show', 'anim');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		// Отмена появления модалки вслучае открытия раньше пользователем по кнопке
		clearInterval(modalTimerId);
	}
	// Перебор всех модалок
	btns.forEach(btn => {
		btn.addEventListener('click', openModal)
	})

	// Функция закрытия модального окна
	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show', 'anim');
		document.body.style.overflow = '';
	}
	// Закрытие модалки при клике вне окна и на крестик
	modal.addEventListener("click", function (e) {
		if (e.target === modal || e.target.getAttribute('data-modalclose') == '') {
			closeModal();
		}
	});

	//закрытие по нажатию Escape
	document.addEventListener("keydown", function (e) {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});
	// Появление модалки спустя несколько секунд после загрузки страницы
	const modalTimerId = setTimeout(openModal, 113000);

	// Функция показа модалки при скроле до самого низа страниы
	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	// Появление модалки при скроле до самого низа
	window.addEventListener('scroll', showModalByScroll);


	// Добавление карточек через class =====================
	class menuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 27;
			this.changeToUSD();
		}
		changeToUSD() {
			this.price = this.price * this.transfer;
		}
		render() {
			const element = document.createElement('div');
			// Проверяю передал ли класс и если нет даю коасс по умолчанию
			if (this.classes.length === 0) {
				this.element = 'menu__item';
				element.classList.add(this.element);
			} else {
				// Добавляю каждый класс который находится в rest массиве classes
				this.classes.forEach(className => element.classList.add(className));
			}

			element.innerHTML = `
				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>
			`;
			// Вставляю внутрь и конец массива
			this.parent.append(element);
		}
	}

	// Функционал по приему с сервера
	// async указывает что нужно ждать сначала await
	const getResource = async (url) => {
		// await - показывает что именно нужно ждать
		const res = await fetch(url);

		// .ok - мы что-то получили все ок, еще есть свойство status это сервер возвращает статус
		if (!res.ok) {
			// new Error - в ней указывает текст ошибки
			// throw оператор чтобы ошибка выпала из функции
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	};

	// getResource(' http://localhost:3000/menu')
	// 	.then(data => {
	// 		data.forEach(({ img, altimg, title, descr, price }) => {
	// 			new menuCard(img, altimg, title, descr, price, '.menu .container').render();
	// 		});
	// 	});

	getResource(' http://localhost:3000/menu')
		.then(data => createCard(data));

	function createCard(data) {
		data.forEach(({ img, altimg, title, descr, price }) => {
			const element = document.createElement('div');

			element.classList.add('menu__item');

			element.innerHTML = `
			<img src=${img} alt=${altimg}>
				<h3 class="menu__item-subtitle">${title}</h3>
				<div class="menu__item-descr">${descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${price}</span> грн/день</div>
				</div>
			`;

			document.querySelector('.menu .container').append(element);
		})
	}

	// Forms

	const forms = document.querySelectorAll('form');

	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Мы скоро с Вами свяжемся!',
		failure: 'Что-то пошло не так...',
	}

	forms.forEach(item => bindPostData(item));

	// Функционал по отправке на сервер
	// async указывает что нужно ждать сначала await
	const postData = async (url, data) => {
		// await - показывает что именно нужно ждать
		const res = await fetch(url, {
			method: "POST",
			headers: {
				'Content-type': 'application/json',
			},
			body: data,
		});

		return await res.json();
	};

	function bindPostData(form) {
		form.addEventListener("submit", function (e) {
			e.preventDefault();

			// Добавление сообщения о загрузке
			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;

			form.insertAdjacentElement('afterend', statusMessage);

			// FormData - указвается чтобы получать данные из 
			// всех элементов form при учете что у них есть name
			const formData = new FormData(form);

			// Преобразуем получанный данные из FormData в Json
			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			postData('http://localhost:3000/requests', json)
				.then(data => {
					console.log(data);
					showThanksModal(message.success);
					statusMessage.remove();
					// catch - если промис не сработал
				}).catch(() => {
					showThanksModal(message.failure);
					// - finally - событие происходит в любом случае
				}).finally(() => {
					form.reset();
				})
		});
	}

	// Красивое появление подсказки
	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		// Скрываю стандартный контент модалки
		prevModalDialog.classList.add('hide');

		openModal();

		// Создаю структуру для красивго появления подсказки
		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div class="modal__close" data-modalclose>×</div>
				<div class="modal__title">${message}</div>
			</div>
		`;

		// Вставка подсказки
		document.querySelector('.modal').append(thanksModal);

		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 4000);
	}

	// Слайдер =============================

	const slides = document.querySelectorAll('.offer__slide'),
		slider = document.querySelector('.offer__slider'),
		prev = document.querySelector('.offer__slider-prev'),
		next = document.querySelector('.offer__slider-next'),
		totalSlide = document.querySelector('#total'),
		currentSlide = document.querySelector('#current'),
		slidesWrapper = document.querySelector('.offer__slider-wrapper'),
		sliderField = document.querySelector('.offer__slider-inner'),
		// Получить ширину одного слайда
		width = window.getComputedStyle(slidesWrapper).width;

	let slideIndex = 1;
	let offset = 0;

	if (slides.length < 10) {
		totalSlide.textContent = `0${slides.length}`;
		currentSlide.textContent = `0${slideIndex}`;
	} else {
		totalSlide.textContent = slides.length;
		currentSlide.textContent = slideIndex;
	}


	// Устанавливаю ширину всех слайдов
	sliderField.style.width = 100 * slides.length + "%";
	sliderField.style.display = 'flex';
	sliderField.style.transition = '0.5s all linear';

	slidesWrapper.style.overflow = 'hidden';

	// Устанавливаю чтобы все слайды были одной шириной
	slides.forEach(slide => slide.style.width = width);

	slider.style.position = 'relative';

	// Создание блока для пагинации
	const indicators = document.createElement('ol');
	const dots = [];

	indicators.classList.add('carousel-indicators');
	indicators.style.cssText = `
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 15;
		display: flex;
		justify-content: center;
		margin-right: 15%;
		margin-left: 15%;
		list-style: none;
	`;
	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.style.cssText = `
			box-sizing: content-box;
			flex: 0 1 auto;
			width: 30px;
			height: 6px;
			margin-right: 3px;
			margin-left: 3px;
			cursor: pointer;
			background-color: #fff;
			background-clip: padding-box;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			opacity: .5;
			transition: opacity .6s ease;
		`;
		if (i === 0) {
			dot.style.opacity = 1;
		}
		indicators.append(dot);
		dots.push(dot);
	}

	function deleteNotDigits(str) {
		return +str.replace(/\D/g, '');
	}

	next.addEventListener("click", function (e) {
		// Если offset равен ширине всех слайдов 
		if (offset === deleteNotDigits(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += deleteNotDigits(width);
		}

		sliderField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex === slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		if (slides.length < 10) {
			currentSlide.textContent = `0${slideIndex}`;
		} else {
			currentSlide.textContent = slideIndex;

		}

		dots.forEach(dot => dot.style.opacity = '0.5');
		dots[slideIndex - 1].style.opacity = 1;

	});

	prev.addEventListener("click", function (e) {
		// Если offset равен ширине всех слайдов 
		if (offset === 0) {
			offset = deleteNotDigits(width) * (slides.length - 1);
		} else {
			offset -= deleteNotDigits(width);
		}

		sliderField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex === 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		if (slides.length < 10) {
			currentSlide.textContent = `0${slideIndex}`;
		} else {
			currentSlide.textContent = slideIndex;

		}

		dots.forEach(dot => dot.style.opacity = '0.5');
		dots[slideIndex - 1].style.opacity = 1;
	});

	// Функционал пагинации
	dots.forEach(dot => {
		dot.addEventListener('click', e => {
			// Проверяю был ли клик на dot
			const slideTo = e.target.getAttribute('data-slide-to');

			// Устанавливаю слайдиндекс в значение slideTo
			slideIndex = slideTo;
			offset = deleteNotDigits(width) * (slideTo - 1)

			sliderField.style.transform = `translateX(-${offset}px)`;

			if (slides.length < 10) {
				currentSlide.textContent = `0${slideIndex}`;
			} else {
				currentSlide.textContent = slideIndex;
			}

			dots.forEach(dot => dot.style.opacity = '0.5');
			dots[slideIndex - 1].style.opacity = 1;
		})
	})

	// Calc ==============================

	const result = document.querySelector('.calculating__result span');
	let sex, height, weight, age, ratio;

	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'woman';
		localStorage.setItem('sex', 'woman');
	}

	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = 1.375;
		localStorage.setItem('ratio', 1.375);
	}

	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.classList.remove(activeClass);
			if (elem.getAttribute('id') === localStorage.getItem('sex')) {
				elem.classList.add(activeClass);
			}
			if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				elem.classList.add(activeClass);
			}
		})
	}

	initLocalSettings('#gender .div', 'calculating__choose-item_active')
	initLocalSettings('.calculating__choose-item', 'calculating__choose-item_active')

	function calcTotal() {
		//Проверка введены ли все данные для проверки
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = '____';
			return;
		}

		if (sex === 'woman') {
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}

	}
	calcTotal();

	function getStaticInformation(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.addEventListener("click", function (e) {
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', e.target.getAttribute('id'));
				}

				elements.forEach(elem => {
					elem.classList.remove(activeClass);
				})

				e.target.classList.add(activeClass);

				calcTotal();
			});
		});

	};
	getStaticInformation('#gender div', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

	// Функия для сбора информации с инпутов
	function getDynamicInformation(selector) {
		const input = document.querySelectorAll(selector);

		input.addEventListener("input", function (e) {

			// Проверка на то что вводились только цифры
			if (input.value.match(/\D/g)) {
				input.style.border = '1px solid red';
			} else {
				input.style.border = 'none';
			}

			switch (input.getAttribute('id')) {
				case 'height':
					height = +input.value;
					break;
				case 'weight':
					weight = +input.value;
					break;
				case 'age':
					age = +input.value;
					break;
			};

			calcTotal();
		});
	};

	getDynamicInformation('#height');
	getDynamicInformation('#weight');
	getDynamicInformation('#age');
});
