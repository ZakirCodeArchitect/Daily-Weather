const axios = require('axios');
const { error } = require('winston');

const getUpdates = async(req,res) => {
    
    const url = "https://www.7timer.info/bin/astro.php?lon=73.084488&lat=33.738045&ac=0&unit=metric&output=json&tzshift=0";
    
    try{
        
        
        const urlData = await axios.get(url);
        const data = urlData.data;

        // Extract relevant information
        if (data && data.dataseries) {
            const weatherData = data.dataseries.map( info => ({
                
                temperature: info.temp2m,
                rain: info.prec_type

            }));
            data.dataseries.forEach(info => {
                
                console.log(`Temperature: ${info.temp2m}°C` );
                console.log(`Rain: ${info.prec_type} `);
                console.log('_____________________')
            })
            
            res.json({
                success:true,
                message: "Weather Prediction details fetched successfully",
                data: weatherData
            })

        } else {
            res.status(404).json({
                success: false,
                message: 'No data available in the API.'
            })
        }
        
    }catch(error)
    {
        res.status(404).json({
            success: false,
            message: 'Error fetching weather predictions.',
            error: error.message,
        })
    }
}

module.exports = { getUpdates }