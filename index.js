// fetch all categories
const handleCategory = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/videos/categories"
    );
    const data = await res.json();

    data.data?.forEach((category) => {
      const tabContainer = document.getElementById("tab-container");

      const div = document.createElement("div");
      div.innerHTML = `
      <a onclick="handleLoadVids('${category.category_id}')" class="tab tabs-boxed">${category.category}</a>
      `;
      tabContainer.appendChild(div);
    });
  } catch (error) {
    console.log(error);
  }
};

// fetch by id
let sortedData;

const handleLoadVids = async (categoryId) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    );

    const data = await res.json();

    const trimmedData = data.data;

    showData(trimmedData);
    sortedData = sort(trimmedData);
  } catch (error) {
    console.log(error);
  }
};

// card thumbnail
const showData = (vidData) => {
  const cardContainer = document.getElementById("card-container");

  cardContainer.innerHTML = "";

  if (vidData.length > 0) {
    vidData.forEach((card) => {
      const div = document.createElement("div");

      div.innerHTML = `
    <div class=" rounded-lg">
    <div class="relative">
    
    <figure><img class="rounded-lg w-full h-48" src="${
      card.thumbnail
    }"></figure>

    
  <div class="bg-card-heading absolute rounded-lg  right-2 bottom-3">
     <p class="text-white text-sm bg-zinc-900 px-1 rounded">${
       card.others.posted_date
         ? Math.floor(card.others.posted_date / 3600) +
           " hrs " +
           Math.floor((card.others.posted_date % 3600) / 60) +
           " min " +
           "ago"
         : ""
     }
    </p>
   </div>
  </div>


    <div>
      <div class="flex gap-4 py-5">
        <div class=""><img class="w-9 h-9 rounded-full" src="${
          card.authors[0].profile_picture
        }" alt=""></div>
        <div>
            <p class="text-base font-bold">${card.title}</p>
           <div class="flex items-center gap-2">
           <p class="text-sm font-normal py-2">${
             card.authors[0].profile_name
           }</p>
            <span>${
              card.authors[0].verified === true
                ? "<img class='h-4 w-4' src='./img/verify.png'>"
                : ""
            }</span>
           </div>
            <p class="text-sm font-normal">${card.others.views} views</p>
        </div>
     </div>
    
    </div>
    </div>
    `;

      cardContainer.appendChild(div);
    });
  } else {
    cardContainer.classList = ``;

    const div = document.createElement("div");

    div.innerHTML = `
    <div class="flex flex-col justify-center items-center h-[50vh]">
    <img class=" h-32 w-32" src = "./img/Icon.png" alt = "">
    <p class="font-bold text-3xl text-center pt-4">Oops!! Sorry, There is no <br> content here</p>
    </div>
    `;

    cardContainer.appendChild(div);
  }
};

handleCategory();

handleLoadVids("1000");

// sorting
const sort = (trimmedData) => {
  const sortData = trimmedData.sort(
    (a, b) => parseFloat(b.others.views) - parseFloat(a.others.views)
  );
  return sortData;
};

const handleSort = () => {
  showData(sortedData);
};

// blog page
const blogBtn = document.getElementById("btn-blog");
blogBtn.addEventListener("click", () => {
  window.location.href = "blog.html";
});
