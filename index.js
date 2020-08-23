const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const searches = require('./Searches');

const app = express();

// Init Middleware
// app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');


// Homepage route
app.get('/', (req,res) => res.render('index', {
    title: 'Searches log',
    searches
    })
);

// Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT ||5000;



// Searches API routes
app.use('/api/searches', require('./api/searches'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



/*
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
*/