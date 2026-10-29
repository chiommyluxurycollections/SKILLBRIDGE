/* ==========================================
   SKILLBRIDGE — JAVASCRIPT
   ========================================== */

/* 1. DEMONSTRATION OPPORTUNITIES */

const opportunities = [
    {
        id: 1,
        title: "Junior Frontend Developer",
        organisation: "Demo Technology Company",
        category: "jobs",
        type: "INTERNSHIP",
        location: "Remote",
        locationType: "remote",
        description: "A demonstration opportunity for beginners interested in building websites with HTML, CSS and JavaScript.",
        tags: ["HTML & CSS", "Beginner-friendly"],
        initial: "T",
        deadline: "Check application page",
        audience: "Beginners interested in web development and building a portfolio.",
        link: ""
    },
    {
        id: 2,
        title: "Social Media Content Creator",
        organisation: "Demo Creative Studio",
        category: "freelance",
        type: "FREELANCE",
        location: "Nigeria",
        locationType: "nigeria",
        description: "Explore how content creators can develop engaging posts, organise content calendars and showcase their creative work.",
        tags: ["Content Creation", "Creative"],
        initial: "C",
        deadline: "Check application page",
        audience: "Aspiring content creators and people interested in social media.",
        link: ""
    },
    {
        id: 3,
        title: "Undergraduate Scholarship Search",
        organisation: "Demonstration Scholarship Guide",
        category: "scholarships",
        type: "SCHOLARSHIPS",
        location: "International",
        locationType: "international",
        description: "A demonstration resource for students researching undergraduate scholarships and education funding.",
        tags: ["Undergraduates", "Funding"],
        initial: "S",
        deadline: "Check official provider",
        audience: "Undergraduate students researching scholarship opportunities.",
        link: ""
    },
    {
        id: 4,
        title: "UI/UX Design Project",
        organisation: "Demo Design Community",
        category: "freelance",
        type: "PROJECT",
        location: "Remote",
        locationType: "remote",
        description: "Explore a sample project brief focused on designing clear, accessible and user-friendly digital interfaces.",
        tags: ["UI/UX", "Design"],
        initial: "D",
        deadline: "Check application page",
        audience: "Beginners interested in interface design and user experience.",
        link: ""
    },
    {
        id: 5,
        title: "Digital Skills Learning Path",
        organisation: "SKILLBRIDGE Learning",
        category: "learning",
        type: "LEARNING",
        location: "Online",
        locationType: "remote",
        description: "A demonstration learning resource for exploring web development, digital communication and creative skills.",
        tags: ["Digital Skills", "Self-paced"],
        initial: "L",
        deadline: "Self-paced demonstration",
        audience: "Students and beginners interested in digital skills.",
        link: ""
    },
    {
        id: 6,
        title: "Graduate Career Preparation",
        organisation: "Demo Career Centre",
        category: "jobs",
        type: "CAREER RESOURCE",
        location: "Nigeria",
        locationType: "nigeria",
        description: "Explore sample guidance on preparing a CV, presenting your skills and getting ready for entry-level roles.",
        tags: ["CV Preparation", "Graduates"],
        initial: "G",
        deadline: "Self-paced demonstration",
        audience: "Students, graduates and people preparing for entry-level work.",
        link: ""
    },
    {
        id: 7,
        title: "International Study Funding Guide",
        organisation: "Demonstration Education Guide",
        category: "scholarships",
        type: "FUNDING GUIDE",
        location: "International",
        locationType: "international",
        description: "A sample guide to researching study-abroad funding, eligibility requirements and application preparation.",
        tags: ["Study Abroad", "Education"],
        initial: "E",
        deadline: "Check official provider",
        audience: "Students researching international education funding.",
        link: ""
    },
    {
        id: 8,
        title: "Beginner Copywriting Project",
        organisation: "Demo Digital Agency",
        category: "freelance",
        type: "PROJECT",
        location: "Remote",
        locationType: "remote",
        description: "A sample creative brief for practising headlines, product descriptions and clear marketing copy.",
        tags: ["Writing", "Communication"],
        initial: "W",
        deadline: "Check application page",
        audience: "Beginner writers and people interested in digital marketing.",
        link: ""
    },
    {
        id: 9,
        title: "Portfolio Building Workshop",
        organisation: "SKILLBRIDGE Learning",
        category: "learning",
        type: "WORKSHOP",
        location: "Online",
        locationType: "remote",
        description: "A demonstration resource about organising projects and presenting your abilities in a professional portfolio.",
        tags: ["Portfolio", "Career Growth"],
        initial: "P",
        deadline: "Self-paced demonstration",
        audience: "Students, freelancers and beginners building their portfolios.",
        link: ""
    }
];


/* 2. STORAGE HELPERS */

const SAVED_KEY = "skillbridge-saved";
const OPPORTUNITIES_KEY = "skillbridgeOpportunities";

function readSavedIds() {
    try {
        const stored = JSON.parse(
            localStorage.getItem(SAVED_KEY)
        );

        if (!Array.isArray(stored)) {
            return [];
        }

        return stored
            .map(Number)
            .filter(id => Number.isFinite(id));
    } catch (error) {
        return [];
    }
}

function readSavedOpportunities() {
    const ids = readSavedIds();

    return ids
        .map(id => opportunities.find(item => item.id === id))
        .filter(Boolean);
}

function saveOpportunitiesData() {
    try {
        localStorage.setItem(
            OPPORTUNITIES_KEY,
            JSON.stringify(opportunities)
        );
    } catch (error) {
        console.warn("Could not save opportunity data.", error);
    }
}


/* 3. SHARE OPPORTUNITY DATA WITH OTHER PAGES */

saveOpportunitiesData();


/* 4. GET HOMEPAGE ELEMENTS */

const opportunityGrid = document.getElementById("opportunityGrid");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const locationFilter = document.getElementById("locationFilter");
const resultsCount = document.getElementById("resultsCount");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const currentYear = document.getElementById("currentYear");


/* 5. LOAD SAVED OPPORTUNITY IDS */

let savedOpportunities = readSavedIds();


/* 6. DISPLAY OPPORTUNITY CARDS */

function displayOpportunities(items) {
    if (!opportunityGrid) return;

    if (items.length === 0) {
        opportunityGrid.innerHTML = `
            <div class="empty-message">
                <h3>No matching opportunities found.</h3>
                <p>Try another keyword or change your location filter.</p>
            </div>
        `;

        if (resultsCount) {
            resultsCount.textContent = "0 results";
        }

        return;
    }

    opportunityGrid.innerHTML = items.map(function(item) {
        const isSaved = savedOpportunities.includes(item.id);

        return `
            <article class="opportunity-card">

                <div class="card-top">
                    <div class="company-mark">
                        ${item.initial}
                    </div>

                    <button
                        type="button"
                        class="save-button ${isSaved ? "saved" : ""}"
                        data-save="${item.id}"
                        aria-label="${isSaved ? "Remove saved opportunity" : "Save opportunity"}"
                        aria-pressed="${isSaved}"
                        title="${isSaved ? "Remove from saved items" : "Save this opportunity"}"
                    >
                        ${isSaved ? "♥" : "♡"}
                    </button>
                </div>

                <span class="card-type">${item.type}</span>

                <h3>${item.title}</h3>

                <p class="card-organisation">
                    ${item.organisation}
                </p>

                <p class="card-description">
                    ${item.description}
                </p>

                <div class="card-tags">
                    ${item.tags.map(function(tag) {
                        return `<span class="card-tag">${tag}</span>`;
                    }).join("")}
                </div>

                <div class="card-bottom">
                    <span class="card-location">
                        ◎ ${item.location}
                    </span>

                    <a
                        class="card-details"
                        href="opportunity.html?id=${item.id}"
                    >
                        View details →
                    </a>
                </div>

            </article>
        `;
    }).join("");

    if (resultsCount) {
        resultsCount.textContent =
            items.length + (items.length === 1 ? " result" : " results");
    }
}


/* 7. SEARCH AND FILTER */

function filterOpportunities() {
    if (!searchInput || !locationFilter) return;

    const keyword = searchInput.value.trim().toLowerCase();
    const selectedLocation = locationFilter.value;

    const filteredItems = opportunities.filter(function(item) {
        const searchableText = [
            item.title,
            item.organisation,
            item.category,
            item.type,
            item.location,
            item.description,
            ...item.tags
        ].join(" ").toLowerCase();

        const matchesKeyword = searchableText.includes(keyword);

        const matchesLocation =
            selectedLocation === "all" ||
            item.locationType === selectedLocation;

        return matchesKeyword && matchesLocation;
    });

    displayOpportunities(filteredItems);
}


/* 8. SEARCH FORM EVENTS */

if (searchForm) {
    searchForm.addEventListener("submit", function(event) {
        event.preventDefault();
        filterOpportunities();
    });
}

if (searchInput) {
    searchInput.addEventListener("input", filterOpportunities);
}

if (locationFilter) {
    locationFilter.addEventListener("change", filterOpportunities);
}


/* 9. SAVE OPPORTUNITIES */

if (opportunityGrid) {
    opportunityGrid.addEventListener("click", function(event) {
        const saveButton = event.target.closest("[data-save]");

        if (!saveButton) return;

        const id = Number(saveButton.dataset.save);

        if (savedOpportunities.includes(id)) {
            savedOpportunities = savedOpportunities.filter(
                savedId => savedId !== id
            );
        } else {
            savedOpportunities.push(id);
        }

        try {
            localStorage.setItem(
                SAVED_KEY,
                JSON.stringify(savedOpportunities)
            );

            filterOpportunities();
        } catch (error) {
            alert(
                "Your browser could not save this item. " +
                "Check your browser storage settings."
            );
        }
    });
}


/* 10. CATEGORY FILTERING */

const categoryCards = document.querySelectorAll("[data-category]");

categoryCards.forEach(function(card) {
    card.addEventListener("click", function() {
        if (!searchInput || !locationFilter) return;

        const category = card.dataset.category;

        searchInput.value = "";
        locationFilter.value = "all";

        const filteredItems = opportunities.filter(function(item) {
            return item.category === category;
        });

        displayOpportunities(filteredItems);

        const opportunitySection =
            document.getElementById("opportunities");

        if (opportunitySection) {
            opportunitySection.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


/* 11. MOBILE NAVIGATION */

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function() {
        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    navLinks.querySelectorAll("a").forEach(function(link) {
        link.addEventListener("click", function() {
            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        });
    });
}


/* 12. CURRENT YEAR */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* 13. BACK TO TOP */

const backToTop = document.getElementById("backToTop");

if (backToTop) {
    backToTop.addEventListener("click", function(event) {
        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* 14. INITIALISE HOMEPAGE */

displayOpportunities(opportunities);