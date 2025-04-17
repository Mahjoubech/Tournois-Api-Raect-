import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function CreateScore() {
    const [formData, setFormData] = useState({
        player1_id: "",
        player2_id: "",
        match_id: "",
        player1_score: "",
        player2_score: ""
    });
    const navigate = useNavigate();
    const { token } = useContext(AppContext);
    const [errors, setErrors] = useState({});

    async function handleCreate(e) {
        e.preventDefault();
        
        const res = await fetch('/api/scores', {
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
            navigate('/scores');
            alert('Score created successfully!');
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 py-12">
            <div className="max-w-2xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-white mb-8">Record Score</h1>
                
                <form onSubmit={handleCreate} className="space-y-6 bg-gray-800 p-6 rounded-lg">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-300 mb-2">Player 1</label>
                            <input
                                type="number"
                                value={formData.player1_id}
                                onChange={(e) => setFormData({...formData, player1_id: e.target.value})}
                                className="w-full bg-gray-700 text-white rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                placeholder="Player 1 ID"
                            />
                            {errors.player1_id && <p className="text-red-500 mt-1">{errors.player1_id[0]}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-300 mb-2">Player 2</label>
                            <input
                                type="number"
                                value={formData.player2_id}
                                onChange={(e) => setFormData({...formData, player2_id: e.target.value})}
                                className="w-full bg-gray-700 text-white rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                placeholder="Player 2 ID"
                            />
                            {errors.player2_id && <p className="text-red-500 mt-1">{errors.player2_id[0]}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-300 mb-2">Player 1 Score</label>
                            <input
                                type="number"
                                value={formData.player1_score}
                                onChange={(e) => setFormData({...formData, player1_score: e.target.value})}
                                className="w-full bg-gray-700 text-white rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.player1_score && <p className="text-red-500 mt-1">{errors.player1_score[0]}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-300 mb-2">Player 2 Score</label>
                            <input
                                type="number"
                                value={formData.player2_score}
                                onChange={(e) => setFormData({...formData, player2_score: e.target.value})}
                                className="w-full bg-gray-700 text-white rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.player2_score && <p className="text-red-500 mt-1">{errors.player2_score[0]}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2">Match</label>
                        <input
                            type="number"
                            value={formData.match_id}
                            onChange={(e) => setFormData({...formData, match_id: e.target.value})}
                            className="w-full bg-gray-700 text-white rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            placeholder="Match ID"
                        />
                        {errors.match_id && <p className="text-red-500 mt-1">{errors.match_id[0]}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                    >
                        Record Score
                    </button>
                </form>
            </div>
        </div>
    );
}