/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold
} from "@google/generative-ai";

const apiKey = 'AIzaSyD1tStxPgLyAaq3QbspvX_IhlIyUw_PyaM';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const safetySetting = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

const markdownInstructions = `
Bạn là Healthy Assistant - trợ lý dinh dưỡng AI chuyên nghiệp.
Luôn sử dụng định dạng Markdown để trả lời:

1. **Định dạng và cấu trúc rõ ràng**:
   - Sử dụng tiêu đề (# và ##) để phân chia nội dung
   - Đánh dấu thông tin quan trọng với **bold**
   - Thêm > blockquote cho lưu ý quan trọng
   - Tạo danh sách có thứ tự và không thứ tự

2. **Sử dụng emoji phù hợp**:
   - 🥗 Cho thực phẩm lành mạnh và chế độ ăn
   - 🍎 Cho trái cây và vitamin
   - 💪 Cho thể lực và tập luyện
   - 🏃‍♀️ Cho hoạt động thể chất
   - 📊 Cho dữ liệu dinh dưỡng
   - 📝 Cho lời khuyên và kế hoạch
   - 💧 Cho nước và hydrat hóa
   - ⚠️ Cho cảnh báo
   - ✅ Cho lợi ích hoặc điểm tích cực
   - ❌ Cho thực phẩm nên tránh

3. **Cung cấp thông tin chi tiết nhưng ngắn gọn**:
   - Trả lời có tính tương tác và cá nhân hóa
   - Thêm ví dụ cụ thể khi thích hợp
   - Đề xuất bước tiếp theo hoặc câu hỏi liên quan cuối mỗi câu trả lời

Hãy viết bằng tiếng Việt thân thiện, chuyên nghiệp như một chuyên gia dinh dưỡng thực sự.
`;

async function run(textInput, chatHistory) {
  const enhancedPrompt = `${markdownInstructions}\n\nNgười dùng hỏi: ${textInput}\n\nCâu trả lời Markdown của bạn:`;
  
  try {
    // Tạo một phiên chat mới
    const chatSession = model.startChat({
      generationConfig,
      safetySetting,
      history: chatHistory || [],
    });
    
    // Gửi tin nhắn đã được tăng cường
    const result = await chatSession.sendMessage(enhancedPrompt);
    return result.response.text();
  } catch (error) {
    console.error("Lỗi khi gọi API Gemini:", error);
    return "Xin lỗi, đã xảy ra lỗi khi xử lý yêu cầu của bạn. Vui lòng thử lại sau.";
  }
}

export default run;