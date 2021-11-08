const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");
const PORT = 5000;

let movies = [];
fs.readFile("./movies.json", (err, data) => {
  movies = JSON.parse(data.toString());
});

app.get("/readarr", (req, res) => {
  res.status(200);
  res.json(movies);
});

app.post("/add", (req, res) => {
  const { id, name, isFav, isdeleted } = req.body;
  movies.push({ id: movies.length, name: name, isFav: isFav, isdeleted: isdeleted });
  fs.writeFile("./movies.json", JSON.stringify(movies),(err,data)=>{});
  res.json(movies);movies
});

app.put("/update/:id", (req, res) => {
  const update = movies.map((element) => {
    if (element.id == req.params.id) {
      return {
        id: element.id,
        name: req.body.name,
        isFav: req.body.isFav,
        isDeleted: req.body.isDeleted,
      };
    } else return element;
  });
  fs.writeFile("./movies.json", JSON.stringify(update), (err, data) => {});
  let filtered = movies.filter((elem) => elem.isDeleted === "false");
  res.json(filtered);
}); 

app.delete("/deleMov/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile("./movies.json", (err, data) => {
    let movies = JSON.parse(data.toString());

    movies.forEach((item) => {
      if (id == item.id) {
        if (item.isDeleted) {
          res.status(404).json("Not found");
        } else {
          item.isDeleted = true;
          addToFile(movies);
          res.status(200).json(movies);
        }
      }
    });
    
  });
});



app.listen(PORT, () => {
  console.log("Server Under ATTack");
});
