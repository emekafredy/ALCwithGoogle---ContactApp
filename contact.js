
let contactArray = [];
let selectedIndex = -1;


const init = () => {
	document.getElementById('tableBody').innerHTML = "";
	if (localStorage.contactsRecord) {
		contactArray = JSON.parse(localStorage.contactsRecord);

		for (let i = 0; i < contactArray.length; i++) {
			displayContactNames(i, contactArray[i].firstName);
		}
	}
};


const addContact = () => {
	let firstName = document.getElementById('firstName').value;
	let lastName = document.getElementById('lastName').value;
	let phone = document.getElementById('phone').value;
	let email = document.getElementById('email').value;
	let address = document.getElementById('contactAddress').value;
	

	let contactObj = {
		firstName: firstName,
		lastName: lastName,
		phone: phone,
		email: email,
		address: address,
	};

	if(firstName === '' || lastName === '' || phone === '' || email === '' || address === '') {
		alert('Please Fill out every field');
		return false;
	};



	if (selectedIndex === -1) {
		contactArray.push(contactObj);
	} else {
		contactArray.splice(selectedIndex, 1, contactObj);
	}
	
	localStorage.contactsRecord = JSON.stringify(contactArray);

	init();
	


	document.getElementById('firstName').value = "";
	document.getElementById('lastName').value = "";
	document.getElementById('phone').value = "";
	document.getElementById('email').value = "";
	document.getElementById('contactAddress').value = "";
	document.getElementById('saveBtn').innerHTML = "Add Contact";

};

const displayContactNames = (index, firstName) => {
	let tableBody = document.getElementById('tableBody');
	let row = tableBody.insertRow();

	let nameCell = row.insertCell(0);
	let editCell = row.insertCell(1);
	let deleteCell = row.insertCell(2);

	nameCell.innerHTML = `<a title="View Details" onclick='displayContactDetails(${index});'> ${firstName}</a>`;
	editCell.innerHTML = `<button  class="btn" onclick="editRow(${index})"> Edit </button>`;
	deleteCell.innerHTML = `<button class="delete-btn btn" onclick="removeRow(${index})"> Delete </button>`;
};


const editRow = (index) => {

	selectedIndex = index;

	let contactObj = contactArray[index];

	document.getElementById('firstName').value = contactObj.firstName;
	document.getElementById('lastName').value = contactObj.lastName;
	document.getElementById('phone').value = contactObj.phone;
	document.getElementById('email').value = contactObj.email;
	document.getElementById('contactAddress').value = contactObj.address;
	document.getElementById('saveBtn').innerHTML = "Update Info";
};


const removeRow = (index) => {
	contactArray.splice(index, 1);
	localStorage.contactsRecord = JSON.stringify(contactArray);
	init();

};



const displayContactDetails = (index) => {	

	let modal = document.getElementById('modalDiv'); 
	modal.innerHTML =`<div class="card">
	               <div class="card-title">
	                 <h4 style="text-align:center; line-height: 55px;">Contact Details</h4>
	               </div>
	               <h2>${contactArray[index].firstName} ${contactArray[index].lastName}</h2>
	               <p class="title">${contactArray[index].phone}</p>
	               <p>${contactArray[index].address}</p>
	               <p>${contactArray[index].email}</p>
	              <button class="close-btn" id="close">Close</button>
	              </div> `
	
	modal.style.display = "block";

	window.onclick = function(event) {
	  if (event.target == modal) {
	      modal.style.display = "none";
	  }
	} 


	let closeBtn = document.getElementById("close");
	closeBtn.onclick = function() {
    modal.style.display = "none";
	}

};

