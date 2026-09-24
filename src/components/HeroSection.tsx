import { motion } from 'framer-motion';
import { Download, Sparkles, FileText, ExternalLink, MapPin, CheckCircle2, Target, Compass } from 'lucide-react';

interface HeroProps {
  cvUrl: string;
  folderUrl: string;
}

export function HeroSection({ cvUrl, folderUrl }: HeroProps) {
  return (
    <section id="about" className="py-12 md:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Cột trái (55%): Thông tin định vị chuyên môn & Mục tiêu */}
        <motion.div 
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-800/60 text-blue-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
            <span>Tốt nghiệp Chuyên ngành Quan hệ công chúng - ĐH Gia Định</span>
          </div>

          {/* Headline H1 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15] font-heading">
            Phạm Minh Chiến
          </h1>

          {/* Professional Tagline */}
          <p className="mt-4 text-xl sm:text-2xl text-blue-200 font-semibold tracking-tight leading-snug">
            Chuyên viên PR & Sáng tạo nội dung truyền thông hướng tới hiệu quả thực chiến và KPI.
          </p>

          {/* Bio from CV */}
          <p className="mt-4 text-base text-slate-300 leading-relaxed max-w-xl">
            Tốt nghiệp ngành Quan hệ công chúng tại Trường Đại học Gia Định. Chủ động học hỏi, không ngừng hoàn thiện bản thân, cam kết đóng góp giá trị tích cực và hoàn thành xuất sắc mục tiêu.
          </p>

          {/* Objectives Strip */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
            <div className="p-3.5 rounded-xl bg-[#111827] border border-[#1F2937] flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0 mt-0.5">
                <Target className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">Mục tiêu ngắn hạn</span>
                <p className="text-xs text-slate-300 mt-0.5 leading-snug">
                  Phát triển trong môi trường chuyên nghiệp, nâng cao giao tiếp & xử lý tình huống.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#111827] border border-[#1F2937] flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                <Compass className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Mục tiêu dài hạn</span>
                <p className="text-xs text-slate-300 mt-0.5 leading-snug">
                  Trở thành chuyên viên PR chuyên nghiệp, đảm nhận vị trí then chốt trong 5 năm tới.
                </p>
              </div>
            </div>
          </div>

          {/* Cụm nút chuyển đổi kép */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.98] min-h-[48px] px-6 py-3 rounded-xl transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 shadow-lg shadow-blue-600/25"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Tải CV hoặc hồ sơ
            </a>

            <a
              href={folderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 active:scale-[0.98] min-h-[48px] px-5 py-3 rounded-xl transition-all focus-visible:outline-blue-400"
            >
              <FileText className="w-4 h-4 text-slate-400" aria-hidden="true" />
              Kho bài viết tư liệu
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        {/* Cột phải (45%): Candidate Portrait & Floating Verified Badges */}
        <motion.div 
          className="lg:col-span-5 flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="relative w-full max-w-[340px]">
            {/* Glowing Backdrop Aura */}
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-600/30 to-emerald-500/20 rounded-3xl blur-xl opacity-70" />

            {/* Profile Card Container */}
            <div className="relative rounded-3xl bg-[#111827] border-2 border-slate-700/80 p-3.5 shadow-2xl shadow-blue-950/40">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                <img
                  src="/images/portrait.jpg"
                  alt="Chân dung Phạm Minh Chiến - Chuyên viên PR & Media Creator"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
                
                {/* Gradient overlay on bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent opacity-80" />

                {/* Bottom Candidate Quick Card */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block font-heading">Phạm Minh Chiến</span>
                      <span className="text-[11px] text-slate-400">Quan hệ công chúng (PR)</span>
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 font-mono font-semibold border border-blue-500/30">
                      ĐH Gia Định
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Verified Badge */}
              <div className="absolute -top-3 -right-2 sm:-right-4 px-3.5 py-2 rounded-xl bg-slate-900/95 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                <span>1M+ Views & 60 Đơn/Tháng</span>
              </div>

              {/* Floating Location Pill */}
              <div className="absolute -bottom-3 -left-2 sm:-left-4 px-3.5 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md border border-slate-700 text-slate-300 text-xs font-medium shadow-xl flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                <span>Quận 3, TP. Hồ Chí Minh</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
