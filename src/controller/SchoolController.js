const database = require("../models/Database");




exports.addSchool = (req,res)=>
{
    const{SchoolName, SchoolAddress, SchoolLatitude, SchoolLongitude} = req.body;

    const sql = "INSERT INTO schools(SchoolName, SchoolAddress, SchoolLatitude, SchoolLOngitude) VALUES(?,?,?,?)";
        database.query(sql, [SchoolName, SchoolAddress, SchoolLatitude, SchoolLongitude], (err,result)=>
        {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    error: "Database error"
                }) 
            }

                res.status(200).json({SchoolId: result.insertId})
                
            
        })
}
exports.ListSchools = (req,res)=>
{
    let rad = (deg)=> (deg * Math.PI) / 180
    const{SchoolLatitude, SchoolLongitude} = req.query;


    const userLat = parseFloat(SchoolLatitude);
    const userLong = parseFloat(SchoolLongitude)
 
     database.query('SELECT * FROM schools', (err, schools) => {
    if (err) {
      console.error('Error fetching schools:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    const schoolsWithDistance = schools.map((school) => {
      const lat2 = parseFloat(school.SchoolLatitude);
      const lon2 = parseFloat(school.SchoolLongitude);

      const dLat = rad(lat2 - userLat);
      const dLng = rad(lon2 - userLong);

      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(rad(userLat)) *
        Math.cos(rad(lat2)) *
        Math.sin(dLng / 2) ** 2;

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = 6371 * c; // Earth radius in km

      return {
        SchoolId: school.SchoolId,
        SchoolName: school.SchoolName,
        SchoolAddress: school.SchoolAddress,
        SchoolLatitude: lat2,
        SchoolLongitude: lon2,
        distance: distance.toFixed(2) + ' km'
      };
    });
    schoolsWithDistance.sort((a,b)=> a.distance - b.distance);
    res.json(schoolsWithDistance)
}
)
}