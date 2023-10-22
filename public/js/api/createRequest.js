/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const {url, data, method, callback} = options;
  // console.log(url, data, method);
  const xhr = new XMLHttpRequest();

  try {
    // console.log(Array.from(Object.entries(data)));
    if (method === 'GET') {
      let dataArray = [];
      Array.from(Object.entries(data)).forEach((pair) => dataArray.push(pair.join('=')));
      console.log(dataArray.join('&'));
      console.log(url + '?' + dataArray.join('&'));
      xhr.open(method, url + '?' + dataArray.join('&'));
      xhr.send();
  
    } else {
      const formData = new FormData;
      Array.from(Object.entries(data)).forEach((pair) => formData.append(pair[0], pair[1]));
      xhr.open( method, url );
      xhr.send( formData );
    }
    callback(err, response);

  } catch (err) {
    callback(err);
  }

  xhr.responseType = 'json';
  console.log('Запрос отправили и получили');
  console.log(xhr.response);
};

console.log('CreateRequest start')
// createRequest({
//   url: 'http://localhost:8000',
//   data: {
//     mail: 'ivan@biz.pro',
//     password: 'odinodin'
//   },
//   method: 'GET',
// });

// createRequest({
//   url: 'http://localhost:8000',
//   data: {
//     mail: 'ivan@biz.pro',
//     password: 'odinodin'
//   },
//   method: 'POST',
// });

// createRequest({
//   url: 'https://example.com',
//   method: 'GET',
//   callback: ( err, response ) => {
//     /*
//       при успешном выполнении err = null, response содержит данные ответа
//     */
//     console.log( err ); // null
//     console.log( response ); // ответ
//   }
// });

// createRequest({
//   url: 'https://example.com',
//   method: 'GET',
//   callback: ( err, response ) => {
//     console.log( err ); // объект ошибки
//   }
// });

console.log('CreateRequest end')