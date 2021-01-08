const express = require('express');
const upload = require('./multer')

const cloudiary = require('./cloudinary')

const fs = require('fs')

const bodyParser = require('body-parser');
const { path } = require('dotenv/lib/env-options');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//make a post request
app.use('/upload', upload.array('image'), async (req, res) => {
    const uploader = async (path) => {
        await cloudiary.uploads(path, 'User_Profile')

        if (req.method === 'POST') {
            const urls = []

            const files = req.files

            for (const file of files) {
                const { path } = file

                const newPath = await uploader(path)

                urls.push(newPath)

                fs.unlinkSync(path)
            }
            res.status(200).json({
                message: "Images Uploaded Succesfully!!",
                data: urls
            })
        } else {
            res.json(405).json({
                err: "Images not uploaded!!"
            })
        }
    }
})

app.listen(4400, () => {
    console.log("Started on port http://localhost:4400/ ");
})