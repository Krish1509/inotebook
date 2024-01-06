import React, { useContext, useState } from "react";
import noteContext from "../components/context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    
    props.showAlert("Note Added successfully", "Success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
 
  // const [notes, setNotes] = useState([]);
  // const [inputValue, setInputValue] = useState("");
  
  return (
    <div className="  flex flex-col bg-gray-200 p-4 m-12  mt-14  rounded-md border-2 border-gray-300 w-[30%]">
      <h1 className="text-2xl font-bold mb-5 mt-10 mx-5">Add a Note</h1>
      <div className="  mx0">
        <form className="mx-5 ">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              htmlFor="title "
              name="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={onChange}
              value={note.title}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              htmlFor="description "
              name="description"
              className="desc  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={onChange}
              value={note.description}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Tag
            </label>
            <input
              type="text"
              id="tag"
              htmlFor="tag "
              name="tag"
              className="desc bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={onChange}
              value={note.tag}
            />
          </div>
          <button
            type="submit"
            disabled={note.title.length < 1 || note.description.length < 2}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-1 mb-8"
            onClick={handleClick}
          >
            Create Note
          </button>
       
        </form>

      </div>
    </div>
  );
};

export default AddNote;
