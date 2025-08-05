import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

function MyResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/result/mine', {
          headers: { 'x-auth-token': token },
        });
        setResults(res.data);
      } catch (err) {
        alert('Error fetching results');
      }
    };
    fetchResults();
  }, []);

  const exportToPDF = () => {
    const input = document.getElementById('result-content');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('my-result.pdf');
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">My Results</h2>

      <div className="text-end">
        <button onClick={exportToPDF} className="btn btn-danger mb-4">
          Download as PDF
        </button>
      </div>

      <div id="result-content">
        {results.length === 0 ? (
          <p>No results available.</p>
        ) : (
          results.map((res, index) => (
            <div key={index} className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Semester: {res.semester}</h5>
                <p className="card-text">
                  <strong>Total:</strong> {res.totalMarks} &nbsp; | &nbsp;
                  <strong>Percentage:</strong> {res.percentage}% &nbsp; | &nbsp;
                  <strong>Grade:</strong> {res.grade} &nbsp; | &nbsp;
                  <strong>Status:</strong>{' '}
                  <span
                    className={
                      res.resultStatus === 'Pass'
                        ? 'text-success'
                        : 'text-danger'
                    }
                  >
                    {res.resultStatus}
                  </span>
                </p>

                <ul className="list-group mb-3">
                  {res.subjects.map((sub, i) => (
                    <li key={i} className="list-group-item">
                      {sub.name} - {sub.marks}/{sub.maxMarks}
                    </li>
                  ))}
                </ul>

                {/* Bar Chart */}
                <div>
                  <Bar
                    data={{
                      labels: res.subjects.map((s) => s.name),
                      datasets: [
                        {
                          label: 'Marks',
                          data: res.subjects.map((s) => s.marks),
                          backgroundColor: 'rgba(75,192,192,0.6)',
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { display: true },
                        title: { display: false },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyResults;
