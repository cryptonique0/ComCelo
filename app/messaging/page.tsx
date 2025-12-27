'use client';

import { useState, useRef, useEffect } from 'react';

export default function MessagingPage() {
  const [selectedFriend, setSelectedFriend] = useState('CryptoGeneral.eth');
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: 'CryptoGeneral.eth',
      content: 'Yo! Saw you climbed the ranks in the Arena yesterday. Impressive strategy with the new unit.',
      timestamp: '10:24 AM',
      isOwn: false,
    },
    {
      id: 2,
      author: 'You',
      content: 'Thanks! Yeah, the flank maneuver caught a lot of people off guard. Still tweaking the build though.',
      timestamp: '10:28 AM',
      isOwn: true,
    },
    {
      id: 3,
      author: 'CryptoGeneral.eth',
      content: "I've got a counter for that now. Wanna test it out?",
      timestamp: '10:30 AM',
      isOwn: false,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const friends = [
    {
      handle: 'CryptoGeneral.eth',
      status: 'online',
      lastMessage: 'Ready for deployment?',
      avatar:
        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBvtUi_noRgoofCqW9qSw7CquvpWMY_DKX1d3i6Xh5WaKAvg32lNhdmw8ddHuDvIWGHTm_faKn0X3WcJ6RJriQvbKzVIi4-jc3TbKoagD4ycGOzvU17hy_w1dohxmXVLBAa9Z_BU2lQzWoGzFSnuaN0GmLhDswmRThtJ5v-UhN0k8YtUHDzj8xZyh-x6u1-_96MbDZfB1ty7Y2HcqutpfdYktb52dHHCW1GKp41t7_YtNKAmvNVV0Y_huQLJw7Hy13TJ8rqmdfPzQk')",
      time: '12:40 PM',
    },
    {
      handle: 'StrategyMaster',
      status: 'in-combat',
      lastMessage: 'In Combat',
      avatar:
        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAfLsxf8-EIbAKXuM4SMBn4j_Zh7Y8CSQkDIyZEI1pbYubwHo2F31LMDBMz-IaYAANa_JxkyBeDPSnuTCBPNlVlVsw7fXdcUMvL6sedigHWQnxOG8vQpKjWd6kfK96nZhwyKHMDKfEPcNYoEb6YDgcCnfDB-CcWufT6eynFEkxTu1W160PDHzrkl88q6c2utjB6BMdVT8AoAXVvhF7xjg5i1xBosny0lBpegpQzw1zm8y14K5YSIUVTMaNGVIuvV5Jzf6UIsT-GtHg')",
      time: '1h ago',
    },
    {
      handle: 'PixelQueen',
      status: 'online',
      lastMessage: 'Online',
      avatar:
        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBmYnYUVLfugGWX7KZonv4UGoDgi2Ba4MyqfA8YjytauFTOcr50h6amohLNV-Buw-QD8AuLYgFNoUGu4xZOaAuBhisOFK3LVL1ZpSxaa3Uz50hR_se6blni6M4NjUURI2DV9Z87gvF-v4b0b45ORlUs9fA61RMNu-_XYQU52rTlm9CqNUCSJaob844KpmAZrbjyXAJ8YJERmrpaw0oezqR2la6voHqKlJAvs-Axw0_tBa8GkhfSwxJ-6IsP531g8vDREYgo2QF0yl8')",
    },
    {
      handle: '0xBlock...99',
      status: 'offline',
      lastMessage: 'Offline',
      avatar:
        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDMwb5K3WG0lAZ9ACoylmQPYvrYnvjlVSCP-2tXkVPbi4MoRh9nzahOb4XQxCtJG7OpiCead5ee5FqLH_Vf1CigR0040et5d_7x1rYCm2vQy_Db7Mx1_UwudwELfbCYI2xlE9YW-T4jS84EwpZp7quap8ODz5P81QxifxpDjjWh7eMWZABAYZtVPKU_L8HtAgz6rZBE_xqVZJ4AGZmcLCt7MjHubxmcN4W9Qim_6r13XLozQg2VozHXzafod9h21wOZ_dSrW0-S4r4')",
      time: '2d ago',
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          author: 'You',
          content: messageInput,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwn: true,
        },
      ]);
      setMessageInput('');
    }
  };

  const selectedFriendData = friends.find((f) => f.handle === selectedFriend);
  const getStatusColor = (status: string) => {
    if (status === 'online') return 'bg-primary';
    if (status === 'in-combat') return 'bg-orange-500';
    return 'bg-gray-500';
  };

  return (
    <div className="flex flex-1 overflow-hidden relative">
      {/* Sidebar: Friends List */}
      <aside className="w-80 md:w-96 flex flex-col border-r border-[#283930] bg-[#111814]/50 backdrop-blur-sm z-10 shrink-0">
        {/* Sidebar Header & Search */}
        <div className="p-4 border-b border-[#283930] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white text-lg font-bold tracking-tight">Squad List</h3>
            <button aria-label="Add Friend" className="text-primary hover:text-white transition-colors p-1 rounded hover:bg-white/10">
              <span className="material-symbols-outlined">person_add</span>
            </button>
          </div>
          <label className="flex flex-col w-full">
            <div className="flex w-full items-stretch rounded-lg h-10 bg-[#283930]/50 border border-[#283930] focus-within:border-primary transition-colors">
              <div className="text-[#9db9ab] flex items-center justify-center pl-3">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <input
                className="w-full bg-transparent border-none text-white focus:outline-0 focus:ring-0 h-full placeholder:text-[#9db9ab] px-3 text-sm font-normal"
                placeholder="Search allies..."
              />
            </div>
          </label>
        </div>

        {/* Friend List Container */}
        <div className="flex-1 overflow-y-auto">
          {friends.map((friend) => (
            <div
              key={friend.handle}
              onClick={() => setSelectedFriend(friend.handle)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors group border-l-2 ${
                selectedFriend === friend.handle
                  ? 'bg-white/5 border-primary'
                  : 'border-transparent hover:bg-white/5'
              }`}
            >
              <div className="relative">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-12 w-12 border border-white/10"
                  style={{ backgroundImage: friend.avatar }}
                />
                <div className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-[#111814] ${getStatusColor(friend.status)}`}></div>
              </div>
              <div className="flex flex-col justify-center flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="text-white text-sm font-bold truncate">{friend.handle}</p>
                  {friend.time && <span className="text-[10px] text-[#9db9ab]">{friend.time}</span>}
                </div>
                <p
                  className={`text-xs truncate ${
                    selectedFriend === friend.handle
                      ? 'text-white group-hover:text-primary'
                      : friend.status === 'in-combat'
                        ? 'text-orange-400/80 flex items-center gap-1'
                        : 'text-[#9db9ab]/60'
                  } transition-colors`}
                >
                  {friend.status === 'in-combat' && <span className="material-symbols-outlined text-[10px]">swords</span>}
                  {friend.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-background-dark relative">
        {/* Chat Header */}
        <div className="h-16 border-b border-[#283930] bg-[#111814]/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            {selectedFriendData && (
              <>
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-10 w-10 border border-primary/30"
                  style={{ backgroundImage: selectedFriendData.avatar }}
                />
                <div>
                  <h2 className="text-white text-base font-bold flex items-center gap-2">
                    {selectedFriend}
                    {selectedFriendData.status !== 'offline' && (
                      <span className="size-2 bg-primary rounded-full animate-pulse"></span>
                    )}
                  </h2>
                  <p className="text-[#9db9ab] text-xs font-mono">
                    {selectedFriend === 'CryptoGeneral.eth' ? '0x71C...9A23' : '0x' + selectedFriend.slice(-4).toUpperCase()}
                  </p>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex text-[#9db9ab] hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors" title="View Profile">
              <span className="material-symbols-outlined">account_circle</span>
            </button>
            <button className="flex items-center gap-2 h-9 px-4 bg-transparent border border-primary/50 text-primary hover:bg-primary hover:text-[#162e22] hover:border-transparent transition-all rounded-lg text-sm font-bold uppercase tracking-wide group">
              <span className="material-symbols-outlined text-[18px] group-hover:animate-bounce">swords</span>
              <span className="hidden sm:inline">Deploy Challenge</span>
            </button>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 flex flex-col">
          {/* Timestamp Divider */}
          <div className="flex justify-center">
            <span className="bg-[#111814]/50 text-[#9db9ab] text-[10px] px-3 py-1 rounded-full border border-[#283930]">Today, 10:23 AM</span>
          </div>

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.isOwn ? 'self-end flex-row-reverse' : 'self-start'} max-w-[85%] md:max-w-[70%] group`}
            >
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-8 w-8 shrink-0 mt-1"
                style={{
                  backgroundImage: message.isOwn
                    ? "url('https://lh3.googleusercontent.com/aida-public/AB6AXuARuMIrA48xfeKsogc2GkGEFhC7kbQ3B3lVEXgEdvtc2zpKlUurHrNp5FETEsWZyxLj52vC5Ihurjyi4yS7i4N13aIeyuY_f3U8L4Uq9rW3KUKaKcgVgo3z4uEym0LLVhDYQvSpR5HNPPk9AqgzROMc-e_LcT_DXcbMg39L0VtY3vxtVIvgGJleLhwKr_AZwKSRsa8JT3zUselso7-wBVf2ngZXrNcyjaKv_U7zHQF5JzsuEYQcESVVT4F4Pp2ikxBmXh6wZ400lxU')"
                    : "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD2QQQ-dWPWtVQDMqDRKRAsPaB8angPcc6AeiBj85EBmH8LqYW7k4uhNHF51rSYm_SB0tLkO5ZffOuTQBlvWB389m7rH7jBR_cdKTxwh3dVs7a8pYMJ9tgFloXCgyRsPZK_tpYb7HBZpJGhHiJH3jjfXszxBBb5GY_aJuLawZmSW2wF3b7bB7gk7P8i95FuEO4ZXGy0z-Q7Q0ck8QhqcDi482jgnlTVaYAMVSps1vHedlP3FSsIsH4u10MWEBke08Fv4gtVUCevcq8')",
                }}
              />
              <div className="flex flex-col gap-1 items-end={message.isOwn ? 'items-end' : 'items-start'}">
                <div
                  className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm border ${
                    message.isOwn
                      ? 'bg-primary/20 border-primary/30 text-white rounded-tr-none'
                      : 'bg-[#111814] border-[#283930] text-white/90 rounded-tl-none'
                  }`}
                >
                  <p>{message.content}</p>
                </div>
                <span className="text-[10px] text-[#9db9ab] opacity-0 group-hover:opacity-100 transition-opacity">
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Zone */}
        <div className="p-4 sm:p-6 border-t border-[#283930] bg-[#111814]/95 shrink-0 z-20">
          <div className="flex gap-3 items-end">
            <button className="text-[#9db9ab] hover:text-primary transition-colors p-2 rounded-full hover:bg-white/5 h-12 w-12 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">add_circle</span>
            </button>
            <div className="flex-1 bg-background-dark border border-[#283930] focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/50 rounded-xl flex items-center transition-all shadow-inner">
              <input
                className="w-full bg-transparent border-none text-white focus:outline-0 focus:ring-0 h-12 px-4 placeholder:text-[#9db9ab]/50 text-sm"
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
                placeholder="Transmission..."
                type="text"
                value={messageInput}
              />
              <button className="text-[#9db9ab] hover:text-white p-2 mr-1 rounded-lg hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-[20px]">sentiment_satisfied</span>
              </button>
            </div>
            <button
              onClick={handleSendMessage}
              className="bg-primary hover:bg-primary/90 text-[#162e22] h-12 w-12 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 shrink-0"
            >
              <span className="material-symbols-outlined font-bold">send</span>
            </button>
          </div>
        </div>
      </main>

      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style="background-image: radial-gradient(#13ec80 1px, transparent 1px); background-size: 24px 24px;"></div>
    </div>
  );
}
