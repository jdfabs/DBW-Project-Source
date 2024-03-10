const fs = require("fs");

const writeFile = fs.writeFile; // Add this line to create a reference to the fs.writeFile function

//async
fs.readFile("./docs/test.txt", (err, data) => {
  if (err) console.log("error");
  console.log(data.toString());
});

fs.writeFile("./docs/test.txt", "hello, world", () => {
  console.log("file was writen");
});

fs.writeFile("./docs/test2.txt", "hello, world", () => {
  console.log("file was writen");
});

if (!fs.existsSync("./assets")) {
  //Equivalente ao thread wait
  fs.mkdir("./assets", (err) => {
    if (err) console.log("error");
    console.log("folder created");
  });
} else {
  fs.rmdir("./assets", (err) => {
    if (err) console.log("error");
    console.log("folder deleted");
  });
}

if(fs.existsSync("./docs/deleteme.txt")){
  fs.unlink("./docs/deleteme.txt", (err) => {
    if (err) console.log("error");
    console.log("file deleted");
  });
}
else{
  fs.writeFile("./docs/deleteme.txt", "hello, world", () => {
    console.log("file was writen");
  });
}
