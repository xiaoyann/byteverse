import { useState } from 'react';
import { MailIcon, Phone, MapPin, GitBranch, Globe2, Send, CheckCircle } from 'lucide-react';
import { contactData } from '../data';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactItems: { icon: typeof MailIcon; label: string; value: string; href: string | null }[] = [
    { icon: MailIcon, label: '邮箱', value: contactData.email, href: `mailto:${contactData.email}` },
    { icon: Phone, label: '电话', value: contactData.phone, href: `tel:${contactData.phone}` },
    { icon: MapPin, label: '地址', value: contactData.location, href: null },
  ];

  return (
    <section id="contact" className="py-24 lg:py-32 bg-dark-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-purple/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-neon-pink text-sm font-semibold tracking-wider uppercase mb-4 block">
            联系方式
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            与我<span className="text-gradient">取得联系</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {contactData.slogan}无论是工作机会、技术交流还是项目合作，都欢迎与我联系
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              {contactItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href ?? undefined}
                    className={`flex items-center space-x-4 p-4 rounded-xl bg-dark-700/50 border border-gray-800 hover:border-neon-cyan/30 transition-all duration-300 ${
                      item.href ? 'cursor-pointer' : 'cursor-default'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center text-neon-cyan">
                      <Icon size={24} />
                    </div>
                    <div>
                      <div className="text-gray-500 text-sm">{item.label}</div>
                      <div className="text-white font-semibold">{item.value}</div>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="pt-6">
              <h3 className="text-white font-semibold mb-4">社交媒体</h3>
              <div className="flex items-center space-x-4">
                <a
                  href={contactData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl border border-gray-700 flex items-center justify-center text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/50 hover:bg-neon-cyan/5 transition-all duration-300"
                >
                  <GitBranch size={24} />
                </a>
                <a
                  href={contactData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl border border-gray-700 flex items-center justify-center text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/50 hover:bg-neon-cyan/5 transition-all duration-300"
                >
                  <Globe2 size={24} />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-dark-700/50 border border-gray-800">
              <h3 className="text-white font-semibold text-xl mb-6">发送消息</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">姓名</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan/50 transition-colors duration-300"
                    placeholder="请输入您的姓名"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">邮箱</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan/50 transition-colors duration-300"
                    placeholder="请输入您的邮箱"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-400 text-sm mb-2">主题</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan/50 transition-colors duration-300"
                  placeholder="请输入消息主题"
                />
              </div>

              <div className="mb-8">
                <label className="block text-gray-400 text-sm mb-2">消息内容</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan/50 transition-colors duration-300 resize-none"
                  placeholder="请输入您的消息内容..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitted}
                className="w-full py-4 bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-900 font-semibold rounded-xl hover:glow-cyan transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70"
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle size={20} />
                    <span>发送成功</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>发送消息</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
