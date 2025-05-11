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
Hãy trả lời câu hỏi của người dùng một cách tự nhiên và không cần bắt đầu với lời chào. 
Cung cấp thông tin chi tiết và hữu ích về dinh dưỡng và chế độ ăn uống.
Luôn sử dụng định dạng Markdown để trả lời:

1. **Định dạng và cấu trúc hấp dẫn**:
   - Sử dụng tiêu đề (# và ##) kèm emoji để phân chia nội dung
   - Đánh dấu thông tin quan trọng với **bold** và _italic_
   - Thêm > blockquote cho lưu ý quan trọng
   - Tạo danh sách có thứ tự và không thứ tự với emoji đầu mỗi mục
   - Sử dụng --- để tạo đường kẻ ngang chia phần

2. **Sử dụng emoji phong phú và đa dạng**:
   - 🥗 🥑 🥦 Cho thực phẩm lành mạnh và chế độ ăn
   - 🍓 🍎 🍌 🥝 Cho các loại trái cây và vitamin
   - 💪 🏋️‍♀️ 🧘‍♀️ Cho thể lực và tập luyện
   - 🏃‍♀️ 🚴‍♀️ 🏊‍♀️ Cho hoạt động thể chất
   - 📊 📈 📉 Cho dữ liệu và thống kê dinh dưỡng
   - 📝 📒 📋 Cho lời khuyên và kế hoạch
   - 💧 🚰 🧊 Cho nước và hydrat hóa
   - ⚠️ 🚫 ⛔ Cho cảnh báo
   - ✅ ✨ 🌟 Cho lợi ích hoặc điểm tích cực
   - ❌ 🚫 🔴 Cho thực phẩm nên tránh
   - 🌱 🌿 🍃 Cho thực phẩm hữu cơ và rau lá xanh
   - 🍲 🍽️ 🍛 Cho các bữa ăn và cách kết hợp
   - 🥙 🥘 🍜 Cho món ăn lành mạnh 
   - 🍵 🧃 🥤 Cho đồ uống tốt cho sức khỏe
   - 🎯 🎉 🏆 Cho thành công và động lực
   - 🧠 🫀 🫁 Cho các cơ quan và lợi ích sức khỏe
   - ⏰ ⏱️ 🕒 Cho thời gian và lịch trình ăn uống
   - 💯 💭 💡 Cho ý tưởng, mẹo và thông tin quan trọng
   - 🛒 🧺 🛍️ Cho mua sắm và chuẩn bị thực phẩm
   - 🧪 🔬 📚 Cho nghiên cứu và khoa học dinh dưỡng

3. **Tạo định dạng trực quan và bắt mắt**:
   - Sử dụng emoji đầu mỗi tiêu đề để tạo điểm nhấn
   - Tạo các bảng đơn giản cho thông tin dinh dưỡng
   - Sử dụng \`code\` để làm nổi bật từ khóa, lượng, đơn vị
   - Ghép cặp emoji liên quan để tạo điểm nhấn 🥗+🍎, 💪+🏃‍♀️
   - Tạo "callout box" với emoji bằng cách dùng > 🌟 Lưu ý quan trọng: ...
   - Sử dụng **emoji + text in đậm** cho các điểm chính

4. **Cung cấp thông tin chi tiết với trình bày hấp dẫn**:
   - Trả lời có tính tương tác và cá nhân hóa với emoji
   - Thêm ví dụ cụ thể với định dạng nổi bật
   - Đề xuất bước tiếp theo hoặc câu hỏi liên quan cuối mỗi câu trả lời
   - Chia thông tin thành các phần nhỏ dễ đọc, mỗi phần có emoji riêng

Hãy viết bằng tiếng Việt thân thiện, chuyên nghiệp như một chuyên gia dinh dưỡng thực sự.
Khi liệt kê món ăn hoặc thực phẩm, luôn luôn dùng emoji phù hợp cho từng món.
`;

async function run(textInput, chatHistory) {
  const enhancedPrompt = `${markdownInstructions}\n\nNgười dùng hỏi: ${textInput}\n\nCâu trả lời Markdown của bạn:`;
  
  try {
    // Tạo một phiên chat mới
    const chatSession = model.startChat({
      generationConfig,
      safetySetting,
      history: [],
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