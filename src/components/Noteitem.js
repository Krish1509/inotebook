import React  , { useContext}from 'react'
import noteContext from "../components/context/notes/noteContext"

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context
  const { note ,updateNote } = props;
  
  return (
    <div className="flex flex-col items-start  ">
      <div className="block max-w-[100%] p-6  bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-4 mt-2 w-[900px]  ">
        <div className="justify-between flex">
        <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white break-words  ">
          {note.title}
        </p>
          <div>
          <i className="fa-solid fa-trash mx-3 ml-4 cursor-pointer text-[16px]  mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white break-words" onClick={()=>{deleteNote(note._id); 
          props.showAlert("Note Deleted Successfully" , "Success")
          }}></i>
          <i className="fa-solid fa-pen-to-square cursor-pointer text-[16px] mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white break-words " onClick={()=>{updateNote(note);
          }}></i>
          </div>
          </div>
        <p className="font-normal text-gray-700 dark:text-gray-400 break-words ">
          {note.description}
        </p>
      </div>
    </div>
  );
};

export default Noteitem;
