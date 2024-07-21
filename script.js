document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // Load tasks without saving again
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        if (!taskText) {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create the remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');
        removeButton.onclick = function() {
            taskList.removeChild(listItem); // Remove the list item from the DOM
            removeTask(taskText); // Remove the task from Local Storage
        };

        // Append the remove button to the list item
        listItem.appendChild(removeButton);
        // Append the list item to the task list
        taskList.appendChild(listItem);

        // Clear the input field
        taskInput.value = '';

        if (save) {
            saveTask(taskText); // Save task to Local Storage
        }
    }

    // Function to save a task to Local Storage
    function saveTask(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove a task from Local Storage
    function removeTask(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Add event listeners
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim(); // Get and trim the task input value
        addTask(taskText);
    });

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim(); // Get and trim the task input value
            addTask(taskText);
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});
