const username = "lbruss";

const reposDesejados = [
    "robo-desvia",
    "lab-redes01",
    "lab-redes02",
    "projetos-js"
];

fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(data => {
        const reposContainer = document.getElementById("repos");

        // filtra apenas os desejados
        const reposFiltrados = data.filter(repo => 
            reposDesejados.includes(repo.name)
        );

        reposFiltrados.forEach(repo => {
            const div = document.createElement("div");
            div.classList.add("repo");

            div.innerHTML = `
                <a href="${repo.html_url}" target="_blank">
                    ${repo.name}
                </a>
            `;

            reposContainer.appendChild(div);
        });
    });