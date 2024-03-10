const fs = require("fs");

const readSream = fs.createReadStream("./docs/blog3.txt", { encoding: "utf8" });
const writeSream = fs.createWriteStream("./docs/blog4.txt", { encoding: "utf8" });

/*readSream.on("data", (chunk) => {
  console.log("----NEW CHUNK----");
  writeSream.write("\nNEW LINE\n");
  writeSream.write(chunk);
});*/

//piping
readSream.pipe(writeSream);