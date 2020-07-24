$(document).ready(function () {
  // Пагинация
  $("#page-nav").onePageNav({
    currentClass: "active",
    changeHash: false,
    scrollSpeed: 750,
    scrollTreshold: 0.5,
    filter: "",
    easing: "swing",
    begin: function ($currentListItem) {},
  });

  // Инициализация плагина с анимацией
  AOS.init();

  //  При клике на кнопку выпадает меню
  $("#burger").click(function () {
    $("#burger").toggleClass("active");
    $("#dropdown").toggleClass("active");
    //  У тела страницы убирается возможность скролла
    $("#body").toggleClass("active");
  });

  //  Когда меню открыто, при клике вне меню - закрыть меню
  $(document).mouseup(function (e) {
    var $target = $(e.target);
    if (
      $target.closest("#dropdown").length == 0 &&
      $target.closest("#burger").length == 0
    ) {
      $("#dropdown").removeClass("active");
      $("#burger").removeClass("active");

      $("#body").removeClass("active");
    }
  });

  window.addEventListener("resize", function () {
    $("#dropdown").removeClass("active");
    $("#burger").removeClass("active");

    $("#body").removeClass("active");
  });

  // Стрелочка прокрутки ВВЕРХ
  // По умолчанию она скрыта
  $("#backtop").hide();
  //
  $(window).scroll(function () {
    if ($(this).scrollTop() > 400) {
      $("#backtop").fadeIn();
    } else {
      $("#backtop").fadeOut();
    }
  });

  //FORM VALIDATE
  $("#contact-form").validate({
    rules: {
      email: {
        required: true,
        email: true,
      },
      theme: {
        required: true,
      },
      message: {
        required: true,
      },
    },
    messages: {
      email: {
        required: "Введите email",
        email: "отсутсвует символ @",
      },
      theme: {
        required: "Введите тему сообщения",
      },
      message: {
        required: "Введите текст сообщения",
      },
    },
    submitHandler: function (form) {
      ajaxFormSubmit();
    },
  });

  // Функция AJAX запрса на сервер

  function ajaxFormSubmit() {
    let string = $("#contact-form").serialize(); // Соханяем данные введенные в форму в строку.

    //Формируем ajax запрос
    $.ajax({
      type: "POST", // Тип запроса - POST
      url: "php/mail.php", // Куда отправляем запрос
      data: string, // Какие даные отправляем, в данном случае отправляем переменную string

      // Функция если все прошло успешно
      success: function (html) {
        $("#contact-form").slideUp(800);
        $("#answer").html(html);
      },
    });

    // Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
    return false;
  }

  //Библиотека фильтрации карточек
  let containerE1 = document.querySelector("#portfolio-projects");

  let mixer = mixitup(containerE1, {
    classNames: {
      block: "",
    },
  });
});
