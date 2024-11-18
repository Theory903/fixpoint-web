import Link from "next/link";
import Image from "next/image";
import { Chat } from "@/types/chat";

const chatData: Chat[] = [
  {
    active: true,
    avatar: "/images/user/user-01.png",
    name: "Ravi Sharma",
    text: "Hello, kya haal hai?",
    time: "12 min pehle",
    textCount: 3,
    dot: 3,
  },
  {
    active: true,
    avatar: "/images/user/user-02.png",
    name: "Aarti Verma",
    text: "Main tumhara intezaar kar rahi hoon",
    time: "5:54 PM",
    textCount: 0,
    dot: 1,
  },
  {
    active: false,
    avatar: "/images/user/user-04.png",
    name: "Rajesh Kumar",
    text: "Kahan ho abhi?",
    time: "10:12 PM",
    textCount: 0,
    dot: 3,
  },
  {
    active: true,
    seen: true,
    avatar: "/images/user/user-05.png",
    name: "Neha Gupta",
    text: "Bahut shukriya!",
    time: "Ravivaar",
    textCount: 2,
    dot: 6,
  },
  {
    active: false,
    avatar: "/images/user/user-06.png",
    name: "Vikram Patel",
    text: "Hello, kaise ho?",
    time: "23 Oct",
    textCount: 0,
    dot: 3,
  },
];

const ChatCard = () => {
  return (
    <div className="col-span-12 xl:col-span-4 rounded-lg bg-white dark:bg-gray-800 py-6 shadow">
      <h4 className="mb-6 px-8 text-lg font-bold text-gray-800 dark:text-white">
        Aapke Chats
      </h4>

      <div className="space-y-2">
        {chatData.map((chat, index) => (
          <Link
            href="/"
            key={index}
            className="flex items-center gap-4 px-8 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            aria-label={`Chat with ${chat.name}`}
          >
            {/* Avatar Section */}
            <div className="relative h-14 w-14">
              <Image
                width={56}
                height={56}
                src={chat.avatar}
                alt={`Avatar of ${chat.name}`}
                className="rounded-full"
              />
              <span
                className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 ${
                  chat.active ? "bg-green-500" : "bg-red-400"
                } border-white dark:border-gray-800`}
              ></span>
            </div>

            {/* Chat Details */}
            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-gray-800 dark:text-white">{chat.name}</h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {chat.text} <span className="text-xs">· {chat.time}</span>
                </p>
              </div>

              {/* Unread Message Count */}
              {chat.textCount > 0 && (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm text-white font-medium">
                  {chat.textCount}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatCard;
