var level = require('level'),
    db = level(process.argv[2]),
    obj = JSON.parse(process.argv[3])

for (var key in obj) {
  db.put(key, obj[key])
}
