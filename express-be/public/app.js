// D&D Character Sheet React App
const { useState, useEffect } = React;

function CharacterForm({ character, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        name: character?.name || '',
        class: character?.class || '',
        level: character?.level || 1,
        race: character?.race || '',
        background: character?.background || '',
        strength: character?.strength || 10,
        dexterity: character?.dexterity || 10,
        constitution: character?.constitution || 10,
        intelligence: character?.intelligence || 10,
        wisdom: character?.wisdom || 10,
        charisma: character?.charisma || 10,
        hitPoints: character?.hitPoints || 8,
        armorClass: character?.armorClass || 10,
        speed: character?.speed || 30,
        alignment: character?.alignment || 'True Neutral',
        experiencePoints: character?.experiencePoints || 0
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSave(formData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name.includes('level') || name.includes('Points') || name.includes('Class') || name.includes('speed') ? parseInt(value) || 0 : value
        }));
    };

    return (
        <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>{character ? 'Edit Character' : 'Create New Character'}</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                    <div>
                        <label>Character Name:</label><br />
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div>
                        <label>Class:</label><br />
                        <input type="text" name="class" value={formData.class} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div>
                        <label>Level:</label><br />
                        <input type="number" name="level" value={formData.level} onChange={handleChange} min="1" max="20" style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div>
                        <label>Race:</label><br />
                        <input type="text" name="race" value={formData.race} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div>
                        <label>Background:</label><br />
                        <input type="text" name="background" value={formData.background} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div>
                        <label>Alignment:</label><br />
                        <input type="text" name="alignment" value={formData.alignment} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
                    </div>
                </div>

                <h3>Ability Scores</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '20px' }}>
                    <div>
                        <label>Strength:</label><br />
                        <input type="number" name="strength" value={formData.strength} onChange={handleChange} min="1" max="30" style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div>
                        <label>Dexterity:</label><br />
                        <input type="number" name="dexterity" value={formData.dexterity} onChange={handleChange} min="1" max="30" style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div>
                        <label>Constitution:</label><br />
                        <input type="number" name="constitution" value={formData.constitution} onChange={handleChange} min="1" max="30" style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div>
                        <label>Intelligence:</label><br />
                        <input type="number" name="intelligence" value={formData.intelligence} onChange={handleChange} min="1" max="30" style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div>
                        <label>Wisdom:</label><br />
                        <input type="number" name="wisdom" value={formData.wisdom} onChange={handleChange} min="1" max="30" style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div>
                        <label>Charisma:</label><br />
                        <input type="number" name="charisma" value={formData.charisma} onChange={handleChange} min="1" max="30" style={{ width: '100%', padding: '8px' }} />
                    </div>
                </div>

                <h3>Combat Stats</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '20px' }}>
                    <div>
                        <label>Hit Points:</label><br />
                        <input type="number" name="hitPoints" value={formData.hitPoints} onChange={handleChange} min="1" style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div>
                        <label>Armor Class:</label><br />
                        <input type="number" name="armorClass" value={formData.armorClass} onChange={handleChange} min="1" style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div>
                        <label>Speed:</label><br />
                        <input type="number" name="speed" value={formData.speed} onChange={handleChange} min="1" style={{ width: '100%', padding: '8px' }} />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#8B4513', color: 'white', border: 'none', borderRadius: '4px' }}>
                        {character ? 'Update Character' : 'Create Character'}
                    </button>
                    {onCancel && (
                        <button type="button" onClick={onCancel} style={{ padding: '10px 20px', backgroundColor: '#666', color: 'white', border: 'none', borderRadius: '4px' }}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

function CharacterCard({ character, onEdit, onDelete }) {
    return (
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', margin: '10px 0' }}>
            <h3>{character.name}</h3>
            <p><strong>Class:</strong> {character.class} <strong>Level:</strong> {character.level}</p>
            <p><strong>Race:</strong> {character.race} <strong>Background:</strong> {character.background}</p>
            <p><strong>HP:</strong> {character.hitPoints} <strong>AC:</strong> {character.armorClass} <strong>Speed:</strong> {character.speed}ft</p>
            <div style={{ marginTop: '10px' }}>
                <button onClick={() => onEdit(character)} style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#8B4513', color: 'white', border: 'none', borderRadius: '4px' }}>
                    Edit
                </button>
                <button onClick={() => onDelete(character.id)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>
                    Delete
                </button>
            </div>
        </div>
    );
}

function App() {
    const [characters, setCharacters] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingCharacter, setEditingCharacter] = useState(null);
    const [message, setMessage] = useState('');

    // Load characters on component mount
    useEffect(() => {
        loadCharacters();
    }, []);

    const loadCharacters = async () => {
        try {
            const response = await fetch('/api/characters');
            const data = await response.json();
            setCharacters(data);
        } catch (error) {
            setMessage(`Error loading characters: ${error.message}`);
        }
    };

    const handleSave = async (characterData) => {
        try {
            const url = editingCharacter ? `/api/characters/${editingCharacter.id}` : '/api/characters';
            const method = editingCharacter ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(characterData)
            });

            if (response.ok) {
                setMessage(editingCharacter ? 'Character updated successfully!' : 'Character created successfully!');
                setShowForm(false);
                setEditingCharacter(null);
                loadCharacters();
            } else {
                const error = await response.json();
                setMessage(`Error: ${error.message}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    const handleEdit = (character) => {
        setEditingCharacter(character);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this character?')) {
            try {
                const response = await fetch(`/api/characters/${id}`, { method: 'DELETE' });
                if (response.ok) {
                    setMessage('Character deleted successfully!');
                    loadCharacters();
                } else {
                    const error = await response.json();
                    setMessage(`Error: ${error.message}`);
                }
            } catch (error) {
                setMessage(`Error: ${error.message}`);
            }
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <header style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h1 style={{ color: '#8B4513' }}>D&D Character Sheet Manager</h1>
                <button 
                    onClick={() => setShowForm(true)} 
                    style={{ padding: '10px 20px', backgroundColor: '#8B4513', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px' }}
                >
                    Create New Character
                </button>
            </header>

            {message && (
                <div style={{ padding: '10px', backgroundColor: '#d4edda', border: '1px solid #c3e6cb', borderRadius: '4px', marginBottom: '20px' }}>
                    {message}
                </div>
            )}

            {showForm && (
                <CharacterForm 
                    character={editingCharacter} 
                    onSave={handleSave} 
                    onCancel={() => { setShowForm(false); setEditingCharacter(null); }} 
                />
            )}

            <div>
                <h2>Your Characters ({characters.length})</h2>
                {characters.length === 0 ? (
                    <p>No characters yet. Create your first character!</p>
                ) : (
                    characters.map(character => (
                        <CharacterCard 
                            key={character.id} 
                            character={character} 
                            onEdit={handleEdit} 
                            onDelete={handleDelete} 
                        />
                    ))
                )}
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
