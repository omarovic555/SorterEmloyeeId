const fs = require("fs");
const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const port = 3000;

function randomLetter() {
	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function randomNumber() {
	return Math.floor(Math.random() * 100000000);
}

function generateId() {
	return `${randomLetter()}${randomNumber().toString().padStart(8, "0")}${randomLetter()}`;
}

function generateIds(numIds) {
	const ids = [];
	for (let i = 0; i < numIds; i++) {
		ids.push(generateId());
	}
	return ids;
}

const numIds = 50;
const ids = generateIds(numIds);
fs.writeFileSync("employee_ids.txt", ids.join("\n"));
console.log("Employee IDs generated successfully!");
function compareIds(a, b) {
	if (a[0] !== b[0]) {
		return a[0].localeCompare(b[0]);
	} else if (a[a.length - 1] !== b[b.length - 1]) {
		return a[a.length - 1].localeCompare(b[b.length - 1]);
	} else {
		const numA = parseInt(a.slice(1, -1), 10);
		const numB = parseInt(b.slice(1, -1), 10);
		return numA - numB;
	}
}

const GeneratedIds = fs.readFileSync("employee_ids.txt", "utf-8").split("\n");
const sortedIds = GeneratedIds.sort(compareIds);

fs.writeFileSync("sorted_employee_ids.txt", sortedIds.join("\n"));
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))

app.get('/', (req, res) => {
    res.send('Hello World, from express');
});
app.get('/ids', (req, res) => {
    res.json(ids);
});
app.post('/upload', upload.single('file'), (req, res) => {
res.json(sortedIds); });

console.log("Employee IDs sorted successfully!");


app.post('/uploadSorted', upload.single('file'), (req, res) => {
	res.json(sortedIds); });                          