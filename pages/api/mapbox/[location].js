import axios from 'axios'

export default async (req, res) => {
  const location = req.query.location
  const baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places'
  const urlComplete = `${baseUrl}/${encodeURIComponent(
    location
  )}.json?limit=1&access_token=${process.env.MAPBOX_KEY}`
  if (location === 'undefined') {
    return res
      .status(400)
      .json({ message: 'Location: "undefined" is an invalid request.' })
  } else {
    try {
      let lat, long, placeName
      const response = await axios.get(urlComplete)
      if (response.data.features !== []) {
        long = response.data.features[0].center[0]
        lat = response.data.features[0].center[1]
        placeName = response.data.features[0].place_name
      }
      res.status(200).json({
        latitude: lat,
        longitude: long,
        placeName,
      })
    } catch (error) {
      console.error('MAPBOX API ERROR: ', error)
      res.status(e.status || 400).json({ message: 'Api error' })
    }
  }
}
