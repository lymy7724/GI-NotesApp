const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  // find and checks to see if there's a note title that matches the new title
  const duplicateNote = notes.find((note) => note.title === title);

  debugger;

  // if there isn't a duplicate title, it will add it to my notes or else it will notify user that the title is already taken
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added"));
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  // filters through the existing notes and checks the notes that doesn't have the same titles
  const notesToKeep = notes.filter((note) => note.title != title);

  // if the original notes list is greater than the new notes to keep list, it will notify user that the note has been removed
  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse("Note removed!"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
};

const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.inverse("Your notes"));

  // goes through each of the notes and logs all the notes that i currently have
  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  // looks for the note with the title the user is searching for
  const note = notes.find((note) => note.title === title);

  // if the note title exists, it will display the title or else it will notify user that the note is not found
  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse("Note not found!"));
  }
};

// turns object into string and rewrites the note into the json file
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

// reads the note.json file and returns all the json notes
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

// this allows other files to be able to use these methods
module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
