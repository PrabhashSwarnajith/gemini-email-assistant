import { useState } from 'react';
import { Container, Typography, Box, TextField, MenuItem, Button, CircularProgress, Alert, FormControl, Select } from '@mui/material';
import axios from 'axios'; // Add this import

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateEmail = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3030/api/v1/email/generate', {
        emailContent,
        tone,
      });
      setGeneratedEmail(response.data);
      // setGeneratedEmail(typeof response.data === 'string' ? response.data : JSON.stringify(response.data)); // Update state with response
    } catch (e) {
      setError('Error in generating email. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Email Reply Generator
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Box sx={{ mb: 2 }}>
        <TextField
          label="Original Email Content"
          multiline
          fullWidth
          variant="outlined"
          rows={6}
          value={emailContent || ''}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <Select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Tone' }}
          >
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
            <MenuItem value="concise">Concise</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleGenerateEmail}
          disabled={!emailContent || loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : 'Generate Reply'}
        </Button>
      </Box>

      {generatedEmail && (
        <Box sx={{ mt: 3, p: 2, border: '1px solid #ddd', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
          <Typography variant="h6">Generated Reply:</Typography>
          <TextField
            multiline
            fullWidth
            variant="outlined"
            rows={6}
            value={generatedEmail}
            inputProps={{ readOnly: true }}
            sx={{ mt: 2 }}
          />
          <Button
            variant="outlined"
            onClick={() => navigator.clipboard.writeText(generatedEmail)}
            sx={{ mt: 2 }}
          >
            Copy to Clipboard
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default App;