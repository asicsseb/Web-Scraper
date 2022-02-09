const cheerio = require("cheerio");
const axios = require("axios")
const createCsvWriter = require('csv-writer').createObjectCsvWriter

const fetchListing = async () => {
    try {
        const response = await axios.get('https://kansascity.craigslist.org/search/jwa');
        const html = response.data;
        const $ = cheerio.load(html);

        const jewelryList = [];

        $('.result-title').each((_idx, el) => {
            const jewelry = {
                title: $(el).text()
            };
            jewelryList.push(jewelry);
        });
        return jewelryList;
    } 
    catch (error) {
        throw error;
    }
};

fetchListing().then((jewelryList) => {

    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
        path: 'jewelry.csv',
        header: [{id: 'title'}]

    });

    csvWriter.writeRecords(jewelryList)       // returns a promise
        .then(() => {
            console.log('...Done');
        });
    
    });