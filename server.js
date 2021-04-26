const http = require('http'); //loads node's http module, which connects the browser's input to the server
const fs = require('fs');
const _ = require('lodash');

//method that creates a server and stores it in a variable called server.

// const server = http.createServer((req, res) => { //request requests the website, either with a GET or a POST request, and the response argument, which posts a response to the user in the browser
//     console.log(req.url, req.method); //note that the browser will not log this, it is logged on node's backend terminal
//     //the req.url, and req.method logs show us / and GET, which logs to node's back end once the request is sent from the browser,
//     //the home directory requested, and the GET request.
//     //if the browser's directory request is localhost:3000/about, req.url would show /about for example.

//     //set header content type
//     res.setHeader('Content-Type', 'text/plain'); //sets the header as Contet-Type, specifies that the response will be in plain text.

//     res.write('hello, ninjas'); //then the response object writes the text "hello, ninjas" which is the plain text that we are sending to the Content Header.
//     res.end(); //and issuing the end method to the response object which then sends the information to the browser

//     //Please note that if you go into the browser, hit F12, and then open up the Networks Tab of the browser, you will see details
//     //of the GET requests.
// });

//respond back to the browser with an html string instead of a plain text

const server = http.createServer((req, res) => { 
    
    //lodash
    //const num = _.random(0, 20); //logs random number to node server every time the page loads
    //console.log(num);

    // const greet = _.once(() => {//supposed to use lodash method .once to prevent the function from being called more than once, didn't quite work ..
    //     console.log('hello');
    // });

    // greet();


    //set header content type
    res.setHeader('Content-Type', 'text/html');

    let path = './views/'; //a path variable
    switch(req.url) { //looks at the request url
        case '/': //matches against this case, in this case, the home directory, then adds:
            path += 'index.html'; //note how net ninja instead concatenates the '/' string on the fly using switch/case statements to append the route.
            //res.statusCode = 200;//standard response to report to the browser's status code that the response was successful.
            break;
        case '/about'://matches /about, then:
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me'://matches /about, then:
            res.statusCode = 301; //this is the code given for a redirect if an old path no longer exists
            res.setHeader('Location', '/about');
            res.end();
            break;
        default://otherwise throw 404 error page:
            path += '404.html';
            res.statusCode = 404;//standard response to report to the browser's status code that the response failed, i.e. user/client side error.
            break;
    }

    // res.write('<head><link rel="stylesheet" href="#"></head>'); //actually will write us a header tag, and put a link in the document.
    // res.write('<p>hello, ninjas</p>'); 
    // res.write('<p>hello again, ninjas</p>'); 
    // res.end(); //once written if you go the browser, hit F12 and Inspect the document, you will notice that within the html body there are now two paragraph tags,
    // //node has effectively written html as a response to a GET request from the browser, very cool.

    //send an html file
    fs.readFile(path /*'./views/index.html'*/, (err, data) => { //note that originally we needed to specify the index.html file, but here we have set up the path variable from above, which specifies the home directory/views and looks for various requested html files in that directory
        //if no directory is provided, ie a './' is given, then the above switch/case statements will bring you to the './index.html' file.
        if (err) {
            console.log(err); //note that if there's an error, this will just leave the server hanging in limbo..
            res.end();//so make sure to end the response to close the infinite loop.
        } else {
            //res.write(data); //otherwise we take the data from the index.html file, and write it to the response to the browser
            res.end(data); //and once again end our response after the data request is fulfilled.
        }
    });

});

//note that running node server at this point and then reloading the localhost:3000 in the browser, you will receive
//the passed html from ./views/index.html, but at this point if you input the localhost:3000/blogs or /abouts or whatever, it will not change state from the original index.html file...

//on port 3000, we listen for requests from the browser:
server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});
