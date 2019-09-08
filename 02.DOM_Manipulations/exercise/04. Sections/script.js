function create(words) {
    const container = document.getElementById('content');

    words.forEach(
        word => {
            const div = document.createElement('div');
            let p = document.createElement('p');
            p.style.display = 'none';
            p.textContent = word;
            div.appendChild(p);
            div.addEventListener('click', () => {
                p.style.display = 'inline-block';
            });
            container.appendChild(div);
        }
    );
}