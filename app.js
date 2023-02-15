const { ComputerVisionClient } = require("@azure/cognitiveservices-computervision");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");

const subscriptionKey = "4715df58f9ad49ae8218dd76edc6158b";
const endpoint = "https://cs-hs-techlabs-dev-001.cognitiveservices.azure.com/";

const credentials = new CognitiveServicesCredentials(subscriptionKey);
const client = new ComputerVisionClient(credentials, endpoint);

var fs = require("fs");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.post('/ocr', async (req, res) => {

  const image = req.body.imageUrl;

  try {
    const result = await client.recognizePrintedText(false, image);
    //const text = result.lines(line => line.text).join('\n')
    res.json(result);
    fs.writeFileSync('archivo.json', JSON.stringify(result))
    console.table(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'No se pudo reconocer texto en imagen.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
