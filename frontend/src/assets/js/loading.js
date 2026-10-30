
window.addEventListener("load", function () {

    const preloader = document.querySelector("#preloader");
    const progress = document.querySelector("#loaderProgress");
    const percent = document.querySelector("#loaderPercent");
    const loaderText = document.querySelector("#loaderText");

    let loading = 0;

    const interval = setInterval(() => {

        loading += Math.floor(Math.random() * 8) + 3;

        if (loading >= 100) {
            loading = 100;
            clearInterval(interval);

            loaderText.textContent = "WELCOME!";
            
            setTimeout(() => {
                preloader.classList.add("hide");
            }, 400);
        }

        progress.style.width = loading + "%";
        percent.textContent = loading + "%";

    }, 100);

});
