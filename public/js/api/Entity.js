/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  constructor() {
    this.url = '';
  }
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback){
    console.log(data);
    console.log(callback);

    this.method = 'GET';
    this.data = data;
    this.callback = callback;

    createRequest(Entity.list(this.data, this.callback));
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    console.log(data);
    console.log(callback);
    this.method = 'PUT';
    this.data = data;
    this.callback = callback;

    createRequest(Entity.create(this.data, this.callback));
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback ) {
    console.log(data);
    console.log(callback);
    this.method = 'DELETE';
    this.data = data;
    this.callback = callback;

    createRequest(Entity.remove(this.data, this.callback));
  }
}
// console.log('Entity start');

// let entity1 = new Entity;
// console.log( entity1 );
// console.log( entity1.url ); 
// entity1.create({ mail: 'ivan@biz.pro' }, ( err, response ) => console.log(err, response));
// console.log( entity1 );
// console.log('Entity end');