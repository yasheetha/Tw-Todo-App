import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const LISTVALUES= [
{ id: "todo-0", name:"Eat", checked:true},
{ id:"todo-1", name:"Sleep", checked:false},
{ id:"todo-2", name:"Repeat", checked:false}
]

const BUTTONNAMES=[
{name:"All", aria_pressed:true},
{name:"Active", aria_pressed:false},
{name:"Completed", aria_pressed:false}
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App listOfTasks={LISTVALUES} buttonNames={BUTTONNAMES} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
