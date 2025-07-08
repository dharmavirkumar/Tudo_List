
// Display the user information in a table format
// Each row will have the user's name, id, email, contact, and action buttons for editing and deleting the record
// The action buttons will call the editInfo and deleteInfo functions with the index of the user in the array
// The table will be dynamically updated based on the userArray
// The displayInfo function will iterate through the userArray and create a table row for each user
// The table will be displayed in the recordDisplay element
// The editInfo function will populate the form fields with the user's information for editing
// The deleteInfo function will remove the user from the userArray and update the display
// The saveInfo function will save the updated userArray to localStorage
// The userArray will be initialized from localStorage if available, otherwise it will be an empty array
// The addUser button will toggle between adding a new user and saving changes to an existing user
// The form fields will be cleared after adding or editing a user
// The addUser button will reset to its original text after adding or editing a user
// The userArray will be displayed in a table format with appropriate styling
// The table will have a border and rounded corners for better aesthetics
// The action buttons will have different colors for edit and delete actions
// The edit button will allow the user to modify the existing record
// The delete button will remove the record from the userArray and update the display
// The displayInfo function will be called initially to show any existing records from localStorage 
// The form fields will be validated before adding or editing a user
// The validation will check for empty fields, valid name, valid student ID, valid email, valid contact number

const addUser = document.getElementById("addUser");
const btnText = addUser.innerText;
const student_name = document.getElementById("student_name");
const student_id = document.getElementById("student_id");
const student_email = document.getElementById("student_email");
const student_contect = document.getElementById("student_contect");
const recordDisplay= document.getElementById("recods");
let edit_id = null;

const namePattern = /^[A-Za-z\s]+$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const numberPattern = /^\d+$/;

let userArray = [];
let objStr = localStorage.getItem('users');
if (objStr != null) {
    userArray = JSON.parse(objStr);
    displayInfo();
    
} 



addUser.onclick=()=>{
     const name = student_name.value;
    const id = student_id.value;
    const email = student_email.value;
    const contect = student_contect.value;
  // Validation
  if (!name || !id || !email || !contect) {
    alert("All fields are required!");
    return;
  }
  if (!namePattern.test(name)) {
    alert(" Name must contain only letters and spaces.");
    return;
  }
  if (!numberPattern.test(id)) {
    alert("Student ID must contain only numbers.");
    return;
  }
  if (!emailPattern.test(email)) {
    alert("Invalid email address.");
    return;
  }
  if (!numberPattern.test(contect) || contect.length < 7) {
    alert("Contact number must be valid and numeric.");
    return;
  }

    if (edit_id != null) {
        userArray.splice(edit_id,1,{ name, id, email, contect });
        edit_id = null;

        
    } else {

    
    userArray.push({ name, id, email, contect });  
    displayInfo();  
    }
   
//Reset the from fills
    

    saveInfo(userArray);

    student_name.value = "";
    student_id.value = "";
    student_email.value = "";
    student_contect.value = "";
   
    addUser.innerHTML = btnText;

}

function saveInfo(userArray){
    let str = JSON.stringify(userArray);
    localStorage.setItem('users',str);
    displayInfo();

}

function displayInfo() {
    let statement = "";
    userArray.forEach((user, index) => {
        statement += `<tr class="border border-2 rounded-lg">
                    <td><span class="mx-3">${user.name}</span></td>
                    <td><span class="mx-3">${user.id}</span></td>
                    <td><span class="mx-3">${user.email}</span></td>
                    <td><span class="mx-3">${user.contect}</span></td>
                    <td>
                        <i class="fa-solid fa-pen-to-square text-blue-500 cursor-pointer mr-3 mx-5" onclick="editInfo(${index})"></i>
          <i class="fa-solid fa-trash text-red-500 cursor-pointer" onclick="deleteInfo(${index})"></i>
 </td>
                    </tr>`;
    });
    recordDisplay.innerHTML = statement;

    }

window.editInfo = function(id){
    edit_id = id;
    student_name.value = userArray[id].name;
    student_id.value  = userArray[id].id;
    student_email.value = userArray[id].email;
    student_contect.value = userArray[id].contect;

    addUser.innerHTML = "Save Change";

}

window.deleteInfo = function(id){
   userArray.splice(id,1);
   saveInfo(userArray);

displayInfo();
}