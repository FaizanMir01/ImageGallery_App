const accessKey = "Rg5IlN3aTMH2pdIObRv8XRESOiphAF21yEn8IHjHtQ0";

const formEl = document.querySelector("form");
const inputText = document.getElementById("inputText");
const searchContainer = document.querySelector(".searchResults");
const showMoreBtn = document.querySelector("#show-btn")

let page = 1;

async function searchImages() {
  const inputValue = inputText.value; // Corrected variable name
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputValue}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json(); // Added 'await' here

  const results = data.results;

  if (page === 1) {
    searchContainer.innerHTML = "";
  }

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("searchResult"); // Corrected class name

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;

    const para = document.createElement("p");
    para.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(para);

    searchContainer.appendChild(imageWrapper);
  });
  page++;
  if(page>1){
    showMoreBtn.style.display = "block"
  }
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});
showMoreBtn.addEventListener("click",()=>{
    searchImages()
})