var empDetails = localStorage.getItem("empDetails");
//Reading text file and Saving it to local storage for first time and preserve editted data
readTextFile("empdata.txt", function (text) {
    if (empDetails == null || undefined) {
        localStorage.setItem("empDetails", text);
    }
    //console.log("Local Storage File:",text);
});

// function for above statements
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    // rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    };
    rawFile.send(null);
}

setTimeout(() => {
    fillData();
    document.getElementById('preinfo').display='none';
}, 1500);


// Table element creation
function fillData() {
    var i = 0, tableElem, cardElem;

    tableElem = `<table align='center' cellspacing=10 cellpadding=12 id="data_table" border=1 style="border-collapse:collapse">
    <tr>
    <th>User Id</th>
    <th>Full Name</th>
    <th>Job Title</th>
    <th></th>
    </tr>`;

    var data = JSON.parse(localStorage.getItem("empDetails"));
    defLen = data.length;

    for (i = 0; i < data.length; i++) {
        tableElem += `<tr id="row${i}">
        <td id="userID_row${i}">${data[i].userId}</td>
        <td id="fullName_row${i}">${data[i].preferredFullName}</td>
        <td id="jobTitle_row${i}">${data[i].jobTitleName}</td>
        <span style="display:none" id="gender_row${i}">${data[i].gender}</span>
        <td>
        <button id="edit_button${i}" class="edit btnEdit" onclick="edit_row('${i}')"><span class="material-icons">create</span></button>
        <button id="save_button${i}" style="display:none;" class="save btnSave" onclick="save_row('${i}')"><span class="material-icons">save</span></button>
        <button class="delete btnDelete" onclick="delete_row('${i}')"><span class="material-icons">delete</span></button>
        </td>
        </tr>`;
    }

    tableElem += `<tr>
    <td><input type="text" id="new_userID"></td>
    <td><input type="text" id="new_fullName"></td>
    <td><input type="text" id="new_jobTitle"></td>
    <td><button class="add btnAdd" onclick="add_row();" value="Add_Row"> <span class="material-icons">add_box</span></button></td>
    </tr>
    </table>
    `;

    document.getElementById("table").innerHTML = tableElem;

    // card Image according to gender
    for (i = 0, cardElem = ""; i < data.length; i++) {
        cardElem += `<div class="card" id="card${i}" style="display:inline-block">`;
        if (data[i].gender == "male") {
            cardElem += '<img src="./images/men-placeholder.png" alt="Avatar">';
        } else {
            cardElem += '<img src="./images/women-placeholder.png" alt="Avatar">';
        }

        cardElem += `<div class="container">
                    Id:<span id="userID2_row${i}">${data[i].userId} </span><br>
                    Name:<span id="fullName2_row${i}">${data[i].preferredFullName}</span><br>
                    Job Title:<span id="jobTitle2_row${i}">${data[i].jobTitleName}</span><br>
                    <span style="display:none" id="gender2_row${i}">${data[i].gender}</span>
                        <button id="edit2_button${i}" class="edit btnEdit" onclick="edit2_row('${i}')"><span class="material-icons">create</span></button>
                        <button id="save2_button${i}" style="display:none;" class="save btnSave" onclick="save2_row('${i}')"><span class="material-icons">save</span></button>
                        <button class="delete btnDelete" onclick="delete2_row('${i}')"><span class="material-icons">delete</span></button>
                </div>
        </div>`;
    }
    //console.log(cardElem);
    document.getElementById("cardmain").innerHTML = cardElem;
}

//-----------------------------------------------------------------------------------
// ADD, EDIT , DELETE OPERATIONS --START
//-----------------------------------------------------------------------------------

//used in save_table function, in add_row function,
var defLen;

function add_row() {
    var new_userID = document.getElementById("new_userID").value;
    var new_fullName = document.getElementById("new_fullName").value;
    var new_jobTitle = document.getElementById("new_jobTitle").value;

    var table = document.getElementById("data_table");
    var table_len = table.rows.length - 1;

    var row = (table.insertRow(table_len).outerHTML = `<tr id='row${defLen}'>
    <td id='userID_row${defLen}'>${new_userID}</td>
    <td id='fullName_row${defLen}'>${new_fullName}</td>
    <td id='jobTitle_row${defLen}'>${new_jobTitle}</td>
  
    <td>
    <button id="edit_button${defLen}" class="edit btnEdit" onclick="edit_row('${defLen}')"><span class="material-icons">create</span></button>
    <button id="save_button${defLen}" style="display:none;" class="save, btnSave" onclick="save_row('${defLen}')"><span class="material-icons">save</span></button>
    <button class="delete btnDelete" onclick="delete_row('${defLen}')"><span class="material-icons">delete</span></button>
    </td>
    </tr>`);

    defLen++;

    document.getElementById("new_userID").value = "";
    document.getElementById("new_fullName").value = "";
    document.getElementById("new_jobTitle").value = "";
}

function edit_row(no) {
    document.getElementById("edit_button" + no).style.display = "none";
    document.getElementById("save_button" + no).style.display = "inline-block";

    var userID = document.getElementById("userID_row" + no);
    var fullName = document.getElementById("fullName_row" + no);
    var jobTitle = document.getElementById("jobTitle_row" + no);

    //for testing console.log(document.getElementById("jobTitle_row" + no));

    var userID_data = userID.innerHTML;
    var jobTitle_data = jobTitle.innerHTML;
    var fullName_data = fullName.innerHTML;

    userID.innerHTML =
        "<input type='text' id='userID_text" +
        no +
        "' value='" +
        userID_data +
        "'>";
    fullName.innerHTML =
        "<input type='text' id='fullName_text" +
        no +
        "' value='" +
        fullName_data +
        "'>";
    jobTitle.innerHTML =
        "<input type='text' id='jobTitle_text" +
        no +
        "' value='" +
        jobTitle_data +
        "'>";
}

function save_row(no) {
    document.getElementById("edit_button" + no).style.display = "inline-block";
    document.getElementById("save_button" + no).style.display = "none";

    //testing console.log(document.getElementById(`jobTitle_text${no}`));

    var userID_val = document.getElementById("userID_text" + no).value;
    var jobTitle_val = document.getElementById("jobTitle_text" + no).value;
    var fullName_val = document.getElementById("fullName_text" + no).value;

    document.getElementById("userID_row" + no).innerHTML = userID_val;
    document.getElementById("fullName_row" + no).innerHTML = fullName_val;
    document.getElementById("jobTitle_row" + no).innerHTML = jobTitle_val;

    document.getElementById("edit_button" + no).style.display = "inline-block";
    document.getElementById("save_button" + no).style.display = "none";

    saveTable();
}

function edit2_row(no) {
    document.getElementById(`edit2_button${no}`).style.display = "none";
    document.getElementById(`save2_button${no}`).style.display = "inline-block";

    var userID = document.getElementById(`userID2_row${no}`);
    var fullName = document.getElementById(`fullName2_row${no}`);
    var jobTitle = document.getElementById(`jobTitle2_row${no}`);

    var userID_data = userID.innerHTML;
    var fullName_data = fullName.innerHTML;
    var jobTitle_data = jobTitle.innerHTML;

    userID.innerHTML =
        "<input type='text' id='userID_text" +
        no +
        "' value='" +
        userID_data +
        "'>";
    fullName.innerHTML =
        "<input type='text' id='fullName_text" +
        no +
        "' value='" +
        fullName_data +
        "'>";
    jobTitle.innerHTML =
        "<input type='text' id='jobTitle_text" +
        no +
        "' value='" +
        jobTitle_data +
        "'>";
}

function save2_row(no) {
    document.getElementById(`edit2_button${no}`).style.display = "inline-block";
    document.getElementById(`save2_button${no}`).style.display = "none";

    var userID_val = document.getElementById("userID_text" + no).value;
    var fullName_val = document.getElementById("fullName_text" + no).value;
    var jobTitle_val = document.getElementById("jobTitle_text" + no).value;

    document.getElementById("userID2_row" + no).innerHTML = userID_val;
    document.getElementById("fullName2_row" + no).innerHTML = fullName_val;
    document.getElementById("jobTitle2_row" + no).innerHTML = jobTitle_val;

    document.getElementById("edit_button" + no).style.display = "inline-block";
    document.getElementById("save_button" + no).style.display = "none";

    saveCard();
}

function delete_row(no) {
    document.getElementById("row" + no + "").outerHTML = "";
    saveTable();
}

function delete2_row(no) {
    document.getElementById("card" + no + "").outerHTML = "";
    saveCard();
}

//-----------------------------------------------------------------------------------
// ADD, EDIT , DELETE OPERATIONS --END
//-----------------------------------------------------------------------------------

//Saving the data into the Local storage, needed for maintaining the indexes
var saveData = [];
function saveTable() {
    //Updating the table into JSON file
    let j = 0, k = 0;
    console.log("defLen:", defLen);

    for (j = 0, k = 0; j < defLen; j++) {
        a = document.getElementById(`userID_row${j}`);
        b = document.getElementById(`fullName_row${j}`);
        c = document.getElementById(`jobTitle_row${j}`);
        d = document.getElementById(`gender_row${j}`);

        console.log('test1', d)

        if (a != undefined && b != undefined && c != undefined) {
            A = a.innerHTML;
            B = b.innerHTML;
            C = c.innerHTML;
            D = d.innerHTML;
            saveData[k] = {
                userId: A,
                preferredFullName: B,
                jobTitleName: C,
                gender: D,
            };
            k++;
        }
    }
    localStorage.clear();
    localStorage.setItem("empDetails", JSON.stringify(saveData));
    //location.reload();
    fillData();
}

saveData = [];
function saveCard() {
    //Updating the table into JSON file
    let j = 0, k = 0;
    console.log("defLen:", defLen);

    for (j = 0, k = 0; j < defLen; j++) {
        a = document.getElementById(`userID2_row${j}`);
        b = document.getElementById(`fullName2_row${j}`);
        c = document.getElementById(`jobTitle2_row${j}`);
        d = document.getElementById(`gender2_row${j}`);

        if (a != undefined && b != undefined && c != undefined) {
            A = a.innerHTML;
            B = b.innerHTML;
            C = c.innerHTML;
            D = d.innerHTML;
            saveData[k] = {
                userId: A,
                preferredFullName: B,
                jobTitleName: C,
                gender: D,
            };
            k++;
        }
    }
    console.log(saveData);
    localStorage.clear();
    localStorage.setItem("empDetails", JSON.stringify(saveData));
    //location.reload();
    fillData();
}

// GRID AND LIST BUTTON
function gridview() {
    document.getElementById("cardmain").style.display = "block";
    document.getElementById("table").style.display = "none";
    document.getElementById("gridbtn").style.display = "none";
    document.getElementById("listbtn").style.display = "block";
}

function listview() {
    document.getElementById("cardmain").style.display = "none";
    document.getElementById("table").style.display = "block";
    document.getElementById("gridbtn").style.display = "block";
    document.getElementById("listbtn").style.display = "none";
}


