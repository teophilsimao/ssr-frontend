import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import LogoutButton from '../user/UserLogout';

const DocumentList = () => {
    const [documents, setDocs] = useState([]);

    useEffect(() => {
        const fetchDocs = async () => {
            const token = localStorage.getItem('token');
            const url = `https://jsramverk-editor-tesi23-beh7hvfadub6fugk.northeurope-01.azurewebsites.net/documents/`;

            try {
                const requestOptions = {
                    headers: {
                        'x-access-token': `${token}`,
                    }
                };
                const response = await fetch(url, requestOptions);
                const data = await response.json()
                
                setDocs(data);
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        };

        fetchDocs();
    }, []);

    const deleteDoc = async (id) => {
        const token = localStorage.getItem('token');
        const url = `https://jsramverk-editor-tesi23-beh7hvfadub6fugk.northeurope-01.azurewebsites.net/documents/${id}`;

        try {
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'x-access-token': `${token}`,
                },
            };

            await fetch(url, requestOptions);
            setDocs(documents.filter(doc => doc._id !== id));
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    }

    return (
        <div className="content-container">
            <div className="title-row">
                <h2>Documents</h2>
                < LogoutButton />
            </div>
            <Link to="/documents/new">Create New Document</Link>

                <ul className="doc-list">
                    {documents.map((doc) => (
                        <li className="doc-row" key={doc._id}>
                            <Link to={`/documents/${doc._id}/edit`}>{doc.title}</Link>
                            <button onClick={() => deleteDoc(doc._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
        </div>
    );
};

export default DocumentList;