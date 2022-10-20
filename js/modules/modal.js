// Функция открытия модального окна
function openModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);

	modal.classList.add('show', 'anim');
	modal.classList.remove('hide');
	document.body.style.overflow = 'hidden';

	console.log(modalTimerId);
	if (modalTimerId) {
		// Отмена появления модалки вслучае открытия раньше пользователем по кнопке
		clearInterval(modalTimerId);
	}

}

// Функция закрытия модального окна
function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);

	modal.classList.add('hide');
	modal.classList.remove('show', 'anim');
	document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
	// Modal ================
	const btns = document.querySelectorAll(triggerSelector),
		modal = document.querySelector(modalSelector);


	// Перебор всех модалок
	btns.forEach(btn => {
		btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
	});

	// Закрытие модалки при клике вне окна и на крестик
	modal.addEventListener("click", function (e) {
		if (e.target === modal || e.target.getAttribute('data-modalclose') == '') {
			closeModal(modalSelector);
		}
	});

	//закрытие по нажатию Escape
	document.addEventListener("keydown", function (e) {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal(modalSelector);
		}
	});

	// Функция показа модалки при скроле до самого низа страниы
	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
			openModal(modalSelector, modalTimerId);
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	// Появление модалки при скроле до самого низа
	window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export { closeModal, openModal };