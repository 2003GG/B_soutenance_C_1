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
let sallesBtn = document.querySelectorAll(".salle-btn");
let deletWorker = document.querySelector("#deletExpbtn");
let nameWorker = document.querySelector("#name");
let emailWorker = document.querySelector("#email");
let phoneWorker = document.querySelector("#phone_number");
let countServeur = 0;
let countSecurity = 0;
let countReception = 0;
let countArchive = 0;

let cancelModal = document.getElementById("cancel");
let save = document.getElementById("save");

function initapplication() {
  addWorkerBtn.addEventListener("click", openModal);
  cancelModal.addEventListener("click", closeModal);
  save.addEventListener("click", saveModal);

  addExperienceBtn.addEventListener("click", addexperrience);
  imgprofile.addEventListener("input", change_img);
  sallesBtn.forEach((btn) => {
    btn.addEventListener("click", generaleZone);
  });
}

function validateInputs() {
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/; 
  const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
  const phoneRegex = /^0[5-7]\d{8}$/;

  let valid = true;

  // NAME
  if (!nameRegex.test(nameWorker.value.trim())) {
    nameWorker.style.borderColor = "red";
    valid = false;
  } else {
    nameWorker.style.borderColor = "green";
  }

  // EMAIL
  if (!emailRegex.test(emailWorker.value.trim())) {
    emailWorker.style.borderColor = "red";
    valid = false;
  } else {
    emailWorker.style.borderColor = "green";
  }

  // PHONE
  if (!phoneRegex.test(phoneWorker.value.trim())) {
    phoneWorker.style.borderColor = "red";
    valid = false;
  } else {
    phoneWorker.style.borderColor = "green";
  }

  return valid;
}


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

  if (!validateInputs()) {
  
    return;
  }


  
  let worker = {
    url: imgprofile.value.trim(),
    name: nameWorker.value.trim(),
    age: document.getElementById("age").value,
    phone: phoneWorker.value.trim(),
    email: emailWorker.value.trim(),
    post: document.getElementById("post").value,
    id: Date.now(),
    experience: tempExperience,
  };

  data.push(worker);
  createCart(worker);
  closeModal();
  form.reset();
}



function createCart(worker) {
  let cardWorker = document.createElement("div");
  cardWorker.setAttribute("data-id", worker.id);
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
  data = data.filter((w) => w.id !== id);

  let cardElement = document.querySelector(`[data-id="${id}"]`);
  if (cardElement) {
    cardElement.remove();
  }
}

// infoWorker(): this function display the information about workers when we click a button(show). Problem
function infoWorker(id) {
  let workerIdFind = data.find((w) => w.id === id);
  console.log(workerIdFind.experience);
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
    expdiv.appendChild(expList);
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

  tempExperience.push({
    dateStart: startInput.value,
    dateEnd: endInput.value,
    exp: expInput.value,
  });
  console.log(tempExperience);
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
  placework.classList.replace("place", "hidden");
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

function checkRestrictions(post, salle) {
 
 
  switch (salle) {
    case "serveurs-salle":
      return post == "Technicien IT" || post == "Nettoyage" || post == "Manager";

    case "security-salle":
      return post == "Agent de sécurité" || post == "Nettoyage" || post == "Manager"

    case "Reception-salle":
      
      return  post == "Réceptionniste" || post == "Nettoyage" || post == "Manager";

    case "archive-salle":
      return post != "Nettoyage";
    default:
      return true;
  }
}
function removeWorkerFromUI(id) {

  // Remove from modal list
  let modalCard = document.querySelector(`.modalZones [data-id="${id}"]`);
  if (modalCard) modalCard.remove();

  // Remove from sidebar card
  let sidebarCard = document.querySelector(`.visibilty [data-id="${id}"]`);
  if (sidebarCard) sidebarCard.remove();
}






function generaleZone(e) {

  let modal = openModalFilter();
  let ModalFilter = modal.querySelector(".zoneFilter");
  let modalError = document.querySelector(".modalError"); 

  ModalFilter.innerHTML = `
  <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="mx-auto flex size-12 items-center justify-center sm:mx-0 sm:size-10">
        <button onclick="closeModalZone()">
          <img src="/photo/cross-small.svg" alt="">
        </button>
      </div>
  </div>`;

  let salles = document.querySelectorAll(".salle");

  salles.forEach((salle) => {

    let filteremployee = data.filter(
      (w) =>
        salle.id ==
          e.target.parentElement.parentElement.parentElement.id &&
        checkRestrictions(w.post, salle.id)
    );

    filteremployee.forEach((w) => {

      let card = document.createElement("div");
      card.classList.add("cart");
      card.setAttribute("data-id", w.id);

      card.innerHTML = `
      <div class="cartinfo items-center border-2 rounded-2xl bg-white shadow-cyan-100 h-16 w-50 mt-6 ml-20">
        <span class="text-white text-center pl-10">${w.name}</span>
        <div class="flex justify-between items-center">
          <img src="${w.url}" class="h-10 w-10 rounded-4xl pl-2">
          <button id="btn-${w.id}" class="border-0 rounded-full bg-blue-500 h-7 w-7">
            <span class="material-symbols-outlined">add</span>
          </button>
        </div>
      </div>
      `;

      ModalFilter.appendChild(card);

      let addbtn = document.querySelector(`#btn-${w.id}`);

      addbtn.addEventListener("click", () => {

        let room = salle.id;

        let roomIsAvailable = true;

        if (room === "serveurs-salle" && countServeur >= 3) roomIsAvailable = false;
        if (room === "security-salle" && countSecurity >= 4) roomIsAvailable = false;
        if (room === "Reception-salle" && countReception >= 4) roomIsAvailable = false;
        if (room === "archive-salle" && countArchive >= 4) roomIsAvailable = false;

        if (!roomIsAvailable) {
          modalError.classList.replace("hidden", "visible");
          return;
        }

        
        removeWorkerFromUI(w.id);

        
        salle.appendChild(card);
        addbtn.remove();

       
        if (room === "serveurs-salle") countServeur++;
        if (room === "security-salle") countSecurity++;
        if (room === "Reception-salle") countReception++;
        if (room === "archive-salle") countArchive++;
   if(countServeur>0 || countSecurity>0 || countArchive>0){
       salle.classList.replace("bg-red-500","bg-gray-800");
      
}
        
      });
    });
  });
}

// function limit(){
//   let modalError=document.querySelector(".modalError");
//    if(security>3 || ser>2 ||Reception>3 || archive>3){
//    }
//         modalError.classList.remove("hidden");   
// }



initapplication();
