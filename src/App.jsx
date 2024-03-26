import { useEffect, useState } from "react";
import { EmployeeData } from "./EmployeeData.js";

function App() {
  const [data, setData] = useState([]);
  const [id, setId] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setData(EmployeeData);
  }, []);

  const handleEdit = (id) => {
    const dt = data.filter((item) => item.id === id);
    if (dt !== undefined) {
      setUpdate(true);
      setId(id);
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
    }
  };
  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Do you want to delete this item ?")) {
        const dt = data.filter((item) => item.id !== id);
        setData(dt);
      }
    }
  };

  const handleSave = (e) => {
    // e.preventDefault();
 
    const dt = [...data];
    const newObject = {
      id: dt.length + 1,
      firstName: firstName,
      lastName: lastName,
    };
    dt.push(newObject);
    setData(dt);
    handleClear();
  };
  const handleUpdate = () => {
    const idx = data.findIndex((item) => item.id === id);
    if (idx !== -1) {
      const updatedData = [...data];
      updatedData[idx] = { id, firstName, lastName };
      setData(updatedData);
      handleClear();
    }
  };
  const handleClear = () => {
    setId(0);
    setFirstName("");
    setLastName("");
    setUpdate(false);
  };
  return (
    <>
      <div className="item-box">
        <div>
          <label>First Name</label>
          <input
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </div>
        <div>
          {!update ? (
            <button className="btn green" onClick={(e) => handleSave()}>
              Save
            </button>
          ) : (
            <button className="btn green" onClick={handleUpdate}>
              Update
            </button>
          )}
          <button className="btn red" onClick={handleClear}>
            Cancel
          </button>
        </div>
      </div>

      <table>
        <thead>
          <th>S.no</th>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Action</th>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>
                  <button
                    className="btn green"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn red"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
