const Blog = require('../models/blog');
// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 }) //the .find method finds all instances of Blogs and then sorts them from newest to oldest (as defined by the parameter { createdAt: -1 }, this is automatically generated by mongoose)
    .then((result) => {
        res.render('blogs/index', { title: 'All Blogs', blogs: result })
    })
    .catch((err) => {
        console.log(err);
    })
}

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('blogs/details', { blog: result, title: 'Blog Details' });
        })
        .catch((err) => {
            res.status(404).render('404', { title: 'Blog not found' });
        });
}

const blog_create_get = (req, res_) => {
    res.render('blogs/create', { title: 'Create a new Blog' });
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    //if we were to try and create a new instance of Blog right, here, we would do new Blog({}), but in this case, due to teh app.use(express.urlencoded) method above, we can pass the object created by the requested text from the submit fields on create.ejs

    blog.save() //we save the blog and:
        .then((result) => {
            res.redirect('/blogs');// redirect the user back to the /blogs directory to see their new blog displayed
        })
        .catch((err) => {
            console.log(err);
        })
}

const blog_delete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id) //note that this utilizes the Blog Prototype's method, findByIdAndDelete which is somewhat self explanatory
        .then((result) => { //note that this does not redirect immediately, in fact, in node with using the above method, you CANNOT just redirect, res.redirect will NOT work, instead:
            res.json({ redirect: '/blogs' }) //the backend nodejs looks through the site's JSON and redirects to the directory /blogs after deleting the user specified (by id) blog.
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}