var sub = require('level-sublevel'),
    level = require('level'),
    db = sub(level(process.argv[2])),
    robots = db.sublevel('robots'),
    dinos = db.sublevel('dinosaurs')

robots.put('slogan', 'beep boop')
dinos.put('slogan', 'rawr')
