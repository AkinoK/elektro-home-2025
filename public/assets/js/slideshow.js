document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".video-slide");
    const prevButton = document.querySelector(".prev-btn");
    const nextButton = document.querySelector(".next-btn");
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove("is-active");
            slide.querySelector("video").pause();
        });

        slides[index].classList.add("is-active");
        slides[index].querySelector("video").currentTime = 0; // 動画を最初から再生
        slides[index].querySelector("video").play();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    // 動画が終了したら3秒静止して次へ
    slides.forEach((slide, index) => {
        let video = slide.querySelector("video");
        video.addEventListener("ended", function () {
            setTimeout(() => {
                if (index === currentIndex) { // 現在の動画が終了したときのみ次へ
                    nextSlide();
                }
            }, 3000); // 3秒静止
        });
    });

    // ボタンをクリックすると即座にスライド切り替え
    nextButton.addEventListener("click", () => {
        nextSlide();
    });

    prevButton.addEventListener("click", () => {
        prevSlide();
    });

    showSlide(currentIndex);
});
