const handleCategory = async () => {
  console.log("Hello First");
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  console.log(data);
  console.log("hello second");
};
