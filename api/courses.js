const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const courses = require('../Courses');
const https = require('https');

// HTTP request no package
router.get('/cats', (req, res) => {
    let todo = '';
    let theUrl = '';
https.get('https://public-api.wordpress.com/rest/v1.1/read/tags/cats/posts?number=1', (response) => {
  

  // called when a data chunk is received.
  response.on('data', (chunk) => {
    todo += chunk;
    console.log (todo)
  });

  // called when the complete response is received.
  response.on('end', () => {
    theUrl = JSON.parse(todo).posts[0].URL ;
    res.json(theUrl)
  });

}).on("error", (error) => {
  console.log("Error: " + error.message);
})

});


// this route gets all courses
router.get('/', (req, res) => {
    res.json(courses)
});

//Get a single course
router.get('/:id', (req, res) => {
    const found = courses.some(courses => courses.id === parseInt(req.params.id));
    if(found){
        res.json(courses.filter(course => course.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({ msg:'BLIP, no one is there' });
    }
});

// Create Course

router.post('/', (req, res) => {
    const newCourse = {
        id: uuid.v4(),
        name: req.body.name,
        url: req.body.url,
        status: 'active'
    }

    if(!newCourse.name || !newCourse.url) {
       return res.status(400).json({msg: 'please include name and url'});
    }

    courses.push(newCourse);
    res.json(courses);
    //res.redirect('/');
});

//Update Course
router.put('/:id', (req, res) => {
    const found = courses.some(course => course.id === parseInt(req.params.id));
    if(found){
        const updCourse = req.body;
        courses.forEach(course => {
            if(course.id === parseInt (req.params.id)) {
                course.name = updCourse.name ? updCourse.name : course.name;
                course.url = updCourse.url ? updCourse.url : course.url;

                res.json({msg: 'Course Updated', course })   
            }
        });
    } else {
        res.status(400).json({ msg:'EO, no one is there' });
    }
});

//Delete Course
router.delete('/:id', (req, res) => {
    const found = courses.some(course => course.id === parseInt(req.params.id));

    if(found){
        res.json({
            msg: "Course deleted", 
            courses: courses.filter( course => course.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({ msg:'WOAH, no one is there' });
    }
});


module.exports = router;