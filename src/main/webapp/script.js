function loadTasks() {
  fetch('/list-tasks').then(response => response.json()).then((tasks) => {
    const taskListElement = document.getElementById('task-list');
    tasks.forEach((task) => {
      taskListElement.appendChild(createTaskElement(task));
    })
  });
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