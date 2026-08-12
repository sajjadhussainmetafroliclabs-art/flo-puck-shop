import { useEffect, useState } from "react";
import { ArrowRight, Apple, Chrome, Lock } from "lucide-react";
import logo from "@/assets/flo-logo.png.asset.json";
import { img } from "@/lib/flo-data";
import { useFlo } from "@/lib/flo-app";
import { Btn, Field, Header, Screen } from "./ui";

export function SplashScreen() {
  const { go, frozen } = useFlo();
  const [p, setP] = useState(6);
  useEffect(() => {
    if (frozen) {
      setP(64);
      return;
    }
    const t = setInterval(() => setP((v) => Math.min(100, v + 7)), 90);
    const j = setTimeout(() => go("welcome"), 1700);
    return () => {
      clearInterval(t);
      clearTimeout(j);
    };
  }, [go, frozen]);
  return (
    <div className="screen-fade relative flex h-full flex-col items-center justify-center bg-ink px-10">
      <img src={logo.url} alt="Flo Hockey" className="h-40 w-40 rounded-full object-cover" />
      <h1 className="mt-8 font-display text-3xl font-extrabold text-background">FLO HOCKEY</h1>
      <p className="mt-2 font-display text-[13px] font-medium tracking-[0.35em] text-brand">
        SPEED. STYLE. FLOW.
      </p>
      <div className="absolute bottom-24 h-1 w-40 overflow-hidden rounded-full bg-background/20">
        <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${p}%` }} />
      </div>
    </div>
  );
}

export function WelcomeScreen() {
  const { go } = useFlo();
  return (
    <div className="screen-fade relative h-full bg-ink">
      <img
        src={img.welcome}
        alt="Young hockey player at a Florida sunset"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/40" />
      <div className="relative flex h-full flex-col justify-between p-7 pb-10">
        <img src={logo.url} alt="Flo Hockey" className="h-14 w-14 rounded-full object-cover" />
        <div>
          <p className="font-display text-xs font-semibold tracking-[0.3em] text-brand">
            FLORIDA HOCKEY CULTURE
          </p>
          <h1 className="mt-3 font-display text-[40px] leading-[1.05] font-extrabold text-white">
            Gear built
            <br />
            for the flow.
          </h1>
          <p className="mt-3 max-w-[290px] text-sm text-white/70">
            Sticks, skates and kit trusted by players who never slow down.
          </p>
          <div className="mt-7 space-y-3">
            <Btn full onClick={() => go("signup")}>
              Create account
            </Btn>
            <Btn full variant="outline" className="!bg-white/10 !text-white !border-white/25" onClick={() => go("login")}>
              I already have an account
            </Btn>
            <button
              onClick={() => go("home")}
              className="flex w-full items-center justify-center gap-1.5 py-1 font-display text-[13px] font-medium text-white/70"
            >
              Continue as guest <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Social() {
  return (
    <div className="flex gap-3">
      <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border py-3.5 font-display text-sm font-medium">
        <Apple className="h-4 w-4" /> Apple
      </button>
      <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border py-3.5 font-display text-sm font-medium">
        <Chrome className="h-4 w-4" /> Google
      </button>
    </div>
  );
}

export function LoginScreen() {
  const { go } = useFlo();
  return (
    <Screen nav={false}>
      <Header />
      <div className="px-6 pt-2">
        <h1 className="text-[32px] font-extrabold leading-tight">Welcome back</h1>
        <p className="mt-1.5 text-sm text-ink-soft">Log in to keep your cart and wishlist synced.</p>
        <div className="mt-7 space-y-4">
          <Field label="Email" placeholder="you@flohockey.com" type="email" />
          <Field label="Password" placeholder="••••••••" type="password" />
          <div className="flex justify-end">
            <button onClick={() => go("forgot")} className="text-[13px] font-medium text-brand">
              Forgot password?
            </button>

          </div>
          <Btn full onClick={() => go("home")}>
            Log in
          </Btn>
          <div className="flex items-center gap-3 py-1">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs text-ink-soft">or continue with</span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <Social />
          <p className="pt-2 text-center text-sm text-ink-soft">
            New here?{" "}
            <button onClick={() => go("signup")} className="font-semibold text-brand">
              Create an account
            </button>
          </p>
        </div>
      </div>
    </Screen>
  );
}

export function SignupScreen() {
  const { go } = useFlo();
  return (
    <Screen nav={false}>
      <Header />
      <div className="px-6 pt-2">
        <h1 className="text-[32px] font-extrabold leading-tight">Join Flo Hockey</h1>
        <p className="mt-1.5 text-sm text-ink-soft">
          Member drops, early access and free shipping over $100.
        </p>
        <div className="mt-7 space-y-4">
          <Field label="Full name" placeholder="Mason Reyes" />
          <Field label="Email" placeholder="you@flohockey.com" type="email" />
          <Field label="Password" placeholder="Minimum 8 characters" type="password" />
          <p className="flex items-start gap-2 text-xs text-ink-soft">
            <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            By creating an account you agree to our Terms and Privacy Policy.
          </p>
          <Btn full onClick={() => go("home")}>
            Create account
          </Btn>
          <Social />
          <p className="pt-2 text-center text-sm text-ink-soft">
            Already a member?{" "}
            <button onClick={() => go("login")} className="font-semibold text-brand">
              Log in
            </button>
          </p>
        </div>
      </div>
    </Screen>
  );
}

export function ForgotScreen() {
  const { go } = useFlo();
  return (
    <Screen nav={false}>
      <Header />
      <div className="px-6 pt-2">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/12">
          <Lock className="h-6 w-6 text-brand" />
        </span>
        <h1 className="mt-5 text-[30px] font-extrabold leading-tight">Forgot password?</h1>
        <p className="mt-1.5 text-sm text-ink-soft">
          Enter the email on your account and we'll send a 4-digit reset code.
        </p>
        <div className="mt-7 space-y-4">
          <Field label="Email" placeholder="you@flohockey.com" type="email" />
          <Btn full onClick={() => go("verify")}>
            Send reset code
          </Btn>
          <p className="pt-1 text-center text-sm text-ink-soft">
            Remembered it?{" "}
            <button onClick={() => go("login")} className="font-semibold text-brand">
              Back to log in
            </button>
          </p>
        </div>
      </div>
    </Screen>
  );
}

export function VerifyScreen() {
  const { go } = useFlo();
  const code = ["4", "8", "2", ""];
  return (
    <Screen nav={false}>
      <Header />
      <div className="px-6 pt-2">
        <h1 className="text-[30px] font-extrabold leading-tight">Check your email</h1>
        <p className="mt-1.5 text-sm text-ink-soft">
          We sent a 4-digit code to mason@flohockey.com
        </p>
        <div className="mt-8 flex gap-3">
          {code.map((c, i) => (
            <div
              key={i}
              className={`flex h-16 flex-1 items-center justify-center rounded-2xl border font-display text-2xl font-bold ${
                c ? "border-brand bg-brand/8 text-ink" : "border-border bg-surface text-ink-soft"
              }`}
            >
              {c || "–"}
            </div>
          ))}
        </div>
        <Btn full className="mt-7" onClick={() => go("reset")}>
          Verify code
        </Btn>
        <p className="mt-4 text-center text-sm text-ink-soft">
          Didn't get it? <button className="font-semibold text-brand">Resend in 0:42</button>
        </p>
      </div>
    </Screen>
  );
}

export function ResetScreen() {
  const { go } = useFlo();
  return (
    <Screen nav={false}>
      <Header />
      <div className="px-6 pt-2">
        <h1 className="text-[30px] font-extrabold leading-tight">Set a new password</h1>
        <p className="mt-1.5 text-sm text-ink-soft">
          Use at least 8 characters with a number and a symbol.
        </p>
        <div className="mt-7 space-y-4">
          <Field label="New password" placeholder="••••••••" type="password" />
          <Field label="Confirm password" placeholder="••••••••" type="password" />
          <div className="rounded-2xl bg-surface p-4 text-xs text-ink-soft">
            <p className="font-display text-[13px] font-semibold text-ink">Password strength</p>
            <div className="mt-2 flex gap-1.5">
              <span className="h-1.5 flex-1 rounded-full bg-brand" />
              <span className="h-1.5 flex-1 rounded-full bg-brand" />
              <span className="h-1.5 flex-1 rounded-full bg-border" />
            </div>
            <p className="mt-2">Good — add a symbol to make it strong.</p>
          </div>
          <Btn full onClick={() => go("login")}>
            Update password
          </Btn>
        </div>
      </div>
    </Screen>
  );
}
