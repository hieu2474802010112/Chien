import { X, FileText, Download } from 'lucide-react';

interface ResumeQuickModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateData: {
    name: string;
    role: string;
    objectives: {
      shortTerm: string;
      longTerm: string;
    };
    experience: Array<{
      role: string;
      company: string;
      period: string;
      tasks: string[];
    }>;
    events: Array<{
      title: string;
      role: string;
      desc: string;
    }>;
    cvDriveUrl: string;
  };
}

export function ResumeQuickModal({ isOpen, onClose, candidateData }: ResumeQuickModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-md transition-all duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-2xl bg-white/95 border border-rose-100 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-rose-950/10 text-stone-800 max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition focus-visible:outline-rose-500"
          aria-label="Đóng cửa sổ xem nhanh CV"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600">
            <FileText className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <h3 id="modal-title" className="text-xl font-bold tracking-tight text-stone-900 font-heading">
              {candidateData.name} — Hồ Sơ Năng Lực
            </h3>
            <p className="text-xs text-stone-500">{candidateData.role}</p>
          </div>
        </div>

        <div className="space-y-6 text-sm">
          {/* Mục tiêu nghề nghiệp */}
          <section className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100">
            <h4 className="text-xs font-mono uppercase tracking-widest text-rose-600 mb-2 font-semibold">Mục Tiêu Nghề Nghiệp</h4>
            <p className="text-stone-700 text-xs leading-relaxed mb-2"><strong>Ngắn hạn:</strong> {candidateData.objectives.shortTerm}</p>
            <p className="text-stone-700 text-xs leading-relaxed"><strong>Dài hạn:</strong> {candidateData.objectives.longTerm}</p>
          </section>

          {/* Kinh nghiệm làm việc */}
          <section>
            <h4 className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-3 font-semibold">Kinh Nghiệm Thực Tế</h4>
            <div className="space-y-3">
              {candidateData.experience.map((exp, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/80">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-semibold text-stone-900 text-sm">{exp.role}</span>
                    <span className="text-xs font-mono text-rose-600 font-semibold">{exp.period}</span>
                  </div>
                  <div className="text-xs text-amber-700 mb-2 font-medium">{exp.company}</div>
                  <ul className="space-y-1">
                    {exp.tasks.map((task, tIdx) => (
                      <li key={tIdx} className="text-xs text-stone-600 flex items-start gap-1.5">
                        <span className="text-rose-500 mt-0.5">•</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Sự kiện đã tham gia */}
          <section>
            <h4 className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-2 font-semibold">Sự Kiện Đã Tham Gia Tổ Chức</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {candidateData.events.map((ev, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-stone-50/80 border border-stone-200/80">
                  <span className="text-xs font-bold text-stone-900 block">{ev.title}</span>
                  <span className="text-[11px] text-rose-600 block font-mono font-medium">{ev.role}</span>
                  <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">{ev.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-stone-200">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition"
          >
            Đóng
          </button>
          <a 
            href={candidateData.cvDriveUrl}
            target="_blank"
            rel="noopener noreferrer"
            download="CV PHẠM MINH CHIẾN.pdf"
            className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white transition flex items-center gap-2 shadow-lg shadow-rose-500/20"
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
            Tải Bản PDF Đầy Đủ
          </a>
        </div>
      </div>
    </div>
  );
}
