import { motion } from 'framer-motion';
import { Video, ShoppingBag, CheckCircle2, Play, ExternalLink, TrendingUp, Sparkles, Award } from 'lucide-react';

interface ProofProps {
  tiktokUrl: string;
}

export function ProjectsSection({ tiktokUrl }: ProofProps) {
  return (
    <section id="projects" className="py-20 bg-[#0B0F17] text-slate-100 border-t border-[#1F2937]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-blue-400" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Minh chứng năng lực & số liệu thực tế
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Hiệu Quả Truyền Thông & Chuyển Đổi Thực Chiến
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Các mốc thành tựu được đo lường trực tiếp qua lượt tương tác thực tế và doanh số chuyển đổi sản phẩm.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium self-start md:self-auto">
            <Award className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span>Cam kết hoàn thành KPI</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Thẻ Dự án 1: Media Viral Project */}
          <motion.div 
            className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-[#111827] border border-[#1F2937] hover:border-blue-500/50 transition-all duration-300 shadow-xl shadow-black/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Video className="w-3.5 h-3.5" aria-hidden="true" />
                  1. Media Viral Project
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                  Đạt 1,000,000+ Views
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
                  1,000,000+
                </span>
                <span className="text-sm font-semibold text-slate-400">Lượt View TikTok</span>
              </div>

              <h3 className="mt-4 text-xl font-bold text-white group-hover:text-blue-400 transition-colors font-heading">
                Quay dựng & Visual Hook Viral TikTok
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Đảm nhiệm toàn bộ khâu quay dựng, xây dựng kịch bản video ngắn, tối ưu nhịp cắt dồn dập và visual hook giữ chân người xem, giúp video cán mốc hơn 1 triệu lượt xem tự nhiên trên nền tảng.
              </p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">Trendy Tee</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">Hapi Ecommerce</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/40">Kỹ năng quay dựng CapCut</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#1F2937] flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Kênh: <strong className="text-slate-200">@trendytee62</strong>
              </span>
              <a
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.98] min-h-[44px] px-4 py-2 rounded-xl transition-all focus-visible:outline-2 focus-visible:outline-blue-400 shadow-md shadow-blue-600/20"
                aria-label="Xem video 1 triệu view trên TikTok"
              >
                <Play className="w-4 h-4 fill-current" aria-hidden="true" />
                <span>Xem video TikTok</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          {/* Thẻ Dự án 2: Commercial Sales Conversion */}
          <motion.div 
            className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-[#111827] border border-[#1F2937] hover:border-emerald-500/50 transition-all duration-300 shadow-xl shadow-black/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
                  2. Commercial Sales Conversion
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                  Vượt Chỉ Tiêu KPI
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-mono text-emerald-400">
                  60
                </span>
                <span className="text-sm font-semibold text-slate-400">Sản phẩm / 1 tháng</span>
              </div>

              <h3 className="mt-4 text-xl font-bold text-white group-hover:text-emerald-400 transition-colors font-heading">
                Social Commerce & Seller Thực Chiến
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Trực tiếp lên concept quay chụp hình ảnh sản phẩm (áo thun, áo khoác, mỹ phẩm, quà tặng), biên soạn nội dung bán hàng và tối ưu luồng chuyển đổi chốt đơn thành công 60 đơn hàng/tháng.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">TikTok Shop</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">Chụp sản phẩm</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">Chuyển đổi thực tế</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#1F2937] flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Hiệu suất: <strong className="text-emerald-400 font-semibold">Đạt chuẩn KPI doanh nghiệp</strong>
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 bg-emerald-500/15 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                Hoàn thành KPI
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
