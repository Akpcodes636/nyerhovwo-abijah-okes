let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');
console.log(btnsOpenModal);
console.log(btnCloseModal);
console.log(modal);
console.log(overlay);

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}
//event prev click
prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
}
// auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 5000)
function showSlider(){
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');
    setPositionThumbnail();

    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
}
function setPositionThumbnail () {
    let thumbnailActive = document.querySelector('.thumbnail .item.active');
    let rect = thumbnailActive.getBoundingClientRect();
    if (rect.left < 0 || rect.right > window.innerWidth) {
        thumbnailActive.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
    }
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})


const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  };
  
  const closeModal = function () {
    modal.classList.add('hidden');
    console.log('close');
    overlay.classList.add('hidden');
  };

  overlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    // console.log(e.key);
  
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Hook modal open buttons
btnsOpenModal.forEach(btn => {
    btn.addEventListener('click', function (e) {
        console.log('click');
      e.preventDefault(); // prevent <a> opening link
      openModal();
    });
  });
  
  // Hook close button
  btnCloseModal.addEventListener('click', closeModal);
  


  const form = document.getElementById('birthdayForm');
const thankYouMessage = document.getElementById('thankYouMessage');


// const form = document.getElementById("birthdayForm");
// const thankYouMessage = document.getElementById("thankYouMessage");

// form.addEventListener("submit", function (e) {
//   e.preventDefault(); // prevent default reload (important!)

//   // Hide the form
  
//   // Show the thank-you message
// });


form.addEventListener('submit', function (e) {
    e.preventDefault();
    // form.classList.add("hidden");
    // thankYouMessage.classList.remove("hidden");

  const data = new FormData(form);

  fetch('https://docs.google.com/forms/d/e/1FAIpQLScIkaIwlaFdkarXR1ZJvcAz1deTkuU7dP_gL1nTjRb6_TKDIw/formResponse', {
    method: 'POST',
    body: data,
    mode: 'no-cors'
  }).then(() => {
    form.reset()
    modal.classList.add('hidden');        // hide the form
    thankYouMessage.classList.remove('hidden'); // show custom thank-you
  });
});


closeThankYou.addEventListener("click", () => {
    thankYouMessage.classList.add("hidden");
  
    // bring the form back if you want another response
    form.classList.remove("hidden");
  });