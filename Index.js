const addUser = document.getElementById("addUser");
const btnText = addUser.innerText;
const student_name = document.getElementById("student_name");
const student_id = document.getElementById("student_id");
const student_email = document.getElementById("student_email");
const student_contect = document.getElementById("student_contect");
const recordDisplay= document.getElementById("recods");
let edit_id = null;

let userArray = [];
let objStr = localStorage.getItem('users');
if (objStr != null) {
    userArray = JSON.parse(objStr);
    
} else {
    
}

displayInfo();

addUser.onclick=()=>{
    const name = student_name.value;
    const id = student_id.value;
    const email = student_email.value;
    const contect = student_contect.value;
// 
    // userArray.push({'name': name},{'id':id},{'email':email},{'contect':contect});
    userArray.push({ name, id, email, contect });

    saveInfo(userArray);

    student_name.value = "";
    student_id.value = "";
    student_email.value = "";
    student_contect.value = "";
    displayInfo();
    addUser.innerHTML = btnText;

}

function saveInfo(userArray){
    let str = JSON.stringify(userArray);
    localStorage.setItem('users',str);

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
                        <i class="fa-solid fa-pen-to-square mx-8" onclick = 'editInfo(${index})' ></i>
                        <i class="fa-solid fa-trash " onclick = deleteInfo('${index}')></i>
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
   displayInfo()

}