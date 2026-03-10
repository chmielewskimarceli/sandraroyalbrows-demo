document.addEventListener('DOMContentLoaded', () => {
    // --- Menu & Navbar (Bez zmian w logice) ---
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const icon = btn.querySelector('i');

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        if (menu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.replace('h-20', 'h-16');
            navbar.classList.add('shadow-md');
        } else {
            navbar.classList.replace('h-16', 'h-20');
            navbar.classList.remove('shadow-md');
        }
    }, { passive: true });

    // --- Optymalizacja Animacji (Wygląd 1:1) ---
    const svg = document.getElementById("waves");
    const width = 1920;
    const height = 1080;
    const isMobile = window.innerWidth < 768;
    const totalLines = 20; 
    const rand = (min, max) => Math.random() * (max - min) + min;

    let mouseY = height / 2;
    document.addEventListener("mousemove", e => {
        mouseY = (e.clientY / window.innerHeight) * height;
    }, { passive: true });

    document.addEventListener("touchmove", e => {
        mouseY = (e.touches[0].clientY / window.innerHeight) * height;
    }, { passive: true });

    const lines = [];

    // --- Zmieniony fragment wewnątrz pętli for (generowanie linii) ---

for (let i = 0; i < totalLines; i++) {
    const y = rand(100, height - 100);
    const amplitude1 = rand(40, 100);
    const amplitude2 = rand(40, 100);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke", "url(#gold)");
    path.setAttribute("stroke-width", rand(1.2, 2.6));
    path.setAttribute("fill", "none");
    path.setAttribute("opacity", rand(0.3, 0.7));
    
    if (!isMobile) {
        path.setAttribute("filter", "url(#softGlow)");
    }
    
    svg.appendChild(path);

    lines.push({
        y,
        cp1x: rand(width * 0.1, width * 0.45),
        cp2x: rand(width * 0.55, width * 0.9),
        baseAmplitude1: amplitude1,
        baseAmplitude2: amplitude2,
        cp1y: y - amplitude1,
        cp2y: y + amplitude2,
        direction: 1,
        // ZMNIEJSZONA PRĘDKOŚĆ: z 0.1-0.3 na 0.03-0.08
        speed: rand(0.03, 0.08), 
        path
    });
}

    let lastTime = 0;

    function animate(currentTime) {
        // Delta czasu pozwala zachować stałą prędkość niezależnie od odświeżania ekranu
        const deltaTime = (currentTime - lastTime) / 16; 
        lastTime = currentTime;

        // Jeśli karta jest nieaktywna, deltaTime może być ogromny, co powoduje "skok". Limitujemy to.
        const step = deltaTime > 2 ? 1 : deltaTime;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            // Logika ruchu identyczna z oryginałem, pomnożona o step dla płynności
            line.cp1y += line.direction * line.speed * step;
            line.cp2y -= line.direction * line.speed * step;

            if (line.cp1y > line.y + line.baseAmplitude1 || line.cp1y < line.y - line.baseAmplitude1) {
                line.direction *= -1;
            }

            const dist = Math.abs(mouseY - line.y);
            const influence = Math.max(0, 1 - dist / 200);
            
            line.cp1y += (mouseY - line.cp1y) * 0.05 * influence * step;
            line.cp2y += (mouseY - line.cp2y) * 0.05 * influence * step;

            // Najszybszy sposób budowania atrybutu 'd' bez zaokrągleń toFixed
            line.path.setAttribute("d", 
                "M0 " + line.y + 
                "C" + line.cp1x + " " + line.cp1y + "," + 
                line.cp2x + " " + line.cp2y + "," + 
                width + " " + line.y
            );
        }
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
});

function openLightbox(src) {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = src;
    lb.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}


