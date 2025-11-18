let data = [];

let addWorkerBtn = document.getElementById("add_btn");
let showModal = document.querySelector(".hidden");
let backgroundvisibilty = document.querySelector(".visibilty");
let imgprofile = document.getElementById("img_url");
let sidebar = document.querySelector(".sidebar");
let placework = document.getElementsByClassName("place");
let imgpreview = document.getElementById("img_pro");
let addExperienceBtn = document.getElementById("addexperrience");

let cancelModal = document.getElementById("cancel");
let save = document.getElementById("save");

function initapplication() {
  addWorkerBtn.addEventListener("click", openModal);
  cancelModal.addEventListener("click", closeModal);
  save.addEventListener("click", saveModal);
  addExperienceBtn.addEventListener("click",addexperrience);
}

function openModal() {
  imgprofile.addEventListener("input", change_img);
  showModal.classList.replace("hidden", "modal-VS");
  backgroundvisibilty.classList.add("blur-sm");
}

function closeModal() {
  showModal.classList.replace("modal-VS", "hidden");
  backgroundvisibilty.classList.remove("blur-sm");
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
    experience: [document.getElementById("workerExperience").value],
  };
  data.push(info);
  creatCart();
  closeModal();
}

function creatCart() {
  let mydiv = document.createElement("div");

  data.forEach((ele) => {
    mydiv.innerHTML = `<div class="border-0 rounded-4xl bg-blue-300 shadow-cyan-100 h-30"> 
               <div class="flex">
              <span class="text-black text-center">${ele.name}</span>
              <img src="${ele.url}" alt="the img profil in the cart" class="h-10 w-10 border-0 rounded-4xl">
              <button type="button" class="text-white bg-red-700 hover:sm:ml-3 sm:w-auto transition duration-500 hover:scale-105 cursor-pointer delete-btn" data-index="${index}">
                <img src="/photo/trash.svg" alt="trash_logo" class="h-2 w-2">
              </button>
                  </div>
</div>`;;

    backgroundvisibilty.appendChild(mydiv);
  });
}
function addexperrience() {
  let experiencePlace = document.querySelector(".experiencepalce");

  let myExperienceInput = document.createElement("input");
  myExperienceInput.setAttribute("type", "text"),
    myExperienceInput.classList=
      "w-90 h-20 p-3 ps-9 ml-2 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-4xl mt-2 focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
    ;
  experiencePlace.appendChild(myExperienceInput);
}

initapplication();
