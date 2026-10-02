const scenes = document.querySelectorAll(".scene");

const counter = document.getElementById("sceneCounter");
const progress = document.querySelector(".scroll-progress");

const nextButton = document.getElementById("nextScene");
const prevButton = document.getElementById("prevScene");

let currentScene = 0;

const fixedContact = document.querySelector(".fixed-contact");
const heroContact = document.getElementById("heroContact");

let scanTimer;


/* =========================================
   KONTAKT
   ========================================= */

if (fixedContact) {
    fixedContact.addEventListener("click", (event) => {
        event.preventDefault();
        showScene(6);
    });
}

if (heroContact) {
    heroContact.addEventListener("click", () => {
        showScene(6);
    });
}


/* =========================================
   ZMIANA SCENY
   ========================================= */

function showScene(index) {

    if (index < 0) {
        index = scenes.length - 1;
    }

    if (index >= scenes.length) {
        index = 0;
    }

    if (index === currentScene) {
        return;
    }

    currentScene = index;

    /* SCENA 06 */
    if (currentScene === 5) {
        runSystemScan();
    }

    if (fixedContact) {
        fixedContact.classList.toggle(
            "visible",
            currentScene !== 0 && currentScene !== 6
        );
    }

    scenes.forEach((scene, i) => {
        scene.classList.toggle(
            "active",
            i === currentScene
        );
    });

    if (counter) {
        const number = String(currentScene + 1).padStart(2, "0");
        counter.textContent = `${number} / 07`;
    }

    if (progress) {
        const percent =
            ((currentScene + 1) / scenes.length) * 100;

        progress.style.width = `${percent}%`;
    }
}


/* =========================================
   NAWIGACJA
   ========================================= */

function changeScene(direction) {
    showScene(currentScene + direction);
}


window.addEventListener(
    "wheel",
    (event) => {

        event.preventDefault();

        if (event.deltaY > 0) {
            changeScene(1);
        } else {
            changeScene(-1);
        }

    },
    { passive: false }
);


window.addEventListener("keydown", (event) => {

    if (
        event.key === "ArrowDown" ||
        event.key === "PageDown"
    ) {
        changeScene(1);
    }

    if (
        event.key === "ArrowUp" ||
        event.key === "PageUp"
    ) {
        changeScene(-1);
    }

});


if (nextButton) {
    nextButton.addEventListener("click", () => {
        changeScene(1);
    });
}


if (prevButton) {
    prevButton.addEventListener("click", () => {
        changeScene(-1);
    });
}


/* =========================================
   SYSTEM SCAN — SCENA 06
   ========================================= */

function runSystemScan() {

    clearTimeout(scanTimer);

    const scanValues =
        document.querySelectorAll(
            ".scene[data-scene='6'] .scan-value"
        );

    const scanAnalyzing =
        document.querySelector(
            ".scene[data-scene='6'] .scan-analyzing"
        );

    const scanComplete =
        document.querySelector(
            ".scene[data-scene='6'] .scan-complete"
        );


    const results = [
        "OK",
        "ERROR",
        "OK",
        "OK",
        "72°C"
    ];


    /* RESET */

    scanValues.forEach((value) => {

        value.textContent = "CHECKING...";

        value.classList.remove("scan-error");

    });


    if (scanAnalyzing) {
        scanAnalyzing.style.opacity = "1";
    }


    if (scanComplete) {
        scanComplete.style.opacity = "0";
    }


    /* ANALIZA */

    scanValues.forEach((value, index) => {

        setTimeout(() => {

            value.textContent = results[index];

            if (index === 1) {
                value.classList.add("scan-error");
            }

        }, 900 + index * 600);

    });


    /* KONIEC */

    scanTimer = setTimeout(() => {

        if (scanAnalyzing) {
            scanAnalyzing.style.opacity = "0";
        }

        if (scanComplete) {
            scanComplete.style.opacity = "1";
        }

    }, 900 + (scanValues.length - 1) * 600 + 900);
}


/* =========================================
   START
   ========================================= */

if (scenes.length > 0) {

    scenes.forEach((scene, index) => {

        scene.classList.toggle(
            "active",
            index === currentScene
        );

    });

}
/* =========================================
   PORTFOLIO
========================================= */

const portfolioButton =
    document.getElementById("portfolioButton");

const portfolioPage =
    document.getElementById("portfolioPage");

const portfolioBack =
    document.getElementById("portfolioBack");


if (portfolioButton && portfolioPage) {

    portfolioButton.addEventListener("click", (event) => {

        event.preventDefault();

        portfolioPage.classList.add("active");

    });

}


if (portfolioBack && portfolioPage) {

    portfolioBack.addEventListener("click", () => {

        portfolioPage.classList.remove("active");

    });

}
/* =========================================
   PORTFOLIO — REALIZACJE
========================================= */

const portfolioProjects =
    document.querySelectorAll(".portfolio-project");

const portfolioPrev =
    document.getElementById("portfolioPrev");

const portfolioNext =
    document.getElementById("portfolioNext");

const portfolioCounter =
    document.getElementById("portfolioCounter");

let currentProject = 0;


function showPortfolioProject(index) {

    if (!portfolioProjects.length) {
        return;
    }

    if (index < 0) {
        index = portfolioProjects.length - 1;
    }

    if (index >= portfolioProjects.length) {
        index = 0;
    }

    currentProject = index;


    portfolioProjects.forEach((project, i) => {

        project.classList.toggle(
            "active",
            i === currentProject
        );

    });


    if (portfolioCounter) {

        const number =
            String(currentProject + 1).padStart(2, "0");

        const total =
            String(portfolioProjects.length).padStart(2, "0");

        portfolioCounter.textContent =
            `${number} / ${total}`;

    }

}


if (portfolioNext) {

    portfolioNext.addEventListener("click", () => {

        showPortfolioProject(
            currentProject + 1
        );

    });

}


if (portfolioPrev) {

    portfolioPrev.addEventListener("click", () => {

        showPortfolioProject(
            currentProject - 1
        );

    });

}


showPortfolioProject(0);
