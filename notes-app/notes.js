const fs = require("fs");
const chalk = require("chalk");
const getNotes = function() {
    return "Your Notes...";
};

/**
 * Used in app.js to addNote from the terminal, no two title can be the same
 * @param {*} title: the title of the note
 * @param {*} body: the body of the note
 */
const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicateNotes = notes.filter(
        singularNotes => singularNotes.title === title
    );

    const duplicateNote = notes.find(note => note.title === title);
    debugger;
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse("New note added!"));
    } else {
        console.log(chalk.red.inverse("Title was taken"));
    }
};

/**
 * Save the note passed in into notes.json
 * @param {*} notes
 */
const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJSON);
};

/**
 * Loadnotes from notes.json, or return [] if not found
 */
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

/**
 * Remove the note with the same title
 * @param {*} title
 */
const removeNote = title => {
    const data = loadNotes();
    let removedNote = "";
    let remainingNotes = data.filter(note => {
        if (note.title === title) {
            removedNote = note;
        }
        return note.title !== title;
    });

    if (remainingNotes.length === data.length) {
        console.log(chalk.red.inverse("Note not found"));
    } else {
        console.log(
            chalk.green.inverse(
                "Note removed! Title: " +
                    removedNote.title +
                    " and Body- " +
                    removedNote.body
            )
        );
    }

    saveNotes(remainingNotes);
};

/**
 * list the notes in notes.json
 */
const listNotes = () => {
    const data = loadNotes();
    console.log(chalk.blue("Your Notes: "));
    data.forEach(element => {
        console.log(element.title);
    });
};

const readNote = title => {
    const notes = loadNotes();

    const foundNote = notes.find(note => note.title === title);
    if (foundNote) {
        console.log(chalk.italic("Title: " + foundNote.title));
        console.log("Body: " + foundNote.body);
    } else {
        console.log(chalk.red.inverse("Note not found"));
    }
};
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};
