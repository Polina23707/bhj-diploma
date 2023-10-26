/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const select = Array.from(document.querySelectorAll('.accounts-select'));


    select.forEach((form) => {
      Account.list(User.current(), (err, response) => {
      if (response.success) {
        let accountList = response.data;
        // console.log(accountList);
        accountList.forEach((account) => {
          let option = document.createElement('option');
          form.appendChild(option);
          option.outerHTML = `<option value="${account.id}">${account.name}</option>`
        })
        }
    });
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
      Transaction.create(data, (err, response) => {
      if (response.success) {
        App.update();
        App.getModal('newExpense').close();
        App.getModal('newIncome').close();
      }
    })
  }
}