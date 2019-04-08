function fetchingData(link) {
	fetch(link).then((response) => {
		response.json().then((data) =>{
			list = data;
			buildTable(list,'my_data');
			});
	}
	).catch((err) => {
		console.log('Fetch Error :-S', err);
		});
}

function buildTable(list,table) {
	// number of rows
	counter(list.length);
	// adding the columns that we need 
	el3 = document.getElementById('column');
	if(list[0]){
		var myObject = list[0];
		var keyNames = Object.keys(myObject);
		var data3 = '';
		data3 += '<th scope="col">#</th>';
		for (let i = 0; i < keyNames.length; i++) {
			data3 += '<th scope="col">' + keyNames[i] + '</th>';
		}
		data3 += '<th scope="col"></th>';
		data3 += '<th scope="col"></th>';
		el3.innerHTML = data3;
		// adding the data to the table
		el = document.getElementById(table);
		var data2 = '';
			for (i = 0; i < list.length; i++) {
				data2 += '<tr>';
				data2 += '<th scope="row">' + (i+1) + '</th>';
				data2 += '<td>' + list[i].userId + '</td>';
				data2 += '<td>' + list[i].id + '</td>';
				data2 += '<td>' + list[i].title + '</td>';
				data2 += '<td>' + list[i].completed + '</td>';
				data2 += '<td><button class="buttons" onclick="Edit(' + i + ')">Edit</button></td>';
				data2 += '<td><button class="buttons" onclick="Delete(' + i + ')">&#10060;</button></td>';
				data2 += '</tr>';
			}
		el.innerHTML = data2;
	}
	else{
		el.innerHTML = '';
		el3.innerHTML = '';
	}
}

function counter(data){
	var el = document.getElementById('counter');
	var name = 'data';
	if (data) {
		if (data > 1) {
			name = 'rows';
		}
		el.innerHTML = data + ' ' + name ;
	} else {
		el.innerHTML = 'No ' + name;
	}
}

function getBoolean(value){
	switch(value){
	    case true:
	    case "true":
	    case 1:
	    case "1":
	    case "on":
	    case "yes":
	        return true;
	    default: 
	        return false;
	}
}

function addData() {
	// Get the elements
	el1 = document.getElementById('add-user-Id');
	el2 = document.getElementById('add-ID');
	el3 = document.getElementById('add-Title');
	el4 = document.getElementById('add-Completed');
	// Get the values
	var userID = parseInt(el1.value);
	var ID = parseInt(el2.value);
	var TITLE = el3.value;
	var COMPLETED = getBoolean(el4.value);
	if(userID){
		var data = {userId:userID, id:ID, title:TITLE, completed:COMPLETED};
		console.log(data)
		list.push(data);

		el1.value = '';
		el2.value = '';
		el3.value = '';
		el4.value = '';

		buildTable(list,'my_data');
	}
}

function Delete(item) {
	list.splice(item, 1);
	buildTable(list,'my_data');
}

function Edit(item) {
	var el1 = document.getElementById('edit-user-Id');
	var el2 = document.getElementById('edit-ID');
	var el3 = document.getElementById('edit-Title');
	var el4 = document.getElementById('edit-Completed');
	// Display value in the field
	el1.value = list[item].userId;
	el2.value = list[item].id;
	el3.value = list[item].title;
	el4.value = list[item].completed;
	// Display fields
	document.getElementById('spoiler').style.display = 'block';
	document.getElementById('saveEdit').onsubmit = function(){
		// Get value
		var userID = parseInt(el1.value);
		var ID = parseInt(el2.value);
		var TITLE = el3.value;
		var COMPLETED = getBoolean(el4.value);
		if (userID){
			var data = {userId:userID, id:ID, title:TITLE, completed:COMPLETED};
			list.splice(item, 1, data);
			buildTable(list,'my_data');
		}
	}
}
		
function openForm() {
	document.getElementById("myForm").style.display = "block";
}

function closeForm() {
	document.getElementById('myForm').style.display = "none";
}

function closeInput() {
	document.getElementById('spoiler').style.display = "none";
}

fetchingData('https://jsonplaceholder.typicode.com/todos');

window.onload = function() {
	var addDataButton = document.getElementById("addDataButton");

	var submitDataForm = document.getElementById("submitDataForm");
	var closeDataForm = document.getElementById("closeDataForm");

	var submitDateEdit = document.getElementById('saveEdit');
	var closeDataEdit = document.getElementById('closeDataEdit');

	if(addDataButton){
		addDataButton.addEventListener('click', openForm);
	}
	if(submitDataForm){
		submitDataForm.addEventListener('submit', addData);
		submitDataForm.addEventListener('submit', closeForm);
	}
	if(closeDataForm){
		closeDataForm.addEventListener('click', closeForm);
	}
	if(submitDateEdit){
		submitDateEdit.addEventListener('submit',closeInput);
	}
	if(closeDataEdit){
		closeDataEdit.addEventListener('click',closeInput);
	}
}