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

        let alldata = [
            {
                type: "",
                data1: "",
                data2: "",
                tgncha: "",
                zium: "",
                nkudtIgun: "",
                cmut: ""
            }
        ]

        fetch(
            `https://data.gov.il/api/3/action/datastore_search?q=${valueCarNumber}&resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3`
        ).then(j => j.json())
            .then(data => {
                if (data.result.records[0] !== undefined) {
                    alldata[0].data1 = data.result.records[0]
                    alldata[0].type = "Normal"
                    Promise.all(
                        [
                            gatalldata(data.result.records[0]),
                            getnecha(valueCarNumber),
                            cmutCar(valueCarNumber)
                        ]
                    ).then(data => {
                        alldata[0].data2 = data[0]
                        alldata[0].tgncha = data[1]
                        alldata[0].cmut = data[2]
                        res.send(alldata)
                    })
                }
                else {
                    fetch(
                        `https://data.gov.il/api/3/action/datastore_search?q=0${valueCarNumber}&resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3`
                    ).then(j => j.json())
                        .then(data => {
                            if (data.result.records[0] !== undefined) {
                                alldata[0].data1 = data.result.records[0]
                                alldata[0].type = "Normal"
                                Promise.all(
                                    [
                                        gatalldata(data.result.records[0]),
                                        getnecha(valueCarNumber)
                                    ]
                                ).then(data => {
                                    alldata[0].data2 = data[0]
                                    alldata[0].tgncha = data[1]
                                    res.send(alldata)
                                })
                            }
                            else {
                                fetch(
                                    `https://data.gov.il/api/3/action/datastore_search?resource_id=03adc637-b6fe-402b-9937-7c3d3afc9140&q=${valueCarNumber}`
                                ).then(j => j.json())
                                    .then(data => {
                                        if (data.result.records[0] !== undefined) {
                                            alldata[0].data1 = data.result.records[0]
                                            alldata[0].type = "PersonalImports"
                                            Promise.all(
                                                [
                                                    getnecha(valueCarNumber)
                                                ]
                                            ).then(data => {
                                                alldata[0].tgncha = data[0]
                                                res.send(alldata)
                                            })
                                        }

                                        else {
                                            fetch(
                                                `https://data.gov.il/api/3/action/datastore_search?resource_id=bf9df4e2-d90d-4c0a-a400-19e15af8e95f&q=${valueCarNumber}`
                                            ).then(j => j.json())
                                                .then(data => {
                                                    if (data.result.records[0] !== undefined) {
                                                        alldata[0].data1 = data.result.records[0]
                                                        alldata[0].type = "Motorcycle"
                                                        Promise.all(
                                                            [
                                                                gatalldata(data.result.records[0]),
                                                                getnecha(valueCarNumber)
                                                            ]
                                                        ).then(data => {
                                                            alldata[0].data2 = data[0]
                                                            alldata[0].tgncha = data[1]
                                                            res.send(alldata)
                                                        })
                                                    }
                                                    else {
                                                        fetch(
                                                            `https://data.gov.il/api/3/action/datastore_search?resource_id=cd3acc5c-03c3-4c89-9c54-d40f93c0d790&q=${valueCarNumber}`
                                                        ).then(j => j.json())
                                                            .then(data => {
                                                                if (data.result.records[0] !== undefined) {
                                                                    alldata[0].data1 = data.result.records[0]
                                                                    alldata[0].type = "Big"
                                                                    Promise.all(
                                                                        [
                                                                            Pollution(valueCarNumber),
                                                                            NkudtIgun(valueCarNumber)
                                                                        ]
                                                                    ).then(data => {
                                                                        alldata[0].zium = data[0]
                                                                        alldata[0].nkudtIgun = data[1]
                                                                        res.send(alldata)
                                                                    })
                                                                }
                                                                else {
                                                                    fetch(
                                                                        `https://data.gov.il/api/3/action/datastore_search?resource_id=851ecab1-0622-4dbe-a6c7-f950cf82abf9&q=${valueCarNumber}`
                                                                    ).then(j => j.json())
                                                                        .then(data => {
                                                                            if (data.result.records[0] !== undefined) {
                                                                                alldata[0].data1 = data.result.records[0]
                                                                                alldata[0].type = "GotOff"
                                                                                Promise.all(
                                                                                    [
                                                                                        gatalldata(data.result.records[0]),
                                                                                        getnecha(valueCarNumber)
                                                                                    ]
                                                                                ).then(data => {
                                                                                    alldata[0].data2 = data[0]
                                                                                    alldata[0].tgncha = data[1]
                                                                                    res.send(alldata)
                                                                                })
                                                                            }
                                                                            else {
                                                                                res.send(false)
                                                                            }
                                                                        })
                                                                }
                                                            })
                                                    }
                                                })
                                        }
                                    })
                            }
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
        fetch(`https://data.gov.il/api/3/action/datastore_search?q=${encodeURIComponent(`${test(d.tozeret_cd)} ${test(d.degem_cd)} ${test(d.shnat_yitzur)} ${test(d.tozeret_nm)}`)}&resource_id=142afde2-6228-49f9-8a29-9b6c3a0cbe40`)
            .then(j => j.json())
            .then(data => resolve(data.result.records[0]))
            .catch(e => reject(e))
    })
}

function cmutCar(d) {
    return new Promise((resolve, reject) => {
        fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=5e87a7a1-2f6f-41c1-8aec-7216d52a6cf6&q=${encodeURIComponent(`${test(d.tozeret_cd)} ${test(d.degem_cd)} ${test(d.shnat_yitzur)} ${test(d.tozeret_nm)}`)}`)
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


function Pollution(i) {
    return new Promise((resolve, reject) => {
        fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=7cb2bd95-bf2e-49b6-aea1-fcb5ff6f0473&q=${i}`)
            .then(j => j.json())
            .then(data => resolve(data.result.records[0]))
            .catch(e => reject(e))
    })
}


function NkudtIgun(i) {
    return new Promise((resolve, reject) => {
        fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=786b33b5-75c4-42a3-a241-b1af3c9ca487&q=${i}`)
            .then(j => j.json())
            .then(data => resolve(data.result.records[0]))
            .catch(e => reject(e))
    })
}


function test(text) {
    return text == null ? '' : text
}



const port = process.env.PORT || 4500
app.listen(port, () => {
    console.log(`http://localhost:${port}/`)
})