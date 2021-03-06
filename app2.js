const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
//const Blog = require('./models/blog');
const blogRoutes = require('./routes/blogRoutes')

//expressapp
const app = express();

//connect to mongoDB on mongoDB atlas, using mongoose (npm install mongoose and require above)
const dbURI = 'mongodb+srv://<username>:<password>@cluster0.69icn.mongodb.net/<projectname>?retryWrites=true&w=majority'; //obviously for security reasons normally this wouldn't be posted, but since it's a basic tutorial, the data here is trivial.
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }) //an asynchronous function that takes some time to connect to the DB
    .then((result) => app.listen(3000))//console.log('connected to db'))//.then method will run after mongoos.connect connects..
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs'); //default looks for a views folder
// app.set('views', 'myviews'); //if for example you wanted to change the name of that default directory, this is more or less how you would do it.

//listen for requests
// app.listen(3000); //you can put this in a variable if you need to further reference this request.

//middleware & static files
 app.use(express.static('public'));
 app.use(express.urlencoded({ extended: true })); //takes all the url encoded data, in this ccase from the create.ejs file, and passes it into the req object
 app.use(morgan('dev')); //3rd party middleware morgan invokes method on string 'dev' to report GET request details in node

// // mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({ //simply rerunning this code with a new title will create a new blog document/object.
//         title: 'new blog 2',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });

//     blog.save()//and here we have the blog object saved to the mongoDB database, mongoose asynchronously this and returns a Promise, which means we can:
//         .then((result) => {
//             res.send(result)//send the result to the DB
//         })
//         .catch((err) => {//or, of course, log an error if it occurrs
//             console.log(err);
//         });
// })

// app.get('/all-blogs', (req, res) => {
//     Blog.find() //utilizes the mongoose method find to find all instances of Blog and puts it in /all-blogs, note that we use .find() as a method of the Blog Prototype itself, and not an instance of Blog
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })

// app.get('/single-blog', (req, res) => {
//     Blog.findById('60860cd8da73c01c1550abb5')//utilizes the mongoose method findById which takes a string argument of the Blog instance's id number and returns the object with that unique id.
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })


// app.use((req, res, next) => { //demonstration of middleware, simply logs information about the GET request from the user on the front end to node on the back end.
//     console.log('new request made:');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
// });

// routes
app.get('/', (req, res) => { //listens for requests for the home directory
    res.redirect('/blogs');
});

// app.get('/blogs', (req, res) => {
//         Blog.find().sort({ createdAt: -1 }) //the .find method finds all instances of Blogs and then sorts them from newest to oldest (as defined by the parameter { createdAt: -1 }, this is automatically generated by mongoose)
//             .then((result) => {
//                 res.render('index', { title: 'All Blogs', blogs: result })
//             })
//             .catch((err) => {
//                 console.log(err);
//             })
// });

//post request

//  app.post('/blogs', (req, res) => {
//      const blog = new Blog(req.body);
//      //if we were to try and create a new instance of Blog right, here, we would do new Blog({}), but in this case, due to teh app.use(express.urlencoded) method above, we can pass the object created by the requested text from the submit fields on create.ejs

//      blog.save() //we save the blog and:
//          .then((result) => {
//              res.redirect('/blogs');// redirect the user back to the /blogs directory to see their new blog displayed
//          })
//          .catch((err) => {
//              console.log(err);
//          })
//  })

// app.get('/blogs/:id', (req, res) => {  //this is setting up the get request for the blog itself, anchor/link tags have been put into index.ejs which now redirect to a 404 page, because the id of the blog is not established, note the colon, which is necessary to pull the id of the blog we want to view.
//     const id = req.params.id;
//     Blog.findById(id)
//         .then((result) => {
//             res.render('details', { blog: result, title: 'Blog Details' });
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// })

// //just redirects to the /blogs directory
//     // const blogs = [
//     //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
//     //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
//     //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'}
//     // ];
    
//     // res.render('index', { title: 'Home', blogs }); //uses the ejs module to render the index.ejs html page
//     // //it will also pass the blogs array to any ejs page that dynamically can generate the content by referencing it (see index.ejs)


//     // res.write('');//very much like the server.js which uses pure node to do this, res.write('') takes a string and will, in this case, write it as pure http
//     // res.end();//and end the response

//     // res.send('<p>home page</p>');//the inferred content type is header, and the status code is inferred as well as 200 (successful)
//     // res.sendFile('./views/index.html', { root: __dirname }); //and this is similar to our server.js, but using express syntax.
//     //note the second parameter that specifies the root directory as the current directory, or "__dirname", which in this case would be from nodejs-server directory.
//     //if this is not defined, sendFile() will try and route from the home directory...



// // app.use((req, res, next) => { //another example of middleware
// //     console.log('in the next middleware');
// //     next();
// // });

// //note that when a request to the server is sent, express will treat the following as if they were if/else or switch/case statements,
// //interestingly though, the app.get() function allows us to shorten our syntax by implying the switch/case as well as the break statements
// //the defaut statement is referred in express by the app.use() funciton, which you should note does not require a url in its arguments
app.get('/about', (req, res) => {
     res.render('about', { title: 'About' });

//     // res.send('<p>about page</p>');
//     // res.sendFile('./views/about.html', { root: __dirname });
});

// //redirects
// // app.get('/about-us', (req, res) => { //very simply, much like in server.js, will redirect the user if they type in the url address bar "/about-us" will redirect to the about page
// //     res.redirect('/about');
// // });


// // blog routes
// app.get('/blogs');

// //delete blogs

// app.delete('/blogs/:id', (req, res) => {
//     const id = req.params.id;

//     Blog.findByIdAndDelete(id) //note that this utilizes the Blog Prototype's method, findByIdAndDelete which is somewhat self explanatory
//         .then((result) => { //note that this does not redirect immediately, in fact, in node with using the above method, you CANNOT just redirect, res.redirect will NOT work, instead:
//             res.json({ redirect: '/blogs' }) //the backend nodejs looks through the site's JSON and redirects to the directory /blogs after deleting the user specified (by id) blog.
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })

 app.get('/blogs/create', (req, res) => {
     res.render('create', { title: 'Create a new Blog' });
 })

app.use('/blogs', blogRoutes); //note that by adding '/blogs' we have routed every reference of app to the blogRoutes.js file and thusly don't have to write /blogs for every reference to router in the blogRoutes.js file, instead it is simply referred to as '/'

//404 page, note that in order for it to be effective, it must be placed at the bottom, after the other app.get() functions. if not it will fire whenever
//node encounters this code
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });

    // res.status(404).sendFile('./views/404.html', { root: __dirname });//changes the status to 404, throwing an error code to node, and then displaying the 404 url to the user
})