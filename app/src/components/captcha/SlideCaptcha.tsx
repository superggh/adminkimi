import { useState, useRef, useCallback, useEffect } from 'react';
import { RefreshCw, Check } from 'lucide-react';

interface SlideCaptchaProps {
  onVerify: (success: boolean) => void;
  onRefresh?: () => void;
  width?: number;
  height?: number;
}

export function SlideCaptcha({ 
  onVerify, 
  onRefresh, 
  width = 320, 
  height = 160 
}: SlideCaptchaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [sliderX, setSliderX] = useState(0);
  const [verified, setVerified] = useState(false);
  const [failed, setFailed] = useState(false);
  const [targetX, setTargetX] = useState(0);
  const startXRef = useRef(0);
  const sliderWidth = 40;
  const trackWidth = width - sliderWidth - 20;

  // 生成随机验证码位置
  const generateTarget = useCallback(() => {
    const minX = 60;
    const maxX = trackWidth - 60;
    return Math.floor(Math.random() * (maxX - minX) + minX);
  }, [trackWidth]);

  // 绘制验证码背景
  const drawCaptcha = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 清空画布
    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(0, 0, width, height);

    // 绘制干扰线
    for (let i = 0; i < 8; i++) {
      ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3)`;
      ctx.lineWidth = Math.random() * 2 + 1;
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.stroke();
    }

    // 绘制干扰点
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // 绘制目标滑块凹槽
    const target = generateTarget();
    setTargetX(target);
    
    // 绘制凹槽阴影
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(target, height / 2 - 25, sliderWidth, 50);
    
    // 绘制凹槽边框
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
    ctx.lineWidth = 2;
    ctx.strokeRect(target, height / 2 - 25, sliderWidth, 50);

    // 绘制文字
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'center';
    ctx.fillText('请拖动滑块完成验证', width / 2, 30);
  }, [width, height, generateTarget]);

  // 初始化
  useEffect(() => {
    drawCaptcha();
  }, [drawCaptcha]);

  // 处理拖动开始
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (verified) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    startXRef.current = clientX - sliderX;
    setIsDragging(true);
    setFailed(false);
  };

  // 处理拖动
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const newX = clientX - startXRef.current;
      const clampedX = Math.max(0, Math.min(newX, trackWidth));
      setSliderX(clampedX);
    };

    const handleMouseUp = () => {
      if (!isDragging) return;
      setIsDragging(false);
      
      // 验证位置
      const tolerance = 5;
      if (Math.abs(sliderX - targetX) <= tolerance) {
        setVerified(true);
        onVerify(true);
      } else {
        setFailed(true);
        setSliderX(0);
        onVerify(false);
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleMouseMove);
      document.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, sliderX, targetX, trackWidth, onVerify]);

  // 刷新验证码
  const handleRefresh = () => {
    setSliderX(0);
    setVerified(false);
    setFailed(false);
    drawCaptcha();
    onRefresh?.();
  };

  return (
    <div className="w-full">
      {/* 验证码画布 */}
      <div className="relative rounded-lg overflow-hidden border border-slate-200">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="block"
        />
        
        {/* 滑块 */}
        <div
          ref={sliderRef}
          className={`absolute top-1/2 -translate-y-1/2 w-10 h-[50px] rounded cursor-pointer flex items-center justify-center shadow-lg transition-colors ${
            verified 
              ? 'bg-green-500' 
              : failed 
                ? 'bg-red-500' 
                : isDragging 
                  ? 'bg-blue-600' 
                  : 'bg-white border-2 border-blue-500'
          }`}
          style={{ 
            left: sliderX + 10,
            transition: isDragging ? 'none' : 'left 0.3s ease'
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          {verified ? (
            <Check className="w-5 h-5 text-white" />
          ) : (
            <div className={`w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent ${
              isDragging ? 'border-l-white' : 'border-l-blue-500'
            }`} style={{ borderLeftWidth: '6px' }} />
          )}
        </div>

        {/* 成功遮罩 */}
        {verified && (
          <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
            <div className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>验证成功</span>
            </div>
          </div>
        )}
      </div>

      {/* 滑轨 */}
      <div className="mt-3 relative h-10 bg-slate-100 rounded-full border border-slate-200">
        <div 
          className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-1 bg-slate-200 rounded-full"
        />
        <div 
          className="absolute left-2 top-1/2 -translate-y-1/2 h-1 bg-blue-500 rounded-full transition-all"
          style={{ width: `${(sliderX / trackWidth) * 100}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-400 pointer-events-none">
          {verified ? '验证成功' : failed ? '验证失败，请重试' : '拖动滑块完成验证'}
        </div>
        
        {/* 刷新按钮 */}
        <button
          onClick={handleRefresh}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-200 rounded-full transition-colors"
          title="刷新"
        >
          <RefreshCw className="w-4 h-4 text-slate-500" />
        </button>
      </div>

      {failed && (
        <p className="mt-2 text-sm text-red-500 text-center">
          验证失败，请重新拖动滑块到正确位置
        </p>
      )}
    </div>
  );
}
