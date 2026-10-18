import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class NoCacheRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Force aggressive anti-caching headers for instantaneous preview updates
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def guess_type(self, path):
        # Ensure JavaScript modules are sent with correct MIME type
        if str(path).endswith('.js'):
            return 'application/javascript; charset=utf-8'
        if str(path).endswith('.css'):
            return 'text/css; charset=utf-8'
        if str(path).endswith('.html'):
            return 'text/html; charset=utf-8'
        return super().guess_type(path)

if __name__ == '__main__':
    port = 8000
    server_address = ('0.0.0.0', port)
    httpd = ThreadingHTTPServer(server_address, NoCacheRequestHandler)
    print(f"Serving ZOOQE from {DIRECTORY} on http://localhost:{port} (No-Cache active)")
    sys.stdout.flush()
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
