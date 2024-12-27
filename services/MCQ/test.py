from flask import Flask, request, jsonify
from transformers import T5Tokenizer, T5ForConditionalGeneration

app = Flask(__name__)

# Load T5 model và tokenizer
model_name = "t5-small"  # Bạn có thể thay thế bằng model lớn hơn nếu cần
tokenizer = T5Tokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)

@app.route('/generate', methods=['POST'])
def generate_text():
    try:
        # Kiểm tra và lấy đầu vào
        data = request.json
        if not data or 'text' not in data:
            return jsonify({'error': 'Invalid input, "text" is required'}), 400
        
        input_text = data['text']

        # Tokenize đầu vào
        input_ids = tokenizer.encode(input_text, return_tensors="pt", truncation=True, max_length=512)

        # Tạo văn bản bằng model
        output_ids = model.generate(input_ids, max_length=150, num_beams=4, early_stopping=True)

        # Decode kết quả
        output_text = tokenizer.decode(output_ids[0], skip_special_tokens=True)

        return jsonify({'generated_text': output_text}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'Service is healthy'}), 200

if __name__ == '__main__':
    app.run(port=5000, debug=True)
