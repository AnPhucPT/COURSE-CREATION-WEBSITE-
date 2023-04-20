const courses = require('../models/course');
class SiteController {

    //[GET] /news
    index(req, res, next) {
        courses.find({})
            .lean().then(
                courses => { res.render('home', { courses }) }
            )
            .catch(next)
    }

    //[GET] /news/:
    show(req, res) {
        res.render('contact123')
    }
}

module.exports = new SiteController;