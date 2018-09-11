
//Код написан при помощи библиотеки jquery

/*
Задание написать небольшой тест аналогичен https://learn.javascript.ru/quiz/js-basic
Тест написать в виде мультиформы
Данные с вопросами будут сохраняться в виде json.
Обращение через дата атрибута каждого вопроса data-question и сравнение data-variant у ответов
Далее сформировать json с ответами пользователя и вывести результат.



На данный момент реализовано просто переходы по вопросам (вперед, назад) - с изменением progressBar

******????******
Столкнулся с проблемой проверки  вкладок с вопросами на заполненость

Если все radio данного вопроса не активны - переход к следующему вопросу заблокировать
Более подробно описано в конце кода программы

Подозреваю проблему в  $.each(tab, function(index){ на кнопке Вперед, не дожидаясь обработки формы переходит на следующий таб
******?????*****

 */

//функция полной загрузки документа
$(document).ready(function() {

    var cur =0;
    var tab = $('.tab');

    var statusBar = $('#myBar');
    var width = 1;

    //ограничение прогресс бара

    if ((width > 0)&&(width <= 100)) {
        statusBar.css('width', width + '%');
    } else {

        width = 1;
        statusBar.css('width', width + '%');
    }

    //перебор элементов класса tab

    $.each(tab, function(index) {

       if (index == cur){

           $(this).css('display', 'block');
           $(this).attr('data-question');
           alert($(this).attr('data-question'));

           showElements(cur);

       }

    });
    // Конецперебор элементов класса tab


    //Обработчик нажатия кнопки Вперед
    $('#nextBtn').bind('click', function(){

        if (cur < tab.length) {

            cur = cur + 1;

            width = Math.round(100 * (cur / tab.length));
            statusBar.css('width', width + '%');
        }

        $('.tab').css('display', 'none');
        $.each(tab, function(index){

            if (index == cur) {


                ///////////////////////Блок проверки тестового текстового поля

                /*
                var input = $('input[name=test]').val();
               alert(input);
               if(input == ''){
                   alert('---');
                   ///Если пустое поле - кнопка не активна
                   $('#nextBtn').css('disabled', 'true');

                   //если поставить return false - переход всеравно осуществляеться,
                   // но в "пустой TAB", без впороса, но с кнопками

               }
               else {
                   alert('+++');

               }
               */
                ///////////////////////Конец Блок проверки тестового поля

               //если строки 75-78 внести под верхний else - ничего не решает
                $(this).css('display', 'block');

                $(this).attr('data-question');
                alert($(this).attr('data-question'));
                   showElements(cur);




            }

        });

    });
    //Конец Обработчика нажатия кнопки Вперед


    //Обработчик нажатия кнопки Отправить
    $('#submit').bind('click', function(){

        if(cur == tab.length-1){

            cur = tab.length;

            width = Math.round(100 * (cur / tab.length));
            statusBar.css('width', width + '%');
        }
    });
    //Конец обработчика нажатия кнопки Отправить


    //Обработчик нажатия кнопки Назад
    $('#prevBtn').bind('click', function(){

        if ((cur <= tab.length-1)) {

            cur = cur - 1;
        }

        $('.tab').css('display', 'none');
        $.each(tab,function(index,value){

            if (index == cur) {

                $(this).css('display', 'block');
                showElements(cur);
            }
        });

    });
    //Конец обработчика нажатия кнопки ОТправить



    //Показ элементов управления на странице
    function showElements(n) {

        var tab = $('.tab');

        if (n == 0) {

            $('#nextBtn').css('display', 'block');
            $('#prevBtn').css('display', 'none');
            $('#submit').css('display', 'none');
        }

        if((n !== 0)&&(n <= tab.length)){

            $('#nextBtn').css('display', 'block');
            $('#prevBtn').css('display', 'block');
            $('#submit').css('display', 'none');

        }

        if(n == tab.length-1) {

            $('#submit').css('display', 'block');
            $('#nextBtn').css('display', 'none');

        }

    }
    //Конец функции showElements()

});
//Конец стандартной функции ready(function()





///////////////////////////////////////////////////
// как сейчас: если ничего не выбрано переход осуществляеться окращивается в красный цвет кнопка следующего вопроса
// вешал на кнопку next
/*
Как необходимо
    Если не нажата не одна кнопка radio - заблокировать переход к следуюшиму вопросу
 */
/*
           var input = $('input[name=zd1]');
           $.each(input, function(index, value){
               if(input.prop('checked')== false) {
                   $('#nextBtn').attr('disabled', 'true');
                   $('#nextBtn').css('background', 'red');

               }
               else{
                   $(this).bind('click', function(){
                      alert(123); //просто реакция на нажатия любого radio
                       $('#nextBtn').css('background', 'yellow'); //для наглядности перекрасить кнопку и перейти к следующему вопросу
                   });

               }
           });
*/


