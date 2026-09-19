/* =========================
   MY FUTURE CAREER
   TEST VERSION
========================= */


/* =========================
   ADMIN PASSCODE
========================= */

const ADMIN_PASSCODE = "552186";


/* =========================
   DOM ELEMENTS
========================= */

const namePage =
    document.getElementById("namePage");

const careerPage =
    document.getElementById("careerPage");

const successPage =
    document.getElementById("successPage");

const adminLoginPage =
    document.getElementById("adminLoginPage");

const resultsPage =
    document.getElementById("resultsPage");


const nameInput =
    document.getElementById("nameInput");

const continueBtn =
    document.getElementById("continueBtn");

const nameError =
    document.getElementById("nameError");


const studentName =
    document.getElementById("studentName");

const successName =
    document.getElementById("successName");

const successCareer =
    document.getElementById("successCareer");


const careerButtons =
    document.querySelectorAll(".career");

const otherBox =
    document.getElementById("otherBox");

const otherInput =
    document.getElementById("otherInput");

const submitBtn =
    document.getElementById("submitBtn");

const careerError =
    document.getElementById("careerError");

const backBtn =
    document.getElementById("backBtn");


const adminAccessBtn =
    document.getElementById("adminAccessBtn");

const adminPasscode =
    document.getElementById("adminPasscode");

const loginBtn =
    document.getElementById("loginBtn");

const loginError =
    document.getElementById("loginError");


const logoutBtn =
    document.getElementById("logoutBtn");


const totalResponses =
    document.getElementById("totalResponses");

const summary =
    document.getElementById("summary");

const studentResults =
    document.getElementById("studentResults");

const refreshBtn =
    document.getElementById("refreshBtn");

const clearBtn =
    document.getElementById("clearBtn");


/* =========================
   VARIABLES
========================= */

let currentName = "";

let selectedCareer = "";


/* =========================
   SHOW PAGE
========================= */

function showPage(page) {

    document
        .querySelectorAll(".page")
        .forEach(p => {
            p.classList.remove("active");
        });

    page.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================
   GET SAVED RESPONSES
========================= */

function getResponses() {

    const saved =
        localStorage.getItem("careerChoices");

    if (!saved) {
        return [];
    }

    try {
        return JSON.parse(saved);
    } catch (error) {

        console.error(error);

        return [];
    }
}


/* =========================
   SAVE RESPONSE
========================= */

function saveResponse(name, career) {

    const responses =
        getResponses();

    responses.push({
        name: name,
        career: career,
        createdAt: new Date().toISOString()
    });

    localStorage.setItem(
        "careerChoices",
        JSON.stringify(responses)
    );
}


/* =========================
   NAME CONTINUE
========================= */

continueBtn.addEventListener(
    "click",
    () => {

        const name =
            nameInput.value.trim();


        if (!name) {

            nameError.textContent =
                "Please enter your name.";

            return;
        }


        if (name.length < 2) {

            nameError.textContent =
                "Please enter at least 2 characters.";

            return;
        }


        currentName = name;

        studentName.textContent =
            currentName;

        nameError.textContent = "";

        showPage(careerPage);
    }
);


/* =========================
   ENTER KEY FOR NAME
========================= */

nameInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {
            continueBtn.click();
        }

    }
);


/* =========================
   CAREER BUTTONS
========================= */

careerButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                careerButtons.forEach(
                    btn => {
                        btn.classList.remove(
                            "selected"
                        );
                    }
                );


                button.classList.add(
                    "selected"
                );


                selectedCareer =
                    button.dataset.career;


                careerError.textContent = "";


                if (
                    selectedCareer ===
                    "Other"
                ) {

                    otherBox.classList.remove(
                        "hidden"
                    );

                    setTimeout(
                        () => {
                            otherInput.focus();
                        },
                        100
                    );

                } else {

                    otherBox.classList.add(
                        "hidden"
                    );

                    otherInput.value = "";
                }

            }
        );

    }
);


/* =========================
   SUBMIT
========================= */

submitBtn.addEventListener(
    "click",
    () => {

        if (!selectedCareer) {

            careerError.textContent =
                "Please choose a career.";

            return;
        }


        let finalCareer =
            selectedCareer;


        if (
            selectedCareer ===
            "Other"
        ) {

            const customCareer =
                otherInput.value.trim();


            if (!customCareer) {

                careerError.textContent =
                    "Please enter your career.";

                return;
            }


            finalCareer =
                customCareer;
        }


        submitBtn.disabled = true;

        submitBtn.textContent =
            "Saving...";


        /*
           Save locally.
           This is for testing before Firebase.
        */

        saveResponse(
            currentName,
            finalCareer
        );


        successName.textContent =
            currentName;

        successCareer.textContent =
            finalCareer;


        submitBtn.disabled = false;

        submitBtn.textContent =
            "Submit My Choice ✓";


        showPage(successPage);
    }
);


/* =========================
   BACK BUTTON
========================= */

backBtn.addEventListener(
    "click",
    () => {

        selectedCareer = "";

        careerButtons.forEach(
            btn => {
                btn.classList.remove(
                    "selected"
                );
            }
        );

        otherBox.classList.add(
            "hidden"
        );

        otherInput.value = "";

        careerError.textContent = "";

        showPage(namePage);
    }
);


/* =========================
   ADMIN BUTTON
========================= */

adminAccessBtn.addEventListener(
    "click",
    () => {

        loginError.textContent = "";

        adminPasscode.value = "";

        showPage(adminLoginPage);
    }
);


/* =========================
   ADMIN LOGIN
========================= */

loginBtn.addEventListener(
    "click",
    () => {

        const passcode =
            adminPasscode.value;


        if (
            passcode ===
            ADMIN_PASSCODE
        ) {

            adminPasscode.value = "";

            loginError.textContent = "";

            showPage(resultsPage);

            loadResults();

        } else {

            loginError.textContent =
                "Incorrect passcode.";
        }
    }
);


/* =========================
   ENTER KEY FOR PASSCODE
========================= */

adminPasscode.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {
            loginBtn.click();
        }

    }
);


/* =========================
   LOAD RESULTS
========================= */

function loadResults() {

    const choices =
        getResponses();


    /* Total */

    totalResponses.textContent =
        choices.length;


    /* Career counts */

    const careerCounts = {};


    choices.forEach(
        choice => {

            const career =
                choice.career ||
                "Unknown";


            if (
                !careerCounts[career]
            ) {
                careerCounts[career] = 0;
            }


            careerCounts[career]++;
        }
    );


    /* Clear old results */

    summary.innerHTML = "";

    studentResults.innerHTML = "";


    /* Sort careers */

    const sortedCareers =
        Object.entries(careerCounts)
            .sort(
                (a, b) =>
                    b[1] - a[1]
            );


    /* Career summary */

    sortedCareers.forEach(
        ([career, count]) => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "summary-item";


            item.innerHTML = `
                <span>
                    ${escapeHTML(career)}
                </span>

                <span class="summary-count">
                    ${count}
                </span>
            `;


            summary.appendChild(item);
        }
    );


    /* Student results */

    choices.forEach(
        choice => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "student-card";


            card.innerHTML = `
                <span class="student-name">
                    ${escapeHTML(
                        choice.name ||
                        "Unknown"
                    )}
                </span>

                <span class="student-career">
                    ${escapeHTML(
                        choice.career ||
                        "Unknown"
                    )}
                </span>
            `;


            studentResults.appendChild(
                card
            );
        }
    );


    /* No responses */

    if (choices.length === 0) {

        studentResults.innerHTML =
            "<p>No responses yet.</p>";
    }
}


/* =========================
   REFRESH
========================= */

refreshBtn.addEventListener(
    "click",
    () => {

        loadResults();
    }
);


/* =========================
   CLEAR TEST RESULTS
========================= */

clearBtn.addEventListener(
    "click",
    () => {

        const confirmed =
            confirm(
                "Clear all test results?"
            );


        if (!confirmed) {
            return;
        }


        localStorage.removeItem(
            "careerChoices"
        );


        loadResults();
    }
);


/* =========================
   LOGOUT
========================= */

logoutBtn.addEventListener(
    "click",
    () => {

        showPage(namePage);
    }
);


/* =========================
   HTML SECURITY
========================= */

function escapeHTML(value) {

    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );
}
