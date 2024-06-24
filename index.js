  const btnEl = document.querySelector(".btn");
  const notecontainerEl = document.querySelector(".note-container");

 getNotes().forEach((note)=>{
    const noteEl =  createNoteEl(note.id, note.content);
    notecontainerEl.insertBefore(noteEl,btnEl)
 });
 
function createNoteEl(id,content){
    const element = document.createElement("textarea") ;
    element.classList.add("note");
    element .placeholder = "Empty Note"
    element.value = content;

    element.addEventListener("dblclick", ()=>{
        const warning = confirm("Are you sure  you want to delete the note")
        if(warning){
             deleteNote(id, element)
        }
    })


    element.addEventListener("input",()=>{
        updateNote(id, element.value)
    } )
    return element;
}

function deleteNote(id, element){
   const notes =  getNotes().filter((note)=> note.id != id)
   saveNoteLocalStorage(notes)
   notecontainerEl.removeChild(element)
}

function updateNote(id, content){
 const  notes = getNotes()
 const target = notes.filter((note)=>note.id == id)[0]
 target.content = content;
 saveNoteLocalStorage(notes)
}

 function addNote(){
    const notes = getNotes();
    const noteObj = {
        id: Math.floor(Math.random() * 100000),
        content: "",
    };
    const noteEl= createNoteEl(noteObj.id,noteObj.content);
    notecontainerEl.insertBefore(noteEl, btnEl);
    notes.push(noteObj)
    saveNoteLocalStorage(notes)
 } 
function saveNoteLocalStorage(notes){
       localStorage.setItem("noteApp",JSON.stringify(notes) );
}
function getNotes(){
  return JSON.parse(localStorage.getItem("noteApp") || "[]");
}



  btnEl.addEventListener("click", addNote);