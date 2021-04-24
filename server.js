const express = require('express');
const app = express();
const fetch = require('node-fetch');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'))
const cors = require('cors')

app.use(cors())


app.post('/getData', (req, res) => {
    try {
        const { valueCarNumber } = req.body
        console.log(valueCarNumber)
        let alldata = []
        fetch(
            `https://data.gov.il/api/3/action/datastore_search?q=${valueCarNumber}&resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3`
        ).then(j => j.json())
            .then(data => {
                if (data.result.records[0] == undefined) {
                    fetch(
                        `https://data.gov.il/api/3/action/datastore_search?q=0${valueCarNumber}&resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3`
                    ).then(j => j.json())
                        .then(data => {
                            if (data.result.records[0] == undefined) {
                                res.send(false)
                            }
                            else {
                                alldata.push(data.result.records[0])
                                Promise.all(
                                    [
                                        gatalldata(data.result.records[0]),
                                        getnecha(valueCarNumber)
                                    ]
                                ).then(data => {
                                    alldata.push(data[0], data[1])
                                    res.send(alldata)
                                })
                            }
                        })
                } else {
                    alldata.push(data.result.records[0])
                    Promise.all(
                        [
                            gatalldata(data.result.records[0]),
                            getnecha(valueCarNumber)
                        ]
                    ).then(data => {
                        alldata.push(data[0], data[1])
                        res.send(alldata)
                    })
                }
            })
    } catch (err) {
        console.log(err)
    }
})


// מידע מפורט על הרכב
function gatalldata(d) {
    return new Promise((resolve, reject) => {
        fetch(`https://data.gov.il/api/3/action/datastore_search?q=${encodeURIComponent(`${test(d.tozeret_cd)} ${test(d.degem_cd)} ${test(d.shnat_yitzur)}`)}&resource_id=142afde2-6228-49f9-8a29-9b6c3a0cbe40`)
            .then(j => j.json())
            .then(data => resolve(data.result.records[0]))
            .catch(e => reject(e))
    })
}


// תו נכה
function getnecha(i) {
    return new Promise((resolve, reject) => {
        fetch(`https://data.gov.il/api/3/action/datastore_search?q=${i}&resource_id=c8b9f9c8-4612-4068-934f-d4acd2e3c06e`)
            .then(j => j.json())
            .then(data => resolve(data.result.records[0]))
            .catch(e => reject(e))
    })
}



function test(text) {
    return text == null ? '' : text
}



const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listen on port ${port}`)
})