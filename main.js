// JavaScript for smooth interactions and functionality
document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const notification = document.getElementById('notification');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to save tasks to localStorage
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Function to show notification
    const showNotification = (message) => {
        notification.textContent = message;
        notification.style.opacity = 1;
        setTimeout(() => {
            notification.style.opacity = 0;
        }, 3000);
    };

    // Function to render tasks
    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <span class="task-text">${task.text}</span>
                <div class="task-actions">
                    <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            li.style.opacity = 0;
            taskList.appendChild(li);
            setTimeout(() => {
                li.style.opacity = 1;
            }, 10);

            // Event listeners for task actions
            const completeBtn = li.querySelector('.complete-btn');
            const editBtn = li.querySelector('.edit-btn');
            const deleteBtn = li.querySelector('.delete-btn');

            completeBtn.addEventListener('click', () => {
                tasks[index].completed = !tasks[index].completed;
                saveTasks();
                renderTasks();
                showNotification(`Task ${tasks[index].completed ? 'Done' : 'uncompleted'}`);
            });

            editBtn.addEventListener('click', async () => {
                const newText = prompt('Edit task:', task.text);
                if (newText !== null && newText.trim() !== '') {
                    tasks[index].text = newText.trim();
                    saveTasks();
                    renderTasks();
                    showNotification('Task edited successfully');
                }
            });

            deleteBtn.addEventListener('click', () => {

                const confirmDelete = confirm('Are you sure you want to delete this task?');
                if (!confirmDelete) {
                    alert('Action canceled');
                    return;
                }
                setTimeout(() => {
                    li.style.opacity = 0;
                    li.style.height = '0';
                    li.style.marginBottom = '0';
                    tasks.splice(index, 1);
                    saveTasks();
                    renderTasks();
                    showNotification('Task deleted successfully');
                }, 300);
            });
        });
    };

    // Event listener for adding new tasks
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = '';
            showNotification('Task added successfully');
        }
    });

    // Initial render
    renderTasks();
});