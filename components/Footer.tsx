import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="text-center h-16 sm:h-20 w-full sm:pt-2 pt-4 border-t mt-5 flex sm:flex-row flex-col justify-between items-center px-3 space-y-3 sm:mb-0 mb-3">
      <div>
        Powered by{' '}
        <a
          //href="https://openai.com/blog/chatgpt"
          target="_blank"
          className="font-bold hover:underline transition underline-offset-2"
        >
          ChatGPT{' '}
        </a>
        and{' '}
        <a
          //href="https://sdk.vercel.ai/docs"
          target="_blank"
          className="font-bold hover:underline transition underline-offset-2"
        >
          Vercel AI SDK.{' '}
        </a>
      </div>
      <div>
        <a
          href="https://wa.me/5535999605653"
          target="_blank"
          className="justify-right font-bold hover:underline transition underline-offset-2 flex items-center"
        >
          <img src="/whatsicon.png" width={30} height={30} alt="1 icon" className="mr-2" />
          Suporte online
        </a>
      </div>
    </footer>
  );
}
