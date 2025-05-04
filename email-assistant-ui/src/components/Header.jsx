import { Typography, Switch } from '@mui/material';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
      <Typography variant="h4" className="mb-4 sm:mb-0 font-bold text-gray-800 dark:text-white">
        ✉️ Email Reply Generator
      </Typography>
      <div className="flex items-center">
        <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">Dark Mode</span>
        <Switch checked={darkMode} onChange={toggleDarkMode} />
      </div>
    </div>
  );
};

export default Header;