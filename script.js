document.addEventListener("DOMContentLoaded", function () {
  let currentPage = 1; // 현재 페이지
  const itemsPerPage = 10; // 한 페이지에 보여줄 항목 수
  let totalCount = 0; // 전체 항목 개수
  let totalPages = 0; // 전체 페이지 수

  // 페이지 정보 숨기기
  document.getElementById("pageInfo").style.display = "none";

  document.getElementById("fetchData").addEventListener("click", function () {
    const searchTerm = document.getElementById("searchInput").value; // 입력된 검색어
    const API_KEY =
      "1Imok%2BBNzN03bVQvifpudhkg%2F8%2BYJ0sQazGUPNX3d8%2BctD5XvOOgxv4R2JjZfB8Ln3nzXIOgC7%2BApCnlkc9B7A%3D%3D";

    // 검색어와 페이지 번호를 URL에 포함
    const url = `https://api.odcloud.kr/api/15116414/v1/uddi:b63f89a7-c57b-43c6-8868-f68d44ce17e5?page=${currentPage}&perPage=${itemsPerPage}&returnType=JSON&serviceKey=${API_KEY}&search=${encodeURIComponent(
      searchTerm
    )}`;

    axios
      .get(url)
      .then((response) => {
        const plantInfoDiv = document.getElementById("plantInfo");
        plantInfoDiv.innerHTML = ""; // 기존 콘텐츠 비우기

        // 전체 항목 개수와 페이지 수 계산
        totalCount = response.data.totalCount; // API에서 전체 항목 개수 반환
        totalPages = Math.ceil(totalCount / itemsPerPage); // 전체 페이지 수 계산

        // 페이지 정보 표시
        document.getElementById("pageInfo").style.display = "block";
        document.getElementById(
          "pageInfo"
        ).innerText = `Page ${currentPage} / ${totalPages}`;

        // 데이터가 있다면 반복하여 출력
        if (response.data.data && response.data.data.length > 0) {
          response.data.data.forEach((plant) => {
            const imageUrl = plant.이미지파일경로
              ? `${plant.이미지파일경로}`
              : "";
            plantInfoDiv.innerHTML += `
              <div>
                <h2>${plant.국명}</h2>
                <img src="${imageUrl}" style="width: 200px; height: 200px" alt="No Image" />
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

  // 페이지 넘기기 함수
  document.getElementById("nextPage").addEventListener("click", function () {
    if (currentPage < totalPages) {
      currentPage += 1; // 페이지 1 증가
      document.getElementById("fetchData").click(); // fetchData 클릭
    }
  });

  document.getElementById("prevPage").addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage -= 1; // 페이지 1 감소
      document.getElementById("fetchData").click(); // fetchData 클릭
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
});
