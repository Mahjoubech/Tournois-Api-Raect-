import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function CreateMatch() {
    const [formData, setFormData] = useState({
        date_match: "",
        tournois_id: "",
    });
    const navigate = useNavigate();
    const { token } = useContext(AppContext);
    const [errors, setErrors] = useState({});

    async function handleCreate(e) {
        e.preventDefault();
        
        const res = await fetch('/api/matches', {
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
            navigate('/matches');
            alert('Match created successfully!');
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 py-12">
            <div className="max-w-2xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-white mb-8">Create Match</h1>
                
                <form onSubmit={handleCreate} className="space-y-6 bg-gray-800 p-6 rounded-lg">
                    <div>
                        <label className="block text-gray-300 mb-2">Match Date</label>
                        <input
                            type="datetime-local"
                            value={formData.date_match}
                            onChange={(e) => setFormData({...formData, date_match: e.target.value})}
                            className="w-full bg-gray-700 text-white rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.date_match && <p className="text-red-500 mt-1">{errors.date_match[0]}</p>}
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
                        Create Match
                    </button>
                </form>
            </div>
        </div>
    );
}