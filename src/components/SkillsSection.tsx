import { motion } from 'framer-motion';
import { Layers, Share2, PenTool, CalendarRange, ShieldAlert, Video, Image as ImageIcon, Sparkles, Smile, Flame, Award } from 'lucide-react';

export function SkillsSection() {
  const prSkills = [
    {
      title: "Social Media & Sáng tạo nội dung",
      desc: "Nắm bắt nhanh thị hiếu Gen Z, xây dựng kịch bản video ngắn và nội dung đa kênh đạt độ phủ tự nhiên cao.",
      icon: Share2,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
    },
    {
      title: "Viết bài PR & Thông cáo báo chí",
      desc: "Kỹ năng biên soạn câu chữ chuẩn mực chuyên ngành Quan hệ công chúng, truyền tải sắc bén thông điệp cốt lõi.",
      icon: PenTool,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    },
    {
      title: "Lập kế hoạch & Tổ chức sự kiện",
      desc: "Lên timeline chi tiết, điều phối nhân sự, chăm sóc Talent và theo dõi kịch bản kỹ thuật âm thanh ánh sáng.",
      icon: CalendarRange,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20"
    },
    {
      title: "Giao tiếp & Xử lý khủng hoảng",
      desc: "Thấu hiểu tâm lý công chúng, khéo léo trong ứng xử, giữ bình tĩnh và phản ứng linh hoạt trước tình huống bất ngờ.",
      icon: ShieldAlert,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20"
    }
  ];

  const tools = [
    {
      name: "CapCut",
      level: "Thành thạo",
      category: "Quay dựng Video",
      desc: "Dựng video TikTok 9:16, chỉnh màu, hiệu ứng chuyển cảnh, bắt nhịp âm thanh dồn dập đạt triệu view.",
      icon: Video,
      accent: "text-blue-400"
    },
    {
      name: "Adobe Photoshop",
      level: "Tốt",
      category: "Xử lý Hình ảnh",
      desc: "Cắt ghép, chỉnh sửa hình ảnh sản phẩm, tối ưu poster quảng cáo và thumbnail bắt mắt.",
      icon: ImageIcon,
      accent: "text-blue-400"
    },
    {
      name: "Canva",
      level: "Thành thạo",
      category: "Thiết kế Nhanh",
      desc: "Thiết kế ấn phẩm truyền thông mạng xã hội, infographic, presentation và tư liệu sự kiện nhanh chóng.",
      icon: Sparkles,
      accent: "text-emerald-400"
    }
  ];

  const traits = [
    {
      title: "Chăm chỉ & Trách nhiệm",
      desc: "Kiểu người chăm chỉ trong công việc, luôn bám sát mục tiêu và cam kết hoàn thành KPI được giao.",
      icon: Award
    },
    {
      title: "Siêng năng & Chủ động",
      desc: "Không ngừng chủ động học hỏi kỹ năng mới, tỉ mỉ trong từng khuôn hình và bản dựng.",
      icon: Flame
    },
    {
      title: "Hiền lành & Dễ gần gũi",
      desc: "Hòa nhã, biết lắng nghe, dễ kết nối và phối hợp ăn ý với các thành viên trong đội ngũ.",
      icon: Smile
    }
  ];

  return (
    <section id="values" className="py-20 bg-[#0B0F17] border-t border-[#1F2937]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Nhóm 1: Lĩnh vực chuyên môn PR */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-blue-400" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Năng lực cốt lõi
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Lĩnh Vực Chuyên Môn Quan Hệ Công Chúng (PR)
          </h2>
          <p className="text-slate-400 text-sm mt-2 max-w-xl">
            Được đào tạo bài bản tại ĐH Gia Định kết hợp kinh nghiệm thực chiến đa lĩnh vực.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {prSkills.map((skill, idx) => {
              const IconComp = skill.icon;
              return (
                <motion.div
                  key={skill.title}
                  className="p-6 rounded-2xl bg-[#111827] border border-[#1F2937] hover:border-slate-700 transition-all flex flex-col justify-between shadow-lg shadow-black/20"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                >
                  <div>
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${skill.color} mb-4`}>
                      <IconComp className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-bold text-white font-heading leading-snug">
                      {skill.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {skill.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Nhóm 2: Công cụ thành thạo */}
        <div className="mt-16 pt-16 border-t border-[#1F2937]">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-heading">
            Bộ Công Cụ Sáng Tạo & Quay Dựng
          </h3>
          <p className="text-slate-400 text-sm max-w-xl mb-8">
            Thao tác nhanh, linh hoạt trên các phần mềm đồ hoạ và dựng video hiện đại.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tools.map((tool, idx) => {
              const IconComp = tool.icon;
              return (
                <motion.div
                  key={tool.name}
                  className="p-6 rounded-2xl bg-[#111827] border border-[#1F2937] hover:border-blue-500/40 transition-all shadow-lg shadow-black/20"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-800 text-blue-400 border border-slate-700">
                      <IconComp className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                      {tool.level}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 block">{tool.category}</span>
                  <h4 className="text-lg font-bold text-white font-heading mt-0.5">{tool.name}</h4>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">{tool.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Nhóm 3: Phẩm chất cá tính */}
        <div className="mt-16 pt-16 border-t border-[#1F2937]">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-heading">
            Cá Tính & Tinh Thần Làm Việc
          </h3>
          <p className="text-slate-400 text-sm max-w-xl mb-8">
            Giá trị con người giúp tạo nên sự tin cậy và gắn kết lâu dài trong tập thể.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {traits.map((trait, idx) => {
              const IconComp = trait.icon;
              return (
                <motion.div
                  key={trait.title}
                  className="p-6 rounded-2xl bg-[#111827] border border-[#1F2937] hover:border-slate-700 transition-all shadow-lg shadow-black/20"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit mb-4">
                    <IconComp className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h4 className="text-lg font-bold text-white font-heading mb-2">{trait.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{trait.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
