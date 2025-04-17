import { useContext, useState } from "react"
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Create() {
    const [formData , setFormData] = useState({
        name : "",
        description : "",
        start_date : "",   
        end_date : "",     
    })
    const navigate = useNavigate(); 
    const  {token} = useContext(AppContext)
    const [errors , setErrors] = useState({})

    async function handleCreate(e){
        e.preventDefault();
        console.log(formData);
        
        const res = await fetch('/api/tournois', {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });
        

        const data = await res.json();
        console.log(data);

        if(data.errors){
            setErrors(data.errors);
        } else {
            navigate('/'); 
            alert('Tournois created succes!');
        }
    }

    return (
<>
    <h1 className="title">Create Tournoois</h1>
    <form onSubmit={handleCreate}  className="w-1/2 mx-auto space-y-4">
        <div>
            <input type="text" value={formData.name}
            onChange={(e)=>setFormData({...formData , name : e.target.value})} placeholder="Name" />
            {errors.name && <p className="error">{errors.name[0]}</p>}
        </div>

        <div>
          <textarea rows="6" placeholder="Description" value={formData.description}
            onChange={(e)=>setFormData({...formData , description : e.target.value})}></textarea>
          {errors.description && <p className="error">{errors.description[0]}</p>}
        </div>
       
        <div>
          <label className="block mb-1">Start Date</label>
          <input
            type="date"
            value={formData.start_date}
            onChange={(e)=>setFormData({...formData , start_date : e.target.value})}
          />
          {errors.start_date && <p className="error">{errors.start_date[0]}</p>}
        </div>

        <div>
          <label className="block mb-1">End Date</label>
          <input
            type="date"
            value={formData.end_date}
            onChange={(e)=>setFormData({...formData , end_date : e.target.value})}
          />
          {errors.end_date && <p className="error">{errors.end_date[0]}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 w-[100%] py-2 rounded hover:bg-blue-700"
        >
          Create
        </button>
    </form>
</>
    )
}
