/**
 * Класс Transaction наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/transaction'
 * */
class Transaction extends Entity {
  
  static URL = '/transaction';

  // createRequest({
  //   url: this.URL,
  //   method: 'DELETE',
  //   responseType: 'json',
  //   data,
  //   callback
  // })
}

// ПРОВЕРКА
// console.log('Transaction start');

// let transaction1 = new Transaction;
// console.log( transaction1  );
// console.log( transaction1.prototype); 
// transaction1.create({ mail: 'ivan@biz.pro' }, ( err, response ) => console.log(err, response));
// console.log( transaction1 );
// console.log('Transaction end');


// Transaction.list({ mail: 'ivan@biz.pro' }, ( err, response ) => console.log(err, response));
// Transaction.create({ mail: 'ivan@biz.pro' }, ( err, response ) => console.log(err, response));
// Transaction.remove({ mail: 'ivan@biz.pro' }, ( err, response ) => console.log(err, response))