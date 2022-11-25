function loadFromStorage(){
    chrome.storage.sync.get(['gains','intervals','costs'], populateFromStorage);

    function populateFromStorage(response){
        for(let i = 0; i<5;i++){
            document.querySelector(`body > table > tbody > tr:nth-child(${i+2}) > td:nth-child(1) > input[type=number]`).value=response.costs[i];
            document.querySelector(`body > table > tbody > tr:nth-child(${i+2}) > td:nth-child(2) > input[type=number]`).value=response.gains[i];
            document.querySelector(`body > table > tbody > tr:nth-child(${i+2}) > td:nth-child(3) > input[type=number]`).value=response.intervals[i];
        }
        populateNormaled();
    }
}

function calcNormaled(){
    let result =[];
    for(let i=0; i<5;i++){result.push(calcReduced(i))}
    let divider = Math.max(...result);
    return result.map(e=>e/divider*100);

    function calcReduced(row){
        let cost = document.querySelector(`body > table > tbody > tr:nth-child(${row+2}) > td:nth-child(1) > input[type=number]`).value;
        let gain = document.querySelector(`body > table > tbody > tr:nth-child(${row+2}) > td:nth-child(2) > input[type=number]`).value;
        let interval = document.querySelector(`body > table > tbody > tr:nth-child(${row+2}) > td:nth-child(3) > input[type=number]`).value;
        return gain/interval/cost
    }
}

function populateNormaled(){
    let normaled = calcNormaled();
    for(let i =0;i<5;i++){
        document.querySelector(`body > table > tbody > tr:nth-child(${i+2}) > td:nth-child(4)`).innerText = normaled[i];
    }
}

function updateStorage(){
    let costs = [];
    let gains =[];
    let intervals = [];


    for(let i = 0; i<5;i++){
        costs.push(document.querySelector(`body > table > tbody > tr:nth-child(${i+2}) > td:nth-child(1) > input[type=number]`).value);
        gains.push(document.querySelector(`body > table > tbody > tr:nth-child(${i+2}) > td:nth-child(2) > input[type=number]`).value);
        intervals.push(document.querySelector(`body > table > tbody > tr:nth-child(${i+2}) > td:nth-child(3) > input[type=number]`).value);
    }

    chrome.storage.sync.set({gains:gains,intervals:intervals,costs:costs});
}

function onKeyup(){
    populateNormaled();
    updateStorage();
}




loadFromStorage();
document.addEventListener("DOMContentLoaded", function() {
  //  document.getElementById("button1").addEventListener("click", onClick);
    document.getElementById("table1").addEventListener("keyup", onKeyup);
});