import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch()
    const {active:note} = useSelector(state => state.notes)
    const [values, handleInputChange, reset] = useForm(note)
    const {body, title, url, id} = values
    
    const activeId = useRef(note.id)
    const activeUrl = useRef(note.url)

    useEffect(() => {
        
        if( note.id !== activeId.current ){
            reset( note )
            activeId.current = note.id
        }
        if( note.url !== activeUrl.current ){
            reset( note )
            activeUrl.current = note.url
        }


    }, [note, reset])

    useEffect(() => {
        
        dispatch( activeNote( values.id, { ...values } ) )
        
    }, [values, dispatch])

    const handleImageClick = () => {
        document.getElementById('imageUploader').click();
    }

    const handleDelete = () => {
        dispatch( startDeleting( id ) )
    }
    
    return (
        <div className="notes__main-content animate__animated animate__fadeIn animate_faster">
            
            <NotesAppBar />

            <div className="notes__content">
                <input 
                    type="text"
                    name="title"
                    placeholder="Some awesom title"
                    className="notes__title-input animate__animated animate__fadeInRight animate_faster"
                    autoComplete="off"
                    value={title}
                    onChange={ handleInputChange }
                />

                <textarea
                    name="body"
                    placeholder="What happended today"
                    className="notes__textarea animate__animated animate__fadeInRight animate_faster"
                    value={body}
                    onChange={ handleInputChange }
                ></textarea>

                {
                    (url)
                    &&
                    <div 
                        className="notes__image animate__animated animate__fadeInRight animate_faster"
                        onClick={ handleImageClick }    
                    >
                        <img 
                            src={url} alt="imagen"
                        />
                    </div>
                }

            </div>

            <button 
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                Delete
            </button>

        </div>
    )
}
