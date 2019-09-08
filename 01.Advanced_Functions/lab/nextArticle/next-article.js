function getArticleGenerator(input) {
    const div = document.getElementById('content');
    let articleIndex = 0;

    function getNextArticle() {
        if (articleIndex <= input.length - 1) {
            let article = document.createElement("article");
            let paragraph = document.createElement('p');
            paragraph.innerHTML = `${input[articleIndex++]}`;
            article.appendChild(paragraph);

            div.appendChild(article);
        }
    }

    return getNextArticle;
}