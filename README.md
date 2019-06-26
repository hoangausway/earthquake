# REST APIs
# 1. EQSEED API: seeds local database
- Fetch latest 100 records from earthquakes.usgs.gov to local MongoDB
- Purge local database for new trial

# 2. EARTHQUAKE API: services standard CRUD tasks and some specific services
- Create, Read, Update, Delete earthquake
- Get list of all earthquakes
- Get an earthquake by 'id' which can be found in existing records
- Get top ten highest magnitude earthquakes within the last 24 hours
- Get top ten highest magnitude earthquakes within the last 30 days
- Get top ten highest magnitude earthquakes within the last 60 days
- Update title and magnitude of an existing earthquake

# Notes on local database and fetchUrl to external API
- It's assumed that mongodb available at localhost:27017
- File .env defines PORT (3000) and DATABASE_URL (mongodb://localhost:27017/earthquake-db)
- File config/config.settings.js holds settings including the fetchUrl to Earthquake API

# Install, test, start
At root of project folder
- npm install
- npm test
- npm start

# Notes on architecture
The API is developed with the following architectur in mind:
[Router] <-> [Middleware] <-> [Service] <-> [Model]

# Notes on the tests made
The unit tests were made only while developing the [Service] layer of the EARTHQUAKE API.

# Using API
- Check if server up:
curl http://localhost:3000

- Seed local database (fetch latest 100 records from Earthquake server):
curl http://localhost:3000/eqseed/fetch

- Delete local database for trying from scratch, purge earthquaks collection:
curl -X POST -H 'Content-Type: application/json' http://localhost:3000/eqseed/purge

- Get list of all earthquake records:
curl http://localhost:3000/earthquakes/

- Read an existing earthquake record (use value of field '_id', for example '5d12900b2842c90f3da3fcc3'):
curl http://localhost:3000/earthquakes/[objectId]

- Read an existing earthquake record using earthquake id (for example 'te38428943st'):
curl http://localhost:3000/earthquakes/id/[id]

- To create, update, delete
Prepare a record with the format as sample at the end of this document, then send request to server using the following HTTP methods:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Base URI: http://localhost:3000/earthquakes/

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Create earthquake: POST /

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Update earthquake: PUT /:objectId

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Delete earthquake: DELETE /:objectId

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Update Title and Magnitude: POST /id/:id (id is value of the 'id' field from existing earthquake record; it's not objectId of the field '_id')

# Sample of earthquake record in local database.
See also: https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson_detail.php
Note that the field _id and __v are created by MongoDB

{
  '_id': '5a5ea8fde43c771e4aa5ea06',
  'type': 'Feature',
  'properties': {
    'mag': 1.29,
    'place': "FOR TEST: it's happen somewhere near me",
    'time': 1561424490930,
    'updated': 1561424718685,
    'tz': -480,
    'url': 'https://earthquake.usgs.gov/earthquakes/eventpage/te384289st',
    'detail': 'https://earthquake.usgs.gov/fdsnws/event/1/query?eventid=te384289st&format=geojson',
    'felt': null,
    'cdi': null,
    'mmi': null,
    'alert': null,
    'status': 'automatic',
    'tsunami': 0,
    'sig': 26,
    'net': 'ci',
    'code': '38428943',
    'ids': ',te384289st,',
    'sources': ',ci,',
    'types': ',geoserve,nearby-cities,origin,phase-data,scitech-link,',
    'nst': 17,
    'dmin': 0.01573,
    'rms': 0.16,
    'gap': 60,
    'magType': 'ml',
    'type': 'earthquake',
    'title': 'M 1.3 - 12km WNW of Calipatria, CA'
  },
  'geometry': {
    'type': 'Point',
    'coordinates': [-115.6298333, 33.1671667, 3.93]
  },
  'id': 'te38428943st',
  '__v': 0
}
