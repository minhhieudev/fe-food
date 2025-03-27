import React, { useState, useRef, useEffect } from 'react';
import { XMarkIcon, PaperAirplaneIcon, ChevronUpIcon, SparklesIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Gemini from '../components/gemini';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkEmoji from 'remark-emoji';

interface Message {
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: `# 👋 Xin chào! 

Tôi là **Healthy Assistant**, chuyên gia tư vấn dinh dưỡng AI của bạn.

### Tôi có thể giúp bạn:
- 🥗 Tư vấn chế độ ăn uống lành mạnh
- 🍲 Gợi ý món ăn phù hợp với mục tiêu của bạn
- 📊 Thông tin dinh dưỡng chi tiết
- 📅 Lập kế hoạch bữa ăn khoa học

> **Bạn cần hỗ trợ gì nào?** Hãy đặt câu hỏi hoặc chọn một trong các gợi ý bên dưới!`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [messageDetail, setMessageDetail] = useState<Message[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Thêm context cho AI
  const systemPrompt = `Bạn là một chuyên gia tư vấn dinh dưỡng AI tên là Healthy Assistant. 
  Hãy tư vấn về chế độ ăn uống lành mạnh, gợi ý món ăn và kế hoạch bữa ăn. 
  Trả lời ngắn gọn, chuyên nghiệp và thân thiện. 
  Tập trung vào các chủ đề:
  - Dinh dưỡng và sức khỏe
  - Thực đơn cân bằng
  - Món ăn healthy
  - Chế độ ăn kiêng khoa học
  - Thói quen ăn uống lành mạnh`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const currentMessage = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    // Add user message
    const userMessage: Message = {
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessageDetail(prev => [...prev, userMessage]);

    try {
      // Tạo prompt với context
      const fullPrompt = `${systemPrompt}\n\nUser: ${currentMessage}\nAssistant:`;
      
      // Gọi Gemini API
      const response = await Gemini(fullPrompt, messageDetail);

      // Xử lý response
      const botMessage: Message = {
        type: 'bot',
        content: response || 'Xin lỗi, tôi không thể xử lý yêu cầu này. Vui lòng thử lại.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setMessageDetail(prev => [...prev, botMessage]);

    } catch (error) {
      // Xử lý lỗi
      const errorMessage: Message = {
        type: 'bot',
        content: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Thêm suggestions cho người dùng với emoji
  const suggestions = [
    { 
      text: "Tư vấn chế độ ăn giảm cân", 
      icon: "⚖️",
      prompt: "Tư vấn chế độ ăn giảm cân"
    },
    { 
      text: "Thực đơn tăng cơ giảm mỡ", 
      icon: "💪",
      prompt: "Thực đơn tăng cơ giảm mỡ"
    },
    { 
      text: "Món ăn healthy cho bữa sáng", 
      icon: "🍳",
      prompt: "Món ăn healthy cho bữa sáng"
    },
    { 
      text: "Cách ăn uống tăng cường miễn dịch", 
      icon: "🛡️",
      prompt: "Cách ăn uống tăng cường miễn dịch"
    }
  ];

  // Thêm hàm xử lý submit với prompt ẩn
  const handleSubmitWithHiddenPrompt = async (e: React.FormEvent, displayText: string, hiddenPrompt: string) => {
    e.preventDefault();
    
    setIsTyping(true);

    // Hiển thị tin nhắn người dùng với văn bản ngắn gọn
    const userMessage: Message = {
      type: 'user',
      content: displayText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessageDetail(prev => [...prev, userMessage]);

    try {
      // Sử dụng prompt chi tiết để gửi đến AI
      const fullPrompt = `${systemPrompt}\n\nUser: ${hiddenPrompt}\nAssistant:`;
      
      // Gọi Gemini API
      const response = await Gemini(fullPrompt, messageDetail);

      // Xử lý response
      const botMessage: Message = {
        type: 'bot',
        content: response || 'Xin lỗi, tôi không thể xử lý yêu cầu này. Vui lòng thử lại.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setMessageDetail(prev => [...prev, botMessage]);

    } catch (error) {
      // Xử lý lỗi
      const errorMessage: Message = {
        type: 'bot',
        content: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setInputMessage(''); // Đảm bảo input được xóa
    }
  };

  return (
    <div className="fixed right-4 z-50 bottom-36">
      {/* Chat Widget Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        } transition-all duration-300 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-full p-4 shadow-lg flex items-center space-x-2 hover:shadow-xl`}
      >
        <SparklesIcon className="w-6 h-6" />
        <span className="font-medium">Tư vấn dinh dưỡng</span>
      </button>

      {/* Chat Window */}
      <div className={`${
        isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      } transition-all duration-300 origin-bottom-right fixed bottom-4 right-4 w-96 md:w-[1220px] h-[690px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 flex items-center justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/pattern-dot.svg')] opacity-10"></div>
          <div className="flex items-center space-x-3 relative z-10">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <img
                src="https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg"
                alt="Healthy Assistant"
                width={40}
                height={40}
                className="object-cover"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="text-white font-bold">Healthy Assistant</h3>
              <p className="text-emerald-100 text-xs">Chuyên gia tư vấn dinh dưỡng AI</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors relative z-10"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Chat Messages */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-emerald-50/50 to-white"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
            >
              <div className={`flex items-end space-x-2 max-w-[95%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {message.type === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center">
                    <SparklesIcon className="w-5 h-5 text-white" />
                  </div>
                )}
                {message.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                    <UserCircleIcon className="w-5 h-5 text-gray-600" />
                  </div>
                )}
                <div
                  className={`rounded-2xl p-4 ${
                    message.type === 'user'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white shadow-md'
                  }`}
                >
                  {message.type === 'user' ? (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  ) : (
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkEmoji]}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="mt-6">
              <h3 className="text-gray-600 mb-3 font-medium flex items-center">
                <span className="mr-2">💡</span>
                <span>Bạn có thể hỏi:</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInputMessage(suggestion.text); // Chỉ sử dụng text ngắn gọn
                      
                      // Cập nhật cách xử lý submit để sử dụng prompt nếu có
                      setTimeout(() => {
                        const event = new Event('submit') as any;
                        const originalInput = inputMessage;
                        
                        // Gán tạm thời prompt chi tiết nếu có để gửi đến AI
                        if (suggestion.prompt && suggestion.prompt !== suggestion.text) {
                          const hiddenPrompt = suggestion.prompt;
                          handleSubmitWithHiddenPrompt(event, suggestion.text, hiddenPrompt);
                        } else {
                          handleSubmit(event);
                        }
                      }, 100);
                    }}
                    className="p-3 text-sm text-emerald-700 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg hover:from-emerald-100 hover:to-teal-100 transition-all duration-200 text-left flex items-center gap-3 border border-emerald-100 hover:shadow-md group"
                  >
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow transition-all">
                      <span className="text-xl">{suggestion.icon}</span>
                    </div>
                    <span className="font-medium">{suggestion.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Hiệu ứng loading */}
          {isTyping && (
            <div className="flex items-center space-x-2 animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white rounded-xl px-4 py-3 shadow-md max-w-[80%]">
                <p className="text-gray-600">Đang soạn câu trả lời...</p>
                <div className="flex space-x-1 mt-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-200"></div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-400"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area with improved UI */}
        <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Nhập câu hỏi về dinh dưỡng..."
              className="flex-1 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              disabled={isTyping}
            />
            <button
              type="submit"
              className={`${
                isTyping ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'
              } text-white rounded-full p-2 transition-colors duration-200`}
              disabled={!inputMessage.trim() || isTyping}
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        </form>

       
      </div>
    </div>
  );
};

export default ChatbotWidget;

<style jsx global>{`
  .markdown-content {
    font-size: 0.95rem;
    line-height: 1.6;
  }
  
  /* Tiêu đề rõ ràng hơn */
  .markdown-content h1,
  .markdown-content h2,
  .markdown-content h3,
  .markdown-content h4 {
    font-weight: 700;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: #047857; /* Màu emerald đậm */
  }
  .markdown-content h1 { font-size: 1.5rem; }
  .markdown-content h2 { font-size: 1.3rem; }
  .markdown-content h3 { font-size: 1.2rem; }
  .markdown-content h4 { font-size: 1.1rem; }
  
  /* Đoạn văn có không gian tốt hơn */
  .markdown-content p { 
    margin-bottom: 1rem; 
  }
  
  /* Danh sách dễ đọc hơn */
  .markdown-content ul, .markdown-content ol {
    padding-left: 1.5rem;
    margin-bottom: 1rem;
    margin-top: 0.5rem;
  }
  .markdown-content li { 
    margin-bottom: 0.5rem;
    padding-left: 0.25rem;
  }
  
  /* Nhấn mạnh đoạn text in đậm */
  .markdown-content strong {
    color: #065f46;
    font-weight: 700;
  }
  
  /* Làm nổi bật blockquote */
  .markdown-content blockquote {
    border-left: 4px solid #10b981;
    padding: 0.75rem 1.25rem;
    font-style: italic;
    margin: 1rem 0;
    background: rgba(16, 185, 129, 0.1);
    border-radius: 0.375rem;
    font-weight: 500;
  }
  
  /* Các emoji lớn hơn và có không gian tốt hơn */
  .markdown-content p:has(img.emoji) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  /* Tạo card style cho các món ăn được đề xuất */
  .markdown-content h3 + ul, 
  .markdown-content h3 + ol {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 0.75rem;
    padding-left: 0;
    margin-top: 1rem;
  }
  
  .markdown-content h3 + ul li,
  .markdown-content h3 + ol li {
    background: rgba(16, 185, 129, 0.05);
    border-left: 3px solid #10b981;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
    list-style-position: inside;
  }
  
  /* Các ví dụ và ghi chú có background khác biệt */
  .markdown-content h4 + p {
    background: rgba(249, 250, 251, 0.8);
    padding: 0.75rem;
    border-radius: 0.375rem;
    border: 1px solid #e5e7eb;
  }
  
  /* Tạo không gian cho các sections */
  .markdown-content hr {
    margin: 1.5rem 0;
    border: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, #10b981, transparent);
  }
  
  /* Làm cho các emoji lớn hơn */
  .markdown-content img.emoji {
    height: 1.5em !important;
    width: 1.5em !important;
    margin: 0 0.1em !important;
    vertical-align: -0.3em !important;
  }

  @keyframes typingAnimation {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
    100% { transform: translateY(0px); }
  }
  
  .typing-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    animation: typingAnimation 1s infinite;
  }
  
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`}</style>