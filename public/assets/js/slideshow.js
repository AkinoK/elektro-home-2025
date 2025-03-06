document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".video-slide");
    const prevButton = document.querySelector(".prev-btn");
    const nextButton = document.querySelector(".next-btn");
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            let video = slide.querySelector("video");
            if (video) {
                slide.classList.remove("is-active");
                video.pause();
            }
        });

        let currentSlide = slides[index];
        let video = currentSlide.querySelector("video");

        if (video) { // 🔹 video が存在する場合のみ処理を実行
            currentSlide.classList.add("is-active");
            video.currentTime = 0; // 動画を最初から再生
            video.muted = true; // 🔹 無音を強制してオートプレイ制限回避
            video.play().catch(error => {
                console.error("Autoplay failed:", error);
            });
        }
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    // 🔹 動画が終了したら3秒停止して次へ
    slides.forEach((slide, index) => {
        let video = slide.querySelector("video");

        if (video) { // 🔹 video が存在する場合のみ addEventListener を実行
            video.addEventListener("ended", function () {
                setTimeout(() => {
                    if (index === currentIndex) { // 現在の動画が終了したときのみ次へ
                        nextSlide();
                    }
                }, 3000); // 3秒静止
            });
        } else {
            console.warn(`No video found in slide ${index}`);
        }
    });

    // 🔹 ボタンをクリックすると即座にスライド切り替え
    if (nextButton) {
        nextButton.addEventListener("click", () => {
            nextSlide();
        });
    } else {
        console.warn("Next button not found");
    }

    if (prevButton) {
        prevButton.addEventListener("click", () => {
            prevSlide();
        });
    } else {
        console.warn("Previous button not found");
    }

    // 🔹 初回ロード時にユーザー操作を待つ
    function enablePlaybackAfterUserInteraction() {
        document.removeEventListener("click", enablePlaybackAfterUserInteraction);
        showSlide(currentIndex);
    }
    document.addEventListener("click", enablePlaybackAfterUserInteraction);

    // 🔹 ページ完全ロード後に再生試行
    window.onload = function () {
        showSlide(currentIndex);
    };
});
