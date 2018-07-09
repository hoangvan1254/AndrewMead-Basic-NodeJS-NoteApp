const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./note');

const argv = yargs.argv;
var command = argv._[0];

if(command === 'add'){
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        notes.logNote(note);
    } else {
        console.log('Failed');
    }
} else if (command === 'list'){
    var allNote = notes.getAll();
    console.log(`Printing: ${allNote.length} note(s).`);
    allNote.forEach((note) => notes.logNote(note));
} else if (command === 'read'){
    var note = notes.getNote(argv.title);
    if(note) {
        notes.logNote(note);
    } else {
        console.log('Not found');
    }
} else if (command === 'remove'){
    var noteRemoved = notes.remove(argv.title);
    var msg = noteRemoved ? 'Success' : 'Failed';
    console.log(msg);
} else {
    console.log('Command not regconized');
}