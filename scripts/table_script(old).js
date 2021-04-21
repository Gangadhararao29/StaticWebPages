
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    // rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

var defLen; //used in save_table function, in add_row function, 

function add_row() {
    var new_userID = document.getElementById("new_userID").value;
    var new_jobTitle = document.getElementById("new_jobTitle").value;
    var new_fullName = document.getElementById("new_fullName").value;


    var table = document.getElementById("data_table");
    var table_len = (table.rows.length) - 1;

    var row = table.insertRow(table_len).outerHTML = `<tr id='row${defLen}'>
    <td id='userID_row${defLen}'>${new_userID}</td>
    <td id='fullName_row${defLen}'>${new_fullName}</td>
    <td id='jobTitle_row${defLen}'>${new_jobTitle}</td>
  
    <td>
    <button id="edit_button${defLen}" class="edit btnEdit" onclick="edit_row('${defLen}')"><span class="material-icons">create</span></button>
    <button id="save_button${defLen}" style="display:none;" class="save, btnSave" onclick="save_row('${defLen}')"><span class="material-icons">save</span></button>
    <button class="delete btnDelete" onclick="delete_row('${defLen}')"><span class="material-icons">delete</span></button>
    </td>
    </tr>`;

    defLen++;

    document.getElementById("new_userID").value = "";
    document.getElementById("new_jobTitle").value = "";
    document.getElementById("new_fullName").value = "";

}

function edit_row(no) {
    document.getElementById("edit_button" + no).style.display = "none";
    document.getElementById("save_button" + no).style.display = "inline-block";

    var userID = document.getElementById("userID_row" + no);
    var jobTitle = document.getElementById("jobTitle_row" + no);
    var fullName = document.getElementById("fullName_row" + no);


    //for testing
    console.log(document.getElementById("jobTitle_row" + no));

    var userID_data = userID.innerHTML;
    var jobTitle_data = jobTitle.innerHTML;
    var fullName_data = fullName.innerHTML;


    jobTitle.innerHTML = "<input type='text' id='jobTitle_text" + no + "' value='" + jobTitle_data + "'>";
    fullName.innerHTML = "<input type='text' id='fullName_text" + no + "' value='" + fullName_data + "'>";
    userID.innerHTML = "<input type='text' id='userID_text" + no + "' value='" + userID_data + "'>";
}

function save_row(no) {
    document.getElementById("edit_button" + no).style.display = "inline-block";
    document.getElementById("save_button" + no).style.display = "none";

    //testing
    console.log(document.getElementById(`jobTitle_text${no}`));

    var userID_val = document.getElementById("userID_text" + no).value;
    var jobTitle_val = document.getElementById("jobTitle_text" + no).value;
    var fullName_val = document.getElementById("fullName_text" + no).value;

    document.getElementById("userID_row" + no).innerHTML = userID_val;
    document.getElementById("jobTitle_row" + no).innerHTML = jobTitle_val;
    document.getElementById("fullName_row" + no).innerHTML = fullName_val;

    document.getElementById("edit_button" + no).style.display = "inline-block";
    document.getElementById("save_button" + no).style.display = "none";
}

// main table //
readTextFile("empdata.txt", function (text) {
    var data = JSON.parse(text);
    localStorage.setItem("cast", text);
    console.log(data);
    var i = 0, txt;
    txt = `<table align='center' cellspacing=10 cellpadding=12 id="data_table" border=1 style="border-collapse:collapse">
    <tr>
    <th>User Id</th>
    <th>Full Name</th>
    <th>Job Title</th>
    <th></th>
    </tr>`;

    defLen = data.length;

    for (i = 0; i < (data.length); i++) {
        txt += `<tr id="row${i}">
        <td id="userID_row${i}"> ${data[i].userId} </td>
        <td id="fullName_row${i}"> ${data[i].preferredFullName}</td>
        <td id="jobTitle_row${i}"> ${data[i].jobTitleName}</td>
        <td>
        <button id="edit_button${i}" class="edit btnEdit" onclick="edit_row('${i}')"><span class="material-icons">create</span></button>
        <button id="save_button${i}" style="display:none;" class="save btnSave" onclick="save_row('${i}')"><span class="material-icons">save</span></button>
        <button class="delete btnDelete" onclick="delete_row('${i}')"><span class="material-icons">delete</span></button>
        </td>
        </tr>`;
    }
    txt += `<tr>
    <td><input type="text" id="new_userID"></td>
    <td><input type="text" id="new_fullName"></td>
    <td><input type="text" id="new_jobTitle"></td>
    <td><button class="add btnAdd" onclick="add_row();" value="Add_Row"> <span class="material-icons">add_box</span></button></td>
    </tr>
    </table>
    `;
    document.getElementById("table").innerHTML = txt;


    // userID_row     fullName_row     jobTitle_row 
    for(i=0,txt2='';i<(data.length);i++){
        txt2 +=`<div class="card" style="display:inline-block">`;
            if(data[i].gender== 'male'){
                txt2 += '<img src="./images/men-placeholder.png" alt="Avatar">'
                }
                else{
                txt2 += '<img src="./images/women-placeholder.png" alt="Avatar">'
                }

                txt2 += `<div class="container">
                     <p>Id: ${data[i].userId} </p>
                     <p> ID :${document.getElementById("userID_row" + i).innerHTML}</p>
                     <p>Name: ${data[i].preferredFullName}</p>
                     <p>Job Title: ${data[i].jobTitleName}</p>
                </div>
        </div>`
    }
    //console.log(txt2);
    document.getElementById("cardmain").innerHTML = txt2;
    


});

var saveData = [];

function saveTable() {
    //Updating the table into JSON file
    let j = 0, k = 0;
    console.log("defLen:", defLen);

    for (j = 0, k = 0; j < defLen; j++) {
        a = document.getElementById(`userID_row${j}`)
        b = document.getElementById(`fullName_row${j}`);
        c = document.getElementById(`jobTitle_row${j}`);

        if (a != undefined && b != undefined && c != undefined) {
            A = a.innerHTML;
            B = b.innerHTML;
            C = c.innerHTML;
            saveData[k] = { A, B, C };
            k++;
        }
    }
    console.log(saveData);
}
