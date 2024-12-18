export const healthCheck = (req, res) => {
  res.json({ status: 'healthy' });
};

export const getApiInfo = (req, res) => {
  res.json({
    status: 'online',
    message: 'FC UT GPT API is running',
    version: '1.0.0',
    endpoints: {
      chat: '/api/chat',
      health: '/healthz'
    }
  });
};