import React, { useState, useEffect } from 'react';
import { ChevronDown, Edit2, Save, X, Plus, Trash2, Search } from 'lucide-react';

export default function ProcurementSystem() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const ADMIN_PASSWORD = 'admin123';

  const [procurements, setProcurements] = useState(() => {
    const saved = localStorage.getItem('procurements');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        category: 'Uchun to\'qlash',
        title: 'Kompyuter texnikasi xaridlari',
        date: '2024-01-15',
        amount: '150,000,000',
        status: 'Yakunlandi',
        description: 'Davlat muassasalari uchun 500 ta kompyuter va 100 ta printer xaridlari',
        budget: '150,000,000 som',
        supplier: 'Tech Solutions LLC',
        details: 'Dell va HP brendlarida kompyuterlar xaridlari'
      }
    ];
  });

  const [selectedId, setSelectedId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Barchasi');
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    localStorage.setItem('procurements', JSON.stringify(procurements));
  }, [procurements]);

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  const handleSave = () => {
    setProcurements(procurements.map(item =>
      item.id === editingId ? editForm : item
    ));
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setProcurements(procurements.filter(item => item.id !== id));
  };

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh', padding: '2rem' }}>
      {!isAuthenticated && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '3rem',
            borderRadius: '12px',
            textAlign: 'center',
            maxWidth: '400px'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '1rem' }}>
              Admin Kirishi
            </h2>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Parolni kiriting..."
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                marginBottom: '1rem'
              }}
            />
            <button
              onClick={() => {
                if (passwordInput === ADMIN_PASSWORD) {
                  setIsAuthenticated(true);
                } else {
                  alert('Parol noto\'g\'ri!');
                }
              }}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Kirish
            </button>
          </div>
        </div>
      )}

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          marginBottom: '2rem'
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>
            Davlat Xaridlari Tizimi
          </h1>
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
            Barcha davlat xaridlari bo'yicha ma'lumorlarni boshqaring
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <input
              type="text"
              placeholder="Xaridni qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                padding: '0.75rem',
                border: '2px solid #e2e8f0',
                borderRadius: '8px'
              }}
            />
            {isAuthenticated && (
              <button style={{
                padding: '0.75rem 1.5rem',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}>
                + Yangi
              </button>
            )}
          </div>
        </div>

        <div>
          {procurements.map(item => (
            <div key={item.id} style={{
              background: 'white',
              borderRadius: '12px',
              marginBottom: '1rem',
              overflow: 'hidden'
            }}>
              <div
                onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
                style={{
                  padding: '1.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#64748b' }}>{item.description}</p>
                </div>
                <ChevronDown size={24} />
              </div>

              {selectedId === item.id && (
                <div style={{ padding: '1.5rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
                  <p><strong>Sana:</strong> {item.date}</p>
                  <p><strong>Miqdor:</strong> {item.amount} som</p>
                  <p><strong>Yetkazib beruvchi:</strong> {item.supplier}</p>
                  
                  {isAuthenticated && (
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                      <button style={{
                        flex: 1,
                        padding: '0.75rem',
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}>
                        Tahrirlash
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        style={{
                          flex: 1,
                          padding: '0.75rem',
                          background: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer'
                        }}
                      >
                        O'chirish
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
