'use strict';
    function createCalendar(id, year, month) {
	
	    var dNow = new Date();
	  
	    if (month === undefined){	    
		    month = dNow.getMonth() + 1;
	    }	
	    year = year || dNow.getFullYear();	  
	  
      var elem = document.getElementsByClassName(id)[0];
	    var elemMonth = document.getElementsByClassName('month__now')[0];

      var mon = month - 1;
      	  // месяцы в JS идут от 0 до 11, а не от 1 до 12
      var d = new Date(year, mon);
	    var dPrev = new Date(year, mon);
	  	  
	    var weekday = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
	    var monthName = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
	  
	    elemMonth.innerHTML = '' + monthName[d.getMonth()] + ' ' + d.getFullYear() + '';	  
	  
      var table = '<table><tr>';	  

      // заполнить первый ряд от понедельника
      // и до дня, с которого начинается месяц
      // * * * | 1  2  3  4
      for (var i = 0; i < getDay(d); i++) {	  
	      dPrev.setDate(dPrev.getDate() - getDay(d));
        table += '<td><span style="float:left; color: #8c8c8c;">' + weekday[getDay(dPrev)] + ', </span><div class="calendar__day-prev calendar__day_grey">' + dPrev.getDate() + '</div><div class="calendar__todo-list-prev"></div></td>';
		    dPrev.setDate(dPrev.getDate() + getDay(d) + 1);		
      }

      // ячейки календаря с датами и днями недели
      while (d.getMonth() == mon) {	 	  	
        if (dNow.getDate() == d.getDate() && dNow.getMonth() == d.getMonth() && dNow.getFullYear() == d.getFullYear()) {
		      table += '<td class="calendar_strong"><span style="float:left; color: #362d26;">' + weekday[getDay(d)] + ', </span><div class="calendar__day">' + d.getDate() + '</div><div class="calendar__todo-list"></div></td>';
		    }  else {	    
		      table += '<td><span style="float:left; color: #362d26;">' + weekday[getDay(d)] + ', </span><div class="calendar__day">' + d.getDate() + '</div><div class="calendar__todo-list"></div></td>';
        }		
		    if (getDay(d) == 6) { // вс, последний день - перевод строки
          table += '</tr><tr>'; d.setDate(d.getDate() + 1); break;	  
        }
        d.setDate(d.getDate() + 1);		
      }

	    // ячейки календаря с датами
	    while (d.getMonth() == mon) {	 
        if (dNow.getDate() == d.getDate() && dNow.getMonth() == d.getMonth() && dNow.getFullYear() == d.getFullYear()) {
		      table += '<td class="calendar_strong"><div class="calendar__day">' + d.getDate() + '</div><div class="calendar__todo-list"></div></td>';
		    } else {	  	  
	        table += '<td><div class="calendar__day">'  + d.getDate() + '</div><div class="calendar__todo-list"></div></td>';
        }		
        if (getDay(d) == 6) { // вс, последний день - перевод строки
          table += '</tr><tr>';
		    } 
        d.setDate(d.getDate() + 1);
		    }	  	  

      // добить таблицу ячейками с днями следующего месяца
      if (getDay(d) != 0) {
        for (var i = getDay(d); i < 7; i++) {
          table += '<td><div class="calendar__day-next calendar__day_grey">' + d.getDate() + '</div><div class="calendar__todo-list-next"></div></td>';
		      d.setDate(d.getDate() + 1);
        }
      }	   
	    // закрыть таблицу
      table += '</tr></table>';      
	  
      // присваивание innerHTML
      elem.innerHTML = table;


      // переход на следующий/предыдущий месяц
      var elemNextMonth = document.getElementsByClassName('month__button_next')[0];
      var elemPrevMonth = document.getElementsByClassName('month__button_prev')[0];	
	  
	    function getPrevMonth() {	  
	      d.setMonth(d.getMonth() - 2);	  
	      createCalendar('calendar', d.getFullYear(), d.getMonth() + 1);
        
      }	
	
	    function getNextMonth() {
	      createCalendar('calendar', d.getFullYear(), d.getMonth() + 1);
      }
	
	    elemPrevMonth.onclick = getPrevMonth;
	    elemNextMonth.onclick = getNextMonth;      

      // вывод события в календаре
      controller.outputEvent(d.getFullYear(), d.getMonth());  

          // Открытие формы добавления события
    
      var headerAddEvent = document.getElementsByClassName('header__add-event')[0];
      headerAddEvent.onclick = function() {
        controller.addEvent(d.getFullYear(), d.getMonth());
      }

      // клик на название события (открытие события)
      var calendar = document.getElementsByClassName('calendar')[0];   
      calendar.onclick = function(e) {
        var target = e.target;
        if (target.hasAttribute('href')) {
          var dataId = target.getAttribute('data-id');
          controller.getEvent(d.getFullYear(), d.getMonth(), dataId);
          e.preventDefault();               
        } else if (target.className == 'calendar__todo-list'){ // клик на пустое поле даты для быстрого добавления события
            var date = target.previousElementSibling.innerHTML;
          controller.addQuickEvent(d.getFullYear(), d.getMonth(), date);
        }
      };      
     
    };



	
	  function getDay(date) { // получить номер дня недели, от 0(пн) до 6(вс)
      var day = date.getDay();
      if (day == 0) day = 7;
      return day - 1;
    }	


    // создать объект событий
    var eventObj = {       
      eventList: [ // массив событий
        {id: 0, date: ['2017', '07', '12'], title: "День рождения", members: "Петр", description: "Д.Р у друга" 
        },      
        {id: 1, date: ['2017', '06', '19'], title: "Митинг", members: "В.П. и Д.М.", description: "Митинг на Болотной" 
        },      
        {id: 2, date: ['2017', '07', '23'], title: "Свадьба", members: "Иван и Мария", description: "Свадьба у друга" 
        },      
        {id: 3, date: ['2017', '08', '29'], title: "Встреча выпускников", members: "сокурсники", description: "Встреча выпускников института" 
        }
      ],      

      addEvent: function(eventItem) {// добавление события в календарь
        this.eventList.push(eventItem);
      },

      deleteEvent: function(id) {// удаление события из календаря       
        if (id) {
          this.eventList.splice(id, 1);
          for (var i = id; i < this.eventList.length; i++) {
            this.eventList[i].id -= 1;
          }                      
        }    
      },

      setEvent: function(id, eventItem) { // редактирование деталей события             
        this.eventList[id].date = eventItem.date;
        this.eventList[id].title = eventItem.title;
        this.eventList[id].members = eventItem.members;
        this.eventList[id].description = eventItem.description;        
      }
      

    };


    var controller = {

      outputEvent: function (year, month, id) {  // метод вывода события в календаре       
        var calendarTodoList = document.getElementsByClassName('calendar__todo-list');
        var calendarDay = document.getElementsByClassName('calendar__day');
        var i = 0;
        if (id) {
           i = id;
        }
      
        for ( i; i < eventObj.eventList.length; i++) {
          if (eventObj.eventList[i].date[0] == year && eventObj.eventList[i].date[1] == month) { 
            var j = eventObj.eventList[i].date[2] - 1;           
              
              calendarDay[j].nextElementSibling.innerHTML += '<a class="calendar__event" href="#" data-id="' + eventObj.eventList[i].id + '">' + eventObj.eventList[i].title + ',<br></a>';
              calendarDay[j].parentElement.classList.add('calendar_marked');
              
           
          }   
        }
      },

      addEvent: function(year, month) {// метод добавления события в календарь при клике на кнопку "добавить"
      var div = document.createElement('div');  // создание формы
        div.innerHTML = '<button class="created-event-form__close">x</button><form><input type="date" name="event-date" class="created-event-form__event-name" placeholder="ДД.ММ.ГГГГ" autofocus ><input type="text" class="created-event-form__event-name" name="event-title" placeholder="Событие"><input type="text" name="event-members" class="created-event-form__event-name" placeholder="Имена участников" ><br><br><br><textarea name="event-description" class="created-event-form__event-name" placeholder="Описание"  rows="8"></textarea><input type="button" data-action="addEvent" value="Готово"><input type="button" data-action="deleteEvent" value="Удалить"></form> ';

        div.className = 'created-event-form';
        div.style.display = 'block';
        
        document.body.appendChild(div);
        showCover();
        // закрытие формы при нажатии на  крестик
        var button = document.getElementsByClassName('created-event-form__close')[0];
        button.onclick = function() {
          hideCover();
          document.body.removeChild(div);
        }
        // клик на кнопку "готово"
        var createdEventForm = document.getElementsByClassName('created-event-form')[0];
        createdEventForm.onclick = function(e) {
          var target = e.target;
          var action = target.getAttribute('data-action');
          if (action) {  
            var eventDate = document.getElementsByName('event-date')[0].value;
            var eventDateRow = eventDate.split('-');
            var eventTitle = document.getElementsByName('event-title')[0].value;
            var eventMembers = document.getElementsByName('event-members')[0].value;
            var eventDescription = document.getElementsByName('event-description')[0].value;

            eventObj[action]({id: eventObj.eventList.length, date: eventDateRow , title: eventTitle, members: eventMembers, description: eventDescription});
            hideCover();
            document.body.removeChild(div);
            controller.outputEvent(year, month, (eventObj.eventList.length - 1));
          }
        };   
                      
      },

      addQuickEvent: function(year, month, date) {// быстрый метод добавления события в календарь при клике на дату
        var div = document.createElement('div'); // создание формы
        if (month < 10) {
          month = '0' + month;
        }
        if (date < 10) {
          date = '0' + date;
        }
        div.innerHTML = '<button class="created-event-form__close">x</button><form><input type="date" name="event-date" class="created-event-form__event-name" placeholder="ДД.ММ.ГГГГ" value="' + year + '-' + month + '-' + date + '"><input type="text" class="created-event-form__event-name" name="event-title" placeholder="Событие" autofocus><input type="text" name="event-members" class="created-event-form__event-name" placeholder="Имена участников" ><br><br><br><textarea name="event-description" class="created-event-form__event-name" placeholder="Описание"  rows="8"></textarea><input type="button" data-action="addEvent" value="Готово"><input type="button" data-action="deleteEvent" value="Отмена"></form> ';

        div.className = 'created-event-form';
        div.style.display = 'block';
        
        document.body.appendChild(div);
        showCover();
        // закрытие формы при нажатии на  крестик
        var button = document.getElementsByClassName('created-event-form__close')[0];
        button.onclick = function() {
          hideCover();
          document.body.removeChild(div);
        }
        // нажатие на кнопку готово/отмена событие
        div.onclick = function(e) {
          var target = e.target;
          var action = target.getAttribute('data-action');
          if (action) {
            var eventDate = document.getElementsByClassName('created-event-form__event-name')[0].value;;
            var eventDateRow = eventDate.split('-');
            var eventTitle = document.getElementsByClassName('created-event-form__event-name')[1].value;
            var eventMembers = document.getElementsByClassName('created-event-form__event-name')[2].value;
            var eventDescription = document.getElementsByClassName('created-event-form__event-name')[3].value;
            eventObj[action]({id: eventObj.eventList.length, date: eventDateRow , title: eventTitle, members: eventMembers, description: eventDescription});  // action = addEvent / deleteEvent
            hideCover();
            document.body.removeChild(div);
            controller.outputEvent(year, month, (eventObj.eventList.length - 1));          
          }
        }
      },

      getEvent: function(year, month, id) {// просмотр деталей события
        var div = document.createElement('div');  // создание формы
        div.innerHTML = '<button class="created-event-form__close">x</button><form><input type="date" name="event-date" class="created-event-form__event-name" placeholder="ДД.ММ.ГГГГ" autofocus value="' + eventObj.eventList[id].date.join('-') + '"><input type="text" class="created-event-form__event-name" name="event-title" placeholder="Событие" value="' + eventObj.eventList[id].title + '"><input type="text" name="event-members" class="created-event-form__event-name" placeholder="Имена участников" value="' + eventObj.eventList[id].members + '"><br><br><br><textarea name="event-description" class="created-event-form__event-name" placeholder="Описание"  rows="8">' + eventObj.eventList[id].description + '</textarea><input type="button" data-action="setEvent" value="Готово"><input type="button" data-action="deleteEvent" value="Удалить"></form> ';

        div.className = 'created-event-form';
        div.style.display = 'block';
        
        document.body.appendChild(div);
        showCover();
        // закрытие формы при нажатии на  крестик
        var button = document.getElementsByClassName('created-event-form__close')[0];
        button.onclick = function() {
          hideCover();
          document.body.removeChild(div);
        }
        
        // нажатие на кнопку готово/удалить событие
        div.onclick = function(e) {
          var target = e.target;
          var action = target.getAttribute('data-action');
          if (action) {
            var eventDate = document.getElementsByClassName('created-event-form__event-name')[0].value;
            var eventDateRow = eventDate.split('-');
            var eventTitle = document.getElementsByClassName('created-event-form__event-name')[1].value;
            var eventMembers = document.getElementsByClassName('created-event-form__event-name')[2].value;
            var eventDescription = document.getElementsByClassName('created-event-form__event-name')[3].value;   
            eventObj[action](id, {date: eventDateRow , title: eventTitle, members: eventMembers, description: eventDescription}); //  action = setEvent / deleteEvent
            hideCover();
            document.body.removeChild(div);
            createCalendar('calendar', year, month);          
          }
        }
      },

    };   


    // полупрозрачный DIV, затеняющий всю страницу
    function showCover() {
      var coverDiv = document.createElement('div');
      coverDiv.className = 'cover-div';
      document.body.appendChild(coverDiv);
    }

    function hideCover() {
      document.body.removeChild(document.getElementsByClassName('cover-div')[0]);
    } 

    
    
    createCalendar('calendar');