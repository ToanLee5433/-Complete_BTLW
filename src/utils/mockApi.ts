// Mock API service for development when backend is not available
export class MockApiService {
  private static delay(ms: number = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Mock admin login
  static async adminLogin(username: string, password: string) {
    await this.delay(800);
    
    if (username === 'admin' && password === 'admin123') {
      const data = {
        token: 'mock-jwt-token-admin-' + Date.now(),
        user: { id: 1, username: 'admin' }
      };
      return new Response(JSON.stringify(data), {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const errorData = { message: 'Tên đăng nhập hoặc mật khẩu không chính xác' };
    return new Response(JSON.stringify(errorData), {
      status: 401,
      statusText: 'Unauthorized',
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Mock admin/me check
  static async adminMe() {
    await this.delay(500);
    const token = localStorage.getItem('adminToken');
    
    if (token && token.startsWith('mock-jwt-token-admin-')) {
      const data = { id: 1, username: 'admin' };
      return new Response(JSON.stringify(data), {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response('Unauthorized', {
      status: 401,
      statusText: 'Unauthorized'
    });
  }

  // Mock feedback submission
  static async submitFeedback(_formData: any) {
    await this.delay(1200);
    
    // Simulate random success/failure for testing
    const success = Math.random() > 0.1; // 90% success rate
    
    if (success) {
      const data = { message: 'Phản hồi đã được gửi thành công' };
      return new Response(JSON.stringify(data), {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      const errorData = { message: 'Có lỗi xảy ra khi gửi phản hồi' };
      return new Response(JSON.stringify(errorData), {
        status: 500,
        statusText: 'Internal Server Error',
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  // Mock articles fetch
  static async getArticles() {
    await this.delay(800);
    const data = {
      articles: [],
      totalPages: 0,
      totalElements: 0
    };
    return new Response(JSON.stringify(data), {
      status: 200,
      statusText: 'OK',
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Mock feedback list
  static async getFeedbacks() {
    await this.delay(600);
    const data = {
      feedbacks: [
        {
          id: 1,
          name: 'Nguyễn Văn A',
          email: 'nguyenvana@email.com',
          type: 'khen',
          subject: 'Khen ngợi dịch vụ',
          message: 'Dịch vụ rất tốt, nhân viên tận tình.',
          questionTime: '2025-08-01T10:30:00',
          status: 'pending'
        },
        {
          id: 2,
          name: 'Trần Thị B',
          email: 'tranthib@email.com',
          type: 'gop_y',
          subject: 'Góp ý về website',
          message: 'Giao diện website cần cải thiện.',
          questionTime: '2025-08-02T14:15:00',
          status: 'resolved'
        }
      ],
      totalPages: 1,
      totalElements: 2
    };
    return new Response(JSON.stringify(data), {
      status: 200,
      statusText: 'OK',
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Initialize mock API on import
console.log('Mock API initialized - intercepting localhost:8080 requests');

// Override fetch for localhost:8080 to use mock API
const nativeFetch = globalThis.fetch;
globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
  
  // Check if it's a localhost:8080 request
  if (url.includes('localhost:8080') || url.includes('127.0.0.1:8080')) {
    console.log('Mock API intercepted:', url);
    
    // Parse request body if it exists
    let requestBody: any = null;
    if (init?.body) {
      try {
        requestBody = JSON.parse(init.body as string);
      } catch {
        requestBody = init.body;
      }
    }
    
    // Route to appropriate mock method
    if (url.includes('/admin/login') && init?.method === 'POST') {
      return MockApiService.adminLogin(requestBody?.username, requestBody?.password);
    }
    
    if (url.includes('/admin/me')) {
      return MockApiService.adminMe();
    }
    
    if (url.includes('/feedback') && init?.method === 'POST') {
      return MockApiService.submitFeedback(requestBody);
    }
    
    if (url.includes('/feedback') && init?.method === 'GET') {
      return MockApiService.getFeedbacks();
    }
    
    if (url.includes('/articles')) {
      return MockApiService.getArticles();
    }
    
    // Default mock response for unhandled endpoints
    const data = { message: 'Mock API - endpoint not implemented' };
    return new Response(JSON.stringify(data), {
      status: 404,
      statusText: 'Not Found',
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // Use original fetch for other requests
  return nativeFetch(input, init);
};
