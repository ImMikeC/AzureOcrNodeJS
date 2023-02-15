const { ComputerVisionClient } = require("@azure/cognitiveservices-computervision");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");

const subscriptionKey = "4715df58f9ad49ae8218dd76edc6158b";
const endpoint = "https://cs-hs-techlabs-dev-001.cognitiveservices.azure.com/";

const credentials = new CognitiveServicesCredentials(subscriptionKey);
const client = new ComputerVisionClient(credentials, endpoint);

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser);
//app.use(express.json());

app.post("/ocr", async (req, res) => {
  const { imageUrl } = req.body.imageUrl;

  try {
    console.log(imageUrl)
    const result = await client.recognizePrintedText(false, { url: imageUrl });
    const recognizedText = result.lines.map((line) => line.text).join("\n");
    res.json( {recognizedText} );
  } catch (error) {
    console.log(error);
    res.status(500).send("Error recognizing text");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
