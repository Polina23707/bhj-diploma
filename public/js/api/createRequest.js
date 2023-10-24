/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const {url, data, method, callback} = options;

  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  let dataArray = [];
  const formData = new FormData;

  if (data) {
    Array.from(Object.entries(data)).forEach((pair) => dataArray.push(pair.join('=')));
    Array.from(Object.entries(data)).forEach((pair) => formData.append(pair[0], pair[1]));
  }

  try {
    if (method === 'GET') {
      xhr.open(method, url + '?' + dataArray.join('&'));
      xhr.send();
    } else {
      xhr.open( method, url );
      xhr.send( formData );
    }

  } catch (err) {
    callback(err);
  }
  
  xhr.onload = function() {
    if (!!callback && xhr.response?.success) {
      callback(null, xhr.response);
    }
  }
};




// ПРОВЕРКА
// console.log('CreateRequest start')
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

// console.log('CreateRequest end')