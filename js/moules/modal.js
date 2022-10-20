function modal() {
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
}

export default modal;