const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const createComicSearch = ({ root, fetchData, renderResult }) => {
  root.innerHTML = `<input class="comic-search-input" placeholder="Enter a comic name"/>`;

  const input = root.querySelector(".comic-search-input");

  const onInput = async (event) => {
    const comics = await fetchData(event.target.value, 30);
    renderResult(comics);
  };

  input.addEventListener("input", debounce(onInput, 500));
};
