document.getElementById('nextToForm').addEventListener('click', function() {
  showFormPage();
});

document.getElementById('userForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const occupation = document.getElementById('occupation').value;
  
  // حفظ البيانات أو الانتقال إلى الصفحة التالية
  console.log(`Name: ${name}, Age: ${age}, Occupation: ${occupation}`);
  alert('User information saved!');
  showRoutinePage();
});

document.getElementById('routineForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const routineName = document.getElementById('routineName').value;
  const routineStart = document.getElementById('routineStart').value;
  const routineEnd = document.getElementById('routineEnd').value;
  
  // حفظ البيانات أو تنفيذ الإجراءات المطلوبة
  console.log(`Routine: ${routineName}, Start: ${routineStart}, End: ${routineEnd}`);
  alert('Routine saved!');
});

document.getElementById('addRoutine').addEventListener('click', function() {
  // إضافة الروتين
  const newRoutine = document.createElement('div');
  newRoutine.classList.add('routine-input');
  newRoutine.innerHTML = `
    <input type="text" placeholder="Routine name" required>
    <div class="time-inputs">
      <input type="time" placeholder="Routine start" required>
      <input type="time" placeholder="Routine end" required>
    </div>
  `;
  document.getElementById('routineInputs').appendChild(newRoutine);
});

document.getElementById('clearForm').addEventListener('click', function() {
  // مسح النموذج
  document.getElementById('routineForm').reset();
  document.getElementById('routineInputs').innerHTML = `
    <input type="text" id="routineName" name="routineName" placeholder="Routine name" required>
    <div class="time-inputs">
      <input type="time" id="routineStart" name="routineStart" placeholder="Routine start" required>
      <input type="time" id="routineEnd" name="routineEnd" placeholder="Routine end" required>
    </div>
  `;
});

document.getElementById('nextToTasks').addEventListener('click', function() {
  showTaskPage();
});

document.getElementById('taskForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const taskName = document.getElementById('taskName').value;
  const taskDeadlines = Array.from(document.querySelectorAll('.task-deadline')).map(input => input.value);
  const taskNumber = document.getElementById('taskNumber').value;
  const taskDuration = document.getElementById('taskDuration').value;

  // حفظ المهام في localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ name: taskName, deadlines: taskDeadlines, number: taskNumber, duration: taskDuration, progress: 0 });
  localStorage.setItem('tasks', JSON.stringify(tasks));

  alert('Task saved!');
});

document.getElementById('addTask').addEventListener('click', function() {
  // إضافة المهمة
  const newTask = document.createElement('div');
  newTask.classList.add('task-input');
  newTask.innerHTML = `
    <div class="time-inputs">
      <input type="text" placeholder="Task name" required>
    </div>
    <div class="time-inputs">
      <input type="number" placeholder="Number of tasks" required>
      <input type="text" placeholder="Task duration (minutes)" required>
    </div>
    <div class="date-container">
      <div class="date-input">
        <input type="date" class="task-deadline" placeholder="Task deadline (optional)">
        <button type="button" class="add-date">+</button>
      </div>
    </div>
    <div class="date-explanation">
      <small>(Optional) Choosing specific dates will avoid random task distribution.</small>
    </div>
  `;
  document.getElementById('taskInputs').appendChild(newTask);
  addDateButtonListeners();
});

function addDateButtonListeners() {
  document.querySelectorAll('.add-date').forEach(button => {
    button.addEventListener('click', function() {
      // إضافة تاريخ آخر
      const newDateInput = document.createElement('div');
      newDateInput.classList.add('date-input');
      newDateInput.innerHTML = `
        <input type="date" class="task-deadline" placeholder="Task deadline (optional)">
      `;
      this.parentElement.parentElement.appendChild(newDateInput);
    });
  });
}

document.getElementById('clearTaskForm').addEventListener('click', function() {
  // مسح النموذج
  document.getElementById('taskForm').reset();
  document.getElementById('taskInputs').innerHTML = `
    <div class="time-inputs">
      <input type="text" id="taskName" name="taskName" placeholder="Task name" required>
    </div>
    <div class="time-inputs">
      <input type="number" id="taskNumber" name="taskNumber" placeholder="Number of tasks" required>
      <input type="text" id="taskDuration" name="taskDuration" placeholder="Task duration (minutes)" required>
    </div>
    <div id="dateContainer" class="date-container">
      <div class="date-input">
        <input type="date" id="taskDeadline" name="taskDeadline" class="task-deadline" placeholder="Task deadline (optional)">
        <button type="button" class="add-date" id="addDate">+</button>
      </div>
      <div class="date-explanation">
        <small>(Optional) Choosing specific dates will avoid random task distribution.</small>
      </div>
    </div>
  `;
  // إعادة تعيين الحدث على الزر الجديد بعد إعادة تعيين النموذج
  addDateButtonListeners();
});

document.getElementById('nextToCalendar').addEventListener('click', function() {
  showCalendarPage();
});

document.getElementById('nextToDailySchedule').addEventListener('click', function() {
  showDailySchedulePage();
});

document.getElementById('nextToUserInterfaceFromDaily').addEventListener('click', function() {
  showUserInterfacePage();
});

const swiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  loop: false,
  allowTouchMove: false, // منع السحب
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

function showFormPage() {
  swiper.slideNext();
}

function showRoutinePage() {
  swiper.slideNext();
}

function showTaskPage() {
  swiper.slideNext();
}

function showCalendarPage() {
  swiper.slideNext();
  initializeCalendar();
}

function showDailySchedulePage() {
  swiper.slideNext();
}

function showUserInterfacePage() {
  swiper.slideNext();
  document.getElementById('sidebarButton').style.display = 'block'; // إظهار زر الشريط المخفي
}

// تفعيل أزرار إضافة التاريخ عند بدء الصفحة
addDateButtonListeners();

function initializeCalendar() {
  const calendarEl = document.getElementById('calendar');
  const picker = new Pikaday({
    field: calendarEl,
    bound: false,
    container: calendarEl,
    format: 'YYYY-MM-DD',
    onSelect: function(date) {
      console.log(date);
    }
  });

  const taskTableEl = document.getElementById('taskTable');
  let taskTable = '<table><tr>';
  for (let i = 1; i <= 30; i++) {
    taskTable += `<td class="day-cell" data-day="${i}">${i}</td>`;
    if (i % 7 === 0) {
      taskTable += '</tr><tr>';
    }
  }
  taskTable += '</tr></table>';
  taskTableEl.innerHTML = taskTable;

  document.querySelectorAll('.day-cell').forEach(cell => {
    cell.addEventListener('click', function() {
      const day = this.getAttribute('data-day');
      showTasksForDate(day);
    });
  });
}

function showTasksForDate(day) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const tasksForDate = tasks.filter(task => {
    const taskDays = task.deadlines.map(date => new Date(date).getDate());
    return taskDays.includes(parseInt(day)) || task.deadlines.length === 0;
  });

  let taskList = '';
  tasksForDate.forEach(task => {
    taskList += `<li>
      <span>${task.name}</span>
      <span>${task.duration} mins</span>
      <span>${task.progress}%</span>
      <input type="checkbox" ${task.progress === 100 ? 'checked' : ''} onclick="updateTaskProgress('${task.name}', this.checked)">
    </li>`;
  });

  document.getElementById('taskListModal').innerHTML = taskList;

  // عرض المودال
  const modal = document.getElementById('taskModal');
  const closeModal = document.getElementById('closeModal');
  modal.style.display = 'block';

  closeModal.onclick = function() {
    modal.style.display = 'none';
  };

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
}

function updateTaskProgress(taskName, completed) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const task = tasks.find(t => t.name === taskName);
  if (task) {
    task.progress = completed ? 100 : 0;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

// الوظائف الخاصة بلوحة المستخدم
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar.style.right === '0px') {
    sidebar.style.right = '-250px';
  } else {
    sidebar.style.right = '0px';
  }
}

function displayCurrentDateTime() {
  const now = new Date();
  const day = now.toLocaleDateString('en-US', { weekday: 'long' });
  const date = now.toLocaleDateString('en-US');
  const year = now.getFullYear();
  const time = now.toLocaleTimeString('en-US');
  const dateTimeString = `${day}, ${date}, ${year}, ${time}`;

  document.getElementById('current-date-time').innerText = dateTimeString;
  setTimeout(displayCurrentDateTime, 1000); // Update every second
}