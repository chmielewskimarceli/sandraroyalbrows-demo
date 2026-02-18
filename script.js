document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const icon = btn.querySelector('i');

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        if (menu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            btn.setAttribute('aria-expanded', 'false');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            btn.setAttribute('aria-expanded', 'true');
        }
    });

    const mobileLinks = menu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-md');
            navbar.classList.replace('h-20', 'h-16');
        } else {
            navbar.classList.remove('shadow-md');
            navbar.classList.replace('h-16', 'h-20');
        }
    });
});

const svg = document.getElementById("waves");
const width = 1920;
const height = 1080;
const totalLines = 20;

const rand = (min, max) => Math.random() * (max - min) + min;

let mouseY = height / 2;
document.addEventListener("mousemove", e => {
    mouseY = e.clientY;
});

const lines = [];

for (let i = 0; i < totalLines; i++) {
    const y = rand(100, height - 100);
    const amplitude1 = rand(40, 100);
    const amplitude2 = rand(40, 100);
    const cp1x = rand(width * 0.1, width * 0.45);
    const cp2x = rand(width * 0.55, width * 0.9);
    const strokeWidth = rand(1.2, 2.6);
    const opacity = rand(0.3, 0.7);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke", "url(#gold)");
    path.setAttribute("stroke-width", strokeWidth);
    path.setAttribute("fill", "none");
    path.setAttribute("opacity", opacity);
    path.setAttribute("filter", "url(#softGlow)");
    svg.appendChild(path);

    lines.push({
        y,
        cp1x,
        cp2x,
        baseAmplitude1: amplitude1,
        baseAmplitude2: amplitude2,
        cp1y: y - amplitude1,
        cp2y: y + amplitude2,
        direction: 1,
        speed: rand(0.1, 0.3),
        path
    });
}

function animate() {
    for (let line of lines) {
        line.cp1y += line.direction * line.speed;
        line.cp2y -= line.direction * line.speed;

        if (line.cp1y > line.y + line.baseAmplitude1 || line.cp1y < line.y - line.baseAmplitude1) {
            line.direction *= -1;
        }

        const dist = Math.abs(mouseY - line.y);
        const influence = Math.max(0, 1 - dist / 200);
        line.cp1y += (mouseY - line.cp1y) * 0.05 * influence;
        line.cp2y += (mouseY - line.cp2y) * 0.05 * influence;

        const d = `
            M0 ${line.y}
            C ${line.cp1x} ${line.cp1y},
              ${line.cp2x} ${line.cp2y},
              ${width} ${line.y}
        `;
        line.path.setAttribute("d", d);
    }
    requestAnimationFrame(animate);
}

animate();

function openLightbox(src) {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = src;
    lb.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}