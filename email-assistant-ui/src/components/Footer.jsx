const Footer = () => {
    return (
      <footer className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-6">
        <p>Created with ❤️ by <span className="font-semibold text-indigo-600 dark:text-indigo-400">AlphaCode</span></p>
        <p className="mt-1">&copy; {new Date().getFullYear()} Email Reply Assistant</p>
      </footer>
    );
  };
  
  export default Footer;
  