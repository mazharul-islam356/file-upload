const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const multer = require("multer");
dotenv.config()
const { MongoClient, ServerApiVersion } = require('mongodb');




const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5001;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2amgiws.mongodb.net/?retryWrites=true&w=majority`;


// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const dataCollection = client.db("fileUploadDB").collection("allData");

    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

   // Route to handle file upload
  app.post("/upload", upload.single("file"), async (req, res) => {
    try {
      const fileDocument = {
        name: req.file.originalname,
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
      const result = await dataCollection.insertOne(fileDocument);
      res.status(200).json({ message: "File uploaded successfully", fileId: result.insertedId });
    } catch (error) {
      res.status(500).json({ error: "Failed to upload file" });
    }
  });

  // Route to retrieve a file by ID
  app.get("/file/:id", async (req, res) => {
    try {
      const fileId = new ObjectId(req.params.id);
      const file = await filesCollection.findOne({ _id: fileId });

      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }

      res.set("Content-Type", file.contentType);
      res.send(file.data);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve file" });
    }
  });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send('file upload server is running')
})


app.listen(port, ()=> {
    console.log(`file upload is running at ${port}`);
})