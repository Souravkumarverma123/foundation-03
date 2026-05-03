import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.freeapi.app/api/v1/public/randomusers');
        const result = await response.json();
        setUsers(result.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading users...</p>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <div className="error-icon">⚠</div>
      <h2>Something went wrong</h2>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="app">
      <header className="header">
        <h1>Discover People</h1>
        <p>Connect with interesting people from around the world</p>
      </header>
      
      <main className="users-grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <div className="card-header">
              <img 
                src={user.picture.large} 
                alt={`${user.name.first} ${user.name.last}`}
                className="avatar"
              />
              <div className="online-indicator"></div>
            </div>
            
            <div className="card-body">
              <h2 className="user-name">
                {user.name.first} {user.name.last}
              </h2>
              <span className="user-title">{user.name.title}</span>
              
              <div className="user-details">
                <div className="detail-row">
                  <span className="detail-icon">✉</span>
                  <span className="detail-text">{user.email}</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-icon">📍</span>
                  <span className="detail-text">
                    {user.location.city}, {user.location.country}
                  </span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-icon">📞</span>
                  <span className="detail-text">{user.phone}</span>
                </div>
              </div>
              
              <div className="card-footer">
                <button className="btn btn-primary">View Profile</button>
                <button className="btn btn-secondary">Message</button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;