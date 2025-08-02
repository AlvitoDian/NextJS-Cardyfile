import MenuInCard from "@/components/MenuInCard";
import SocialMediaIcon from "@/components/SocialMediaIcon";
import Image from "next/image";

// Template 1: Classic Layout (Original)
export const ClassicLayout = ({
  username = "Username",
  description = "Description",
  profileImage,
  bannerImage,
  menu = [],
  socialMedia = [],
  usernameTextColor = "#E44B37",
  descriptionTextColor = "#67748e",
}) => {
  return (
    <div className="flex justify-center">
      {/* Banner Section */}
      <div className="absolute top-0 left-0 w-full flex justify-center ">
        {bannerImage ? (
          <Image
            src={bannerImage}
            alt="Profile Banner"
            className="w-[900px] h-[150px] object-cover"
            width={900}
            height={150}
          />
        ) : (
          <div className="w-full h-[150px] bg-gray-900"></div>
        )}
      </div>
      {/* Banner Section End */}

      <div className="flex flex-col items-center w-full">
        {/* Image Profile Section */}
        <div className="pt-[100px] flex justify-center items-center">
          {/* Profile Image */}
          {profileImage ? (
            <Image
              className="w-[90px] h-[90px] rounded-full z-10"
              src={profileImage}
              alt="Profile Avatar"
              width={90}
              height={90}
            />
          ) : (
            <div className="w-[90px] h-[90px] rounded-full bg-[#e44b37] flex items-center justify-center z-10">
              <svg
                className="w-[50px] h-[50px] text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          )}
        </div>
        {/* Image Profile Section End */}

        {/* Username Section */}
        <div className="flex flex-wrap justify-center max-w-full">
          <span
            className="text-center mt-4  font-semibold px-2 text-xl break-words max-w-full"
            style={{
              color: usernameTextColor,
            }}
          >
            {username}
          </span>
        </div>
        {/* Username Section End */}

        {/* Description Section */}
        <div className="flex flex-wrap justify-center max-w-full">
          <span
            className="text-center mt-4 text-sm px-2 font-normal break-words max-w-full"
            style={{
              color: descriptionTextColor,
            }}
          >
            {description}
          </span>
        </div>
        {/* Description Section End */}

        {/* Social Media Section */}
        <div className="mt-4 flex gap-[10px] flex-wrap justify-center">
          {socialMedia.map((item, index) => (
            <SocialMediaIcon
              key={index}
              platform={item.platform}
              href={item.href}
            />
          ))}
        </div>
        {/* Social Media Section End */}

        {/* Menu Section */}
        <div className="mt-8 flex flex-col gap-[10px] w-full px-6">
          {menu.map((item, index) => (
            <MenuInCard
              key={index}
              label={item.label}
              href={item.href}
              bgColor={item.backgroundColor}
              textColor={item.textColor}
            />
          ))}
        </div>
        {/* Menu Section End */}

        {/* Footer Section */}
        <p className="text-center mt-6 mb-8 text-[#67748e] text-sm px-6 font-normal">
          Made with{" "}
          <span className="text-[#E44B37] font-semibold">Cardyfile</span>
        </p>
        {/* Footer Section End */}
      </div>
    </div>
  );
};

// Template 2: Minimalist Layout
export const MinimalistLayout = ({
  username = "Username",
  description = "Description",
  profileImage,
  menu = [],
  socialMedia = [],
  usernameTextColor = "#1e293b",
  descriptionTextColor = "#64748b",
}) => {
  return (
    <div className="flex flex-col items-center w-full p-8">
      {/* Profile Image - Centered at top */}
      <div className="flex justify-center items-center mb-6">
        {profileImage ? (
          <Image
            className="w-[100px] h-[100px] rounded-full shadow-md object-cover"
            src={profileImage}
            alt="Profile Avatar"
            width={90}
            height={90}
          />
        ) : (
          <div className="w-[90px] h-[90px] rounded-full bg-[#e44b37] flex items-center justify-center z-10">
            <svg
              className="w-[50px] h-[50px] text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        )}
      </div>

      {/* Username */}
      <h1
        className="text-2xl font-bold mb-2 text-center"
        style={{ color: usernameTextColor }}
      >
        {username}
      </h1>

      {/* Description */}
      <p
        className="text-sm text-center mb-6 leading-relaxed px-4"
        style={{ color: descriptionTextColor }}
      >
        {description}
      </p>

      {/* Social Media - Horizontal line */}
      <div className="flex gap-4 mb-8">
        {socialMedia.map((item, index) => (
          <SocialMediaIcon
            key={index}
            platform={item.platform}
            href={item.href}
          />
        ))}
      </div>

      {/* Menu - Clean buttons */}
      <div className="w-full space-y-3">
        {menu.map((item, index) => (
          <MenuInCard
            key={index}
            label={item.label}
            href={item.href}
            bgColor={item.backgroundColor}
            textColor={item.textColor}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6">
        <span className="text-xs text-gray-400">
          Made with <span className="text-gray-600 font-medium">Cardyfile</span>
        </span>
      </div>
    </div>
  );
};

// Template 3: Creative Layout
export const CreativeLayout = ({
  username = "Username",
  description = "Description",
  profileImage,
  menu = [],
  socialMedia = [],
  usernameTextColor = "#1e40af",
  descriptionTextColor = "#64748b",
}) => {
  return (
    <div>
      <div className="relative z-10 flex flex-col h-full p-6">
        {/* Profile section - Side layout */}
        <div className="flex items-center gap-4 mb-4 mt-10">
          {profileImage ? (
            <Image
              className="w-[90px] h-[90px] rounded-full shadow-md object-cover"
              src={profileImage}
              alt="Profile"
              width={90}
              height={90}
            />
          ) : (
            <div className="w-[90px] h-[90px] rounded-full bg-[#e44b37] flex items-center justify-center z-10">
              <svg
                className="w-[50px] h-[50px] text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          )}
          <div className="flex-1">
            <h1
              className="text-lg font-bold"
              style={{ color: usernameTextColor }}
            >
              {username}
            </h1>
            <p className="text-sm mt-1" style={{ color: descriptionTextColor }}>
              {description}
            </p>
          </div>
        </div>

        {/* Social Media - Creative grid */}
        <div className="flex gap-[10px] mb-4">
          {socialMedia.map((item, index) => (
            <SocialMediaIcon
              key={index}
              platform={item.platform}
              href={item.href}
            />
          ))}
        </div>

        {/* Menu - Card style */}
        <div className="flex-1 space-y-4">
          {menu.map((item, index) => (
            <MenuInCard
              key={index}
              label={item.label}
              href={item.href}
              bgColor={item.backgroundColor}
              textColor={item.textColor}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <span
            className="text-xs font-medium"
            style={{ color: descriptionTextColor }}
          >
            Made with{" "}
            <span style={{ color: usernameTextColor }}>Cardyfile</span>
          </span>
        </div>
      </div>
    </div>
  );
};

// Template 5: Split Screen Layout
export const SplitScreenLayout = ({
  username = "Username",
  description = "Description",
  profileImage,
  menu = [],
  socialMedia = [],
  usernameTextColor = "#ffffff",
  descriptionTextColor = "#e2e8f0",
  backgroundColor = "#1e293b",
}) => (
  <div className="flex h-full">
    {/* Profile Side */}
    <div
      className="w-1/3 flex flex-col justify-center items-center p-4 relative"
      style={{ backgroundColor }}
    >
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10"></div>
      <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white/5"></div>

      <div className="text-center space-y-3">
        {profileImage ? (
          <Image
            className="w-20 h-20 rounded-full mx-auto shadow-lg object-cover"
            src={profileImage}
            alt="Profile"
            width={90}
            height={90}
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        )}

        <h1 className="text-lg font-bold" style={{ color: usernameTextColor }}>
          {username}
        </h1>
        <p
          className="text-xs opacity-80 max-w-[200px]"
          style={{ color: descriptionTextColor }}
        >
          {description}
        </p>

        {socialMedia.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 pt-1 max-w-[220px] mx-auto">
            {socialMedia.map((item, i) => (
              <div key={i} className="w-[60px] flex justify-center">
                <SocialMediaIcon platform={item.platform} href={item.href} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

    {/* Menu Side */}
    <div className="w-2/3 bg-gray-50 h-full flex flex-col justify-center p-4">
      <div className="max-w-xs mx-auto w-full space-y-2">
        {menu.map((item, i) => (
          <MenuInCard
            key={i}
            label={item.label}
            href={item.href}
            bgColor={item.backgroundColor}
            textColor={item.textColor}
          />
        ))}
      </div>
      <div className="text-center mt-4">
        <span className="text-[10px] text-gray-400">
          Made with <span className="font-medium">Cardyfile</span>
        </span>
      </div>
    </div>
  </div>
);
// Template 6: Glassmorphism Layout
export const GlassmorphismLayout = ({
  username = "Username",
  description = "Description",
  profileImage,
  menu = [],
  socialMedia = [],
  usernameTextColor = "#1e293b",
  descriptionTextColor = "#475569",
  backgroundColor,
}) => {
  function darkenColor(hex: string, percent: number) {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = ((num >> 8) & 0x00ff) - amt;
    const B = (num & 0x0000ff) - amt;

    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 0 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  }
  return (
    <div
      className="p-6 relative overflow-hidden"
      style={{ backgroundColor: darkenColor(backgroundColor || "#ffffff", 55) }}
    >
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-white/5 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white/5 blur-3xl"></div>

      <div className="relative z-10 max-w-md mx-auto">
        {/* Main Glass Card */}
        <div className="backdrop-blur-lg bg-white/20 rounded-3xl shadow-2xl border border-white/30 p-8">
          {/* Profile Image */}
          <div className="flex justify-center mb-6">
            {profileImage ? (
              <Image
                className="w-[90px] h-[90px] rounded-full z-10 object-cover"
                src={profileImage}
                alt="Profile Avatar"
                width={90}
                height={90}
              />
            ) : (
              <div className="w-[90px] h-[90px] rounded-full bg-gray-200 flex items-center justify-center z-10">
                <svg
                  className="w-[50px] h-[50px] text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            )}
          </div>

          {/* Username & Description */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-3 text-white drop-shadow-lg">
              {username}
            </h1>
            <p className="text-sm leading-relaxed text-white/90 drop-shadow">
              {description}
            </p>
          </div>

          {/* Social Media */}
          <div className="flex justify-center gap-4 mb-8">
            {socialMedia.map((item, index) => (
              <div
                key={index}
                className="backdrop-blur-sm bg-white/20 rounded-full p-2 border border-white/30"
              >
                <SocialMediaIcon platform={item.platform} href={item.href} />
              </div>
            ))}
          </div>

          {/* Menu */}
          <div className="space-y-3">
            {menu.map((item, index) => (
              <div
                key={index}
                className="backdrop-blur-sm bg-white/20 rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-300"
              >
                <MenuInCard
                  label={item.label}
                  href={item.href}
                  bgColor="transparent"
                  textColor="#ffffff"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <span className="text-xs text-white/80 drop-shadow">
            Made with <span className="text-white font-medium">Cardyfile</span>
          </span>
        </div>
      </div>
    </div>
  );
};

// Template 7: Neon Cyberpunk Layout
export const NeonCyberpunkLayout = ({
  username = "Username",
  description = "Description",
  profileImage,
  menu = [],
  socialMedia = [],
  usernameTextColor = "#00ff88",
  descriptionTextColor = "#64ffda",
}) => {
  return (
    <div className="bg-gray-900 p-6 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Neon glow effects */}
      <div className="absolute top-20 left-1/4 w-32 h-32 rounded-full bg-cyan-500/20 blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-1/4 w-40 h-40 rounded-full bg-green-500/20 blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="relative z-10 max-w-md mx-auto">
        {/* Main Container */}
        <div
          className="bg-gray-800/80 rounded-2xl border border-cyan-500/30 shadow-2xl p-6 backdrop-blur-sm"
          style={{ boxShadow: "0 0 30px rgba(0, 255, 136, 0.1)" }}
        >
          {/* Header with neon line */}
          <div className="relative mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent mb-6"></div>

            {/* Profile Image */}
            <div className="flex justify-center">
              {profileImage ? (
                <div className="relative">
                  <Image
                    className="w-24 h-24 rounded-full object-cover"
                    src={profileImage}
                    alt="Profile"
                    width={90}
                    height={90}
                  />
                  <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-cyan-500/50 animate-pulse"></div>
                </div>
              ) : (
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-cyan-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-cyan-500/50 animate-pulse"></div>
                </div>
              )}
            </div>
          </div>

          {/* Username & Description */}
          <div className="text-center mb-6">
            <h1
              className="text-xl font-bold mb-3 font-mono tracking-wider"
              style={{
                color: usernameTextColor,
                textShadow: `0 0 10px ${usernameTextColor}50`,
              }}
            >
              {username}
            </h1>
            <p
              className="text-sm leading-relaxed font-mono"
              style={{
                color: descriptionTextColor,
                textShadow: `0 0 5px ${descriptionTextColor}30`,
              }}
            >
              {description}
            </p>
          </div>

          {/* Social Media */}
          <div className="flex justify-center gap-4 mb-6">
            {socialMedia.map((item, index) => (
              <div
                key={index}
                className="bg-gray-700/50 rounded-lg p-2 border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <SocialMediaIcon platform={item.platform} href={item.href} />
              </div>
            ))}
          </div>

          {/* Menu */}
          <div className="space-y-3">
            {menu.map((item, index) => (
              <div
                key={index}
                className="bg-gray-700/30 rounded-lg border border-green-500/30 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
              >
                <MenuInCard
                  label={item.label}
                  href={item.href}
                  bgColor="transparent"
                  textColor="#00ff88"
                />
              </div>
            ))}
          </div>

          {/* Bottom neon line */}
          <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent mt-6"></div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <span
            className="text-xs font-mono"
            style={{ color: descriptionTextColor }}
          >
            Made with{" "}
            <span style={{ color: usernameTextColor }}>Cardyfile</span>
          </span>
        </div>
      </div>
    </div>
  );
};
