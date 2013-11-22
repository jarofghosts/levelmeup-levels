var level = require('level'),
    db = level(process.argv[2])

for (var i = 0; i < 100; ++i) {
  (function use_x(x) {
    db.get('gibberish' + x, display_key.bind(null, x))
  }(i))
}

function display_key(x, err, val) {
  if (err) return
  console.log('gibberish' + x + '=' + val)
}
