import { FlowTimer } from "/src/js/components/FlowTimer.js";
import { Page } from "/src/js/components/Page.js";

const timer = new FlowTimer({
    output: document.getElementById('timer'),
    startButton: document.getElementById('b1'),
    interruptButton: document.getElementById('b2'),
    continueButton: document.getElementById('b3'),
    stopButton: document.getElementById('b4'),
    defaultButtonDisplay: 'inline-block',
});

const homePage = new Page({name: "home", iconFileName: "icon-home.png"});
const flowPage = new Page({name: "flow", iconFileName: "icon-flow.png"});