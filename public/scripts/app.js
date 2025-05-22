const container = document.getElementById("animes-container")

data =[
    {
        title:"Honzuki no Gekokujou.",
        n_seasons:"3",
        genres:["isekai","Slice of Life"],
        image:"./../assets/honzuki.jpeg",
        alt_text:"AoB"
    },
    {
        title:"Bocchi the rock.",
        n_seasons:"1",
        genres:["Slice of Life", "Comedy","Music"],
        image:"./../assets/bocchi.jpeg",
        alt_text:"Bocchi la roquita"
    },
    {
        title:"Honzuki no Gekokujou.",
        n_seasons:"3",
        genres:["isekai","Slice of Life"],
        image:"./../assets/honzuki.jpeg",
        alt_text:"AoB"
    },
    {
        title:"Bocchi the rock.",
        n_seasons:"1",
        genres:["Slice of Life", "Comedy","Music"],
        image:"./../assets/bocchi.jpeg",
        alt_text:"Bocchi la roquita"
    },
    {
        title:"Honzuki no Gekokujou.",
        n_seasons:"3",
        genres:["isekai","Slice of Life"],
        image:"./../assets/honzuki.jpeg",
        alt_text:"AoB"
    },
    {
        title:"Bocchi the rock.",
        n_seasons:"1",
        genres:["Slice of Life", "Comedy","Music"],
        image:"./../assets/bocchi.jpeg",
        alt_text:"Bocchi la roquita"
    },
    {
        title:"Honzuki no Gekokujou.",
        n_seasons:"3",
        genres:["isekai","Slice of Life"],
        image:"./../assets/honzuki.jpeg",
        alt_text:"AoB"
    },
    {
        title:"Bocchi the rock.",
        n_seasons:"1",
        genres:["Slice of Life", "Comedy","Music"],
        image:"./../assets/bocchi.jpeg",
        alt_text:"Bocchi la roquita"
    },
    {
        title:"Honzuki no Gekokujou.",
        n_seasons:"3",
        genres:["isekai","Slice of Life"],
        image:"./../assets/honzuki.jpeg",
        alt_text:"AoB"
    },
    {
        title:"Bocchi the rock.",
        n_seasons:"1",
        genres:["Slice of Life", "Comedy","Music"],
        image:"./../assets/bocchi.jpeg",
        alt_text:"Bocchi la roquita"
    },
]

const setAnimeBox = (arr = data) => {
    container.innerHTML += arr
      .map(
        ({ title, n_seasons, genres, image, alt_text }) => {
          return `
          <div class="anime-box">
            <img alt="${alt_text}" src="${image}">
            <p class="anime-title">Title: ${title}</p>
            <p class="n-seasons">Seasons: ${n_seasons}.</p>
            <p class="genre">Genres: ${genres.join(", ")}.</p>
            <button type="button" class="btn-anime btn-edit">Edit anime</button>
            <button type="button" class="btn-anime btn-delete">Delete anime</button>
          </div>
        ` }
      )
      .join("");
    /*                
                    <div class="anime-box">
                        <img alt="AoB" src="./images/honzuki.jpeg">
                        <p class="anime-title">Title: Honzuki no Gekokujou.</p>
                        <p class="n-seasons">Seasons: 3.</p>
                        <p class="genre">Genres: Isekai, Slice of Life.</p>
                        <button type="button" class="btn-anime btn-edit">Edit anime</button>
                        <button type="button" class="btn-anime btn-delete">Delete anime</button>
                    </div>
    */ 
  };

setAnimeBox(data)