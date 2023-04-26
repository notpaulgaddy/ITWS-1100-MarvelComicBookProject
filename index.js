// Comic search

createComicSearch({
  root: document.querySelector("#comic-search"),
  fetchData: getComics,
  renderResult: (comics) => {
    const resultRoot = document.querySelector(".section-search-result");
    resultRoot.innerHTML = "";
    for (let comic of comics) {
      const thumb =
        comic.thumbnail.path + "/portrait_xlarge." + comic.thumbnail.extension;
      const title = comic.title;
      const id = comic.id;
      const desc = comic.description ? comic.description : "No Description";
      const card = document.createElement("div");
      card.classList.add("comic-card");
      const newUrl = `pages/description-page/index.html?id=${id}`
      card.innerHTML = `<img src="${thumb}" class="comic-thumbnail" alt="comic thumbnail" />
                      <a href="${newUrl}">
                        <p class="comic-title">${title}</p>
                      </a>
                      `
      resultRoot.appendChild(card);
    }
  },
});

//<p class="comic-desc">${desc}</p>`;