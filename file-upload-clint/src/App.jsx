// import { FaLink } from "react-icons/fa";
// import { Link } from "react-router-dom";

// function Component() {
//   return (
//     <div className="flex justify-start mt-10 items-start ml-10">
//       <div className="shadow-md drop-shadow-md rounded-lg overflow-hidden">
//   <table className="table table-md table-pin-rows table-pin-cols ">
//     <thead>
//       <tr>
//         <th>SL</th>
//         <td>Name</td>
//         <td>Type</td>
//         <th></th>
//       </tr>
//     </thead>
//     <tbody>
      
   
//       <tr>
//         <th>1</th>
//         <td>Zaneta Tewkesbury</td>
//         <td>pdf</td>
//         <td>
//          <button className="mr-1" onClick={()=>document.getElementById('my_modal_2').showModal()}>
//          <FaLink />
//          </button>
//         </td>
       
//       </tr>
     
//     </tbody>
   
//   </table>
// </div>
// <dialog id="my_modal_2" className="modal">
//   <div className="modal-box">
//    <div className="flex justify-center items-center p-20 border-2 rounded-md border-black border-dashed">
//     <input type="file" />
//    </div>
//   </div>
//   <form method="dialog" className="modal-backdrop">
//     <button>close</button>
//   </form>
// </dialog>
//     </div>
//   );
// }

// export default Component;


import  { useState } from 'react';
import axios from 'axios';
import { FaLink } from 'react-icons/fa';

const App = () => {
  const [file, setFiles] = useState();




  // handle add 
  const handleAdd = async () => {
    const formData = new FormData()
    formData.append('file', file)
    // const extractFiles = file
    // const files = {extractFiles}
    // console.log(extractFiles);
    // console.log("here is file",files);
    try {
      const response = await axios.post("http://localhost:5001/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(`File uploaded successfully! File ID: ${response.data.fileId}`);
    } catch (error) {
      alert("Failed to upload file");
    }
  
  }
 

  return (
    <div className="flex justify-start mt-10 items-start ml-10">
      <div className="shadow-md drop-shadow-md rounded-lg overflow-hidden">
        <table className="table table-md table-pin-rows table-pin-cols ">
          <thead>
            <tr>
              <th>SL</th>
              <td>Name</td>
              <td>Type</td>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            
              <tr>
                <th>10</th>
                <td>mab</td>
                <td>df</td>
                <td>
                  <button
                    className="mr-1"
                    onClick={() => document.getElementById('my_modal_2').showModal()}
                  >
                    <FaLink />
                    
                  </button>
                </td>
              </tr>
           
          </tbody>
        </table>
      </div>

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <div className="flex justify-center items-center p-20 border-2 rounded-md border-black border-dashed">
            <input type="file" multiple onChange={(e)=> setFiles(e.target.files[0])} />
          </div>
          <button onClick={handleAdd} className='btn'>Add</button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </div>
  );
};

export default App;

