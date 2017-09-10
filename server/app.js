import express from 'express'; 
import cors from 'cors';
import bodyParser from 'body-parser';
import { serverPort } from './config.json';
import * as db from './dbUtilits';

const app = express();

db.setUpConnection();

app.use( bodyParser.json() );

app.use(cors({ origin: '*' }));

app.get('/notes', (req, res) => {
    db.listNotes().then(data => res.send(data));
});

app.post('/notes', (req, res) => {
    db.createNote(req.body).then(data => res.send(data));
});

app.delete('/notes/:id', (req, res) => {
    db.deleteNote(req.params.id).then(data => res.send(data));
});

app.get('/', (req, res) => {
	res.send("go to .../notes");
});

const server = app.listen(8080, () => {
	console.log(`Server started on port ${serverPort}`);
});