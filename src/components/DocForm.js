import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DocumentForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { id } = useParams();
    // const navigate = useNavigate();

    useEffect(() => {
        const fetchDoc = async () => {
            if (id) {
                try {
                    const response = await fetch(`http://localhost:9000/${id}`);
                    const data = await response.json();
                    setTitle(data.title);
                    setContent(data.content);
                } catch (error) {
                    console.error('Error fetching document:', error);
                }
            }
        };

        fetchDoc();
    }, [id]);

    const submitDoc = async (e) => {
        e.preventDefault();

        const docData = { title, content };

        try {
            const requestOptions = {
              method: id ? 'PUT' : 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(docData)
            };

            const url = id ? `http://localhost:9000/${id}` : 'http://localhost:9000/';

            const response = await fetch(url, requestOptions);

            if (!response.ok) {
                throw new Error(`Miss`);
            }
            window.location.href = '/';
        } catch (error) {
            console.error(`Error ${id ? 'updating' : 'creating'} document:`, error);
        }
    };

    return (
        <div>
          <form onSubmit={submitDoc}>
          <h2>{id ? 'Edit Document' : 'Create New Document'}</h2>
            <div>
              <label htmlFor='title'>Title:</label>
              <input
                type="text"
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor='content'>Content:</label>
              <textarea
                id='content'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <button type="submit">{id ? 'Save' : 'Create'}</button>
            <button onClick={() => window.location.href = '/'}>Cancel</button>
          </form>
        </div>
    );
};

export default DocumentForm;