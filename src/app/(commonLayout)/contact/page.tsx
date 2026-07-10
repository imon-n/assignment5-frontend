import {
  Mail,
  Phone,
  MapPin,
  Clock3,
  Send,
  MessageSquare,
} from "lucide-react";

export default function ContactSection() {
  return (
    <section className="bg-slate-50 py-16 transition-colors duration-300 dark:bg-zinc-950 sm:py-20 lg:py-24">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= Heading ================= */}

        <div className="mx-auto mb-14 max-w-3xl text-center">

          <div className="mb-4 flex items-center justify-center gap-3 mt-4">

            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2 text-sm font-semibold text-[#1f9d8b] dark:border-emerald-900 dark:bg-emerald-950/40">
              <MessageSquare className="mr-2 inline h-4 w-4 " />
              Contact Us
            </span>

            <div className="relative h-[2px] w-16 overflow-hidden rounded-full bg-[#1f9d8b]/20">
              <span className="absolute inset-y-0 left-0 w-8 animate-[slide_2s_linear_infinite] rounded-full bg-[#1f9d8b]" />
            </div>

          </div>

          <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Let's Start a Conversation
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-zinc-400 sm:text-lg">
            Have questions about SkillBridge? Our team is ready to help
            you find the perfect tutor and guide your learning journey.
          </p>

        </div>

        {/* ================= Main Grid ================= */}

        <div className="grid gap-8 lg:grid-cols-5">

          {/* ================= Left Side ================= */}

          <div className="space-y-5 lg:col-span-2">

            {/* Email */}

            <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">

              <div className="flex items-start gap-4">

                <div className="rounded-2xl bg-blue-50 p-4 transition group-hover:scale-110 dark:bg-blue-950/40">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>

                <div>

                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Email Us
                  </h4>

                  <p className="mt-2 text-slate-600 dark:text-zinc-400">
                    support@skillbridge.com
                  </p>

                </div>

              </div>

            </div>

            {/* Phone */}

            <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">

              <div className="flex items-start gap-4">

                <div className="rounded-2xl bg-green-50 p-4 transition group-hover:scale-110 dark:bg-green-950/40">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>

                <div>

                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Call Us
                  </h4>

                  <p className="mt-2 text-slate-600 dark:text-zinc-400">
                    +880 1234-567890
                  </p>

                </div>

              </div>

            </div>

            {/* Address */}

            <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">

              <div className="flex items-start gap-4">

                <div className="rounded-2xl bg-purple-50 p-4 transition group-hover:scale-110 dark:bg-purple-950/40">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>

                <div>

                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Location
                  </h4>

                  <p className="mt-2 text-slate-600 dark:text-zinc-400">
                    Chattogram, Bangladesh
                  </p>

                </div>

              </div>

            </div>

            {/* Response Card */}

            <div className="rounded-3xl bg-gradient-to-br from-[#1f9d8b] to-[#056f5b] p-7 text-white shadow-xl transition-all duration-300 hover:scale-[1.02]">

              <div className="mb-4 flex items-center gap-3">

                <Clock3 className="h-6 w-6" />

                <h4 className="text-lg font-semibold">
                  Quick Response
                </h4>

              </div>

              <p className="leading-7 text-white/90">
                We usually reply within <strong>1–2 hours</strong> during
                working days.
              </p>

            </div>

          </div>

          {/* ================= Right Form ================= */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-900 sm:p-8 lg:col-span-3">

            <h3 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
              Send us a Message
            </h3>

            <form className="space-y-5">
                            <div className="grid gap-5 md:grid-cols-2">

                <input
                  type="text"
                  placeholder="Your Name"
                  className="
                    h-12
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    text-slate-900
                    outline-none
                    transition-all
                    duration-300
                    focus:border-[#1f9d8b]
                    focus:ring-4
                    focus:ring-[#1f9d8b]/10
                    dark:border-zinc-700
                    dark:bg-zinc-800
                    dark:text-white
                    dark:placeholder:text-zinc-500
                  "
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="
                    h-12
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    text-slate-900
                    outline-none
                    transition-all
                    duration-300
                    focus:border-[#1f9d8b]
                    focus:ring-4
                    focus:ring-[#1f9d8b]/10
                    dark:border-zinc-700
                    dark:bg-zinc-800
                    dark:text-white
                    dark:placeholder:text-zinc-500
                  "
                />

              </div>

              <input
                type="text"
                placeholder="Subject"
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  text-slate-900
                  outline-none
                  transition-all
                  duration-300
                  focus:border-[#1f9d8b]
                  focus:ring-4
                  focus:ring-[#1f9d8b]/10
                  dark:border-zinc-700
                  dark:bg-zinc-800
                  dark:text-white
                  dark:placeholder:text-zinc-500
                "
              />

              <textarea
                rows={6}
                placeholder="Tell us how we can help..."
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  p-4
                  text-slate-900
                  outline-none
                  transition-all
                  duration-300
                  focus:border-[#1f9d8b]
                  focus:ring-4
                  focus:ring-[#1f9d8b]/10
                  dark:border-zinc-700
                  dark:bg-zinc-800
                  dark:text-white
                  dark:placeholder:text-zinc-500
                "
              />

              <button
                type="submit"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#1f9d8b]
                  px-8
                  py-3
                  font-semibold
                  text-white
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#188576]
                  hover:shadow-xl
                  active:scale-95
                "
              >
                Send Message

                <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
}