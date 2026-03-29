// console.log("Landing page loaded");
function switchRole(role) {

    const videos = document.querySelectorAll(".role-video");

    const tabs = document.querySelectorAll(".tab");

    videos.forEach(video => {

        video.pause();

        video.classList.remove("active");

    });

    tabs.forEach(tab => {

        tab.classList.remove("active");

    });

    if (role === "traveler") {

        const video = document.getElementById("travelerVideo");

        video.classList.add("active");

        video.play();

        tabs[0].classList.add("active");

    }

    if (role === "guide") {

        const video = document.getElementById("guideVideo");

        video.classList.add("active");

        video.play();

        tabs[1].classList.add("active");

    }

    if (role === "service") {

        const video = document.getElementById("serviceVideo");

        video.classList.add("active");

        video.play();

        tabs[2].classList.add("active");

    }

}