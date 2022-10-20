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

export { postData };
export { getResource };