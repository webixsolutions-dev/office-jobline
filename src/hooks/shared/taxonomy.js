export const CATEGORIES = [
  // ============================================
  // TECHNOLOGY SECTOR (8 Categories)
  // ============================================
  { id: 101, name: 'Software Development', sector: 'Technology' },
  { id: 102, name: 'IT Support', sector: 'Technology' },
  { id: 103, name: 'Data & Analytics', sector: 'Technology' },
  { id: 104, name: 'Cybersecurity', sector: 'Technology' },
  { id: 105, name: 'UX/UI Design', sector: 'Technology' },
  { id: 106, name: 'Cloud Computing', sector: 'Technology' },
  { id: 107, name: 'DevOps', sector: 'Technology' },
  { id: 108, name: 'AI & Machine Learning', sector: 'Technology' },

  // ============================================
  // BUSINESS SECTOR (8 Categories)
  // ============================================
  { id: 201, name: 'Marketing', sector: 'Business' },
  { id: 202, name: 'Sales', sector: 'Business' },
  { id: 203, name: 'Finance', sector: 'Business' },
  { id: 204, name: 'HR & Recruitment', sector: 'Business' },
  { id: 205, name: 'Operations', sector: 'Business' },
  { id: 206, name: 'Business Development', sector: 'Business' },
  { id: 207, name: 'Project Management', sector: 'Business' },
  { id: 208, name: 'Product Management', sector: 'Business' },

  // ============================================
  // HEALTHCARE SECTOR (8 Categories)
  // ============================================
  { id: 301, name: 'Healthcare', sector: 'Healthcare' },
  { id: 302, name: 'Nursing', sector: 'Healthcare' },
  { id: 303, name: 'Allied Health', sector: 'Healthcare' },
  { id: 304, name: 'Medical Administration', sector: 'Healthcare' },
  { id: 305, name: 'Pharmacy', sector: 'Healthcare' },
  { id: 306, name: 'Mental Health', sector: 'Healthcare' },
  { id: 307, name: 'Dental', sector: 'Healthcare' },
  { id: 308, name: 'Optometry', sector: 'Healthcare' },

  // ============================================
  // TRADES SECTOR (9 Categories)
  // ============================================
  { id: 401, name: 'Construction', sector: 'Trades' },
  { id: 402, name: 'Electrician', sector: 'Trades' },
  { id: 403, name: 'Plumbing', sector: 'Trades' },
  { id: 404, name: 'Carpentry', sector: 'Trades' },
  { id: 405, name: 'Welding', sector: 'Trades' },
  { id: 406, name: 'HVAC', sector: 'Trades' },
  { id: 407, name: 'Automotive', sector: 'Trades' },
  { id: 408, name: 'Machining', sector: 'Trades' },
  { id: 409, name: 'Painting', sector: 'Trades' },
];

// Helper function to get categories by sector
export function getCategoriesBySector(sector) {
  return CATEGORIES.filter(cat => cat.sector === sector);
}

// Helper function to get category by ID
export function getCategoryById(id) {
  return CATEGORIES.find(cat => cat.id === id);
}

// Helper function to get category name by ID
export function getCategoryNameById(id) {
  const category = getCategoryById(id);
  return category ? category.name : 'Unknown';
}

// Helper function to get all sectors
export function getSectors() {
  const sectors = new Set(CATEGORIES.map(cat => cat.sector));
  return Array.from(sectors);
}

// Helper function to get sector by category ID
export function getSectorByCategoryId(id) {
  const category = getCategoryById(id);
  return category ? category.sector : null;
}