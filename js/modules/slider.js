function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {
	// Слайдер =============================

	const slides = document.querySelectorAll(slide),
		slider = document.querySelector(container),
		prev = document.querySelector(prevArrow),
		next = document.querySelector(nextArrow),
		totalSlide = document.querySelector(totalCounter),
		currentSlide = document.querySelector(currentCounter),
		slidesWrapper = document.querySelector(wrapper),
		sliderField = document.querySelector(field),
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
			offset = deleteNotDigits(width) * (slideTo - 1);

			sliderField.style.transform = `translateX(-${offset}px)`;

			if (slides.length < 10) {
				currentSlide.textContent = `0${slideIndex}`;
			} else {
				currentSlide.textContent = slideIndex;
			}

			dots.forEach(dot => dot.style.opacity = '0.5');
			dots[slideIndex - 1].style.opacity = 1;
		});
	});
}

export default slider;