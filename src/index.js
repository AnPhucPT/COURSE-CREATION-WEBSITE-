const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const route = require('./routes');
const methodOverride = require('method-override')
const SortMiddleware = require('./app/middlewares/SortMiddleware')

const app = express();
const port = 3001;

const db = require('./config/db');
//Connect to db
db.connect();

//HTTP logger
// app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//Custom middlewares
app.use(SortMiddleware)
app.use(express.static(path.join(__dirname, 'public')));
//Template engine   
app.engine(
    '.hbs',
    exphbs.engine({
        extname: '.hbs',
        defaultLayout: "main",
        helpers: require('./helper/handlebars')
    })
);
app.use(methodOverride('_method'))


app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views')
);

//Routes init
route(app)
app.listen(port, () => console.log(`App listening on port ${port}`))