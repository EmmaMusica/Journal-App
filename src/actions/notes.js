import { db } from "../firebase/firebase-config";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";


//coloca una nota activa utilizanod firebase tambien
export const startNewNotes = () => {
    return async (dispatch, getState) => { //thunk nos proporciona tambien el getState, similar al useSelector
        const uid = getState().auth.uid;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }
        //inicializa una nueva nota vacia en la base de datos- Funcion de Firebase********************
        const doc = await addDoc( collection(db, `${uid}`, "journal/notes"), newNote )

        //setea una nota en el store para trabajarla
        dispatch( activeNote( doc.id, newNote ))
        dispatch( startLoadingNotes( uid ) )
    }
}



//action para activar la nota
export const activeNote = ( id, note ) => {
    return {
        type: types.notesActive,
        payload: {
            id,
            ...note
        }
    }
}




export const startLoadingNotes = ( uid ) => {
    return async (dispatch) => {

        //recuperamos las notas de la base de datos con nuestro helper
        const notes = await loadNotes( uid );
        //actualizamos el store con las notas del usuario
        dispatch(setNotes( notes ))
    }
}




//action para colocar las notas recargadas de la base de datos en el store
export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
})




export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth
        
        //exparcimos el note en noteToFirestore para poder eliminar el id que no queremos guardar en la db
        const noteToFirestore = { ...note }
        delete noteToFirestore.id;

        if(!noteToFirestore.url){
            delete noteToFirestore.url
        }

        //creando la referencia al documento a actualizar - Funcion de Firebase********************
        const noteRef = doc(db, `${uid}/journal/notes/${note.id}`)

        //actualizando el documeto con la nueva nota- Funcion de Firebase********************
        await updateDoc(noteRef, noteToFirestore);

        dispatch( refreshNote( note.id, noteToFirestore ) )
        dispatch( startLoadingNotes( uid ) )
        Swal.fire('Saved', note.title, 'success')
    }
}




export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload:{
        id,
        note: {
            id,
            ...note
        }
    }

})





export const startUploading = ( file ) => {
    return async(dispatch, getState) => {
        const { active:activeNote } = getState().notes

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait.',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        })

        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl;

        dispatch( startSaveNote(activeNote) );

        Swal.close();

    }
}


export const startDeleting = ( id ) => {
    return async( dispatch, getState ) => {
         
        Swal.fire({
            title: 'Deleting',
            text: 'Please Wait',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        })
        const uid = getState().auth.uid;
        const noteRef = doc(db, `${uid}/journal/notes/${id}`)
        await deleteDoc(noteRef);

        dispatch( deleteNote( id ) ) 

        Swal.close()
        Swal.fire('Deleted', 'Note deleted successfully', 'success')
    }
} 



export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
})


export const noteLogout = () => {
    return {
        type: types.notesLogoutCleanind
    }
}