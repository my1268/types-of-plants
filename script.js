$(function () {
  let currentIndex = 0;
  setInterval(function () {
    let nextIndex = (currentIndex + 1) % 3;
    $(".slider").eq(currentIndex).fadeOut(0);
    $(".slider").eq(nextIndex).fadeIn(0);
    currentIndex = nextIndex;
  }, 3000);
});
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("fetchData").addEventListener("click", function () {
    const API_KEY =
      "1Imok%2BBNzN03bVQvifpudhkg%2F8%2BYJ0sQazGUPNX3d8%2BctD5XvOOgxv4R2JjZfB8Ln3nzXIOgC7%2BApCnlkc9B7A%3D%3D";
    const url = `https://api.odcloud.kr/api/15116414/v1/uddi:b63f89a7-c57b-43c6-8868-f68d44ce17e5?page=1&perPage=10&returnType=JSON&serviceKey=${API_KEY}`;
    axios
      .get(url)
      .then((response) => {
        const plantInfoDiv = document.getElementById("plantInfo");
        plantInfoDiv.innerHTML = "";
        response.data.data.forEach((plant) => {
          const imageUrl = plant.이미지파일경로
            ? `${plant.이미지파일경로}`
            : "";
          console.log(imageUrl);
          plantInfoDiv.innerHTML += `
            <div>
              <h2>${plant.국명}</h2>
              <p>학명: ${plant.학명}</p>
              <img src="${imageUrl}" style="width: 200px; height: 200px" alt="No Image" ;/>
            </div>
          `;
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
