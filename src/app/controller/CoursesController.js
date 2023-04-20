const courses = require('../models/course');
class CourseController {
    //[GET] /courses/:slug
    show(req, res, next) {
        courses.findOne({ slug: req.params.slug })
            .lean().then(
                courses => { res.render('courses/show', { courses }) }
            )
            .catch(next)
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create')
    }

    // [POST] /courses/store
    store(req, res, next) {
        req.body.image = ` https://img.youtube.com/vi/${req.body.video_id}/sddefault.jpg`
        const course = new courses(req.body);
        course.save();
        res.redirect('/me/store/courses')
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        courses.findById(req.params.id)
            .lean().then(
                courses => { res.render('courses/edit', { courses }) }
            )
            .catch(next)
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        courses.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/store/courses'))
            .catch(next)
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        courses.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [DELETE] /courses/:id/force-delete
    forceDestroy(req, res, next) {
        courses.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        courses.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [POST] /courses/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'Delete':
                courses.delete({ _id: { $in: req.body.courseID } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            case 'Restore':
                courses.restore({ _id: { $in: req.body.courseID } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            case 'Permanently-Deleted':
                courses.deleteMany({ _id: { $in: req.body.courseID } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default:
                res.json({ message: 'action is invalid!' })
        }
    }
}
module.exports = new CourseController;