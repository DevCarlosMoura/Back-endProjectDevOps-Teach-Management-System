import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { teacherService, type Teacher } from '../services/teachers';
import { authService } from '../services/auth';

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    bio: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      const data = await teacherService.getAll();
      setTeachers(data);
    } catch (error) {
      console.error('Erro ao carregar professores:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await teacherService.update(editingId, formData);
      } else {
        await teacherService.create(formData);
      }
      setFormData({ name: '', email: '', phone: '', specialization: '', bio: '' });
      setShowForm(false);
      setEditingId(null);
      loadTeachers();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Erro ao salvar professor');
    }
  };

  const handleEdit = (teacher: Teacher) => {
    setFormData({
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      specialization: teacher.specialization,
      bio: teacher.bio || '',
    });
    setEditingId(teacher.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja deletar este professor?')) {
      try {
        await teacherService.delete(id);
        loadTeachers();
      } catch (error) {
        alert('Erro ao deletar professor');
      }
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Gerenciamento de Professores</h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px' }}>
          Sair
        </button>
      </div>

      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingId(null);
          setFormData({ name: '', email: '', phone: '', specialization: '', bio: '' });
        }}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        {showForm ? 'Cancelar' : 'Novo Professor'}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: '#f5f5f5',
            padding: '20px',
            marginBottom: '20px',
            borderRadius: '5px',
          }}
        >
          <h2>{editingId ? 'Editar Professor' : 'Novo Professor'}</h2>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Nome"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="tel"
              placeholder="Telefone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Especialização"
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <textarea
              placeholder="Biografia"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              style={{ width: '100%', padding: '8px', minHeight: '80px' }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Salvar
          </button>
        </form>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Nome</th>
            <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Email</th>
            <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Telefone</th>
            <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Especialização</th>
            <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{teacher.name}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{teacher.email}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{teacher.phone}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{teacher.specialization}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <button
                  onClick={() => handleEdit(teacher)}
                  style={{
                    padding: '5px 10px',
                    marginRight: '5px',
                    backgroundColor: '#ffc107',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(teacher.id)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
