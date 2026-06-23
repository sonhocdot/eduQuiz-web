import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hàm gọi API từ Laravel Backend
    axios.get('http://localhost:8000/api/demos')
      .then(response => {
        setQuizzes(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi gọi API:", err);
        setError("Không thể tải danh sách bài Quiz. Vui lòng kiểm tra CORS hoặc Backend!");
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: '20px' }}>Đang tải dữ liệu...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333' }}>Danh Sách Bài Trắc Nghiệm (eduQuiz)</h1>
      <p style={{ color: '#666' }}>Dữ liệu được lấy trực tiếp từ Laravel API + MySQL qua Docker</p>
      
      <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
        {quizzes.map(quiz => (
          <div key={quiz.id} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ margin: '0 0 10px 0', color: '#007bff' }}>{quiz.title}</h2>
            <p style={{ margin: '0 0 10px 0', color: '#555' }}>{quiz.description}</p>
            <span style={{
              background: '#e9ecef',
              padding: '5px 10px',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              Số câu hỏi: {quiz.total_questions}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
