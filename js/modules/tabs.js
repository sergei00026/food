// Создание табов можно разделить на 3 подзадачи 
// 1. Функция которая будет скрывать ненужные табы
// 2. Функция которая будет показывать нужный таб
// 3. Функция - назначит обработличк событий на меню 
// который будет манипулировать этими функциями

function tabs(tabsSelector, TabsContentSelector, tabsParentSelector, activeClass) {
	// tabs ================
	const tabs = document.querySelectorAll(tabsSelector);
	const tabContent = document.querySelectorAll(TabsContentSelector);
	const tabsBlock = document.querySelector(tabsParentSelector);

	function hideTabContent() {
		tabContent.forEach(el => {
			// el.style.display = 'none';
			el.classList.add('hide');
			el.classList.remove('show', 'anim');
		});

		tabs.forEach(tab => {
			tab.classList.remove(activeClass);
		});
	}

	function showTabContent(i = 0) {
		// tabContent[i].style.display = 'block';
		tabContent[i].classList.add('show', 'anim');
		tabContent[i].classList.remove('hide');
		tabs[i].classList.add(activeClass);
	}

	hideTabContent();
	showTabContent();

	tabsBlock.addEventListener("click", (event) => {
		const target = event.target;

		if (target && target.classList.contains(tabsSelector.slice(1))) {
			tabs.forEach((el, i) => {
				if (target == el) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});
}

export default tabs;