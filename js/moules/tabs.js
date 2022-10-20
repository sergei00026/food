// Создание табов можно разделить на 3 подзадачи 
// 1. Функция которая будет скрывать ненужные табы
// 2. Функция которая будет показывать нужный таб
// 3. Функция - назначит обработличк событий на меню 
// который будет манипулировать этими функциями

function tabs() {
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
				};
			});
		};
	});
};

export default tabs;