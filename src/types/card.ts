export type SocialMediaLink = {
  platform: string;
  href: string;
};

export type MenuItem = {
  label: string;
  href: string;
};

export type CardData = {
  backgroundColor: string;
  username: string;
  description: string;
  profileImage: string;
  bannerImage: string;
  socialMedia: SocialMediaLink[];
  menu: MenuItem[];
};

export type CardPayload = Partial<CardData>;
