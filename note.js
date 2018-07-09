const fs = require('fs');

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch(e){
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };
    var duplicateNotes = notes.filter((note) => note.title === title);
    
    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getAll = () => {
    return fetchNotes();
};

var getNote = (title) => {
    //fetch notes
    var notes = fetchNotes();
    //filter notes, return the one with title of argument
    var noteFounds = notes.filter((note) => note.title === title);
    return noteFounds[0];
};

var remove = (title) => {
    //fetch notes
    var notes = fetchNotes();
    //filter notes, remove the one with title of argument
    var noteFound = notes.filter((note) => note.title !== title);
    //save new note array
    saveNotes(noteFound);

    return notes.length !== noteFound.length;
};

var logNote = (note) => {
    console.log('Success');
    console.log('-------------------');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

module.exports = {
    addNote: addNote,
    getAll: getAll,
    getNote: getNote,
    remove: remove,
    logNote: logNote
};