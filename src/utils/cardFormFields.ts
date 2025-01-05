export const getFormFields = (
  cardData,
  handleCardDataChange,
  handleCardFileImgChange,
  handleArrayChange,
  addItem,
  removeItem
) => [
  {
    label: "Username",
    id: "username",
    type: "text",
    value: cardData.username,
    onChange: (value) => handleCardDataChange("username", value),
  },
  {
    label: "Description",
    id: "description",
    type: "textarea",
    value: cardData.description,
    onChange: (value) => handleCardDataChange("description", value),
  },
  {
    label: "Profile Image",
    id: "profileImage",
    type: "file",
    value: cardData.profileImage,
    onChange: (value) => handleCardFileImgChange("profileImage", value),
  },
  {
    label: "Banner Image",
    id: "bannerImage",
    type: "file",
    value: cardData.bannerImage,
    onChange: (value) => handleCardFileImgChange("bannerImage", value),
  },
  {
    label: "Background Color",
    id: "bgColor",
    type: "color",
    value: cardData.backgroundColor,
    onChange: (value) => handleCardDataChange("backgroundColor", value),
  },
  {
    label: "Menu Items",
    id: "menu",
    type: "array",
    value: cardData.menu,
    onChange: (value, index, key) =>
      handleArrayChange("menu", index, key, value),
    addItem: () => addItem("menu"),
    removeItem: removeItem,
    keys: ["label", "href"],
  },
  {
    label: "Social Media",
    id: "socialMedia",
    type: "array",
    value: cardData.socialMedia,
    onChange: (value, index, key) =>
      handleArrayChange("socialMedia", index, key, value),
    addItem: () => addItem("socialMedia"),
    removeItem: removeItem,
    keys: ["platform", "href"],
  },
];
