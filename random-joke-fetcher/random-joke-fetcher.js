/**
Objective: Create a function that fetches a random joke from the Official Joke API and logs it to the console.
Challenge: Extend the function to fetch and display 10 random jokes, ensuring they are displayed in the order they were fetched.
*/

//Objective
function randomJokeFetcher(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok!");
      }
      return response.json();
    })
    .catch((e) => {
      console.error("There was a problem with the fetch operation:");
      throw e;
    });
}

randomJokeFetcher("http://www.official-joke-api.appspot.com/random_joke")
  .then((data) => {
    console.log(data.setup);
    console.log(data.punchline);
    console.log("===========");
  })
  .catch((e) => {
    console.log("Failed to fetch the Joke", e);
  });

//Challenge (Promises)
function randomJokeFetcher2(url, count = 0) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok!");
      }
      return response.json();
    })
    .then((data) => {
      console.log(`${count + 1}: ${data.setup}`);
      console.log(data.punchline);
      console.log("===========");
      if (count < 1) {
        return randomJokeFetcher2(url, count + 1);
      }
    })
    .catch((e) => {
      console.error("There was a problem with the fetch operation:");
      throw e;
    });
}

randomJokeFetcher2("http://www.official-joke-api.appspot.com/random_joke", 0).catch((e) => {
  console.log(e);
});

//Challenge (async/await)
async function randomJokeFetcher2(url, count = 0) {
  try {
    const request = await fetch(url);
    if (!request.ok) {
      throw new Error("Error in the request");
    }
    const response = await request.json();
    console.log(`${count + 1}: ${response.setup} `);
    console.log(response.punchline);
    console.log("=================");

    if (count < 1) {
      return randomJokeFetcher2(url, count + 1);
    }
  } catch (e) {
    console.error("Problem happened while fetching the Joke:");
    throw e;
  }
}

randomJokeFetcher2("http://www.official-joke-api.appspot.com/random_joke", 0).catch((e) => console.log(e));
