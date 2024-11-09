document.addEventListener("DOMContentLoaded", function () {
  let currentPage = 1;
  const itemCounts = 8;
  let totalCount = 0;
  let totalPages = 0;

  document.getElementById("pageInfo").style.display = "none";
  document.getElementById("pagination").style.display = "none";
  const images = document.querySelectorAll(".image");

  const observer = new IntersectionObserver( // DOM 요소가 뷰포트와 교차하는지를 감시하는 기능을 제공하는 웹 API
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // isIntersecting은 IntersectionObserver의 속성
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    {
      threshold: 0.3, //얼만큼 뷰포트에 보일 때
    }
  );

  images.forEach((image) => {
    observer.observe(image); // observe는 IntersectionObserver 객체의 메서드 (가시성 상태를 추적)
  });

  document.getElementById("fetchData").addEventListener("click", function () {
    const searchTerm = document.getElementById("searchInput").value;
    const API_KEY =
      "1Imok%2BBNzN03bVQvifpudhkg%2F8%2BYJ0sQazGUPNX3d8%2BctD5XvOOgxv4R2JjZfB8Ln3nzXIOgC7%2BApCnlkc9B7A%3D%3D";
    const url = `https://api.odcloud.kr/api/15116414/v1/uddi:b63f89a7-c57b-43c6-8868-f68d44ce17e5?page=${currentPage}&perPage=${itemCounts}&returnType=JSON&serviceKey=${API_KEY}&search=${encodeURIComponent(
      searchTerm
    )}`;
    axios
      .get(url)
      .then((response) => {
        const plantInfoDiv = document.getElementById("plantInfo");
        plantInfoDiv.innerHTML = "";
        totalCount = response.data.totalCount;
        totalPages = Math.ceil(totalCount / itemCounts);

        document.getElementById("pageInfo").style.display = "block";
        document.getElementById("pagination").style.display = "block";
        document.getElementById(
          "pageInfo"
        ).innerText = `Page ${currentPage} / ${totalPages}`;

        if (response.data.data && response.data.data.length > 0) {
          response.data.data.forEach((plant) => {
            const imageUrl = plant.이미지파일경로
              ? `${plant.이미지파일경로}`
              : "";
            plantInfoDiv.innerHTML += `
        <div>
          <h2 style="font-size: 16px; color: white; text-align: center; margin-Bottom: 8px;">${plant.국명}</h2>
          <img src="${imageUrl}" style="width: 200px; height: 200px; border-radius:20px;  background-color: rgb(84, 85, 85, 0.8); display: inline-block;" alt="No Image" />
        </div>
            `;
          });
        } else {
          plantInfoDiv.innerHTML = `<p>검색 결과가 없습니다.</p>`;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  document.getElementById("nextPage").addEventListener("click", function () {
    if (currentPage < totalPages) {
      currentPage += 1;
      document.getElementById("fetchData").click();
    }
  });
  document.getElementById("prevPage").addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage -= 1;
      document.getElementById("fetchData").click();
    }
  });
});

$(function () {
  let currentIndex = 0;
  $(".slider").not(":first").hide();
  setInterval(function () {
    let nextIndex = (currentIndex + 1) % 3;
    $(".slider").eq(currentIndex).fadeOut(1000);
    $(".slider").eq(nextIndex).fadeIn(1000);
    currentIndex = nextIndex;
  }, 3000);
  $(".pop-loginOpen").on("click", function () {
    $(".overlay").show();
    $(".pop-loginBox").show();
    $("body").addClass("no-scroll"); // 스크롤 비활성화
  });

  // 닫기 버튼(.bi-x) 클릭 시 overlay와 모달 박스를 숨기고 스크롤 활성화
  $(".bi-x").on("click", function () {
    $(".overlay").hide();
    $(".pop-loginBox").hide();
    $("body").removeClass("no-scroll"); // 스크롤 다시 활성화
  });
});
