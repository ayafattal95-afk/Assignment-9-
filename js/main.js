var nameInput = document.getElementById("nameInput");
var phoneInput = document.getElementById("phoneInput");
var emailInput = document.getElementById("emailInput");
var addressInput = document.getElementById("addressInput");
var catInput = document.getElementById("selectInput");
var descInput = document.getElementById("desInput");
var checkFavorite = document.getElementById("checkFavorite");
var checkEmergency = document.getElementById("checkEmergency");
var addBtn = document.getElementById("addBtn");
var canselBtn = document.getElementById("canselBtn");
var closeBtn = document.getElementById("xmark");
var overlay = document.getElementById("overlay");
var formeInput = document.getElementById("formeInput");
var updateBtn = document.getElementById("updateBtn");
var totalNum = document.getElementById("totalNum");
var favoritesNum = document.getElementById("favoritesNum");
var emergencyNum = document.getElementById("emergencyNum");
var nameError = document.getElementById("nameError");
var phoneError = document.getElementById("phoneError");
var emailError = document.getElementById("emailError");
var producctTobeUpdate;
var firstTwo;
var imageInput = document.getElementById("imageInput");
var nameVa = /^[a-zA-Z\s]{3,}$/;
var phoneVa = /^[0-9]{11}$/;
var emailVa = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

var allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

disPlayContsct();
disPlayFavoriteContsct();
disPlayEmergencyContsct();
updateCounters();

// ~ creat
function addContsct() {
  if (
    !phoneVa.test(phoneInput.value) ||
    !emailVa.test(emailInput.value) ||
    !nameVa.test(nameInput.value)
  ) {
    Swal.fire({
      icon: "error",
      title: "Missing Name",
      text: "Something went wrong!",
    });
    return;
  }

  if (imageInput.files[0]) {
    var reader = new FileReader();
    reader.readAsDataURL(imageInput.files[0]);

    reader.onload = function () {
      var newContsct = {
        id: Date.now(),
        name: nameInput.value,
        firstTwo: nameInput.value.slice(0, 2).toUpperCase(),
        phone: phoneInput.value,
        email: emailInput.value,
        address: addressInput.value,
        desc: descInput.value,
        category: catInput.value,
        image: imageInput.files[0] ? reader.result : null,
        favorite: checkFavorite.checked,
        emergency: checkEmergency.checked,
      };

      allUsers.push(newContsct);
      disPlayContsct();
      updateCounters();

      saveIntoLocalStorage();

      disPlayFavoriteContsct();
      disPlayEmergencyContsct();

      clearForm();
    };
  } else {
    var newContsct = {
      id: Date.now(),
      name: nameInput.value,
      phone: phoneInput.value,
      email: emailInput.value,
      address: addressInput.value,
      desc: descInput.value,
      favorite: checkFavorite.checked,
      emergency: checkEmergency.checked,
      category: catInput.value,
    };

    allUsers.push(newContsct);

    disPlayContsct();

    saveIntoLocalStorage();

    disPlayFavoriteContsct();
    disPlayEmergencyContsct();

    clearForm();
  }

  Swal.fire({
    title: "Contact Added!",
    icon: "success",
    text: "The contact has been added successfully.",
    showConfirmButton: false,
    timer: 1500,
  });

  updateCounters();
}

// ~ disPlay
function disPlayContsct(arr = allUsers) {
  var htmlMarkup = "";

  if (arr.length == 0) {
    htmlMarkup = `
<div
                class="text-muted d-flex flex-column align-items-center justify-content-center py-5 min-h-30 w-100"
              >
                <span><i class="fa-solid fa-address-book fs-2 mb-5"></i></span>
                <span><p class="fw-bold">No contacts found</p></span>
                <span><p>Click "Add Contact" to get started</p></span>
              </div>
`;
  } else {
    for (var i = 0; i < arr.length; i++) {
      htmlMarkup += `
              <div class="w-45 bg-body my-4 p-2 rounded-3 d-flex flex-column gap-2">
                <div class="d-flex gap-3 align-items-center">
                  <div>
                    <span class="position-relative square-icon-2 accent-bg text-white fw-bold fs-5">

                      ${
                        arr[i].image
                          ? `<img src="${arr[i].image}" class="w-100 h-100" />`
                          : arr[i].name.substring(0, 2).toUpperCase()
                      }
                      
                      <i class="
                      ${
                        arr[i].favorite == true
                          ? "fa-solid fa-star icon-star circle-icon bg-yellow text-white fs-6"
                          : ""
                      }">
                        </i>

                        <i
                          class="
                          ${
                            arr[i].emergency == true
                              ? "fa-solid fa-heart-pulse icon-heart circle-icon bg-red text-white fs-6"
                              : ""
                          }"
                        >
                        </i>
                      </span>

                      

                      
                    
                  </div>

                  <div class="d-flex flex-column">
                    <span class="fw-bold">${arr[i].name}</span>
                    <span class="d-flex gap-2"
                      ><i
                        class="fa-solid fa-phone small-square-icon accent-bg-2 accent-color"
                      ></i>
                      <span>${arr[i].phone}</span></span
                    >
                  </div>
                </div>

                <div class="d-flex gap-2">
                  <span
                    ><i
                      class="fa-solid fa-envelope small-square-icon purple-color"
                    ></i>
                  </span>
                  <span><p>${arr[i].email}</p></span>
                </div>

                <div class="d-flex gap-2">
                  <span
                    ><i
                      class="fa-solid fa-location-dot small-square-icon green-color"
                    ></i>
                  </span>
                  <span><p>${arr[i].address}</p></span>
                </div>

                <div class="d-flex gap-2">
                  <span class="green-color py-1 px-2 rounded-3">Friends</span>
                  <span class="bg-red-2 py-1 px-2 rounded-3 ${
                    arr[i].emergency == true ? "d-block" : "d-none"
                  }">
                    <i class="fa-solid fa-heart-pulse"></i>Emergency</span
                  >
                </div>

                <hr />


                <div class="d-flex justify-content-between">
                  <div>
                   <a href="tel:${arr[i].phone}">
                    <button class="border-0 bg-transparent">
                      <i
                        class="fa-solid fa-phone phone-icon small-square-icon green-color"
                      ></i>
                    </button>
                  </a>


                    <a href="mailto:${arr[i].email}">
                    <button class="border-0 bg-transparent">
                      <i
                        class="fa-solid fa-envelope envelope-icon small-square-icon purple-color"
                      ></i>
                    </button>
                  </a>

                  </div>

                  <div>
                    <button class="border-0 bg-transparent">
                    <i onclick="toogleIcon(this,${
                      arr[i].id
                    })" class="fa-star small-square-icon 
                    ${
                      arr[i].favorite == true
                        ? "fa-solid bg-orange"
                        : "fa-regular text-muted"
                    }
                    "></i>
                    </button>

                    <button class="border-0 bg-transparent">
                      <i onclick="toogleIconHeart(this,${
                        arr[i].id
                      })"  class="small-square-icon
                      ${
                        arr[i].emergency == true
                          ? "fa-solid fa-heart-pulse  bg-red-2"
                          : "fa-regular fa-heart text-muted"
                      }"></i>
                    </button>

                    <button class="border-0 bg-transparent" onclick="setForUpdate('${
                      arr[i].id
                    }')">
                      <i class="fa-solid fa-pen pen-icon small-square-icon" onclick="clickOpenForm()"></i>
                    </button>

                    <button class="border-0 bg-transparent" onclick="deleteContsct('${
                      arr[i].id
                    }')">
                      <i
                        class="fa-solid fa-trash-can trash-can-icon small-square-icon"
                      ></i>
                    </button>
                  </div>
                </div>
              </div>

        `;
    }
  }

  document.getElementById("ContsctWrapper").innerHTML = htmlMarkup;
}

imageInput.onchange = function () {
  var reader = new FileReader();

  reader.readAsDataURL(imageInput.files[0]);

  reader.onload = function () {
    imgLivePrev.setAttribute("src", reader.result);
  };
};

// ~ Delete
function deleteContsct(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      allUsers = allUsers.filter(function (contsct) {
        return contsct.id != id;
      });

      disPlayContsct();
      updateCounters();

      disPlayFavoriteContsct();
      disPlayEmergencyContsct();

      saveIntoLocalStorage();

      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
}

// ~ LocalStorage
function saveIntoLocalStorage() {
  localStorage.setItem("allUsers", JSON.stringify(allUsers));
}

// ~ Update
function setForUpdate(id) {
  updateBtn.classList.replace("d-none", "d-block");
  addBtn.classList.replace("d-block", "d-none");

  producctTobeUpdate = allUsers.find(function (contsct) {
    return contsct.id == id;
  });

  nameInput.value = producctTobeUpdate.name;
  phoneInput.value = producctTobeUpdate.phone;
  emailInput.value = producctTobeUpdate.email;
  addressInput.value = producctTobeUpdate.address;
  catInput.value = producctTobeUpdate.category;
  descInput.value = producctTobeUpdate.desc;
  checkFavorite.checked = producctTobeUpdate.favorite;
  checkEmergency.checked = producctTobeUpdate.emergency;
}

function updateContsct() {
  if (imageInput.files[0]) {
    var reader = new FileReader();

    reader.readAsDataURL(imageInput.files[0]);

    reader.onload = function () {
      producctTobeUpdate.image = reader.result;
      producctTobeUpdate.name = nameInput.value;
      producctTobeUpdate.phone = phoneInput.value;
      producctTobeUpdate.email = emailInput.value;
      producctTobeUpdate.address = addressInput.value;
      producctTobeUpdate.category = catInput.value;
      producctTobeUpdate.desc = descInput.value;
      producctTobeUpdate.favorite = checkFavorite.checked;
      producctTobeUpdate.emergency = checkEmergency.checked;

      disPlayContsct();
      saveIntoLocalStorage();
      disPlayEmergencyContsct();
      disPlayFavoriteContsct();

      updateBtn.classList.replace("d-block", "d-none");
      addBtn.classList.replace("d-none", "d-block");
    };
  } else {
    producctTobeUpdate.name = nameInput.value;
    producctTobeUpdate.phone = phoneInput.value;
    producctTobeUpdate.email = emailInput.value;
    producctTobeUpdate.address = addressInput.value;
    producctTobeUpdate.category = catInput.value;
    producctTobeUpdate.desc = descInput.value;
    producctTobeUpdate.favorite = checkFavorite.checked;
    producctTobeUpdate.emergency = checkEmergency.checked;

    disPlayContsct();
    saveIntoLocalStorage();
    disPlayEmergencyContsct();
    disPlayFavoriteContsct();
    updateCounters();

    updateBtn.classList.replace("d-block", "d-none");
    addBtn.classList.replace("d-none", "d-block");
  }

  Swal.fire({
    icon: "success",
    title: "Contact Updated!",
    text: "The contact has been updated successfully.",
    showConfirmButton: false,
    timer: 1500,
  });
}

// ~ clearForm
function clearForm() {
  nameInput.value = null;
  phoneInput.value = null;
  emailInput.value = null;
  addressInput.value = null;
  catInput.value = null;
  descInput.value = null;
  checkEmergency.checked = null;
  checkFavorite.checked = null;
}

// ~ Search
function search(term) {
  var searchingList = allUsers.filter(function (contsct) {
    return (
      contsct.name.toLowerCase().includes(term.toLowerCase()) ||
      contsct.phone.includes(term) ||
      contsct.email.toLowerCase().includes(term.toLowerCase())
    );
  });

  disPlayContsct(searchingList);
}

// ~ toogleIcon
function toogleIcon(el, id) {
  var findContsct = allUsers.find(function (contsct) {
    return contsct.id == id;
  });

  findContsct.favorite = !findContsct.favorite;

  saveIntoLocalStorage();

  //   ? change Icons
  //   if (el.classList.contains("fa-regular")) {
  //     el.classList.replace("fa-regular", "fa-solid");
  //     el.classList.replace("text-muted", "bg-orange");
  //   } else {
  //     el.classList.replace("fa-solid", "fa-regular");
  //     el.classList.replace("bg-orange", "text-muted");
  //   }

  disPlayContsct();

  disPlayFavoriteContsct();

  updateCounters();
}

function toogleIconHeart(el, id) {
  var findContsct = allUsers.find(function (contsct) {
    return contsct.id == id;
  });

  findContsct.emergency = !findContsct.emergency;

  saveIntoLocalStorage();

  //   ? change Icons
  //   if (el.classList.contains("fa-regular")) {
  //     el.classList.replace("fa-regular", "fa-solid");
  //     el.classList.replace("text-muted", "bg-red-2");
  //     el.classList.replace("fa-heart", "fa-heart-pulse");
  //   } else {
  //     el.classList.replace("fa-solid", "fa-regular");
  //     el.classList.replace("bg-red-2", "text-muted");
  //     el.classList.replace("fa-heart-pulse", "fa-heart");
  //   }

  saveIntoLocalStorage();

  disPlayContsct();

  disPlayEmergencyContsct();

  updateCounters();
}

function disPlayFavoriteContsct() {
  var favoriteContsctList = allUsers.filter(function (contsct) {
    return contsct.favorite == true;
  });

  var htmlMarkup = "";

  if (favoriteContsctList.length == 0) {
    htmlMarkup = `
    <p class="text-muted text-center py-2">No favorites yet</p>
    `;
  } else {
    for (var i = 0; i < favoriteContsctList.length; i++) {
      htmlMarkup += `
                <div
                  class="cars--1 d-flex p-1 rounded-2 justify-content-between"
                >
                  <div class="d-flex">
                    <span class="square-icon text-white accent-bg fw-bolder"
                      >${
                        favoriteContsctList[i].image
                          ? `<img src="${favoriteContsctList[i].image}" class="w-100 h-100" />`
                          : favoriteContsctList[i].name
                              .substring(0, 2)
                              .toUpperCase()
                      }</span
                    >

                    <span class="ms-2"
                      ><p class="m-0">${favoriteContsctList[i].name}</p>
                      <p class="text-muted fs-7 m-0">${
                        favoriteContsctList[i].phone
                      }</p></span
                    >
                  </div>

                  <a href="tel:${favoriteContsctList[i].phone}">
                    <button class="border-0 bg-transparent">
                      <i
                        class="fa-solid fa-phone phone-icon2 square-icon green-color"
                      ></i>
                    </button>
                  </a>
                </div>

    `;
    }
  }

  document.getElementById("favoriteWrapper").innerHTML = htmlMarkup;
}

function disPlayEmergencyContsct() {
  var emergencyContsctList = allUsers.filter(function (contsct) {
    return contsct.emergency == true;
  });

  var htmlMarkup = "";

  if (emergencyContsctList.length == 0) {
    htmlMarkup = `
<div> <p class="text-muted text-center p-2">
No emergency contacts
</p></div>
`;
  } else {
    for (var i = 0; i < emergencyContsctList.length; i++) {
      htmlMarkup += `
                    <div
                  class="card--2 p-1 rounded-2 d-flex justify-content-between"
                >
                  <div class="d-flex">
                    <span class="square-icon text-white accent-bg fw-bolder"
                      >${
                        emergencyContsctList[i].image
                          ? `<img src="${emergencyContsctList[i].image}" class="w-100 h-100" />`
                          : emergencyContsctList[i].name
                              .substring(0, 2)
                              .toUpperCase()
                      }</span
                    >

                    <span class="ms-2"
                      ><p class="m-0">${emergencyContsctList[i].name}</p>
                      <p class="text-muted fs-7 m-0">${
                        emergencyContsctList[i].phone
                      }</p></span
                    >
                  </div>

                  <a href="tel:${emergencyContsctList[i].phone}">
                    <button class="border-0 bg-transparent">
                      <i
                        class="fa-solid fa-phone phone-icon2 square-icon bg-red-2"
                      ></i>
                    </button>
                  </a>
                </div>

    `;
    }
  }

  document.getElementById("emergencyWrapper").innerHTML = htmlMarkup;
}

// ~ updateCounters (Total - Favorites - Emergency)
function updateCounters() {
  // ~ Total
  totalNum.innerHTML = allUsers.length;

  // ~ Favorites
  var favContsct = allUsers.filter(function (user) {
    return user.favorite == true;
  }).length;
  favoritesNum.innerHTML = favContsct;

  //   ~ Emergency
  var emContsct = allUsers.filter(function (user) {
    return user.emergency == true;
  }).length;
  emergencyNum.innerHTML = emContsct;
}

// ~ OpenForm
function clickOpenForm() {
  formeInput.classList.remove("d-none");
  overlay.classList.remove("d-none");
}

// ~ CloseForm
function clickCloseForm() {
  formeInput.classList.add("d-none");
  overlay.classList.add("d-none");
}

// ~ validateContact
nameInput.oninput = function () {
  if (!nameVa.test(nameInput.value.trim())) {
    nameError.classList.remove("d-none");
  } else {
    nameError.classList.add("d-none");
  }
};

phoneInput.oninput = function () {
  if (!phoneVa.test(phoneInput.value.trim())) {
    phoneError.classList.remove("d-none");
  } else {
    phoneError.classList.add("d-none");
  }
};

emailInput.oninput = function () {
  if (!emailVa.test(emailInput.value.trim())) {
    emailError.classList.remove("d-none");
  } else {
    emailError.classList.add("d-none");
  }
};
