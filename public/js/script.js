function loadTasks() {
    fetch('/list-tasks').then(response => response.json()).then((tasks) => {
      const taskListElement = document.getElementById('task-list');
      tasks.forEach((task) => {
        taskListElement.appendChild(createTaskElement(task));
      })
    });
  }
  function createMap() {

    var locations = [
      ['San Francisco', 37.4221, -122.0841, 6],
      ['New York City', 40.7128, -74.0060, 5],
      ['Boston', 42.3601, -71.0589, 4],
      ['Houston', 29.7604, -95.3698, 3],
      ['Los Angeles', 34.0522, -118.2437, 2],
      ['Chicago', 41.8781, -87.6298, 1],
      ['Miami', 25.7617, -80.1918, 1],
      ['Dallas', 32.7767, -96.7970, 1],
      ['Denver', 39.7392, -104.9903, 1],
      ['Seattle', 47.6062, -122.3321, 1],
      ['Phoenix', 33.4484, -112.0740, 1],
      ['Philadelphia', 39.9526, -75.1652, 1],
      ['San Antonio', 29.4241, -98.4936, 1],
      ['Nashville', 36.1627, -86.7816, 1],
      ['New Orleans', 29.9511, -90.0715, 1],
      ['San Diego', 32.7157, -117.1611, 1],
      ['Columbus', 39.9612, -82.9988, 1],
      ['Charlotte', 35.2271, -80.8431, 1],
      ['Washington DC', 38.9072, -77.0369, 1],
      ['Detroid', 42.3314, -83.0458, 1],
      ['Portland', 45.5051, -122.6750, 1],
      ['Las Vegas', 36.1699, -115.1398, 1],
      ['Memphis', 35.1495, -90.0490, 1],
      ['Baltimore', 39.2904, -76.6122, 1],
      ['Alburquerque', 35.0844, -106.6504, 1],
      ['Kansas City', 39.0997, -94.5786, 1]
    ];

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: new google.maps.LatLng(38.8781, -93.6298),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(`<h2>${locations[i][0]}</h2> <br> <a href='/chatrooms.html'> <h3> Chat Rooms </h3></a>`);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }

  }

  
  
  /** Creates an element that represents a task, including its delete button. */
  function createTaskElement(task) {
    const taskElement = document.createElement('li');
    taskElement.className = 'task';
  
    const titleElement = document.createElement('span');
    titleElement.innerText = task.title;
  
    const deleteButtonElement = document.createElement('button');
    deleteButtonElement.innerText = 'Delete';
    deleteButtonElement.addEventListener('click', () => {
      deleteTask(task);
  
      // Remove the task from the DOM.
      taskElement.remove();
    });
  
    taskElement.appendChild(titleElement);
    taskElement.appendChild(deleteButtonElement);
    return taskElement;
  }
  
  /** Tells the server to delete the task. */
  function deleteTask(task) {
    const params = new URLSearchParams();
    params.append('id', task.id);
    fetch('/delete-task', {method: 'POST', body: params});
  }
  
  // (function() {
  //     var chatBox = document.querySelector('.chat-box');
  //     var inputBox = document.querySelector('.input-box');
  //     var chatForm = document.querySelector('.chat-form');
  
  //     function addMessage(text) {
  //         var newMessage = document.createElement('div');
  //         newMessage.textContent = text;
  //         chatBox.insertBefore(newMessage, chatBox.firstChild);
  //     }
  
  //     chatForm.addEventListener('submit', function(event) {
  //         if (inputBox.value.trim()) {
  //             addMessage(inputBox.value);     
  //             inputBox.value = '';            
  //         }
  //         event.preventDefault();
  //     });
  // })();
  
  