import { FlowTimer } from "/src/js/components/FlowTimer.js";
import { Page } from "/src/js/components/Page.js";
import { AppData } from "/src/js/components/AppData.js";
import { Nav } from "/src/js/components/Nav.js";
import { ToDoList } from "/src/js/components/ToDoList.js";
import { ToDoTask } from "/src/js/components/ToDoTask.js";
import { LifeCalendar } from "/src/js/components/LifeCalendar.js";

AppData.loadData();

const timer = new FlowTimer({
    output: document.getElementById('timer'),
    startButton: document.getElementById('b1'),
    interruptButton: document.getElementById('b2'),
    continueButton: document.getElementById('b3'),
    stopButton: document.getElementById('b4'),
    defaultButtonDisplay: 'inline-block',
});

const nav = new Nav();

const homePage = new Page({name: "home", iconFileName: "icon-home.png"});
const flowPage = new Page({name: "flow", iconFileName: "icon-flow.png"});
const listPage = new Page({name: "list", iconFileName: "icon-list.png"});
const lifePage = new Page({name: "life", iconFileName: "icon-life.png"});

const toDoList = new ToDoList("default")
const lifeCalendar = new LifeCalendar();

document.getElementById('l1').addEventListener('click', () => {
    toDoList.addTask(new ToDoTask(prompt("Task name"), toDoList))
})