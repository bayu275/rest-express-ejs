const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(methodOverride('_method'));

let comments = [
    {
        id: uuidv4(),
        username: 'Michael',
        text: `Sometimes I’ll start a sentence and I don’t even know where it’s going. I just hope I find it along the way`,
    },
    {
        id: uuidv4(),
        username: 'Kelly',
        text: `I talk a lot, so I’ve learned to tune myself out`,
    },
    {
        id: uuidv4(),
        username: 'Kevin',
        text: `I JUST WANT TO LIE ON THE BEACH AND EAT HOT DOGS.`,
    },
    {
        id: uuidv4(),
        username: 'Dwight',
        text: `IDENTITY THEFT IS NOT A JOKE, JIM! MILLIONS OF FAMILIES SUFFER EVERY YEAR.`,
    },
    {
        id: uuidv4(),
        username: 'Ryan',
        text: `I’M SUCH A PERFECTIONIST THAT I'D KINDA RATHER NOT DO IT AT ALL THAN DO A CRAPPY VERSION.`,
    },
    {
        id: uuidv4(),
        username: 'Jim',
        text: `EVERYTHING I HAVE I OWE TO THIS JOB… THIS STUPID, WONDERFUL, BORING, AMAZING JOB.`,
    },
];

app.get('/comments', (req, res) => {
    res.render('comments', { comments });
});

app.get('/comments/create', (req, res) => {
    res.render('comments/create');
});

app.post('/comments/', (req, res) => {
    const { username, text } = req.body;
    comments.push({ username, text, id: uuidv4() });
    res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find((comment) => comment.id == id);
    res.render('comments/show', { comment });
});

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const comment = comments.find((comment) => comment.id == id);
    if (comment) {
        comment.text = text;
        res.redirect('/comments');
    } else {
        res.status(404).send('Comment not found');
    }
});

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find((comment) => comment.id == id);
    if (comment) {
        comments = comments.filter((comment) => comment.id != id);
        res.redirect('/comments');
    } else {
        res.status(404).send('Comment not found');
    }
});

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find((comment) => comment.id == id);
    if (comment) {
        res.render('comments/edit', { comment });
    } else {
        res.status(404).send('Comment not found');
    }
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
