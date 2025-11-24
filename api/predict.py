from http.server import BaseHTTPRequestHandler
import json
import joblib
import numpy as np
import os

# Load models (these will be in the api directory)
def load_model_by_feature_count(feature_count):
    """Load appropriate model based on number of features"""
    model_dir = os.path.dirname(__file__)
    
    if feature_count == 1:
        # Linear regression for single feature
        model_path = os.path.join(model_dir, 'lin_reg.pkl')
        return joblib.load(model_path)
    else:
        # Multiple regression for 2+ features
        model_path = os.path.join(model_dir, 'multi_reg.pkl')
        return joblib.load(model_path)

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # Read the request body
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            # Extract features from request
            features = data.get('features', [])
            
            if not features:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'No features provided'}).encode())
                return
            
            # Load appropriate model based on feature count
            model = load_model_by_feature_count(len(features))
            
            # Make prediction
            features_array = np.array([features])
            prediction = model.predict(features_array)[0]
            
            # Send response
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            response = {
                'prediction': float(prediction),
                'features_used': len(features)
            }
            
            self.wfile.write(json.dumps(response).encode())
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(e)}).encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
