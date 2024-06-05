let url_base = 'https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=10'

function click_button(){
    const coracao = document.querySelector("#icone");

    // Realiza verificação se o ícone existe
    if(coracao){
        coracao.addEventListener("click", function(){
            alert('clicou')
        });
    }
}
// Função para alternar a classe do ícone
function toggleIconeClass(){
    this.classList.toggle("filled");
}

function getNewsAPI(){
    // função response por dar o get
    const url = new Request(url_base)
    fetch(url).then(response => {

        if(!response.ok){
            console.log('erro ao solicitar o get')
        }
        // retornando response 
        return response.json();
    }).then(data => {
        let noticias = data['items'];
        exibir_news(noticias)
        document.querySelector('#searchInput').addEventListener('input', function() {
            buscar(noticias); // Chama a função buscar() passando as notícias como parametro
        });
    })
}

function exibir_news(noticias){
    const newsContainer = document.querySelector('.news-container');

    // Seleciona o template
    const newsItemTemplate = document.querySelector('.template_news');

    // clear container
    newsContainer.innerHTML = '';
    
    noticias.forEach(news => {
        var titulo = news['titulo'];
        var descricao = news['introducao'];

        // clonar base noticias
        const newsItem = newsItemTemplate.cloneNode(true);

        newsItem.querySelector('h2').textContent = titulo;
        newsItem.querySelector('.descricao').textContent = descricao;

        newsContainer.appendChild(newsItem);
    });
}

function buscar(noticias) {
    const termoBusca = document.querySelector('#searchInput').value.trim().toLowerCase(); // Obtém o termo de busca
    const noticiasFiltradas = noticias.filter(news => news.titulo.toLowerCase().includes(termoBusca)); // Filtra as notícias
    if (termoBusca === ''){
        exibir_news(noticias)
    }else {
        if (noticiasFiltradas.length > 0){
            exibir_news(noticiasFiltradas); // Exibe as notícias filtradas
        }
    }
    
}

// Executar o codigo quando a pagina estiver tota carregada :)
document.addEventListener("DOMContentLoaded", function(){
    getNewsAPI();
    click_button();
})

