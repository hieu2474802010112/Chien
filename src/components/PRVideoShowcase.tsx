import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  ExternalLink, 
  Sparkles,
  Maximize2,
  X,
  ArrowLeft
} from 'lucide-react';

interface PRVideoShowcaseProps {
  videoSrc?: string;
  tiktokUrl?: string;
}

export function PRVideoShowcase({
  videoSrc = "/videos/showcase-40s.mp4",
  tiktokUrl = "https://www.tiktok.com/@trendytee62/video/7560685079442377998?_r=1&_t=ZS-99zbpOvv3Wq"
}: PRVideoShowcaseProps) {
  // Preview Player ngoài section (Khung điện thoại dọc)
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(true);
  const [isPreviewMuted, setIsPreviewMuted] = useState(true);
  const [previewProgress, setPreviewProgress] = useState(0);
  const [previewCurrentTime, setPreviewCurrentTime] = useState(1);
  const [totalDuration, setTotalDuration] = useState(0);
  const [hasVideoError, setHasVideoError] = useState(false);

  // Full Lightbox Modal Player phóng to
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [modalPlaying, setModalPlaying] = useState(true);
  const [modalMuted, setModalMuted] = useState(false);
  const [modalCurrentTime, setModalCurrentTime] = useState(1);
  const [modalDuration, setModalDuration] = useState(0);
  const [modalProgress, setModalProgress] = useState(0);

  // Khoảng thời gian cắt video: Từ giây 40 (00:40) đến 1 phút 50 giây (01:50 = 110s)
  const VIDEO_START = 40;
  const VIDEO_END = 110;
  const PREVIEW_LIMIT = 60; // Đoạn trailer ngoài section: 00:40 -> 01:00 (20s)

  useEffect(() => {
    if (previewVideoRef.current) {
      previewVideoRef.current.currentTime = VIDEO_START;
    }
  }, []);

  const handlePreviewLoadedMetadata = () => {
    if (!previewVideoRef.current) return;
    setTotalDuration(VIDEO_END);
    previewVideoRef.current.currentTime = VIDEO_START;
    previewVideoRef.current.play().catch(() => setIsPreviewPlaying(false));
  };

  const togglePreviewPlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!previewVideoRef.current) return;
    if (isPreviewPlaying) {
      previewVideoRef.current.pause();
      setIsPreviewPlaying(false);
    } else {
      if (previewVideoRef.current.currentTime < VIDEO_START || previewVideoRef.current.currentTime >= PREVIEW_LIMIT) {
        previewVideoRef.current.currentTime = VIDEO_START;
      }
      previewVideoRef.current.play().catch(() => {});
      setIsPreviewPlaying(true);
    }
  };

  const togglePreviewMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!previewVideoRef.current) return;
    previewVideoRef.current.muted = !isPreviewMuted;
    setIsPreviewMuted(!isPreviewMuted);
  };

  const handlePreviewRestart = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!previewVideoRef.current) return;
    previewVideoRef.current.currentTime = VIDEO_START;
    setPreviewCurrentTime(VIDEO_START);
    setPreviewProgress(0);
    previewVideoRef.current.play().catch(() => {});
    setIsPreviewPlaying(true);
  };

  const handlePreviewTimeUpdate = () => {
    if (!previewVideoRef.current) return;
    const cur = previewVideoRef.current.currentTime;

    if (cur < VIDEO_START) {
      previewVideoRef.current.currentTime = VIDEO_START;
      setPreviewCurrentTime(VIDEO_START);
      setPreviewProgress(0);
      return;
    }

    // Lặp đoạn trailer khi chạy đến 01:00 (20s trailer)
    if (cur >= PREVIEW_LIMIT) {
      previewVideoRef.current.currentTime = VIDEO_START;
      setPreviewCurrentTime(VIDEO_START);
      setPreviewProgress(0);
      previewVideoRef.current.play().catch(() => {});
      return;
    }

    setPreviewCurrentTime(cur);
    const seg = ((cur - VIDEO_START) / (PREVIEW_LIMIT - VIDEO_START)) * 100;
    setPreviewProgress(seg);
  };

  // Mở Lightbox Full Phóng To
  const openFullModal = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (previewVideoRef.current) {
      previewVideoRef.current.pause();
      setIsPreviewPlaying(false);
    }
    setIsModalOpen(true);
    setModalPlaying(true);
    setModalMuted(false);
  };

  // Đóng Modal để quay lại portfolio
  const closeModal = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    setIsModalOpen(false);
    if (previewVideoRef.current) {
      previewVideoRef.current.currentTime = VIDEO_START;
      previewVideoRef.current.play().catch(() => {});
      setIsPreviewPlaying(true);
    }
  };

  // Modal Handlers (Phát từ giây 40 đến 1 phút 50 giây)
  const handleModalLoadedMetadata = () => {
    if (!modalVideoRef.current) return;
    setModalDuration(VIDEO_END);
    modalVideoRef.current.currentTime = VIDEO_START;
    modalVideoRef.current.play().catch(() => setModalPlaying(false));
  };

  const handleModalTimeUpdate = () => {
    if (!modalVideoRef.current) return;
    const cur = modalVideoRef.current.currentTime;

    if (cur < VIDEO_START) {
      modalVideoRef.current.currentTime = VIDEO_START;
      setModalCurrentTime(VIDEO_START);
      setModalProgress(0);
      return;
    }

    // Khi chạy đến 1 phút 50 giây (110s), lặp lại từ giây 40
    if (cur >= VIDEO_END) {
      modalVideoRef.current.currentTime = VIDEO_START;
      setModalCurrentTime(VIDEO_START);
      setModalProgress(0);
      modalVideoRef.current.play().catch(() => {});
      return;
    }

    setModalCurrentTime(cur);
    const prog = ((cur - VIDEO_START) / (VIDEO_END - VIDEO_START)) * 100;
    setModalProgress(prog);
  };

  const toggleModalPlay = () => {
    if (!modalVideoRef.current) return;
    if (modalPlaying) {
      modalVideoRef.current.pause();
      setModalPlaying(false);
    } else {
      if (modalVideoRef.current.currentTime < VIDEO_START || modalVideoRef.current.currentTime >= VIDEO_END) {
        modalVideoRef.current.currentTime = VIDEO_START;
      }
      modalVideoRef.current.play().catch(() => {});
      setModalPlaying(true);
    }
  };

  const toggleModalMute = () => {
    if (!modalVideoRef.current) return;
    modalVideoRef.current.muted = !modalMuted;
    setModalMuted(!modalMuted);
  };

  const handleModalRestart = () => {
    if (!modalVideoRef.current) return;
    modalVideoRef.current.currentTime = VIDEO_START;
    setModalCurrentTime(VIDEO_START);
    setModalProgress(0);
    modalVideoRef.current.play().catch(() => {});
    setModalPlaying(true);
  };

  const handleModalSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!modalVideoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const seekTime = Math.min(VIDEO_END, Math.max(VIDEO_START, VIDEO_START + pos * (VIDEO_END - VIDEO_START)));
    modalVideoRef.current.currentTime = seekTime;
    setModalCurrentTime(seekTime);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Bắt phím Escape để đóng modal quay lại trang
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  return (
    <>
      {/* KHUNG SMARTPHONE CHIỀU DỌC NHƯ CŨ TRÊN PORTFOLIO (ASPECT 9/16) VỚI FLOATING ANIMATION & GLOW */}
      <motion.div 
        animate={{ 
          y: [-5, 5, -5],
          rotate: [-0.4, 0.4, -0.4]
        }}
        transition={{ 
          duration: 5.5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        whileHover={{ scale: 1.025, y: -8 }}
        className="relative w-full max-w-[310px] aspect-[9/16] rounded-[2.2rem] bg-stone-950 border-[2.5px] border-amber-500/50 p-1.5 sm:p-2 shadow-2xl shadow-rose-950/25 group mx-auto select-none"
      >
        {/* Vầng hào quang Aura tỏa sáng breathing phía sau điện thoại */}
        <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/25 via-rose-500/20 to-amber-300/20 rounded-[2.4rem] blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <div 
          onClick={openFullModal}
          className="relative w-full h-full rounded-[1.8rem] overflow-hidden bg-stone-900 flex items-center justify-center cursor-pointer z-10"
        >
          {!hasVideoError ? (
            <video
              ref={previewVideoRef}
              src={videoSrc}
              autoPlay
              muted={isPreviewMuted}
              playsInline
              loop={false}
              onLoadedMetadata={handlePreviewLoadedMetadata}
              onError={() => setHasVideoError(true)}
              onTimeUpdate={handlePreviewTimeUpdate}
              className="w-full h-full object-contain bg-black"
            />
          ) : (
            <div className="relative w-full h-full bg-stone-950 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mb-2">
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </div>
              <span className="text-xs font-bold text-white">Trendy Tee Showcase</span>
            </div>
          )}

          {/* Lớp gradient bóng mờ */}
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/95 via-black/70 to-transparent pointer-events-none" />

          {/* Nút Phóng To góc trên phải */}
          <div className="absolute top-2.5 right-2.5 z-30">
            <button
              type="button"
              onClick={openFullModal}
              className="px-3 py-1.5 rounded-full bg-black/80 hover:bg-rose-600 border border-white/25 hover:border-rose-400 text-white text-[11px] font-mono font-bold flex items-center gap-1.5 backdrop-blur-md shadow-lg transition active:scale-95 cursor-pointer"
              title="Phóng to xem toàn bộ video từ 00:01 đến hết"
            >
              <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
              <span>Phóng To</span>
            </button>
          </div>

          {/* Badge Trailer góc trên trái */}
          <div className="absolute top-2.5 left-2.5 z-30 pointer-events-none">
            <span className="px-2.5 py-1 rounded-full bg-black/75 border border-amber-400/40 text-amber-300 text-[10px] font-mono font-bold flex items-center gap-1 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
              <span>Trailer Xem Trước</span>
            </span>
          </div>

          {/* Thanh điều khiển trailer */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="absolute bottom-2.5 inset-x-3 z-20 space-y-1.5 pointer-events-auto"
          >
            <div className="text-left">
              <h4 className="text-xs font-bold text-white truncate">Video Portfolio — Phạm Minh Chiến</h4>
              <span className="text-[10px] font-mono text-amber-300 font-medium block">Quan Hệ Công Chúng • ĐH Gia Định</span>
            </div>

            {/* Thanh tiến độ trailer */}
            <div className="space-y-0.5">
              <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 via-rose-500 to-amber-300 transition-all duration-100 ease-linear rounded-full"
                  style={{ width: `${Math.min(Math.max(previewProgress, 0), 100)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-stone-300">
                <span>{formatTime(previewCurrentTime)}</span>
                <span className="text-amber-300">00:01 — Hết ({formatTime(totalDuration || 110)})</span>
              </div>
            </div>

            {/* Cụm nút bấm */}
            <div className="flex items-center justify-between pt-0.5">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={togglePreviewPlay}
                  className="p-1.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-stone-700 text-stone-200 hover:text-white min-h-[34px] min-w-[34px] flex items-center justify-center transition active:scale-95 shadow-md cursor-pointer"
                  aria-label={isPreviewPlaying ? "Tạm dừng" : "Phát"}
                >
                  {isPreviewPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                </button>

                <button
                  type="button"
                  onClick={togglePreviewMute}
                  className="p-1.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-stone-700 text-stone-200 hover:text-white min-h-[34px] min-w-[34px] flex items-center justify-center transition active:scale-95 shadow-md cursor-pointer"
                  aria-label={isPreviewMuted ? "Bật âm thanh" : "Tắt âm thanh"}
                >
                  {isPreviewMuted ? <VolumeX className="w-3.5 h-3.5 text-stone-400" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
                </button>

                <button
                  type="button"
                  onClick={handlePreviewRestart}
                  className="p-1.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-stone-700 text-stone-200 hover:text-white min-h-[34px] min-w-[34px] flex items-center justify-center transition active:scale-95 shadow-md cursor-pointer"
                  aria-label="Xem lại từ đầu"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={openFullModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white text-xs font-bold transition shadow-lg shadow-rose-950/40 min-h-[32px] active:scale-95 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Xem Hết</span>
              </button>
            </div>

          </div>
        </div>
      </motion.div>

      {/* CỬA SỔ PHÓNG TO TOÀN BỘ VIDEO VỚI NÚT TẮT RÕ RÀNG ĐỂ QUAY LẠI PORTFOLIO */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
        >
          {/* THANH ĐIỀU HƯỚNG TRÊN CÙNG: NÚT TẮT & QUAY LẠI PORTFOLIO RÕ RÀNG */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[420px] flex items-center justify-between mb-3 px-1"
          >
            <button
              type="button"
              onClick={closeModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-rose-50 border border-rose-200 text-stone-900 hover:text-rose-600 font-semibold text-xs transition shadow-xl active:scale-95 cursor-pointer"
              title="Tắt video và quay lại trang Portfolio"
            >
              <ArrowLeft className="w-4 h-4 text-rose-600" />
              <span>Quay Lại Portfolio</span>
            </button>

            <button
              type="button"
              onClick={closeModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-stone-900/90 hover:bg-rose-600 border border-stone-700 hover:border-rose-400 text-white font-mono text-xs transition shadow-xl active:scale-95 cursor-pointer"
              title="Đóng video (Phím ESC)"
            >
              <X className="w-4 h-4" />
              <span>Tắt (ESC)</span>
            </button>
          </div>

          {/* KHUNG VIDEO DỌC PHÓNG TO SANG TRỌNG */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[9/16] max-h-[82vh] bg-stone-950 border-2 border-amber-500/50 rounded-[2.2rem] p-2.5 sm:p-3 text-white shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            
            {/* Header Trong Khung */}
            <div className="w-full flex items-center justify-between pb-2 mb-1 border-b border-stone-800 shrink-0">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[11px] font-mono font-bold uppercase">
                  Toàn Bộ Video
                </span>
                <span className="text-xs font-mono text-amber-300 font-semibold">
                  00:01 — Hết ({formatTime(modalDuration || totalDuration || 110)})
                </span>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="p-1.5 rounded-lg bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800 transition flex items-center justify-center cursor-pointer"
                aria-label="Tắt video"
                title="Đóng video"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player Phóng To: object-contain chuẩn 100% không cắt xén */}
            <div className="relative w-full flex-1 rounded-2xl overflow-hidden bg-black border border-stone-800 shadow-inner flex items-center justify-center">
              <video
                ref={modalVideoRef}
                src={videoSrc}
                autoPlay
                muted={modalMuted}
                playsInline
                onLoadedMetadata={handleModalLoadedMetadata}
                onTimeUpdate={handleModalTimeUpdate}
                onClick={toggleModalPlay}
                className="w-full h-full object-contain cursor-pointer"
              />

              {/* Nút Play to khi tạm dừng */}
              {!modalPlaying && (
                <div 
                  onClick={toggleModalPlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-2xl transform hover:scale-110 transition">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                </div>
              )}
            </div>

            {/* Thanh điều khiển video phóng to */}
            <div className="w-full mt-2.5 space-y-2 shrink-0">
              
              {/* Thanh tua thời gian Scrubber kéo từ 00:01 đến hết */}
              <div 
                onClick={handleModalSeek}
                className="w-full h-2.5 bg-stone-800 hover:h-3 rounded-full overflow-hidden cursor-pointer relative group transition-all"
                title="Bấm hoặc kéo để tua video từ 00:01 đến hết"
              >
                <div 
                  className="h-full bg-gradient-to-r from-rose-600 via-amber-400 to-rose-500 transition-all duration-100 ease-linear rounded-full"
                  style={{ width: `${Math.min(Math.max(modalProgress, 0), 100)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                <span className="text-white font-bold">{formatTime(modalCurrentTime)}</span>
                <span className="text-amber-400 font-bold">00:01 — Hết ({formatTime(modalDuration || totalDuration || 110)})</span>
              </div>

              {/* Các nút bấm tương tác */}
              <div className="flex items-center justify-between pt-0.5">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={toggleModalPlay}
                    className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-white min-h-[38px] min-w-[38px] flex items-center justify-center transition active:scale-95 cursor-pointer"
                    aria-label={modalPlaying ? "Tạm dừng" : "Phát"}
                  >
                    {modalPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleModalMute}
                    className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-white min-h-[38px] min-w-[38px] flex items-center justify-center transition active:scale-95 cursor-pointer"
                    aria-label={modalMuted ? "Bật âm thanh" : "Tắt âm thanh"}
                  >
                    {modalMuted ? <VolumeX className="w-4 h-4 text-stone-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                  </button>

                  <button
                    type="button"
                    onClick={handleModalRestart}
                    className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-white min-h-[38px] min-w-[38px] flex items-center justify-center transition active:scale-95 cursor-pointer"
                    aria-label="Xem lại từ giây 1"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white text-xs font-semibold shadow-md transition active:scale-95"
                  >
                    <span>TikTok Gốc</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
}
