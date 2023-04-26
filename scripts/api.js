const PUBLIC_KEY = "a8760f5c8e45774a36a2b0f29bc9d90c";
const PRIVATE_KEY = "4b02f4d73ddaee831368e1cd4cfdb9f9e8868e4a";

const base_url = "https://gateway.marvel.com/";

async function getComics(searchTerm, searchLimit) {
  let url = base_url + "v1/public/comics";
  const ts = Date.now();
  params = {
    apikey: PUBLIC_KEY,
    hash: md5(ts + PRIVATE_KEY + PUBLIC_KEY),
    ts: ts,
    titleStartsWith: searchTerm,
    noVariants: true,
    limit: searchLimit,
  };

  url += "?" + new URLSearchParams(params).toString();
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Status code error: ${response.status}`);
  }
  const comics = await response.json();
  return comics.data.results;
}

async function getComicById(id) {
  let url = base_url + "v1/public/comics/" + id;
  const ts = Date.now();
  params = {
    apikey: PUBLIC_KEY,
    hash: md5(ts + PRIVATE_KEY + PUBLIC_KEY),
    ts: ts,
  };

  url += "?" + new URLSearchParams(params).toString();
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Status code error: ${response.status}`);
  }
  const comic = await response.json();
  return comic;
}
async function getComicById(theId){
  
}

// Sample fetch comics
getComics("iron", 25)
  .then((comics) => {
    console.log(comics);
  })
  .catch((err) => {
    console.log(err);
  });

// getComicById(95698)
//   .then((comic) => {
//     console.log(comic);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
