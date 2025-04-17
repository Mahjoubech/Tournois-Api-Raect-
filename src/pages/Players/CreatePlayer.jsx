import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function CreatePlayer() {
    const [formData, setFormData] = useState({
        name: "",
        number: "",
        tournois_id: ""
    });
    const navigate = useNavigate();
    const { token } = useContext(AppContext);
    const [errors, setErrors] = useState({});

    async function handleCreate(e) {
        e.preventDefault();
        
        const res = await fetch('/api/players', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.errors) {
            setErrors(data.errors);
        } else {
            navigate('/players');
            alert('Player created successfully!');
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 py-12">
            <div className="max-w-2xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-white mb-8">Create Player</h1>
                
                <form onSubmit={handleCreate} className="space-y-6 bg-gray-800 p-6 rounded-lg">
                    <div>
                        <label className="block text-gray-300 mb-2">Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-gray-700 text-white rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name && <p className="text-red-500 mt-1">{errors.name[0]}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2">Number</label>
                        <input
                            type="number"
                            value={formData.number}
                            onChange={(e) => setFormData({...formData, number: e.target.value})}
                            className="w-full bg-gray-700 text-white rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.number && <p className="text-red-500 mt-1">{errors.number[0]}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2">Tournament ID</label>
                        <input
                            type="number"
                            value={formData.tournois_id}
                            onChange={(e) => setFormData({...formData, tournois_id: e.target.value})}
                            className="w-full bg-gray-700 text-white rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.tournois_id && <p className="text-red-500 mt-1">{errors.tournois_id[0]}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                    >
                        Create Player
                    </button>
                </form>
            </div>
        </div>
    );
}