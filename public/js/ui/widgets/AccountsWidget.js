/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
      throw new Error('Пустой элемент');
    }
    this.element = element;
    console.log(element);
    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const createAccount = document.querySelector('.create-account ');
    createAccount.onclick = function() {
      let newAccount = App.getModal('createAccount');
      newAccount.open()
    }
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    // User.current();
    // console.log(localStorage.user);
    // console.log(User.current());
    console.log(Account.list(User.current()));
    // this.clear()
    Account.list(User.current(), (response) => {
      console.log(response);
      this.renderItem({
        "id": 35,
        "name": "Сбербанк",
        "sum": 2396.30
      });
    });

    
    
    // this.renderItem(Account.list(User.current()));
    // console.log(accountList);
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accounts = Array.from(document.querySelectorAll('.account'));

    // accounts.forEach((acc) => acc.remove());
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {

  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    const {id, name , sum} = item;
    let newString = `<li class="active account" data-id="${id}">
      <a href="#">
          <span>${name}</span> /
          <span>${sum} ₽</span>
      </a>
      </li>`
    // console.log(newString);
    return newString;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    // Array.from(data).forEach((acc) => console.log(AccountsWidget.getAccountHTML(data)));
    
    // console.log(this.element);
    // console.log(data);
    let newAccount = document.createElement('li');
    this.element.appendChild(newAccount);
    newAccount.innerHTML = this.getAccountHTML(data);
  }
}

// let viget = new AccountsWidget({
//   "id": 35,
//   "name": "Сбербанк",
//   "sum": 2396.30
// });
// console.log(viget);
// let vigetHTML = viget.getAccountHTML({
//   "id": 35,
//   "name": "Сбербанк",
//   "sum": 2396.30
// })
// console.log(vigetHTML);
// viget.renderItem(vigetHTML);
// console.log(viget);

