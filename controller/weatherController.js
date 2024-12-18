const axios = require('axios')

const getUpdates = async(req,res) => {
    

    try{

        const url = "https://www.7timer.info/bin/astro.php?lon=73.084488&lat=33.738045&ac=0&unit=metric&output=json&tzshift=0";
        
        const urlData = await axios.get(url);
        const data = urlData.data;

        const forecasts = data.dataseries.map((entry) => ({
            dateTime: new Date(entry.timepoint*3600000).toISOString(),
            temp: entry.temp2m,
            rain: entry.prec_type || 'none',
        }))

        // return forecasts;

        res.json({
            message: "Weather Updated: ",
            data: forecasts
        })
    }catch(err)
    {
        console.log("Failed to get the updated of Weather of Islamabad")
    }
}

module.exports = { getUpdates }