const url = "https://jsonplaceholder.typicode.com/posts";

const carregandoConteudo = document.querySelector("#carregando");
const postsContainer = document.querySelector("#posts-container");

//GET id from URL
const urlSearchParams= new URLSearchParams(window.location.search);
const postId = urlSearchParams.get("id"); 

// GET conteudo dos posts
async function getConteudoPosts() {
    const resposta = await fetch(url);

    console.log(resposta);

    const dadosDosPosts = await resposta.json();
    
    console.log(dadosDosPosts);

    carregandoConteudo.classList.add("hide");

    dadosDosPosts.map ((post) => {
        const div = document.createElement("div");
        const title = document.createElement("h2");
        const body = document.createElement("p");
        const link = document.createElement("a");

        title.innerText = post.title;
        body.innerText = post.body;
        link.innerText = "Ler mais";
        link.setAttribute("href", `/post.html?id=${post.id}`);

        div.appendChild(title);
        div.appendChild(body);
        div.appendChild(link);

        postsContainer.appendChild(div);
    });
}

 
const postPage = document.querySelector("#post");
const postContainerIndv = document.querySelector("#post-container");
const comentariosContainer = document.querySelector("#comentario-container");

// GET post individual
async function getPost(id) {
    const [respostaPost, respostaComentarios] = await Promise.all([
        fetch(`${url}/${id}`),
        fetch(`${url}/${id}/comments`)
    ])

    const dadoPost = await respostaPost.json();

    const dadoComentarios = await respostaComentarios.json();

    carregandoConteudo.classList.add("hide");
    postPage.classList.remove("hide");

    const title = document.createElement("h1");
    const body = document.createElement("p");

    title.innerText = dadoPost.title;
    body.innerText = dadoPost.body;

    postContainerIndv.appendChild(title);
    postContainerIndv.appendChild(body);

    console.log(dadoComentarios);

    dadoComentarios.map((comment) => {
        criarComentario(comment);
    });
}

function criarComentario(comment) {
    const div = document.createElement("div");
    const email = document.createElement("h3");
    const comentarioBody = document.createElement("p");

    email.innerText = comment.email;
    comentarioBody.innerText = comment.body;
    
    div.appendChild(email);
    div.appendChild(comentarioBody);

    comentariosContainer.appendChild(div);

}

const formComentarios = document.querySelector("#form-comentarios");
const emailInput = document.querySelector("#email");
const bodyInput = document.querySelector("#body");

// Post comentario
async function postComentario(comment) {
    const resposta = await fetch(`${url}/${postId}/comments`,{
        method: "POST",
        body: comment,
        headers: {
            "Content-type": "application/json",
        }
    });

    const dado = await resposta.json();

    criarComentario(dado);
}

if(!postId) {
    getConteudoPosts();

} else {
    getPost(postId);

    // Adicionar event comentario form
    formComentarios.addEventListener("submit", (e) => {
        e.preventDefault();

        let comment = {
            email: emailInput.value,
            body: bodyInput.value,
        }

        comment = JSON.stringify(comment);

        postComentario(comment);
    });
}




























/*let postagem = {
    titulo: "tituloDoPost",
    mensagem: "conteudoDoPost",
    autor: "autorDoPost",
    vizualizacoes: 10,
    comentarios: [
        {autor: "autorNro1", mensagem: "opiniaoNro1"},
        {autor: "autorNro2", mensagem: "opiniaoNro2"}
    ],
    estaAoVivo: true 
}*/