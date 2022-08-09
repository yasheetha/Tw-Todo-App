import React, {useEffect, useRef,  useState } from "react";
import { nanoid } from "nanoid";
import Todo, {usePrevious} from "./components/Todo";
import Buttons from './components/AllActiveCompleteButtons.js'
import Form from './components/InputForm.js';


const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.checked,
  Completed: (task) => task.checked
};

const FILTER_NAMES = Object.keys(FILTER_MAP);


export default function App(props) {

const [tasks, setTasks] = useState(props.listOfTasks);

const [filter, setFilter] = useState('All');

function addTask(name) {
  const newTask = { id: "todo-"+nanoid(), name: name, checked: false };
  const newTasks=[...tasks, newTask];
  setTasks(newTasks);
}


const allTasks=tasks.filter(FILTER_MAP[filter]).map((task)=><Todo name={task.name} checked={task.checked} id={task.id} key={task.id} toggleTaskCompleted={toggleTaskCompleted} removeTask={removeTask} editTask={editTask} />);

const buttons=props.buttonNames.map((name)=> <Buttons key={name.name} name={name.name} aria_pressed={name.name===filter} setFilter={setFilter} />);

const tasksNoun = allTasks.length!==1 ? "tasks" : "task";
const headingText = `${allTasks.length} ${tasksNoun}  remaining`;

function toggleTaskCompleted(id){
const updatedTasks=tasks.map((task)=>{
if(task.id===id){
return {...task, checked: !task.checked}
}
return task;
});
setTasks(updatedTasks);
}

function removeTask(id){
const updatedTasks=tasks.filter((task)=>task.id!==id);
setTasks(updatedTasks);
}

function editTask(id,newName){
const updatedTasks=tasks.map((task)=>{
if(task.id===id){
return {...task, name:newName}
}
return task;
});
setTasks(updatedTasks);
}

const prevTaskLength = usePrevious(tasks.length);

const listHeadingRef = useRef(null);

useEffect(() => {
  if (tasks.length - prevTaskLength === -1) {
    listHeadingRef.current.focus();
  }
}, [tasks.length, prevTaskLength]);

return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {buttons}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef} >
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
      {allTasks}
	</ul>
    </div>
  );
}

