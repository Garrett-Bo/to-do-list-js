
let data = getData();
data.map( item => createItem(item.text, item.done));
updateCount();

function getData() {
    return JSON.parse(localStorage.getItem("data")) || [];
}

function saveData(text) {
    let data = getData();
    data.push({ text, done:false });
    localStorage.setItem("data" , JSON.stringify(data));
}

function deleteData(text) {
    let data = getData();
    let result = data.filter(item => item.text != text);
    localStorage.setItem("data" ,JSON.stringify(result));
}

function checkData(text) {
    let data = getData();
    let result = data.map(item => {
        if(item.text == text) item.done = true;
        return item;
    });

    localStorage.setItem("data", JSON.stringify(result));
}

function clearData() {
    let data = getData();
    let result = data.filter(item => !item.done);
    localStorage.setItem("data", JSON.stringify(result));
}

document.querySelector("#clear").onclick = function() {
    document.querySelector("#done").textContent = "";
    clearData();
}

function updateCount() {
    document.querySelector(".badge").textContent = 
        document.querySelectorAll("#todo li").length;
}
document.querySelector("button").onclick = function() {
    let select_input = document.querySelector("input");
    let text = select_input.value;

    if(text == "") return false;

    createItem(text);
    updateCount();
    saveData(text);

    select_input.value = "";
    select_input.focus();
}

document.querySelector("input").onkeydown = function(e) {
    if(e.key == "Enter") {
        document.querySelector("button").onclick();
    }
}

function createItem(text, done = false) {
    let li = document.createElement("li");
    li.classList.add("list-group-item");

    li.textContent = text;

    let del = document.createElement("a");
    del.setAttribute("href", "#");
    del.classList.add("fa-solid", "fa-trash", "text-danger", "float-end");
    del.onclick = function() {
        li.remove();
        updateCount();
        deleteData(text);
    }

    li.appendChild(del);
    
    let check = document.createElement("a");
    check.setAttribute("href", "#");
    check.classList.add("fa-solid", "fa-check", "float-start", "me-3");
    check.onclick = function() {
        document.querySelector("#done").appendChild(li);
        check.remove();
        updateCount();
        checkData(text);
    }
    if(!done) li.appendChild(check);

    // document.querySelector("#todo").appendChild(li);
    if(done) {
        document.querySelector("#done").appendChild(li);
    } else {
        document.querySelector("#todo").appendChild(li);
    }
}