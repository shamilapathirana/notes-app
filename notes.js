const fs = require('fs')
const chalk = require('chalk')

const addNotes = (title, body) => {
	const notes = loadNotes()

	// const duplicateNotes = notes.filter((note)=> note.title === title )
	const duplicateNote = notes.find((note) => note.title == title)

	if (!duplicateNote){
		notes.push({
			title: title,
			body: body
		})

		saveNotes(notes)
		console.log(chalk.green.inverse('New note added'))
	} else {
		console.log(chalk.red.inverse('Note title taken'))
	}

}

const removeNote = (title) => {
	const notes = loadNotes()

	const notesToKeep = notes.filter((note) => note.title !== title )
	if(notes.length !== notesToKeep.length){
		saveNotes(notesToKeep)
		console.log(chalk.bgGreen('Note removed!'))
	} else {
		console.log(chalk.bgRed('No note found!'))
	}
	
}

const listNotes = () => {
	const notes = loadNotes()
	console.log(chalk.yellow('Your notes..'))
	notes.forEach((note) => {
		console.log(note.title+ ' - ' + note.body)
	})
}

const readNotes = (title) => {
	const notes = loadNotes()
	const foundNote = notes.find((note) => note.title === title)

	if(foundNote){
		console.log(chalk.bgYellow(foundNote.title))
		console.log(foundNote.body)
	} else {
		console.log(chalk.red('Note not found'))
	}
}

const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes)
	fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
	try{
		const dataBuffer = fs.readFileSync('notes.json')
		const dataJSON = dataBuffer.toString()
		return JSON.parse(dataJSON)
	} catch (e){
		return []
	}
}

module.exports = {
	addNotes: addNotes,
	removeNote: removeNote,
	listNotes: listNotes,
	readNotes: readNotes
}
