const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    // Replace + characters with spaces
    body = body.replace(/\+/g, ' ');
    const decodedBody = decodeURIComponent(body);
    const bodyArray = decodedBody.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};


// here, you could declare one or more variables to store what comes back from the form.
let item = "Pick a Song for Lyrics";

const songs = {
  "Itsy Bitsy Spider": "The itsy bitsy spider crawled up the water spout.\n\
 Down came the rain, and washed the spider out.\n\
 Out came the sun, and dried up all the rain,\n\
 and the itsy bitsy spider went up the spout again.",
  "Twinkle Twinkle Little Star": "Twinkle, twinkle, little star,\n\
 How I wonder what you are.\n\
 Up above the world so high,\n\
 Like a diamond in the sky.",
  "Old MacDonald Had a Farm": "Old MacDonald had a farm\n\
 Ee i ee i o\n\
 And on his farm he had some cows\n\
 Ee i ee i oh\n\
 With a moo-moo here\n\
 And a moo-moo there\n\
 Here a moo, there a moo\n\
 Everywhere a moo-moo\n\
 Old MacDonald had a farm\n\
 Ee i ee i o"
};

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  let options = '';
  for (const [title, lyrics] of Object.entries(songs)) {
    options += `<option value="${lyrics}">${title}</option>`;
  }

  return `
  <body>
  <p>${item}</p>
  <form method="POST">
  <select name="item">
    ${options}
  </select>
  <button type="submit">Submit</button>
  </form>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      // here, you can add your own logic
      if (body["item"]) {
        item = body["item"];
      } else {
        item = "Nothing was entered.";
      }
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.listen(3000);
console.log("The server is listening on port 3000.");
