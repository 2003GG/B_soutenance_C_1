let data = [];

let addWorkerBtn = document.getElementById("add_btn");
let showModal = document.querySelector(".hidden");
let backgroundvisibilty = document.querySelector(".visibilty");
let imgprofile = document.getElementById("img_url");
let sidebar = document.querySelector(".sidebar");
let placework = document.querySelector(".place");
let imgpreview = document.getElementById("img_pro");
let addExperienceBtn = document.getElementById("addexperrience");
let form = document.querySelector("#form");
let secutityBtn = document.getElementById("salleSecuriteBtn");
let serveurBtn = document.getElementById("salleServeursBtn");
let personnelBtn = document.getElementById("sallePersonnelBtn");
let receptionBtn = document.getElementById("ReceptionBtn");
let conferenceBtn = document.getElementById("salleConferenceBtn");
let archiveBtn = document.getElementById("salleArchiveBtn");
let deletWorker = document.querySelector("#deletExpbtn");

  

let cancelModal = document.getElementById("cancel");
let save = document.getElementById("save");

function initapplication() {
  addWorkerBtn.addEventListener("click", openModal);
  cancelModal.addEventListener("click", closeModal);
  save.addEventListener("click", saveModal);
  addExperienceBtn.addEventListener("click", addexperrience);
  imgprofile.addEventListener("input", change_img);
  archiveBtn.addEventListener("click", addWorkerArchive);
  serveurBtn.addEventListener("click", addWorkerserveurs);
  secutityBtn.addEventListener("click", addWorkerSecurite);
  personnelBtn.addEventListener("click", addWorkerPersonnel);
  conferenceBtn.addEventListener("click", addWorkerConference);
  receptionBtn.addEventListener("click", addWorkerReception);
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

  let worker = {
    url: imgprofile.value.trim(),
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    phone: document.getElementById("phone_number").value,
    post: document.getElementById("post").value,
    id: Date.now(),
    experience:
  };

  data.push(worker);
  createCart(worker);
  closeModal();
  form.reset();
}

function createCart(worker) {
  let cardWorker = document.createElement("div");
  cardWorker.classList.add("cart");


  cardWorker.innerHTML = `
    <div class="border-0 rounded-4xl bg-gray-600 shadow-cyan-100 h-25 w-90 mt-6 ml-3">
      <span class="text-white text-center pl-10">${worker.name}</span><br>

      <div class="flex justify-between">
        <img src="${worker.url}" class="h-12 w-12 rounded-4xl">

        <button onclick="deleteCart(${worker.id})" class="mr-10">
          <img src="/photo/delete.svg">
        </button>
      </div>

      <button onclick="infoWorker(${worker.id})" class="pl-70 text-white">show</button>
    </div>
  `;

  backgroundvisibilty.appendChild(cardWorker);
}

function deletCart() {
  let divdelet = document.querySelector(".cart");
  let removeCart=data.find(d=>d.id===id);
  let parentcart=removeCart.parent();
  parentcart.remove();
  console.log(divdelet);
}

// infoWorker(): this function display the information about workers when we click a button(show). Problem
function infoWorker(id) {
  // addexperrience();
  let workerIdFind = data.find(w => w.id === id);
  // let workerExperience=data.experience.find(f=> f.id===id)
  if (!workerIdFind) return;

  let modalinformation = document.createElement("div");
  modalinformation.classList.add("modalZones");

  placework.classList.add("hidden");
  backgroundvisibilty.classList.add("blur-sm");

  modalinformation.innerHTML = `
    <div class="flex relative overflow-hidden rounded-lg bg-white shadow-xl p-6 h-160 w-70">
      <button onclick="closeModalZone()" class="absolute right-4 top-4">
        <img src="/photo/cross-small.svg" class="h-3 w-4">
      </button>

      <div class="flex flex-col items-center ">
        <img class="w-24 h-24 rounded-full" src="${workerIdFind.url}">
        <h5 class="text-xl font-semibold">${workerIdFind.name}</h5>
        <span class="text-sm">${workerIdFind.post}</span>
        
      </div>
    </div>
  `;
  let expdiv=document.createElement("div");
  workerIdFind.experience.forEach(ele=>{
  expdiv.innerHTML=`<div>
        <h5 class="text-xl font-semibold">Experience</h5>
        <ul>
        <li>
        <span class="text-sm">${workerIdFind.experience.exp}</span>
        </li>
        </ul>
        </div>`
  });

  sidebar.appendChild(modalinformation);
}

// addexperrience(): this function creat a cart (input) to add athores expriences
function addexperrience() {
  let experiencePlace = document.querySelector(".experiencepalce");

  let mydivInputDate = document.createElement("div");

  let lableInputstart = document.createElement("label");
  lableInputstart.textContent = "start: ";
  mydivInputDate.appendChild(lableInputstart);

  let dateExperienceStart = document.createElement("input");
  dateExperienceStart.classList = "border-2 rounded-2xl bg-emerald-400";
  dateExperienceStart.type = "date";
  mydivInputDate.appendChild(dateExperienceStart);

  let lableInputEnd = document.createElement("label");
  lableInputEnd.textContent = "End : ";
  mydivInputDate.appendChild(lableInputEnd);

  let dateExperienceEnd = document.createElement("input");
  dateExperienceEnd.classList = "border-2 rounded-2xl bg-emerald-400";
  dateExperienceEnd.type = "date";
  mydivInputDate.appendChild(dateExperienceEnd);

  let myExperienceInput = document.createElement("input");
  myExperienceInput.type = "text";
  myExperienceInput.setAttribute("placeholder", "Experience");
  myExperienceInput.classList =
    "w-90 h-20 p-3 ps-9 ml-2 mt-3 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-4xl mt-2 focus:ring-brand focus:border-brand shadow-xs placeholder:text-body";
  experiencePlace.appendChild(mydivInputDate);
  experiencePlace.appendChild(myExperienceInput);

    data.experience.push({
    dateStart: document.getElementById("start").value,
    dateEnd: document.getElementById("end").value,
    exp: [document.getElementById("workerExperience").value]
  });
  
  console.log(experience);
  console.log(data);
}

// add workers in zones
// ModalWorkersZone(): this function creet a modal of the workers who already filterd . i add this function in all the 6 filter function
function ModalWorkersZone() {
  let divafficheinfo = document.createElement("div");

  divafficheinfo.innerHTML = `
          <div
            class="modalZones flex mr-100 mb-24  min-h-full  items-end p-4 text-center focus:outline-none sm:items-center sm:p-0"
          >
            <div
              class="transform  overflow-visible h-200 w-100 rounded-lg bg-white text-left shadow-xl transition-all">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div
                  class="mx-auto flex size-12 items-center justify-center sm:mx-0 sm:size-10">
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

// function to close tehe modal after click on eny zone plus
function closeModalZone() {
  let cancelModalZones = document.querySelector(".modalZones");
  cancelModalZones.classList.replace("modalZones", "hidden");
  backgroundvisibilty.classList.remove("blur-sm");
  placework.classList.replace("hidden", "place");
}
// function addWorkerArchive() : the funcrion do  filter of workers whocan  get inside the archive zone
function addWorkerArchive(post) {
  ModalWorkersZone();

  backgroundvisibilty.classList.add("blur-sm");
  placework.classList.replace("place", "hidden");

  let workersArchiveZone = data.post.filter(
    (w) => data.info.post === "Manager"
  );
  let catrWorkerArchive = document.createElement("div");
  workersArchiveZone.forEach((w) => {
    catrWorkerArchive.innerHTML = `<div class="cart  border-0 rounded-4xl bg-gray-600 shadow-cyan-100 h-25 w-90 mt-6 ml-3 onclick="infoWorker()">
              <span class="text-white text-center pl-10">${ele.name}<span>
               <div class="flex justify-between">
              <img src="${ele.url}" alt="the img profil in the cart" class="h-12 w-12 rounded-4xl">
               
                
                
    <button type="button" id="deletExpbtn" onclick="deletCart()" class=" border-0 mr-10  hover: transition duration-500 hover:scale-105 cursor-pointer">

<img src="/photo/delete.svg" alt="" >

</button>
                  </div>

                  <button onclick="infoWorker()" class="pl-70">
                <span class="text-white">show</span>
</button>
                  

</div>`;
  });
  divafficheinfo.appendChild(catrWorkerArchive);
}

// function addWorkerserveurs() : the funcrion do  filter of workers whocan  get inside the serveurs zone
function addWorkerserveurs(worker) {
  ModalWorkersZone();
  backgroundvisibilty.classList.add("blur-sm");
  placework.classList.replace("place", "hidden");
  let workersServeurs = worker.post.filter(
    (w) => data.info.post === "Technicien IT");

  let catrWorkerServeur = document.createElement("div");
  workersServeurs.forEach((w) => {
    catrWorkerServeur.innerHTML = `<div class="cart  border-0 rounded-4xl bg-gray-600 shadow-cyan-100 h-25 w-90 mt-6 ml-3 onclick="infoWorker()">
              <span class="text-white text-center pl-10">${ele.name}<span>
               <div class="flex justify-between">
              <img src="${ele.url}" alt="the img profil in the cart" class="h-12 w-12 rounded-4xl">
               
                
                
    <button type="button" id="deletExpbtn" onclick="deletCart()" class=" border-0 mr-10  hover: transition duration-500 hover:scale-105 cursor-pointer">

<img src="/photo/delete.svg" alt="" >

</button>
                  </div>

                  <button onclick="infoWorker()" class="pl-70">
                <span class="text-white">show</span>
</button>
                  

</div>`;
  });
  divafficheinfo.appendChild(catrWorkerServeur);
}

// function addWorkerSecurite() : the function do a filter oto workers who can  get inside the security zone

function addWorkerSecurite() {
  ModalWorkersZone();
  backgroundvisibilty.classList.add("blur-sm");
  placework.classList.replace("place", "hidden");

  let workersSecurite = data.post.filter(
    (w) => data.info.post === "Agent de sécurité"
  );
  let catrWorkersecurite = document.createElement("div");
  workersSecurite.forEach((w) => {
    catrWorkersecurite.innerHTML = `<div class="cart  border-0 rounded-4xl bg-gray-600 shadow-cyan-100 h-25 w-90 mt-6 ml-3 onclick="infoWorker()">
              <span class="text-white text-center pl-10">${ele.name}<span>
               <div class="flex justify-between">
              <img src="${ele.url}" alt="the img profil in the cart" class="h-12 w-12 rounded-4xl">
               
                
                
    <button type="button" id="deletExpbtn" onclick="deletCart()" class=" border-0 mr-10  hover: transition duration-500 hover:scale-105 cursor-pointer">

<img src="/photo/delete.svg" alt="" >

</button>
                  </div>

                  <button onclick="infoWorker()" class="pl-70">
                <span class="text-white">show</span>
</button>
                  

</div>`;
  });
  divafficheinfo.appendChild(catrWorkersecurite);
}

// function addWorkerReception() : the function do a filter oto workers who can  get inside the reception zone
function addWorkerReception() {
  ModalWorkersZone();
  backgroundvisibilty.classList.add("blur-sm");
  placework.classList.replace("place", "hidden");

  let workersReception = data.post.filter(
    (w) => data.info.post === "Réceptionnistes"
  );
  let catrWorkerReception = document.createElement("div");
  workersReception.forEach((w) => {
    catrWorkerReception.innerHTML = `<div class="cart  border-0 rounded-4xl bg-gray-600 shadow-cyan-100 h-25 w-90 mt-6 ml-3 onclick="infoWorker()">
              <span class="text-white text-center pl-10">${ele.name}<span>
               <div class="flex justify-between">
              <img src="${ele.url}" alt="the img profil in the cart" class="h-12 w-12 rounded-4xl">
               
                
                
    <button type="button" id="deletExpbtn" onclick="deletCart()" class=" border-0 mr-10  hover: transition duration-500 hover:scale-105 cursor-pointer">

<img src="/photo/delete.svg" alt="" >

</button>
                  </div>

                  <button onclick="infoWorker()" class="pl-70">
                <span class="text-white">show</span>
</button>
                  

    </div>`;
  });
  divafficheinfo.appendChild(catrWorkerReception);
}

// function addWorkerConference() : the function do a filter oto workers who can  get inside the cenference zone

function addWorkerConference() {
  ModalWorkersZone();
  backgroundvisibilty.classList.add("blur-sm");
  placework.classList.replace("place", "hidden");

  let workersConference = data.post.filter(
    (w) => data.info.post === "Nettoyage" || "Manager" || "Autres rôles "
  );
  let catrWorkerConference = document.createElement("div");
  workersConference.forEach((w) => {
    catrWorkerConference.innerHTML = `<div class="cart  border-0 rounded-4xl bg-gray-600 shadow-cyan-100 h-25 w-90 mt-6 ml-3 onclick="infoWorker()">
              <span class="text-white text-center pl-10">${ele.name}<span>
               <div class="flex justify-between">
              <img src="${ele.url}" alt="the img profil in the cart" class="h-12 w-12 rounded-4xl">
               
                
                
    <button type="button" id="deletExpbtn" onclick="deletCart()" class=" border-0 mr-10  hover: transition duration-500 hover:scale-105 cursor-pointer">

<img src="/photo/delete.svg" alt="" >

</button>
                  </div>

                  <button onclick="infoWorker()" class="pl-70">
                <span class="text-white">show</span>
</button>
                  

    </div>`;
  });
  divafficheinfo.appendChild(catrWorkerConference);
}

// function addWorkerPersonnel() : the function do a filter oto workers who can  get inside the personnel  zone
function addWorkerPersonnel() {
  ModalWorkersZone();
  backgroundvisibilty.classList.add("blur-sm");
  placework.classList.replace("place", "hidden");

  let workersPersonnel = data.post.filter(
    (w) => data.info.post === "Nettoyage" || "Manager" || "Autres rôles "
  );
  let catrWorkerPersonnel = document.createElement("div");
  workersPersonnel.forEach((w) => {
    catrWorkerPersonnel.innerHTML = `<div class="cart  border-0 rounded-4xl bg-gray-600 shadow-cyan-100 h-25 w-90 mt-6 ml-3 onclick="infoWorker()">
              <span class="text-white text-center pl-10">${ele.name}<span>
               <div class="flex justify-between">
              <img src="${ele.url}" alt="the img profil in the cart" class="h-12 w-12 rounded-4xl">
               
                
                
    <button type="button" id="deletExpbtn" onclick="deletCart()" class=" border-0 mr-10  hover: transition duration-500 hover:scale-105 cursor-pointer">

<img src="/photo/delete.svg" alt="" >

</button>
                  </div>

                  <button onclick="infoWorker()" class="pl-70">
                <span class="text-white">show</span>
</button>
                  

    </div>`;
  });
  divafficheinfo.appendChild(catrWorkerPersonnel);
}

initapplication();
