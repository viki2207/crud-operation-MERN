import { useEffect, useState } from "react";
import "./App.css";

import axios from "axios";
import FormTable from "./components/FormTable";

axios.defaults.baseURL = "http://localhost:8080/";
function App() {
  //add section for add the popup and setAddsection for when we close and open popups // set add section bydefault popup false but when close and open that changes did via setAddsection
  const [addsection, setAddSection] = useState(false);
  //edit data
  const [editSection, setEditSection] = useState(false);

  //bydefault formdata is empty first // setform data whatever data wants to update that field that part doing via setFormData
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    mobile: "",
    _id: "",
  });
  const [datalist, setDatalist] = useState([]);
  const handleChange = (e) => {
    //value changed and set value with this function
    const { value, name } = e.target;
    //prev - its previous state we can use any previous state value for modify and update..
    setFormData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  //add data
  const handleSubmit = async (e) => {
    e.preventDefault();
    //data pass to api
    const data = await axios.post("/create", formData);
    console.log(data);

    if (data.data.sucess) {
      setAddSection(false);
      alert(data.data.message);
      getFetchData();
      setFormData({
        name: "",
        email: "",
        mobile: "",
      });
    }
  };
  //get the data get all data from database
  const getFetchData = async () => {
    const data = await axios.get("/");
    console.log(data);
    if (data.data.sucess) {
      setDatalist(data.data.data);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  //delete the data
  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id);

    if (data.data.sucess) {
      getFetchData();
      alert(data.data.message);
    }
  };
  //update data
  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put("/update/", formDataEdit);
    console.log(data);
    if (data.data.sucess) {
      getFetchData();
      alert(data.data.message);
      setEditSection(false);
    }
  };

  const handleEditChange = async (e) => {
    //value changed and set value with this function
    const { value, name } = e.target;
    //prev - its previous state we can use any previous state value for modify and update..
    setFormDataEdit((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
  };

  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddSection(true)}>
          Add
        </button>
        {addsection && (
          <FormTable
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleclose={() => setAddSection(false)}
            rest={formData}
          />
        )}
        {editSection && (
          <FormTable
            handleSubmit={handleUpdate}
            handleChange={handleEditChange}
            handleclose={() => setEditSection(false)}
            rest={formDataEdit}
          />
        )}
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>EmailId</th>
                <th>Mobile</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {datalist[0] ? (
                datalist.map((el) => {
                  return (
                    <tr>
                      <td id={el._id}>{el.name}</td>
                      <td id={el._id}>{el.email}</td>
                      <td id={el._id}>{el.mobile}</td>
                      <td>
                        <button
                          className="btn btn-edit"
                          id={el._id}
                          onClick={() => handleEdit(el)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-delete"
                          id={el._id}
                          onClick={() => handleDelete(el._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center" }}>
                    {" "}
                    No Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
