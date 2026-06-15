const username = "lbruss";

const reposDesejados = [
    "robo-desvia",
    "lab-redes01",
    "lab-redes02",
    "integrator-project1",
    "projetos-js"
];

const descricoes = {
    "robo-desvia": "Projeto com Arduino e robótica.",
    "lab-redes01": "Laboratório prático de redes.",
    "lab-redes02": "Segundo laboratório de redes.",
    "integrator-project1": "Projeto Integrador | ConnectStar.",
    "projetos-js": "Projetos desenvolvidos em JavaScript."
};

const nomesBonitos = {
    "robo-desvia": "🤖 Robô Desvia",
    "lab-redes01": "🌐 Laboratório de Redes I",
    "lab-redes02": "🌐 Laboratório de Redes II",
    "integrator-project1": "🏢 Projeto Integrador | ConnectStar",
    "projetos-js": "📜 Projetos JavaScript"
};

const reposContainer = document.getElementById("repos");

reposContainer.innerHTML =
    `<p class="loading">Carregando projetos...</p>`;

fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao buscar repositórios.");
        }

        return response.json();
    })
    .then(data => {

        reposContainer.innerHTML = "";

        const reposFiltrados = reposDesejados
            .map(nome =>
                data.find(repo => repo.name === nome)
            )
            .filter(repo => repo !== undefined);

        if (reposFiltrados.length === 0) {
            reposContainer.innerHTML =
                `<p class="error">Nenhum projeto encontrado.</p>`;
            return;
        }

        reposFiltrados.forEach(repo => {

            const projeto = document.createElement("a");

            projeto.href = repo.html_url;
            projeto.target = "_blank";
            projeto.rel = "noopener noreferrer";

            projeto.classList.add("repo");

            projeto.innerHTML = `
                <strong>
                    ${nomesBonitos[repo.name] || repo.name}
                </strong>

                <span>
                    ${descricoes[repo.name] || "Projeto no GitHub."}
                </span>
            `;

            reposContainer.appendChild(projeto);

        });

    })
    .catch(error => {

        reposContainer.innerHTML =
            `<p class="error">Não foi possível carregar os projetos.</p>`;

        console.error(error);

    });
