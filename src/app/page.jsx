"use client"
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '../images/logo.webp';
import { BsBank2 } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";
import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { BiSearch } from 'react-icons/bi';
import { GoArrowUpRight } from "react-icons/go";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

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
  const [isGovernanceOpen, setIsGovernanceOpen] = useState(false);
  const [isAllocationOpen, setIsAllocationOpen] = useState(false);
  const [isPointsBoostOpen, setIsPointsBoostOpen] = useState(false);
  const [time, setTime] = useState('');
  const toggleGovernance = () => setIsGovernanceOpen(!isGovernanceOpen);
  const toggleAllocation = () => setIsAllocationOpen(!isAllocationOpen);
  const togglePointsBoost = () => setIsPointsBoostOpen(!isPointsBoostOpen);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds}`);
    };
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);


  return (
    <div className="bg-[#16181d] min-h-screen px-4 py-6 font-sans">
      <nav className='flex flex-col sm:flex-row justify-between items-center shadow-[0_0_10px_rgba(0,0,0,0.1)] py-4 space-y-4 sm:space-y-0'>
        <div className='flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 w-full sm:w-auto'>
          <div>
            <Image src={logo} width={100} height={100} alt='logo'/>
          </div>
          <div className="flex items-center bg-transparent rounded-lg px-4 py-2 text-white shadow-[0_4px_10px_rgba(0,0,0,0.6)] w-full sm:w-64">
            <BiSearch className="text-gray-400 mr-2" />
            <input 
              type="text" 
              name="America" 
              className="bg-transparent flex-grow focus:outline-none text-white" 
              placeholder="Search"
            />
          </div>
          <div className="hidden sm:block">
            <h4 className="text-[#bebebe] text-sm">Price update in: <span className="text-white">{time}</span></h4>
          </div>
        </div>
        <div className="w-full sm:w-auto">
          <button className='w-full sm:w-auto bg-[#4766ea] hover:bg-[#2d4ab8] text-white font-medium text-75 p-2 rounded-lg transition duration-300'>Connect Wallet</button>
        </div>
      </nav>

      <div className='mt-14 relative'>
        <AnimatedBackground dotCount={150} />
        <div className='flex flex-col justify-between items-center relative z-10 py-16'>
          <h1 className='text-3xl sm:text-4xl font-bold text-white mb-3 text-center'>Stake PRCL</h1>
          <div className='text-center mb-12'>
            <p className='text-[#bebebe] text-sm sm:text-base'>Newly staked tokens become eligible at the beginning of the next epoch.</p>
            <span className='text-[#bebebe] text-sm sm:text-base'>(Epochs start every Thursday at 00:00 UTC).</span>
          </div>
          <div className='flex flex-col sm:flex-row justify-start items-start gap-4 sm:gap-20 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm p-4 rounded-lg'>
            <div>
              <p className='text-[#bebebe] text-xs'>Total Staked</p>
              <div className='flex flex-row justify-between items-center gap-1'>
                <Image src='https://app.parcl.co/images/markets-icons/PRCL-USD.svg' 
                 alt="PRCL-USD"
                 width={15}
                 height={15}/>
                 <p className="text-white text-sm sm:text-base">15,854,676.21</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-700"></div>
            <div>
              <p className='text-[#bebebe] text-xs'>Unique Addresses</p>
              <p className="text-white text-sm sm:text-base">7822</p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row justify-between items-start px-4 sm:px-12 py-8 space-y-8 sm:space-y-0'>
        {[
          { icon: 'https://app.parcl.co/images/points_icon.svg', title: 'Boosts & Rewards', description: 'Staked amount will determine points Boosts and allocation tiers.', link: 'View Tiers' },
          { icon: <BsBank2 className='text-[#2d4ab8]'/>, title: 'PRCL Governance', description: 'Staked PRCL tokens enable you to participate in PRCL Governance.', link: 'Governance Proposals' },
          { icon: <TbWorld className='text-[#4766ea] text-lg'/>, title: 'Data Access', description: 'Get access to cutting edge real-estate data to inform your trades.', link: 'Coming Soon', comingSoon: true }
        ].map((item, index) => (
          <div key={index} className='flex flex-col justify-center items-center h-full text-center w-full sm:w-1/3'>
            <div className='flex flex-col items-center gap-2'>
              {typeof item.icon === 'string' ? (
                <Image src={item.icon} width={20} height={20} alt={item.title} />
              ) : (
                item.icon
              )}
              <h4 className="text-white">{item.title}</h4>
              <p className='text-[#bebebe] text-sm'>{item.description}</p>
              <a href="#" className='mt-4'>
                <div className={`flex flex-row items-center gap-2 ${item.comingSoon ? 'border-2 border-solid border-[#2d4ab8] rounded-md p-1' : ''}`}>
                  <p className={`text-[#bebebe] ${item.comingSoon ? 'text-[#4766ea] text-xs' : ''}`}>{item.link}</p>
                  {!item.comingSoon && <GoArrowUpRight className='text-[#bebebe]'/>}
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className='bg-[#212225] px-4 sm:px-8 py-8 mx-4 sm:mx-12 rounded-lg'>
        <div className='flex flex-col justify-center items-center gap-3 mb-4'>
          <div>
            <Image src='https://app.parcl.co/images/markets-icons/PRCL-USD.svg' 
              alt="PRCL-USD"
              width={20}
              height={20}/>
          </div>
          <div>
            <p className='text-[#bebebe] text-sm'>PRCL Staking</p>
          </div>
          <div className='w-full'>
            <button className='w-full bg-[#4766ea] hover:bg-[#2d4ab8] text-white font-medium text-75 p-2 rounded-lg transition duration-300'>
              Create Account
            </button>
          </div>
        </div>

        <div>
          {['Newly staked assets will be pledged but not active until the start of the next epoch.', 'Staked tokens will automatically carry over to next epoch.'].map((text, index) => (
            <div key={index} className='flex flex-row items-center gap-3 mt-2'>
              <div>
                <GoDotFill className='text-[#bebebe] text-sm'/>
              </div>
              <div>
                <p className='text-[#bebebe] text-xs sm:text-sm'>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 sm:px-12 py-8">
        <div>
          <h2 className="text-white text-xl sm:text-2xl mb-4 font-semibold">Current staking rewards</h2>
          <p className="text-[#bebebe] mb-6 text-base sm:text-xl">Below are the bonuses associated with your stake within this epoch. Your values will be updated with a new or removed stake upon the next epoch.</p>
        </div>

        <div className='flex flex-col gap-2'>
        {[
          { title: "Governance", status: "Stake for Eligibility", isOpen: isGovernanceOpen, toggle: toggleGovernance },
          { title: "Allocation Scheduling", status: "Stake to Activate", isOpen: isAllocationOpen, toggle: toggleAllocation },
          { title: "Points Boost", status: "Stake to Activate", isOpen: isPointsBoostOpen, toggle: togglePointsBoost }
        ].map((item, index) => (
          <div key={index} className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm px-2 sm:px-4 py-2 rounded-lg w-full">
            <div className='flex flex-row justify-between items-center cursor-pointer' onClick={item.toggle}>
              <div className='flex-grow flex flex-row items-center space-x-2 sm:space-x-4'>
                <div className="w-8 sm:w-12">
                  <Image src='https://app.parcl.co/images/markets-icons/PRCL-USD.svg' 
                    alt="PRCL-USD"
                    width={50}
                    height={50}/>
                </div>
                <div className="flex-grow">
                  <h3 className="text-white text-sm sm:text-lg font-bold">{item.title}</h3>
                  <div className='flex flex-row items-center gap-1 sm:gap-2'>
                    <GoDotFill className='text-[#4766ea] text-xs sm:text-sm'/>
                    <span className='text-[#4766ea] text-xs sm:text-sm font-semibold'>Connect Wallet</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className='text-[#bebebe] text-xs sm:text-sm'>{item.status}</p>
                </div>
              </div>
              <div className="ml-2">
                {item.isOpen ? (
                  <RiArrowDropUpLine className='text-[#bebebe] text-xl sm:text-3xl'/>
                ) : (
                  <RiArrowDropDownLine className='text-[#bebebe] text-xl sm:text-3xl'/>
                )}
              </div>
            </div>
            
            {item.isOpen && (
              <>
                <div className="w-full h-px bg-gray-950 my-2"></div>
                <div className="mt-2 sm:mt-4">
                  <p className='text-[#bebebe] text-xs sm:text-sm'>
                    {item.title === "Governance" && "With your stake you are able to vote in Parcl's governance protocol."}
                    {item.title === "Allocation Scheduling" && "Amount staked determines your allocation schedule. The more you stake the sooner you claim."}
                    {item.title === "Points Boost" && "With your stake you are eligible for points boosts based on your stake amount and your TVL on Parcl. Max boost 250%."}
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      </div>

      <div className='sm:px-12 py-4 sm:py-8'>
        <Image src={logo} width={100} height={100} alt='logo' className="sm:w-auto"/>
        <p className='my-2 sm:my-4 text-xs sm:text-sm text-[#bebebe]'>Trading digital currency entails significant risk and is not appropriate for all users. Digital currency values are not static and fluctuate due to market changes. Parcl does not provide financial advice or accept liability for any loss or damages.</p>
        <div className='flex flex-wrap items-center gap-2 sm:gap-5 text-xs sm:text-sm'>
          <p>Parcl V3 Docs</p>
          <GoDotFill className='text-[#bebebe] text-xs sm:text-sm'/>
          <p>Parcl Labs - Sales Price Feeds</p>
          <GoDotFill className='text-[#bebebe] text-xs sm:text-sm'/>
          <p>Parcl Labs - Rental Price Feeds</p>
        </div>

        <div className='text-[#bebebe] text-xs sm:text-sm flex flex-wrap items-center gap-2 sm:gap-5 my-2 sm:my-4'>
          <p>System Status</p>
          <p>Privacy Policy</p>
          <p>Disclosures</p>
        </div>

        <div className='flex flex-row items-center gap-3 my-2 sm:my-4'>
          <FaDiscord className='text-base sm:text-lg' />
          <FaXTwitter className='text-xs sm:text-sm'/>
        </div>
      </div>
    </div>
  );
}
