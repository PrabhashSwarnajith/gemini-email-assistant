import { Typography, TextField, Button, Box } from '@mui/material';

const GeneratedEmail = ({ email }) => {
  if (!email) return null;

  return (
    <Box className="mt-8 border border-gray-300 dark:border-gray-600 rounded-xl p-5 bg-gray-50 dark:bg-gray-700">
      <Typography variant="h6" className="mb-2 font-semibold text-gray-800 dark:text-white">
        Generated Reply:
      </Typography>
      <TextField
        multiline
        fullWidth
        variant="outlined"
        rows={6}
        value={email}
        inputProps={{ readOnly: true }}
      />
      <Button
        variant="outlined"
        className="mt-4"
        onClick={() => navigator.clipboard.writeText(email)}
      >
        Copy to Clipboard
      </Button>
    </Box>
  );
};

export default GeneratedEmail;