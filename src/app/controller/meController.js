const courses = require('../models/course');
class MeController {
    // [GET] /me/stored/courses
    async storeCourses(req, res, next) {
        try {
            const coursesList = await courses.find({}).lean().sortable(req);
            const deletedCount = await courses.countDocumentsDeleted();
            res.render('me/stored-courses', { courses: coursesList, deletedCount });
        } catch (error) {
            next(error);
        }
    }


    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        courses.findDeleted({})
            .lean().then(
                courses => { res.render('me/trash-courses', { courses }) }
            )
    }
}
module.exports = new MeController;