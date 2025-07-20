// Netlify function for monitoring
exports.handler = async (event, context) => {
  const { path } = event;
  
  // Health check endpoint
  if (path === '/api/health') {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        version: process.env.npm_package_version || '1.0.0',
      }),
    };
  }
  
  // Status endpoint
  if (path === '/api/status') {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
      },
      body: JSON.stringify({
        status: 'operational',
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        environment: process.env.NODE_ENV,
      }),
    };
  }
  
  return {
    statusCode: 404,
    body: JSON.stringify({ error: 'Not found' }),
  };
}; 