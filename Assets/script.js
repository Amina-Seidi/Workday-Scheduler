$(document).ready(function(){
  var calender = $(".container");
  // Creating current date
  var currentDay = $("#currentDay");
  var currentDate = moment().format("MMMM Do YYYY");
  
  // Displaying current date
  currentDay.text(currentDate);

  // Create a function to create and append rows 
  createRows();
  function createRows(){
    for ( let i = 8; i < 19; i++){
      // Create new rows
      var newRow = $(`<div data-time=${i} class="row" id='${i}'>`); 
      
      
      // Create a time slot
      var timeSlot = $('<div id="time-slot" class="col-md-1 hour"></div>');
      
      
      // Create text area
      var textArea = $(`<textarea rows="4" id="text-entry${i}" value = ${i+1} class="col-md-10"></textarea>`);
      
     
      // Create save button
      var saveBtn = $(`<button id="save" class="col-md-1"><i class="far fa-save"></i></button>`);

      $(newRow).append(timeSlot);
      $(newRow).append(textArea);
      $(newRow).append(saveBtn);

      calender.append(newRow); 
      
      getLocalStorage(i);
    }
  };

  // Displaying hour in the time-slot window
    setHour();
    function setHour() {
        var hour = $(".hour");
        var hourArr = ["8AM","9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM","6PM","7PM"];
        for (var i = 0; i < hourArr.length; i++) {
            hour[i].textContent = hourArr[i];
        }
        console.log(hourArr[i]);
    };

  // Changing the color of each row depending on the current time
  getValue();
  function getValue() {
    var currentHour = moment().get('h');
    console.log("current hour: " + currentHour);

    for (var i = 0; i < 12; i++) {

      var task = $(".row")[i].children[1];
      console.log(task);
      var x = (task.getAttribute("value"));
      console.log(task.getAttribute("value"));
        if (x > currentHour) {
          $(task).addClass("future-hour");
        }else if (x < currentHour) {
          $(task).addClass("past-hour");
        }else {
          $(task).addClass("present-hour");
        }
      }

}

  // Local Storage
  var saveBtn = $('button');
    saveBtn.on('click', function(){
    let eventId = $(this).attr('id');
    let eventText = $(this).parent().siblings().children('.description').val();
    localStorage.setItem(eventId, eventText);
    });

  // Pull up local storage info onto text area
  function getLocalStorage(key) {
      let value = localStorage.getItem(key);
      if (value) {
          $(`#textArea${key}`).text(value);
      }
      }

    
});