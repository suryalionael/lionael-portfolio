// Lighthouse CI budgets (mobile emulation is the LHCI default).
// The server must already be running on :3000 (`npm run build && npm run start`).
module.exports = {
  ci: {
    collect: {
      // Budgeted pages per the v3 brief: home and one case-study page.
      url: ['http://localhost:3000/', 'http://localhost:3000/work/aspen-os'],
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--headless=new',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
      },
    },
    upload: { target: 'temporary-public-storage' },
  },
};
