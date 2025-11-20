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
let secutityBtn=document.getElementById("salleSecuriteBtn");
let serveurBtn=document.getElementById("salleServeursBtn");
let personnelBtn=document.getElementById("sallePersonnelBtn");
let ReceptionBtnBtn=document.getElementById("ReceptionBtn");
let ConferenceBtn=document.getElementById("salleConferenceBtn");
let archiveBtn=document.getElementById("salleArchiveBtn");
let deletWorker=document.querySelector("#deletExpbtn");


let cancelModal = document.getElementById("cancel");
let save = document.getElementById("save");

function initapplication() {
  addWorkerBtn.addEventListener("click", openModal);
  cancelModal.addEventListener("click", closeModal);
  save.addEventListener("click", saveModal);
  addExperienceBtn.addEventListener("click", addexperrience);
  imgprofile.addEventListener("input", change_img);
 
}

function openModal() {

  showModal.classList.replace("hidden", "modal-VS");
  backgroundvisibilty.classList.add("blur-sm");
  placework.classList.replace("place","hidden");

}

function closeModal() {
  showModal.classList.replace("modal-VS", "hidden");
  backgroundvisibilty.classList.remove("blur-sm");
   placework.classList.replace("hidden","place");
}

function change_img() {
  imgpreview.setAttribute("src", imgprofile.value.trim());
}

function saveModal(event) {
  event.preventDefault();

  let info = {
    url: document.getElementById("img_url").value,
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    phone: document.getElementById("phone_number").value,
    post: document.getElementById("post").value,
    
  };
  data.push(info);
  creatCart();
  closeModal();
  form.reset();
}

function creatCart() {
  let mydiv = document.createElement("div");

  data.forEach((ele) => {
    mydiv.innerHTML = `<div class="cart  border-0 rounded-4xl bg-gray-600 shadow-cyan-100 h-25 w-90 mt-6 ml-3 onclick="infoWorker()">
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

    backgroundvisibilty.appendChild(mydiv);
  });
}
function deletCart(){
    let divdelet=document.querySelector(".cart");
        divdelet.remove();
    console.log(divdelet);

}

function infoWorker(){
let divinfoModal=document.createElement("div");
placework.classList.replace("place","hidden");
 backgroundvisibilty.classList.add("blur-sm");


data.forEach(ele=>{
divinfoModal.innerHTML=`<div class="hidden bg-blue-200 p-6 border-3 rounded-3xl shadow-xs">
    <a href="#">
        <img class="rounded-4xl" src="${data.url}" alt="" />
    </a>
    <a href="#">
        <h5 class="mt-6 mb-2 text-2xl font-semibold tracking-tight text-heading">${data.name}</h5>
    </a>
    <span class="mb-6 text-body">${data.experience.exp}</span>
    <span>start in : ${data.exp.dateStart}</span>
    <span>start in : ${data.exp.dateEnd}</span>
    
    <a href="#" class="inline-flex items-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
        Read more
        <svg class="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg>
    </a>
</div>`

});
divinfoModal.classList.remove("hidden");
sidebar.appendChild(divinfoModal);

}
function addexperrience() {
  let experiencePlace = document.querySelector(".experiencepalce");

  let mydivInputDate=document.createElement("div");

  let lableInputstart = document.createElement("label");
  lableInputstart.textContent = "start: ";
  mydivInputDate.appendChild(lableInputstart);

  let dateExperienceStart = document.createElement("input");
  dateExperienceStart.classList="border-2 rounded-2xl bg-emerald-400";
  dateExperienceStart.type = "date";
  mydivInputDate.appendChild(dateExperienceStart);

  let lableInputEnd = document.createElement("label");
  lableInputEnd.textContent = "End : ";
  mydivInputDate.appendChild(lableInputEnd);

  let dateExperienceEnd = document.createElement("input");
  dateExperienceEnd.classList="border-2 rounded-2xl bg-emerald-400"
  dateExperienceEnd.type = "date";
  mydivInputDate.appendChild(dateExperienceEnd);

  let myExperienceInput = document.createElement("input");
  myExperienceInput.type = "text";
  myExperienceInput.setAttribute("placeholder", "Experience");
  myExperienceInput.classList =
    "w-90 h-20 p-3 ps-9 ml-2 mt-3 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-4xl mt-2 focus:ring-brand focus:border-brand shadow-xs placeholder:text-body";
     experiencePlace.appendChild(mydivInputDate);
    experiencePlace.appendChild(myExperienceInput);
   

         let experience={
                    dateStart:[document.getElementById("start").value],
                    dateEnd:[document.getElementById("end").value],
                    exp:[document.getElementById("workerExperience").value],
         };
           data.info.push(experience);
           console.log(experience);

}

initapplication();

