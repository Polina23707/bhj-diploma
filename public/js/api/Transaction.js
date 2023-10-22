/**
 * Класс Transaction наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/transaction'
 * */
class Transaction extends Entity {
  constructor(url) {
    super(url);
    this.url = '/transaction';
  }
}

// console.log('Transaction start');

// let transaction1 = new Transaction;
// console.log( transaction1  );
// console.log( transaction1.prototype); 
// transaction1.create({ mail: 'ivan@biz.pro' }, ( err, response ) => console.log(err, response));
// console.log( transaction1 );
// console.log('Transaction end');