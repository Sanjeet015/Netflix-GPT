import React from 'react'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-center text-gray-500 text-sm py-4">
      <p>&copy; {currentYear} Netflix-GPT. All rights reserved. | Made with ❤️ by <a href="https://www.linkedin.com/in/sanjeet-soni/" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400 transition">Sanjeet Soni</a></p>
    </footer>
  )
}

export default Footer
