/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (!element) {
      throw new Error('Пустой элемент');
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render();
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const accountRemoveBtn = document.querySelector('.remove-account');
    const transactionRemoveBtns = Array.from(document.querySelectorAll('.transaction__remove'));

    accountRemoveBtn.onclick = () => {
      // console.log(accountRemoveBtn);
      this.removeAccount();
    }

    const content = document.querySelector('.content');
    // console.log(content);
    // console.log((content.children));
    // Array.from(content.children).forEach((child) => child.remove());

    transactionRemoveBtns.forEach((btn) => {
      btn.onclick = (e) => {
        e.preventDefault;
        console.log('delite transaction');
      //   // removeTransaction(transactionRemoveBtn.getAttribute('data-id'));
      }
    })
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {
    const title = document.querySelector('.content-title');
    let name = title.textContent;
    if (confirm('Вы действительно хотите удалить счет?')) {
    Account.list(User.current().id , (err, response) => {
      Object.values(response.data).forEach((acc) => {
        if (acc.name === name) {
          Account.remove({id: [acc.id]}, (err, response) => {
            if (response.success) {
              this.clear();
            App.updateWidgets();
            App.updateForms();
            } 
          });
        }
      }) 
    });
    };

  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {
    Transaction.remove(id, (err, response) => {
      if (response.success) {
        App.update(this.element);
      }
    });
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    let userId = '';

    if (options) {
      userId = options.userId;
    }

    Account.get(userId, (err, response) => {
      if (response.success) {
        this.renderTitle(response.data.name);
      }
    });

    Transaction.list({account_id: userId}, (err, response) => {
        this.renderTransactions(response.data);
      });
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransaction([]);
    const title = document.querySelector('.content-title');
    this.renderTitle('Название счёта');
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    const title = document.querySelector('.content-title');
    title.textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    let currentDate = new Date(date);
    let options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }
    const newDate = currentDate.toLocaleString('ru-RU', options);
    return newDate;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    const {account_id, created_at, id, name, sum, type, user_id} = item;
    let accClass = 'transaction_expense';
    if (type === 'income') {
      accClass = 'transaction_income';
    }
    const transactionCode = `<div class="transaction ${accClass} row">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
              <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
              <h4 class="transaction__title">${name}</h4>
              <div class="transaction__date">${this.formatDate(created_at)}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">
          ${sum}<span class="currency">₽</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
            <button class="btn btn-danger transaction__remove" data-id="${id}">
                <i class="fa fa-trash"></i>  
            </button>
        </div>
    </div>`
    return transactionCode;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    const content = document.querySelector('.content');
    Array.from(content.children).forEach((child) => child.remove());
    if (!!data) {
      let transactions = Array.from(data);
      transactions.forEach((transaction) => {
        const transactionItem = document.createElement('div');
        content.appendChild(transactionItem);
        transactionItem.outerHTML = this.getTransactionHTML(transaction);
      })
    }
    
  }
}
