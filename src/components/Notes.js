import React, { useContext, useEffect, useRef , useState } from "react";
import noteContext from "../components/context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Notes = (props) => {
  const context = useContext(noteContext);
  let history = useHistory ()
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      history.push("/login")
    }
  },[]);
  
  const [showModal, setShowModal] = React.useState(false);
  const [note , setNote] = useState({id:"", etitle :"", edescription:"", etag:"default"})

  const ref = useRef(null);
  const refClose = useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id , etitle: currentNote.title, edescription: currentNote.description , etag: currentNote.tag})
  };

  const handleClick = (e)=>{
    editNote(note.id ,note.etitle,note.edescription, note.etag)
    ref.current.click();
    setShowModal(false)
    props.showAlert("Note updated successfully","Success")

  }
  const onChange = (e)=>{
      setNote({...note, [e.target.name]: e.target.value})
  }

  return (

    <div className="flex ">
      <AddNote showAlert={props.showAlert}/>
      <button
        className="invisible absolute"
        type="button"
        onClick={() => setShowModal(true)}
        ref={ref}
      >
        Open regular modal
      </button>
      {showModal ? (
        <>
          <div
            className=" items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-2 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Modal Title
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 bg-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <div className="">
        <form className="max-w-sm mx-auto">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              title
            </label>
            <input
              type="text"
              id="etitle"
              htmlFor='etitle '
              name='etitle'
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={onChange}
              value={note.etitle}
              minLength={2}
              
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              description
            </label>
            <input
               type="text"
               id="edescription"
               htmlFor='edescription '
               name='edescription'
              className="desc bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={onChange}
              value={note.edescription}
              minLength={5}

            />
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
            <input
               type="text"
               id="etag"
               htmlFor='etag'
               name='etag'
              className="desc bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={onChange}
              value={note.etag}
              
            />
            </div>
          </div>
          
        </form>
      </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                    ref={refClose}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleClick}

                  >
                    Update Note
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div className="my-10 mt-14 bg-gray-200 p-5 w-[750px] rounded-md border-2 border-gray-300">
      <div className="flex flex-col space-x-4 mr-3 ">
      <h1 className="text-2xl font-bold mt-10v mb-4 mt-10 ml-4 ">Your Notes</h1>
      {Array.isArray(notes) && notes.length === 0 ? (
  'No notes to display'
) : (
  Array.isArray(notes) && notes.map((note) => (
    <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
  ))
)}
      </div>
        </div>
    </div>
  );
};

export default Notes;
