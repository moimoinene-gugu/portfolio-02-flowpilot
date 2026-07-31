const cards = document.querySelectorAll(".feature-card");

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry,index)=>{

        if(entry.isIntersecting){

            setTimeout(()=>{
                entry.target.classList.add("show");
            },index*200);

        }

    });

},{
    threshold:0.2
});

cards.forEach(card=>{
    observer.observe(card);
});
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
        const faqItem = question.closest(".faq-item");

        faqItem.classList.toggle("active");
    });
});
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15,
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");

        menuToggle.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", isOpen);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}
/* ==========================
   Sticky Navigation Effect
========================== */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});
const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = Number(counter.dataset.target);
            const prefix = counter.dataset.prefix || "";
            const suffix = counter.dataset.suffix || "";

            let current = 0;
            const duration = 1200;
            const startTime = performance.now();

            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                current = Math.floor(target * progress);

                counter.textContent =
                    prefix +
                    current.toLocaleString() +
                    suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            };

            requestAnimationFrame(updateCounter);
            observer.unobserve(counter);
        });
    },
    {
        threshold: 0.4
    }
);

counters.forEach((counter) => {
    counterObserver.observe(counter);
});
const chartBars = document.querySelectorAll(".dashboard-chart span");

const chartObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            chartBars.forEach((bar, index) => {

                setTimeout(() => {
                    bar.style.transform = "scaleY(1)";
                }, index * 120);

            });

            observer.unobserve(entry.target);

        });

    },
    {
        threshold: 0.4
    }
);

const chart = document.querySelector(".dashboard-chart");

if (chart) {
    chartObserver.observe(chart);
}