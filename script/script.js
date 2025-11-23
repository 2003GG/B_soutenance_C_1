let data = [];
let tempExperience = [];

let addWorkerBtn = document.getElementById("add_btn");
let showModal = document.querySelector(".hidden");
let backgroundvisibilty = document.querySelector(".visibilty");
let imgprofile = document.getElementById("img_url");
let sidebar = document.querySelector(".sidebar");
let placework = document.querySelector(".place");
let imgpreview = document.getElementById("img_pro");
let addExperienceBtn = document.getElementById("addexperrience");
let form = document.querySelector("#form");
let securityBtn = document.getElementById("salleSecuriteBtn");
let serveurBtn = document.getElementById("salleServeursBtn");
let personnelBtn = document.getElementById("sallePersonnelBtn");
let receptionBtn = document.getElementById("ReceptionBtn");
let conferenceBtn = document.getElementById("salleConferenceBtn");
let archiveBtn = document.getElementById("salleArchiveBtn");
let deletWorker = document.querySelector("#deletExpbtn");
let nameWorker=document.querySelector("#name");
let emailWorker=document.querySelector("#email");
let phoneWorker=document.querySelector("phone_number");




  

let cancelModal = document.getElementById("cancel");
let save = document.getElementById("save");

function initapplication() {
  addWorkerBtn.addEventListener("click", openModal);
  cancelModal.addEventListener("click", closeModal);
  save.addEventListener("click", saveModal);
  
  addExperienceBtn.addEventListener("click", addexperrience);
  imgprofile.addEventListener("input", change_img);
    archiveBtn.addEventListener("click",  archiveZone);
  serveurBtn.addEventListener("click",  serveurZone);
  securityBtn.addEventListener("click",  securityZone);
  personnelBtn.addEventListener("click",  personnalZone);
  conferenceBtn.addEventListener("click",conferenceZone);
  receptionBtn.addEventListener("click", ReceptionZone);
}

// function validationCart() {
//   const nameregex = /^[a-zA-Z\s?]+$/;
// const emilregex = /^[\w.-]+@[\w.-]+.\w{2,}$/;
// const numberregex = /^0[67]\d{8}$/;

// let user =true;
//     if (!nameregex.test(nameWorker.value)) {
//         nameWorker.style.borderColor = "red";
//         user=false;
//     } else nameWorker.style.borderColor = "green";

//     if (!emilregex.test(emailWorker.value)) {
//         emailWorker.style.borderColor = "red";
//        user=false;
//     } else emailWorker.style.borderColor = "green";

//     if (!numberregex.test(phoneWorker.value)) {
//         phoneWorker.style.borderColor = "red";
//        user=false;
//     } else phoneWorker.style.borderColor = "green";
    
// return user;
// }



function openModal() {
  showModal.classList.replace("hidden", "modal-VS");
  backgroundvisibilty.classList.add("blur-sm");
  placework.classList.replace("place", "hidden");
}

function closeModal() {
  showModal.classList.replace("modal-VS", "hidden");
  backgroundvisibilty.classList.remove("blur-sm");
  placework.classList.replace("hidden", "place");
}

function change_img() {
  imgpreview.setAttribute("src", imgprofile.value.trim());
}

function saveModal(event) {
  
  event.preventDefault();
 
//  if(validationCart()){
  let worker = {
    url: imgprofile.value.trim(),
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    phone: document.getElementById("phone_number").value,
    email:document.getElementById("email").value,
    post: document.getElementById("post").value,
    id: Date.now(),
    experience: tempExperience   
  };

  data.push(worker);

  tempExperience = [];  
//  }
  createCart(worker);
  closeModal();
  form.reset();
 
}


function createCart(worker) {

  let cardWorker = document.createElement("div");
   cardWorker.setAttribute("data-id",worker.id);
  cardWorker.classList.add("cart");


  cardWorker.innerHTML = `
    <div class="border-0 rounded-4xl bg-white shadow-cyan-100 h-25 w-90 mt-6 ml-3">
      <span class="text-black text-center pl-10">${worker.name}</span><br>

      <div class="flex justify-between">
        <img src="${worker.url}" class="h-12 w-12 rounded-4xl">

        <button onclick="deleteCart(${worker.id})" class="mr-10">
          <img src="/photo/delete.svg">
        </button>
      </div>

      <button onclick="infoWorker(${worker.id})" class="pl-70 text-black rounded-full w-4">
      <span class="border-0 rounded-3xl bg-blue-600 w-4">show</span>
      </button>
    </div>
  `;

  backgroundvisibilty.appendChild(cardWorker);
}

function deleteCart(id) {


  data = data.filter(w => w.id !== id);

  let cardElement = document.querySelector(`[data-id="${id}"]`);
  if (cardElement) {
    cardElement.remove();
  }
}


// infoWorker(): this function display the information about workers when we click a button(show). Problem
function infoWorker(id) {

  let workerIdFind = data.find(w => w.id === id);
  if (!workerIdFind) return;

  let modalinformation = document.createElement("div");
  modalinformation.classList.add("modalZones");

  placework.classList.add("hidden");
  backgroundvisibilty.classList.add("blur-sm");

  modalinformation.innerHTML = `<div class= mr-100 ml-4>
    <div class="flex relative overflow-hidden rounded-lg bg-white shadow-xl p-6 h-70 w-70">
      <button onclick="closeModalZone()" class="absolute right-4 top-4">
        <img src="/photo/cross-small.svg" class="h-3 w-4">
      </button>

      <div class="flex flex-col items-center pl-4">
        <img class="w-24 h-24 rounded-full" src="${workerIdFind.url}">
        <h5 class="text-xl font-semibold">${workerIdFind.name}</h5>
        <span class="text-sm">${workerIdFind.post}</span>
        <span class="text-sm">${workerIdFind.age}</span>
        <span class="text-sm">${workerIdFind.email}</span>
       </div>
      </div>
    </div>
  `;

  let expdiv = document.createElement("div");

  expdiv.innerHTML = `
    <div>
      <h5 class="text-xl font-semibold">Experience</h5>
      <ul id="exp-list"></ul>
    </div>
  `;

  let expList = expdiv.querySelector("#exp-list");

  workerIdFind.experience.forEach((ele) => {
    let item = document.createElement("li");
    item.innerHTML = `
        <span class="text-sm"> ${ele.exp} </span>
        <br>
        <span class="text-sm">Start: ${ele.dateStart}</span>
        <br>
        <span class="text-sm">End: ${ele.dateEnd}</span>
        <br><br>
    `;
    expList.appendChild(item);
    expdiv.appendChild(expList)
  });
   sidebar.appendChild(modalinformation);
  modalinformation.appendChild(expdiv);

 
}

// addexperrience(): this function creat a cart (input) to add athores expriences
function addexperrience() {
  let experiencePlace = document.querySelector(".experiencepalce");

  let mydivInputDate = document.createElement("div");

  let startInput = document.createElement("input");
  startInput.type = "date";

  let endInput = document.createElement("input");
  endInput.type = "date";

  let expInput = document.createElement("input");
  expInput.type = "text";
  expInput.placeholder = "Experience";

  mydivInputDate.appendChild(startInput);
  mydivInputDate.appendChild(endInput);
  mydivInputDate.appendChild(expInput);

  experiencePlace.appendChild(mydivInputDate);

  //-----------------------------------------------
  // FIX → push to tempExperience when user finishes typing
  //-----------------------------------------------
  expInput.addEventListener("blur", () => {
    tempExperience.push({
      dateStart: startInput.value,
      dateEnd: endInput.value,
      exp: expInput.value
    });
  });
}




// add workers in zones
// ModalWorkersZone(): this function creet a modal of the workers who already filterd . i add this function in all the 6 filter function
// function ModalWorkersZone() {
 

//   return divafficheinfo;
// }


function closeModalZone() {
  let cancelModalZones = document.querySelector(".modalZones");
  cancelModalZones.classList.replace("modalZones", "hidden");
  backgroundvisibilty.classList.remove("blur-sm");
  placework.classList.replace("hidden", "place");
}
// function addWorkerArchive() : the funcrion do  filter of workers whocan  get inside the archive zone
function openModalFilter() {
  backgroundvisibilty.classList.add("blur-sm");
  placework.classList.replace("place" ,"hidden");
   let divafficheinfo = document.createElement("div");

  divafficheinfo.innerHTML = `
          <div
            class="modalZones flex mr-100 mb-24  min-h-full  items-end p-4 text-center focus:outline-none sm:items-center sm:p-0"
          >
            <div
              class="zoneFilter  transform  overflow-visible h-200 w-100 rounded-lg bg-white text-left shadow-xl transition-all">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div
                  class=" mx-auto flex size-12 items-center justify-center sm:mx-0 sm:size-10">
                  <button onclick="closeModalZone()">
                <img src="/photo/cross-small.svg" alt="">
                  </button>
                </div>
                  </div>
                </div>
              </div>
            `;

  sidebar.appendChild(divafficheinfo);  
  return divafficheinfo;
}

function archiveZone() {
  let modal = openModalFilter();
  let ModalFilter = modal.querySelector(".zoneFilter");

  let workersArchiveZone = data.filter(w => w.post === "Manager");

  workersArchiveZone.forEach((w) => {

    let card = document.createElement("div");
    card.classList.add("cart");
    card.setAttribute("data-id", w.id);

    card.innerHTML = `
      <div class="border-0 rounded-4xl bg-gray-600 shadow-cyan-100 h-25 w-90 mt-6 ml-3">
        <span class="text-white text-center pl-10">${w.name}</span>
        <div class="flex justify-between">
          <img src="${w.url}" class="h-12 w-12 rounded-4xl">
          <button onclick="deleteCart(${w.id})" class="mr-10">
            <img src="/photo/delete.svg">
          </button>
        </div>
        <button onclick="infoWorker(${w.id})" class="pl-70 text-white">
         
        </button>
      </div>
    `;

    ModalFilter.appendChild(card);
  });
}



function serveurZone() {
  let modal = openModalFilter();
  let ModalFilter = modal.querySelector(".zoneFilter");
  let serveurSalle = document.querySelector(".serveurs-salle");
  let workersServeurs = data.filter(w => w.post === "Technicien IT");

  workersServeurs.forEach((w) => {

    let card = document.createElement("div");
    card.classList.add("cart");
    card.setAttribute("data-id", w.id);

    card.innerHTML = `
      <div class="border-2 rounded-4xl bg-white shadow-cyan-100 h-25 w-90 mt-6 ml-3">
        <span class="text-black text-center pl-10">${w.name}</span>
        <div class="flex justify-between">
        <img class="h-12 w-12 rounded-4xl" src="${w.url}">
       
          <button id="btn-${w.id}" class=" border-0 rounded-full bg-blue-500 h-9 w-9">
             <span class="material-symbols-outlined">
                     add
                        </span>
          </button>
        </div>
        
      </div>
    `;
    

    ModalFilter.appendChild(card);
    let addbtn=document.querySelector(`#btn-${w.id}`);
   addbtn.addEventListener("click",()=>{
      serveurSalle.appendChild(card);
    })
  });
  
    

  
}


function securityZone() {
  let modal = openModalFilter();
  let ModalFilter = modal.querySelector(".zoneFilter");

  let workersSecurite = data.filter(w => w.post === "Agent de sécurité");

  workersSecurite.forEach((w) => {

    let card = document.createElement("div");
    card.classList.add("cart");
    card.setAttribute("data-id", w.id);

    card.innerHTML = `
      <div class="border-2 rounded-4xl bg-white shadow-cyan-100 h-25 w-90 mt-6 ml-3">
        <span class="text-black text-center pl-10">${w.name}</span>
        <div class="flex justify-between">
        <img class="h-12 w-12 rounded-4xl" src="${w.url}">
       
          <button id="${w.id}" class=" border-0 rounded-full bg-blue-500 h-9 w-9">
             <span class="material-symbols-outlined">
                     add
                        </span>
          </button>
        </div>
        
      </div>
    `;

    ModalFilter.appendChild(card);
  });
}

 
  function ReceptionZone(){
    
   let modal = openModalFilter();
  let ModalFilter = modal.querySelector(".zoneFilter");

  let workersServeurs = data.filter(w => w.post === "Réceptionniste" ||
    w.post === "Manger"
  );

  workersServeurs.forEach((w) => {

    let card = document.createElement("div");
    card.classList.add("cart");
    card.setAttribute("data-id", w.id);

    card.innerHTML = `
      <div class="border-2 rounded-4xl bg-white shadow-cyan-100 h-25 w-90 mt-6 ml-3">
        <span class="text-black text-center pl-10">${w.name}</span>
        <div class="flex justify-between">
        <img class="h-12 w-12 rounded-4xl" src="${w.url}">
       
          <button id="${w.id}" class=" border-0 rounded-full bg-blue-500 h-9 w-9">
             <span class="material-symbols-outlined">
                     add
                        </span>
          </button>
        </div>
        
      </div>
    `;

    ModalFilter.appendChild(card);
  });
} 

 
function conferenceZone(){

   let modal = openModalFilter();
  let ModalFilter = modal.querySelector(".zoneFilter");

 let workersConference = data.filter(w => 
  w.post === "Nettoyage" || 
  w.post === "Manager" || 
  w.post === "Autres rôles"
);

  workersConference.forEach((w) => {

    let card = document.createElement("div");
    card.classList.add("cart");
    card.setAttribute("data-id", w.id);

    card.innerHTML = `
      <div class="border-2 rounded-4xl bg-white shadow-cyan-100 h-25 w-90 mt-6 ml-3">
        <span class="text-black text-center pl-10">${w.name}</span>
        <div class="flex justify-between">
        <img class="h-12 w-12 rounded-4xl" src="${w.url}">
       
          <button id="${w.id}" class=" border-0 rounded-full bg-blue-500 h-9 w-9">
             <span class="material-symbols-outlined">
                     add
                        </span>
          </button>
        </div>
        
      </div>
    `;

    ModalFilter.appendChild(card);
  });
}
 


 function personnalZone(){
   let modal = openModalFilter();
  let ModalFilter = modal.querySelector(".zoneFilter");

let workersPersonnel = data.filter(
    w => w.post === "Nettoyage" || w.post === "Manager" || w.post === "Autres rôles");

  workersPersonnel.forEach((w) => {

    let card = document.createElement("div");
    card.classList.add("cart");
    card.setAttribute("data-id", w.id);
`
      <div class="border-2 rounded-4xl bg-white shadow-cyan-100 h-25 w-90 mt-6 ml-3">
        <span class="text-black text-center pl-10">${w.name}</span>
        <div class="flex justify-between">
        <img class="h-12 w-12 rounded-4xl" src="${w.url}">
       
          <button id="${w.id}" class=" border-0 rounded-full bg-blue-500 h-9 w-9">
             <span class="material-symbols-outlined">
                     add
                        </span>
          </button>
        </div>
        
      </div>
    `;

    ModalFilter.appendChild(card);
  });
}



initapplication();
console.log(data);
