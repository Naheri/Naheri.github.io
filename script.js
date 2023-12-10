document.addEventListener('DOMContentLoaded', function () {
    const filmThumbnails = document.getElementById('film-thumbnails');
    const addedFilmIds = new Set(); // anti-doublons
    const maxFilmsToShow = 12; // limite de 12 films
    let fileIncrement = 1;

    fetch('https://ghibliapi.vercel.app/films')
        .then(response => response.json())
        .then(data => {
            // slice pour prendre seulement les 12 premiers films
            data.slice(0, maxFilmsToShow).forEach(film => {
                if (!addedFilmIds.has(film.id)) {
                    // lien pour chaque vignette
                    const link = document.createElement('a');
                    link.href = `/films/film${fileIncrement}.html?id=${film.id}`;
                    link.classList.add('film-link');

                    // vignette à l'intérieur du lien
                    const thumbnail = document.createElement('div');
                    thumbnail.classList.add('thumbnail');
                    thumbnail.innerHTML = `
                        <img src="${film.image}" alt="${film.title}" width="150" height="225">
                        <p>${film.title}</p>
                    `;

                    // la vignette à l'intérieur du lien
                    link.appendChild(thumbnail);

                    // le lien à la liste des vignettes
                    filmThumbnails.appendChild(link);

                    // l'ID du film à l'ensemble pour éviter les doublons
                    addedFilmIds.add(film.id);
                    fileIncrement++;   
                }
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des données :', error));
});

// bouton pour revenir en haut
document.addEventListener('DOMContentLoaded', function () {
    const scrollToTopButton = document.getElementById('scroll-to-top');
    scrollToTopButton.addEventListener('click', function () {

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

