import { useState } from 'react';
import {
  TextField, MenuItem, Button,
  CircularProgress, FormControl, Select
} from '@mui/material';

const EmailForm = ({ onGenerate, loading }) => {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');

  const handleSubmit = () => {
    onGenerate(emailContent, tone);
  };

  const handleReset = () => {
    setEmailContent('');
    setTone('');
  };

  return (
    <div className="space-y-4 mb-6">
      <TextField
        label="Original Email Content"
        multiline
        fullWidth
        variant="outlined"
        rows={5}
        value={emailContent}
        onChange={(e) => setEmailContent(e.target.value)}
      />
      <div className="text-right text-sm text-gray-500">{emailContent.length} characters</div>

      <FormControl fullWidth variant="outlined">
        <Select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">Select Tone</MenuItem>
          <MenuItem value="professional">Professional</MenuItem>
          <MenuItem value="casual">Casual</MenuItem>
          <MenuItem value="friendly">Friendly</MenuItem>
          <MenuItem value="concise">Concise</MenuItem>
        </Select>
      </FormControl>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!emailContent || loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Reply'}
        </Button>
        <Button variant="outlined" onClick={handleReset} fullWidth>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default EmailForm;