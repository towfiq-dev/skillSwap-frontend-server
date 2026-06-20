import Image from "next/image";
import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      
      {/* Decorative Blur */}
      <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">

        {/* TOP SECTION */}
        <div className="grid gap-12 lg:grid-cols-2">

          {/* LEFT */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="AlignTask"
                width={50}
                height={50}
              />

              <h2 className="text-2xl font-bold">
                <span className="text-emerald-400">Align</span>
                <span className="text-cyan-400">Task</span>
              </h2>
            </Link>

            <p className="mt-5 max-w-md text-slate-300 leading-relaxed">
              Connect with talented freelancers and get your work completed
              faster, smarter, and more efficiently from anywhere in the world.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a 
                //href="/"
                className="group rounded-full border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:scale-110 hover:bg-white/10"
              >
                <FaXTwitter className="text-xl group-hover:text-white" />
              </a>

              <a
                //href="/"
                className="group rounded-full border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:scale-110 hover:bg-white/10"
              >
                <FaGithub className="text-xl group-hover:text-white" />
              </a>

              <a
                //href="/"
                className="group rounded-full border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:scale-110 hover:bg-white/10"
              >
                <FaLinkedin className="text-xl group-hover:text-[#0A66C2]" />
              </a>
            </div>
          </div>

          {/* RIGHT - NEWSLETTER */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h3 className="text-2xl font-semibold">
              Stay Updated
            </h3>

            <p className="mt-3 text-slate-300">
              Subscribe to get the latest freelance opportunities,
              platform updates, and productivity tips.
            </p>

            <form className="mt-6 flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-12 flex-1 rounded-xl border border-white/10 bg-white/10 px-4 outline-none placeholder:text-slate-400"
              />

              <button
                type="submit"
                className="h-12 rounded-xl bg-emerald-500 px-6 font-medium text-black transition hover:bg-emerald-400"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* MIDDLE LINKS */}
        <div className="mt-16 grid grid-cols-2 gap-10 md:grid-cols-4">

          <div>
            <h4 className="mb-4 font-semibold text-white">
              Explore
            </h4>

            <ul className="space-y-3 text-slate-400">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/tasks">Browse Tasks</Link>
              </li>
              <li>
                <Link href="/freelancers">Freelancers</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">
              Company
            </h4>

            <ul className="space-y-3 text-slate-400">
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">
              Resources
            </h4>

            <ul className="space-y-3 text-slate-400">
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/help">Help Center</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">
              Contact
            </h4>

            <div className="space-y-4 text-slate-400">

              <div className="flex items-center gap-3">
                <FaEnvelope />
                <span>support@aligntask.com</span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhone />
                <span>+880 123456789</span>
              </div>

              <div className="flex items-center gap-3">
                <FaLocationDot />
                <span>Dhaka, Bangladesh</span>
              </div>

            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 text-sm text-slate-400 md:flex-row">

          <p>
            © {new Date().getFullYear()} AlignTask. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy-policy">
              Privacy Policy
            </Link>

            <Link href="/terms-and-conditions">
              Terms & Conditions
            </Link>

            <Link href="/cookies-policy">
              Cookies Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;