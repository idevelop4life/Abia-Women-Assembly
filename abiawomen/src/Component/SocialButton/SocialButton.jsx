import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';

export default function SocialButtons() {
  return (
    <div className="bottom-4 left-0 right-0 flex justify-center space-x-6">
      <button
        aria-label="Sign in with Google"
        className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow hover:shadow-lg transition"
      >
        <FaGoogle size={24} className="text-red-500" />
      </button>
      <button
        aria-label="Sign in with Facebook"
        className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow hover:shadow-lg transition"
      >
        <FaFacebookF size={24} className="text-blue-700" />
      </button>
      <button
        aria-label="Sign in with Apple"
        className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow hover:shadow-lg transition"
      >
        <FaApple size={24} className="text-black" />
      </button>
    </div>
  );
}
