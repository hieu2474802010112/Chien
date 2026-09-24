import React from 'react';

export function TraitsSection() {
  return (
    <section id="values" className="py-20 bg-slate-900/40 border-t border-[#1F2937]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Điểm mạnh khác biệt nhất
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 font-heading">
            Ba từ mô tả cá tính
          </h2>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            Chăm chỉ, siêng năng trong công việc, hiền lành.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#111827] border border-[#1F2937] hover:border-slate-700 transition-colors shadow-lg shadow-black/20">
            <h3 className="text-xl font-bold text-white mb-2 font-heading">Chăm chỉ</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Kiểu người chăm chỉ trong công việc, hoàn thành KPI.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#111827] border border-[#1F2937] hover:border-slate-700 transition-colors shadow-lg shadow-black/20">
            <h3 className="text-xl font-bold text-white mb-2 font-heading">Siêng năng trong công việc</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Tập trung vào kỹ năng quay dựng và nỗ lực đạt kết quả tốt nhất trong từng dự án.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#111827] border border-[#1F2937] hover:border-slate-700 transition-colors shadow-lg shadow-black/20">
            <h3 className="text-xl font-bold text-white mb-2 font-heading">Hiền lành</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Kiểu người dễ gần gũi, phối hợp hòa nhã trong công việc cùng tập thể.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
