// Model:  Define and array of cat objects
const model = {
  currentCat: null,
  cats: [
    {
      name: "Bad Hair Day",
      imgSrc: "images/cat-bad-hair-day.jpg",
      clickCount: 0
    },
    { name: "No Hair Day", imgSrc: "images/evil-cat.jpg", clickCount: 0 },
    {
      name: "Lizard Nose Ring",
      imgSrc: "images/lizard-nose-ring.jpg",
      clickCount: 0
    },
    {
      name: "Calgon Moments",
      imgSrc: "images/bathing-cats.jpg",
      clickCount: 0
    },
    { name: "Jumping Jack", imgSrc: "images/jumping-cat.jpg", clickCount: 0 },
    { name: "Oops!", imgSrc: "images/oops-cat.jpg", clickCount: 0 },
    {
      name: "The Supreme Ruler",
      imgSrc: "images/supreme-cat.jpg",
      clickCount: 0
    },
    { name: "Sushi Roll", imgSrc: "images/sushi-roll-cat.jpg", clickCount: 0 }
  ]
};

//Octopus/Controller
const octopus = {
  init() {
    // Set current cat to first one in the list
    model.currentCat = model.cats[0];

    // Initialize views
    catView.init();
    catListView.init();
    adminView.init();
  },

  // Get the array of cats from the Model
  // get makes the cats() function a property
  // that is called without parens
  // i.e. cats = octopus.cats
  get cats() {
    return model.cats;
  },

  // Get the Model's currentCat property
  get currentCat() {
    return model.currentCat;
  },

  // setter for currentCat
  // Sets the Model's currentCat value to the
  // parameter cat i.e. octopus.currentCat = cat;
  set currentCat(cat) {
    model.currentCat = cat;
  },

  // increment counter then render
  incrementCounter() {
    model.currentCat.clickCount++;
    catView.render();
    adminView.render();
  }
};

// View(s): Creating DOM objects

const catView = {
  init() {
    // Create variables on the catView object and
    // store pointers to DOM elements for later access
    this.catEl = document.querySelector(".cat");
    this.catNameEl = document.querySelector(".cat-name");
    this.catImgEl = document.querySelector(".cat-img");
    this.countEl = document.querySelector(".cat-count");

    // on click, increment cat's counter
    this.catImgEl.addEventListener("click", e => octopus.incrementCounter());

    // render this view (update DOM elements)
    this.render();
  },

  render() {
    // Get the cats from the octopus/controller
    const currentCat = octopus.currentCat;
    this.catNameEl.innerText = currentCat.name;
    this.catImgEl.src = currentCat.imgSrc;
    this.countEl.innerText = "Click count: " + currentCat.clickCount;
  }
};

const catListView = {
  init() {
    // store DOM elements for later access
    this.catListEl = document.getElementById("cat-list");

    // get the cats from the octopus/controller
    this.cats = octopus.cats;

    // Add listener on select to change current cat and render
    this.catListEl.addEventListener("change", e => {
      const cat = this.cats.find(cat => cat.name === e.target.value);

      octopus.currentCat = cat;
      catView.render();

      // Render the admin area
      adminView.render();
    });

    // render this view (update DOM elements)
    this.render();
  },

  render() {
    // Get the cats from the octopus/controller
    this.cats = octopus.cats;

    // start with an empty cat list
    this.catListEl.innerHTML = "";

    // loop over cats
    for (const cat of this.cats) {
      // Make new option, set values
      const option = document.createElement("option");
      option.value = cat.name;
      option.innerText = cat.name;
      this.catListEl.add(option);
    }
    // Set current value to current cat name
    this.catListEl.value = octopus.currentCat.name;
  }
};

// premium pro version only!
const adminView = {
  init() {
    // store DOM elements for later access as a property on the adminView
    this.adminBtn = document.querySelector(".admin-button");
    this.adminArea = document.querySelector(".admin");
    this.saveBtn = document.querySelector(".save");
    this.cancelBtn = document.querySelector(".cancel");
    this.adminName = document.querySelector("#name");
    this.adminImg = document.querySelector("#imgUrl");
    this.adminCount = document.querySelector("#clicks");

    // admin click listener to toggle visibility
    this.adminBtn.addEventListener("click", () => {
      this.adminArea.classList.toggle("hidden");
    });

    // cancel button hides admin area because we are adding the class of hidden
    this.cancelBtn.addEventListener("click", () =>
      this.adminArea.classList.add("hidden")
    );

    // save button grabs values, sets current cat with new data
    this.saveBtn.addEventListener("click", () => {
      // grab values of new data from the HTML nput elements
      const newCat = {
        name: this.adminName.value,
        imgSrc: this.adminImg.value,
        clickCount: this.adminCount.value
      };

      //get current index of cat
      const currentCatIndex = octopus.cats
        .map(cat => cat.imgSrc)
        .findIndex(imgSrc => octopus.currentCat.imgSrc === imgSrc);

      // set cat with new data, set new currentCat
      octopus.cats[currentCatIndex] = newCat; //overwrite the existing cat
      octopus.currentCat = octopus.cats[currentCatIndex]; // make sure the index points to the newCat index

      // update catView and catListView
      catView.render();
      catListView.render();
    });

    this.render();
  },

  // Render changes the DOM
  render() {
    // Get the current cat from the octopus/controller
    // and set the input elements' values
    const currentCat = octopus.currentCat;
    this.adminName.value = currentCat.name;
    this.adminImg.value = currentCat.imgSrc;
    this.adminCount.value = currentCat.clickCount;
  }
};

octopus.init();
