/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  /**
   * Получает информацию о счёте
   * */
  static URL = '/account';
  
  static get(id = '', callback){
    createRequest({
      url: this.URL + '/' + id,
      method: 'GET',
      callback
    });
  }
}



// ПРОВЕРКА
// Account.list({ mail: 'ivan@biz.pro' }, ( err, response ) => console.log(err, response));
// Account.create({ mail: 'ivan@biz.pro' }, ( err, response ) => console.log(err, response));
// Account.remove({ mail: 'ivan@biz.pro' }, ( err, response ) => console.log(err, response));
// // console.log('get');
// Account.get(2, ( err, response ) => console.log(err, response));

// Entity.get( 21, function ( err, response ) {
//   console.log(err, response);
//   // ... получили ответ
// });
//  Entity.get( 1, (err, response) => {
//   console.log( 'Ошибка, если есть', err );
//   console.log( 'Данные, если нет ошибки', response );
// });
// let account1 = new Account;
// // console.log(account1);
// account1.get('1', ( err, response ) => console.log(err, response));