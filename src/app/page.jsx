"use client"
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import logo from '../images/logo.webp';
import { BsBank2 } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";
import { GoArrowUpRight } from "react-icons/go";

const AnimatedBackground = ({ dotCount = 100 }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(container);
    resizeCanvas();

    const dots = Array.from({ length: dotCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 1.5,
      dy: (Math.random() - 0.5) * 1.5,
      color: `hsla(${Math.random() * 360}, 100%, 75%, 0.6)`
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach(dot => {
        dot.x += dot.dx;
        dot.y += dot.dy;

        if (dot.x < 0 || dot.x > canvas.width) dot.dx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.dy *= -1;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [dotCount]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default function Home() {
  return (
    <div className="bg-[#16181d] min-h-screen px-4 py-6 font-sans">
      <nav className='flex flex-row justify-between items-center shadow-[0_0_10px_rgba(0,0,0,0.1)] py-4'>
        <div className='flex flex-row justify-between items-center gap-6'>
          <div>
            <Image src={logo} width={100} height={100} alt='logo'/>
          </div>
          <div>
            <input type="text" name='America' className="bg-transparent border border-gray-600 rounded-full px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <h4 className="text-white">Price update in</h4>
          </div>
        </div>
        <div>
          <button className='bg-[#4766ea] hover:bg-[#2d4ab8] text-white font-medium text-75 p-2 rounded-lg transition duration-300'>Connect Wallet</button>
        </div>
      </nav>

        <div className='mt-14 relative'>
        <AnimatedBackground dotCount={150} />
        <div className='flex flex-col justify-between items-center relative z-10 py-16'>
          <h1 className='text-4xl font-bold text-white mb-3'>Stake PRCL</h1>
          <div className='text-center mb-12'>
            <p className='text-[#bebebe]'>Newly staked tokens become eligible at the beginning of the next epoch.</p>
            <span className='text-[#bebebe]'>(Epochs start every Thursday at 00:00 UTC).</span>
          </div>
          <div className='flex flex-row justify-start items-start gap-20 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm p-4 rounded-lg border border-white border-opacity-20'>
            <div>
              <p className='text-[#bebebe] text-xs'>Total Staked</p>
              <div className='flex flex-row justify-between items-center gap-1'>
                <Image src='https://app.parcl.co/images/markets-icons/PRCL-USD.svg' 
                 alt="PRCL-USD"
                 width={15}
                 height={15}/>
                 <p className="text-white">15,854,676.21</p>
              </div>
            </div>
            <div className="w-px h-12 bg-gray-700"></div>
            <div>
              <p className='text-[#bebebe] text-xs'>Unique Addresses</p>
              <p className="text-white">7822</p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-row justify-between items-center gap-4'>
        <div className='flex flex-col justify-center items-center h-full text-center'>
          <div className='flex flex-col items-center'>
            <Image src='https://app.parcl.co/images/points_icon.svg' 
            width={20}
            height={20}
            alt='points'
            />
            <h4>Boosts & Rewards</h4>
            <p className='text-[#bebebe]'>Staked amount will determine Points Boosts and allocation tiers.</p>
            <a href="#" className='mt-4'>
            <div className='flex flex-row items-center gap-2'>
              <p className='text-[#bebebe]'>View Tiers</p>
              <GoArrowUpRight className='text-[#bebebe]'/>
            </div>
            </a>
          </div>
          </div>

          <div className='flex flex-col justify-center items-center h-full text-center'>
          <div className='flex flex-col items-center'>
            <BsBank2 className='text-[#2d4ab8]'/>
            <h4>PRCL Governance</h4>
            <p className='text-[#bebebe]'>Staked PRCL tokens enable you to participate in PRCL Governance.</p>
            <a href="#" className='mt-4'>
            <div className='flex flex-row items-center gap-2'>
              <p className='text-[#bebebe]'>Goverance Proposals</p>
              <GoArrowUpRight className='text-[#bebebe]'/>
            </div>
            </a>
          </div>
          </div>

          <div className='flex flex-col justify-center items-center h-full text-center'>
          <div className='flex flex-col items-center'>
            <TbWorld className='text-[#4766ea]'/> 
            <h4>Data Access</h4>
            <p className='text-[#bebebe]'>Get access to cutting edge real-estate data to inform your trades.</p>
            <a href="#" className='mt-4'>
            <div className='flex flex-row items-center gap-2'>
              <p className='text-[#bebebe]'>Coming Soon</p>
              <GoArrowUpRight className='text-[#bebebe]'/>
            </div>
            </a>
          </div>
          </div>
        </div>
      </div>
  );
}