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

    let activeVideo = null;
    let tabIndex = 0;

    switch (role) {
        case "traveler":
            activeVideo = document.getElementById("travelerVideo");
            tabIndex = 0;
            break;
        case "guide":
            activeVideo = document.getElementById("guideVideo");
            tabIndex = 1;
            break;
        case "service":
            activeVideo = document.getElementById("serviceVideo");
            tabIndex = 2;
            break;
    }

    if (activeVideo) {
        activeVideo.classList.add("active");
        activeVideo.play();
        tabs[tabIndex].classList.add("active");
    }
}

window.switchRole = switchRole;