// A persistent hosted database must be connected before accepting production sales.
// The deployed UI already saves demo receipts in the customer's browser.
module.exports = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  return res.status(503).json({
    error: 'Production transaction storage is not configured. Connect a persistent hosted database. The kiosk demo saves receipts in browser localStorage.',
    code: 'PERSISTENT_DATABASE_REQUIRED'
  });
};
