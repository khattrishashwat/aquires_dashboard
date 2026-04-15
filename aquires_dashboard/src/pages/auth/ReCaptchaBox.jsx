import { useState, useEffect } from "react";

const ReCaptchaBox = ({ setCaptcha }) => {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (!window.grecaptcha) {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      script.async = true;
      document.body.appendChild(script);
    }
  }, [siteKey]);

  const executeCaptcha = async () => {
    if (window.grecaptcha) {
      try {
        const token = await window.grecaptcha.execute(siteKey, {
          action: "submit",
        });
        setCaptcha(token);
        console.log("reCAPTCHA token generated");
      } catch (error) {
        console.error("reCAPTCHA error:", error);
      }
    }
  };

  const handleCheckboxChange = async (e) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);

    if (isChecked) {
      await executeCaptcha();
    } else {
      setCaptcha(null);
    }
  };

  return (
    <div className="w-[300px] justify-between px-3 h-[66px] border border-gray-300 rounded flex items-center bg-white">
      <div className="gap-2 flex flex-row items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
          className="w-[20px] h-[20px] accent-[#4b1b91] cursor-pointer"
        />
        <span className="text-gray-600 text-sm font-medium">I'm not a robot</span>
      </div>
      <div className="flex flex-col items-end">
        <img src="/assets/recaptcha.png" alt="reCAPTCHA" className="h-8 w-auto" />
        <p className="text-[6px] font-medium text-gray-400 mt-0.5">Privacy - Terms</p>
      </div>
    </div>
  );
};

export default ReCaptchaBox;