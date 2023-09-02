const handleCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();

  const tabContainer = document.getElementById("tab-container");

  const trimmedData = data.data.slice(0, 4);

  trimmedData.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <a onclick="handleLoadVids('${category.category_id}')" class="tab tabs-boxed">${category.category}</a>
    `;
    tabContainer.appendChild(div);
  });
};

const handleLoadVids = async (categoryId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await res.json();
  console.log(data.data);
};

handleCategory();
