/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (!element) {
      throw new Error('Пустой элемент');
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Необходимо запретить отправку формы и в момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {    
    this.element.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submit();
    })

  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    const form = this.element;
    const formData = new FormData(form);
    
    if (form.getAttribute('id') === 'new-income-form' || form.getAttribute('id') === 'new-expense-form') {
      let data = Array.from(form.children);
      let type = data[0];
      let name = Array.from(data[1].children)[0];
      let sum = Array.from(data[2].children)[0];
      let accId = Array.from(data[3].children)[1];
      let rows = [name, sum, accId];
      
      formData['type'] = type.getAttribute('value');
      rows.forEach((row) => {
        formData[row.getAttribute('name')] = row.value;
      })
      

    } else {
      Array.from(form.children).forEach((item) => {
        let name = Array.from(item.children)[0].getAttribute('name');
        let value = Array.from(item.children)[0].value;
        formData[name] = value;
      })
    }
      return formData;
  }

  onSubmit(options){

  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    this.onSubmit(this.getData());
  }
}

