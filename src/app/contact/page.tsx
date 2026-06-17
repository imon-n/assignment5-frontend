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
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium">
            <MessageSquare className="w-4 h-4 mr-2" />
            Contact Us
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-slate-900">
            Lets Start a Conversation
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Have questions about SkillBridge? Our team is ready to help you
            find the right tutor and learning path.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Side */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-3xl p-6 border shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-blue-50">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>

                <div>
                  <h4 className="font-semibold text-lg">Email Us</h4>
                  <p className="text-slate-500 mt-1">
                    support@skillbridge.com
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-green-50">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>

                <div>
                  <h4 className="font-semibold text-lg">Call Us</h4>
                  <p className="text-slate-500 mt-1">
                    +880 1234-567890
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-purple-50">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>

                <div>
                  <h4 className="font-semibold text-lg">Location</h4>
                  <p className="text-slate-500 mt-1">
                    Chattogram, Bangladesh
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock3 className="w-6 h-6" />
                <h4 className="font-semibold text-lg">
                  Quick Response
                </h4>
              </div>

              <p className="text-blue-100">
                We usually reply within 1-2 hours during working days.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 bg-white rounded-3xl border shadow-sm p-8">
            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="h-12 px-4 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="h-12 px-4 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <input
                type="text"
                placeholder="Subject"
                className="w-full h-12 px-4 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500"
              />

              <textarea
                rows={6}
                placeholder="Tell us how we can help..."
                className="w-full p-4 rounded-xl border outline-none resize-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition-all"
              >
                Send Message
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}