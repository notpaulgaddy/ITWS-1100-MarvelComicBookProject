// const currentUrl = window.location.href;
// const searchParams = new URLSearchParams(new URL(url).search);
// const pageid = searchParams.get("id");
// console.log(pageid);
// Define your Marvel API credentials
const publicKey = "a8760f5c8e45774a36a2b0f29bc9d90c";
const privateKey = "4b02f4d73ddaee831368e1cd4cfdb9f9e8868e4a";

  // Define the function to get comic book data by ID
  async function getComicById(theId) {
    // Generate a timestamp for the API request
    const timestamp = new Date().getTime().toString();

    // Generate a hash for the API request
    const hash = md5(timestamp + privateKey + publicKey);

    // Build the API URL
    const apiUrl = `https://gateway.marvel.com/v1/public/comics/${theId}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

    try {
      // Fetch comic book data from the Marvel API
      const response = await fetch(apiUrl);
      const json = await response.json();

      // Check if the API response contains data
      if (json.data && json.data.results && json.data.results.length > 0) {
        const comic = json.data.results[0];
        const thumb = comic.thumbnail.path + "/portrait_xlarge." + comic.thumbnail.extension;
        let theDate = comic.dates[0].date;
        let displayDate = theDate.slice(0,10)
        document.getElementById("comicImg").src =thumb; 
        document.getElementById("comicTitle").innerHTML = comic.title;
        document.title = comic.title;
        document.getElementById("releaseDate").innerHTML = "<b>Release Date: </b>" + displayDate;
        document.getElementById("comicIsbn").innerHTML = "<b>Issue #: </b>" + comic.issueNumber;
        document.getElementById("comicPrice").innerHTML = "<b>USD Price: </b>" + comic.prices[0].price;
        document.getElementById("amtOfPages").innerHTML = "<b>Page Count: </b>" + comic.pageCount;
        document.getElementById("comicDesc").innerHTML = comic.description;
      } else {
        console.log('Comic not found.');

      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Call the function with the desired comic book ID
  const comicId = new URLSearchParams(window.location.search).get('id'); // Replace with the ID of the comic book you want to retrieve
  getComicById(comicId);

