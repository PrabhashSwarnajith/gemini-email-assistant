import { useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Alert } from '@mui/material';
import Header from './components/Header';
import EmailForm from './components/EmailForm';
import GeneratedEmail from './components/GeneratedEmail';
import axios from 'axios';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [error, setError] = useState('');

  const theme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    }
  }), [darkMode]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleGenerate = async (emailContent, tone) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:3030/api/v1/email/generate', {
        emailContent,
        tone,
      });
      setGeneratedEmail(response.data);
    } catch (e) {
      setError('Error generating email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
        <div className="w-full max-w-3xl bg-white dark:bg-gray-800 p-6 sm:p-10 rounded-2xl shadow-xl">
          <Header darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
          {error && <Alert severity="error" className="mb-4">{error}</Alert>}
          <EmailForm onGenerate={handleGenerate} loading={loading} />
          <GeneratedEmail email={generatedEmail} />
          <Footer/>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
