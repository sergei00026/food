function forms() {
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
}

export default forms;