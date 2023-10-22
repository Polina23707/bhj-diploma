/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  /**
   * Получает информацию о счёте
   * */
  constructor(url) {
    super(url);
    this.url = '/account';
  }
  
  static get(id = '', callback){
    console.log(id);
    console.log(callback);
    this.callback = callback;
    this.id = id;
    // console.log('Account start');
    console.log(Account.list);

    createRequest(Account);
  }
}

let account1 = new Account;
// console.log(account1);
account1.get('1', ( err, response ) => console.log(err, response));