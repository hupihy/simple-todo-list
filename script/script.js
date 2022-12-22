const textNewTask = document.getElementById('new-task-input');
const listTask = document.getElementById('todo-list');

let activeTask = [];
const finishedTasks = [];



if (localStorage.getItem('allTasks')){
    activeTask = JSON.parse(localStorage.getItem('allTasks'))

}


textNewTask.addEventListener('keyup', event => {
    if( event.code === 'Enter'){
        if (textNewTask.value.trim() === '') {
            textNewTask.setAttribute('placeholder', 'nothing has been done')
            textNewTask.value = ''
            return
        }
        for (let i = 0; i < activeTask.length; i++) {
            if (activeTask[i] === textNewTask.value) {
                textNewTask.setAttribute('placeholder', 'there is already such a todo')
                textNewTask.value = ''
                return;
            }

        }
        activeTask.push(textNewTask.value)
        textNewTask.setAttribute('placeholder', 'what todo')
        let indexTask = activeTask.findIndex(item =>{
            if (item === textNewTask.value) {
                return true;
            }

        })

        renderActiveTasks(indexTask)
        textNewTask .value = '';
        localStorage.setItem('allTasks', JSON.stringify(activeTask))

    }

})
const renderActiveTasks = (indexTask) =>{
    const taskContainer = document.createElement('div');
    const task = document.createElement('span');
    const editTaskButton = document.createElement('button');
    const finishTaskButton = document.createElement('button');

    taskContainer.id = 'active-task-container';

    task.id = 'active-task';
    task.textContent =activeTask[indexTask];

    editTaskButton.id = 'edit-active-task-button';
    editTaskButton.textContent ='edit';

    finishTaskButton.id = 'finish-task-button';
    finishTaskButton.textContent = 'finish';

    taskContainer.appendChild(task);
    taskContainer.appendChild(editTaskButton);
    taskContainer.appendChild(finishTaskButton);

    listTask.appendChild(taskContainer);

    editTaskButton.addEventListener('click', ()=>{
        let indexTask = activeTask.findIndex(item =>{
            if (item === task.textContent) {
                return true;
            }

        })
        taskContainer.removeChild(editTaskButton);
        taskContainer.removeChild(finishTaskButton);
        renderEditTask(task,taskContainer,finishTaskButton,editTaskButton,indexTask);
        taskContainer.removeChild(task);
    })

    finishTaskButton.addEventListener('click',()=>{
        let indexTask = activeTask.findIndex(item =>{
            if (item === task.textContent) {
                return true;
            }

        })
        

        renderFinishedTask(task)
        listTask.removeChild(taskContainer)
        finishedTasks.push(activeTask[indexTask])
        activeTask.splice(indexTask,1)


    })
}
const renderEditTask = (task,taskContainer,finishTaskButton,editTaskButton,indexTask) =>{

    const newTaskInput = document.createElement('input');
    const saveNewTask = document.createElement('button');

    newTaskInput.id = 'edit-new-task-input'
    newTaskInput.setAttribute('placeholder', task.textContent);
    newTaskInput.setAttribute('maxlength',17)

    saveNewTask.id = 'save-new-task';
    saveNewTask.textContent ='save';

    taskContainer.appendChild(newTaskInput);
    taskContainer.appendChild(saveNewTask);

    saveNewTask.addEventListener('click',()=>{
       if (newTaskInput.value.trim() ===''){
           listTask.removeChild(taskContainer);
       }
       for(let index=0; index<activeTask.length;index++){
           if (activeTask[index]===newTaskInput.value){
               newTaskInput.setAttribute('placeholder','there is already such a todo');
               newTaskInput.value = '';
               return;
           }
       }
       task.textContent =newTaskInput.value;
        activeTask[indexTask] =task.textContent;
        taskContainer.appendChild(task);
        taskContainer.appendChild(finishTaskButton);
        taskContainer.appendChild(editTaskButton);
        taskContainer.removeChild(newTaskInput);
        taskContainer.removeChild(saveNewTask);

    })
}

const renderFinishedTask = (task)=>{

    const finishedTaskContainer = document.createElement('div')
    const finishedTask = document.createElement('span');
    const deleteTaskButton  =document.createElement('button')

    finishedTaskContainer.id ='finished-task-container'

    finishedTask.id ='finished-task'
    finishedTask.textContent  = task.textContent

    deleteTaskButton.id ='delete-task-button'
    deleteTaskButton.textContent ='delete'

    finishedTaskContainer.appendChild(deleteTaskButton)
    finishedTaskContainer.appendChild(finishedTask)
    listTask.appendChild(finishedTaskContainer)

    deleteTaskButton.addEventListener('click',()=>{
        let indexTask = finishedTasks.findIndex(item =>{
            if (item === finishedTask.textContent) {
                return true;
            }

        })
        finishedTasks.splice(indexTask,1)
        listTask.removeChild(finishedTaskContainer)



    })

}

for( let i =0; i<activeTask.length;i++){
    textNewTask.value = activeTask[i]
    renderActiveTasks(i)
    textNewTask.value = ''
}

