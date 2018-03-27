

let contactArray = [];

const init = () => {
	document.getElementById('tableBody').innerHTML = "";
	if (localStorage.contactsRecord) {
		contactArray = JSON.parse(localStorage.contactsRecord);

		for (let i = 0; i < contactArray.length; i++) {
			displayContacts(i, contactArray[i].cname, contactArray[i].cphone, contactArray[i].cemail, contactArray[i].caddress, contactArray[i].cstatus);
		}
	}
}

const onSubmit = () => {

	let name = document.getElementById('name').value;
	let phone = document.getElementById('phone').value;
	let email = document.getElementById('email').value;
	let address = document.getElementById('contactAddress').value;
	let status = document.getElementById('contactStatus').value;

	let contactObj = {
		cname: name,
		cphone: phone,
		cemail: email,
		caddress: address,
		cstatus: status
	};

	contactArray.push(contactObj);
	localStorage.contactsRecord = JSON.stringify(contactArray);

	init();


	document.getElementById('name').value = "";
	document.getElementById('phone').value = "";
	document.getElementById('email').value = "";
	document.getElementById('contactAddress').value = "";

}


const displayContacts = (index, name, phone, email, address, status) => {
	let tableBody = document.getElementById('tableBody');
	let row = tableBody.insertRow();

	let nameCell = row.insertCell(0);
	let phoneCell = row.insertCell(1);
	let emailCell = row.insertCell(2);
	let addressCell = row.insertCell(3);
	let statusCell = row.insertCell(4);
	let editCell = row.insertCell(5);
	let deleteCell = row.insertCell(6);

	nameCell.innerHTML = name;
	phoneCell.innerHTML = phone;
	emailCell.innerHTML = email;
	addressCell.innerHTML = address;
	statusCell.innerHTML = status;
	editCell.innerHTML = `<button class="btn btn-primary"> Edit </buutton>`;
	deleteCell.innerHTML = `<button class="btn btn-danger" onclick="removeRow(${index})"> Delete </buutton>`;
}


const removeRow = (index) => {
	contactArray.splice(index, 1);
	localStorage.contactsRecord = JSON.stringify(contactArray);
	init();

}
