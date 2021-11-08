const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

const PORT = 5000;

let movies = [];
fs.readFile("./movies.json", (err, data) => {
  movies = JSON.parse(data.toString());
});

console.log(movies);
app.get("/movies", (req, res) => {
  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  let id = req.params.id;
  let filtered = movies.filter((elem) => elem.id === Number(id));
  res.json(filtered);
});

app.post("/add", (req, res) => {
  const { id, name, isFav, isDeleted } = req.body;
  movies.push({ id: movies.length, name: name, isFav: isFav, isDeleted: isDeleted });
  fs.writeFile("./movies.json", JSON.stringify(movies),(err,data)=>{});
  res.json(movies);
});

app.put('/update/:id',(req,res)=>{
    const updated = movies.map((element)=>{
        if(element.id == req.params.id){
            return { id: element.id, name: req.body.name, isFav: req.body.isFav, isDeleted: req.body.isDeleted }
        } else return element;
    })
    fs.writeFile("./movies.json", JSON.stringify(updated),(err,data)=>{});
    res.json(updated);
})


app.listen(PORT, () => {
  console.log("server is running..");
});