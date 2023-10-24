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
    // console.log(element);
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
    // console.log(this.element);
    
    this.element.addEventListener('submit', (e) => {
      e.preventDefault();
      // console.log('submit');
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
    // console.log(this.element);
    const form = this.element;
    const formData = new FormData(form);
    
    // console.log('get data'); 
    Array.from(form.children).forEach((item) => {
      formData[Array.from(item.children)[0].getAttribute('name')] = Array.from(item.children)[0].value; 
    })
      // console.log(formData); 
      return formData;
    // console.log(formData);
  }

  onSubmit(options){

  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    // console.log('metod');
    this.onSubmit(this.getData());
  }
}

// const async = new AsyncForm(Array.from(document.querySelectorAll('.form'))[0]);
// async.getData();
// const forms = Array.from(document.querySelectorAll('.form'));
// forms.forEach((form) => {
//   form.addEventListener('submit', e => {
//     e.preventDefault();
//     let data ={};
//     Array.from(form.children).forEach((item) => {
//       console.log(Array.from(item.children)[0]);
//       let name = Array.from(item.children)[0].getAttribute('name');
//       let value = Array.from(item.children)[0].value;
//       console.log(name, value);
//       data[name] = value;
//     })
//     console.log(data);
    
//   })
// })
