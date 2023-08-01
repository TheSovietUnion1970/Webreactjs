/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
const scrollActive = () => {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.sidebar a[href*=' + sectionId + ']')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== HAMBURGER ACTIVE ===============*/
// Get the second line element
var secondLine = document.querySelector(".hamburger line:nth-child(2)");

// Add a click event listener to the SVG element
document.querySelector(".hamburger").addEventListener("click", function () {
    // Get the current value of the x2 attribute
    var currentX2 = secondLine.getAttribute("x2");

    // Toggle the x2 attribute between 12.8 and 20
    if (currentX2 === "20") {
        secondLine.setAttribute("x2", "12.8");
    } else {
        secondLine.setAttribute("x2", "20");
    }
});

// Get the hamburger element
var hamburger = document.querySelector(".hamburger");

// Get the aside element
var aside = document.querySelector(".aside");

// Add a click event listener to the hamburger element
hamburger.addEventListener("click", function () {
    // Toggle the left property of the sidebar element between 0 and -190 pixels
    if (aside.style.left === "-190px") {
        aside.style.left = "0";
        document.querySelectorAll(".sidebar-item-link span").forEach(function (span) {
            span.style.display = "inline-block";
        });
        document.querySelectorAll(".aside__heading").forEach(function (heading) {
            heading.style.display = "flex";
        });
        document.querySelectorAll(".sidebar-item-icon").forEach(function (icon) {
            icon.style.position = "relative";
            icon.style.marginTop = "0";
            icon.classList.remove('move-left');
        });
    } else {
        aside.style.left = "-190px";
        document.querySelectorAll(".sidebar-item-link span").forEach(function (span) {
            span.style.display = "none";
        });
        document.querySelectorAll(".aside__heading").forEach(function (heading) {
            heading.style.display = "none";
        });
        document.querySelectorAll(".sidebar-item-icon").forEach(function (icon) {
            icon.style.position = "absolute";
            icon.style.marginTop = "25px";
            icon.classList.add('move-left');
        });
    }
});

