/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  
  static URL = '';
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback){
    createRequest({
      url: this.URL,
      method: 'GET',
      data,
      callback
    });
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    createRequest({
      url: this.URL,
      method: 'PUT',
      data,
      callback
    });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback ) {
    createRequest({
      url: this.URL,
      method: 'DELETE',
      data,
      callback
    });
  }
}


// ПРОВЕРКА
// console.log('Entity start');

// let entity1 = new Entity;
// console.log( entity1 );
// console.log( entity1.url ); 
// entity1.create({ mail: 'ivan@biz.pro' }, ( err, response ) => console.log(err, response));
// console.log( entity1 );
// console.log('Entity end');

// console.log( Entity.URL );

// Entity.list( {
//   mail: 'ivan@biz.pro',
//   password: 'odinodin'
// }, ( err, response ) => console.log(err, response));

// Entity.create( {
//   mail: 'ivan@biz.pro',
//   password: 'odinodin'
// }, ( err, response ) => console.log(err, response));

// Entity.remove( {
//   mail: 'ivan@biz.pro',
//   password: 'odinodin'
// }, ( err, response ) => console.log(err, response));