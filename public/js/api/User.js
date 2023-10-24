/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static URL = '/user';
  
  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    let currentUser = JSON.parse(localStorage.getItem('user'));
    return currentUser;
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    createRequest({
      url: this.URL + '/current',
      method: 'GET',
      data: this.current(),
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        } else {
          this.unsetCurrent()
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
      createRequest({
        url: this.URL + '/register',
        method: 'POST',
        data,
        callback: (err, response) => {
          if (response && response.user) {
            this.setCurrent(response.user);
          }
          callback(err, response);
        }
      });  
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    createRequest({
      url: this.URL + '/logout',
      method: 'POST',
      data: this.current(),
      callback: (err, response) => {
        if (response && response.user) {
          this.unsetCurrent();
        }
        callback(err, response);
      }
    });
  }
}




// ПРОВЕРКА
// let user1 = new User;
// console.log(user1);
// user1.fetch(( err, response ) => {
//   console.log( response.user.id ); // 2
// });

// const user = {
//   id: 12,
//   name: 'Vlad'
// };

// User.setCurrent( user );

// console.log( localStorage.user ); // строка "{"id":12,"name":"Vlad"}

// const user = {
//   id: 12,
//   name: 'Vlad'
// };

// User.setCurrent( user );
// const current = User.current();

// console.log( current ); // объект { id: 12, name: 'Vlad' }

// const user = {
//   id: 12,
//   name: 'Vlad'
// };

// User.setCurrent( user );
// let current = User.current();
// console.log( current ); // объект { id: 12, name: 'Vlad' }

// User.unsetCurrent();

// current = User.current();
// console.log( current ); // undefined

// User.login( {
//   mail: 'ivan@biz.pro',
//   password: 'odinodin'
// }, (err, response) => {
//   console.log( 'Ошибка, если есть', err );
//   console.log( 'Данные, если нет ошибки', response );
// });



// User.fetch((err, response) => {
//   console.log( 'Ошибка, если есть', err );
//   console.log( 'Данные, если нет ошибки', response );
// });

// User.fetch(( err, response ) => {
//   console.log( response );
//   console.log( response.user.id ); // 2
// });

// console.log( User.current()); // { id: 47, name: 'Vlad' }
// User.fetch(( err, response ) => {
//   // Оказалось, что пользователь уже больше не авторизован (истекла сессия)
//   console.log( response.user ); // undefined
//   console.log( response.success ); // false
//   console.log( User.current() ); // undefined
// });