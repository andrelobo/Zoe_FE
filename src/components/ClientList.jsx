import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('https://zoe-be.onrender.com/api/clients');
        setClients(response.data.clients);
      } catch (error) {
        setError('Error fetching clients');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold text-pink-400 mb-8">Client List</h1>
        <ul className="space-y-4">
          {clients.map(client => (
            <li key={client._id} className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">{client.name}</h2>
                <p className="text-gray-300"><strong>Email:</strong> {client.email}</p>
                <p className="text-gray-300"><strong>Phone:</strong> {client.phone}</p>
                <p className="text-gray-300"><strong>Number of Purchases:</strong> {client.purchaseCount}</p>
              </div>
              <Link to={`/clients/${client._id}`} className="text-pink-400 hover:text-white font-semibold">
                View Details
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClientList;
