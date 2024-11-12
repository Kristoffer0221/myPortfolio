var typed = new Typed(".text", {
    strings: ["CvSU Student", "ComSci Student", "3rd Year College"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');


navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); 
        const targetId = this.getAttribute('href'); 
        const targetSection = document.querySelector(targetId); 
        
        targetSection.scrollIntoView({ behavior: 'smooth' });

        navLinks.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');

        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

window.onscroll = () => {
    let top = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(nav => {
                nav.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
};

ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal('.home-content, heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .skills-container, .portfolio-box, .contact form', { origin: 'button' });
ScrollReveal().reveal('.about-img', { origin: 'left' });
ScrollReveal().reveal('.home-contact p, .about-text', { origin: 'right' });
ScrollReveal().reveal('footer', { origin: 'bottom' });


function emailSend() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let subject = document.getElementById("subject").value.trim();
    let message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
        alert("All fields are required!");
        return false; 
    }

    let parms = {
        name: name,
        email: email,
        subject: subject,
        message: message,
    };

    emailjs.send("service_fd9zyea", "template_i9ljkhe", parms)
        .then(() => {
            showModal("success");
            document.querySelector("form").reset(); 
        })
        .catch(error => {
            showModal("failure");
            console.error("Email send failed: ", error);
        });
}


function showModal(type) {
    let modal = type === "success" ? document.getElementById("successModal") : document.getElementById("failureModal");
    modal.style.display = "block";
}


function closeModal() {
    document.getElementById("successModal").style.display = "none";
    document.getElementById("failureModal").style.display = "none";
}


window.onclick = function(event) {
    if (event.target === document.getElementById("successModal") || event.target === document.getElementById("failureModal")) {
        closeModal();
    }
}

