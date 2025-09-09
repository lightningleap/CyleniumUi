import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UploadCloud, Trash2 } from "lucide-react";

export const YourProfile = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-start gap-6 w-[364px] sm:w-full">
      {/* Profile Picture Section */}
      <div className="flex flex-col items-start gap-3 w-full h-[88px]">
        <Label className="text-sm font-medium text-[#09090B] dark:text-white tracking-[-0.006em] font-['Inter'] h-5 w-[93px] flex items-center justify-center">
          Profile Picture
        </Label>
        <div className="flex flex-row items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-800 flex-none order-0 flex-grow-0 overflow-hidden relative">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <UploadCloud className="w-6 h-6" />
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <div className="flex flex-row items-center p-0 gap-4 w-[212px] h-8">
            <Button
              variant="outline"
              className="h-8 px-3 text-xs font-medium tracking-[-0.006em] flex items-center gap-2 w-[118px] bg-white  dark:bg-black border border-[#E4E4E7] rounded-[6px] font-['Inter'] text-[#09090B] dark:text-white"
              onClick={handleUploadClick}
            >
              <UploadCloud className="w-4 h-4" />
              Upload new
            </Button>
            <Button
              variant="ghost"
              className="h-8 px-3 text-xs font-medium tracking-[-0.006em] flex items-center gap-2 w-[94px] rounded-[6px] font-['Inter'] text-[#E60000] dark:text-white border border-[#E60000]"
              onClick={handleRemoveImage}
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </Button>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-6 w-full">
        {/* Full Name Input */}
        <div className="flex flex-col gap-1.5 w-full">
          <Label
            htmlFor="fullName"
            className="text-sm font-medium text-[#09090B] dark:text-white tracking-[-0.006em] font-['Inter'] h-5 w-[69px] flex items-center"
          >
            Full Name
          </Label>
          <Input
            id="fullName"
            className="h-10 px-3 py-2 bg-white dark:bg-black border border-[#E4E4E7] dark:border-[#3F3F46] rounded-[6px] text-sm font-medium text-[#09090B] dark:text-white tracking-[-0.006em] font-['Inter'] w-full opacity-50"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email Input */}
        <div className="flex flex-col gap-1.5 w-full">
          <Label
            htmlFor="email"
            className="text-sm font-medium text-[#09090B] dark:text-white tracking-[-0.006em] font-['Inter'] h-5 flex items-center whitespace-nowrap"
          >
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            className="h-10 px-3 py-2 bg-white dark:bg-black border border-[#E4E4E7] dark:border-[#3F3F46] rounded-[6px] text-sm font-medium text-[#09090B] dark:text-white tracking-[-0.006em] font-['Inter'] w-full opacity-50"
            placeholder="Enter your email"
          />
        </div>

        {/* Bio Input */}
        <div className="flex flex-col gap-1.5 w-full">
          <Label
            htmlFor="bio"
            className="text-sm font-medium text-[#09090B] dark:text-white tracking-[-0.006em] font-['Inter'] h-5 w-[29px] flex items-center"
          >
            Role
          </Label>
          <Input
            id="bio"
            className="h-10 px-3 py-2 bg-white dark:bg-black border border-[#E4E4E7] dark:border-[#3F3F46] rounded-[6px] text-sm font-medium text-[#09090B] dark:text-white tracking-[-0.006em] font-['Inter'] w-full opacity-50"
            placeholder="Admin"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-row items-start p-0 gap-4 w-[159px] h-9">
        <Button
          variant="ghost"
          onClick={() => {}}
          className="h-9 px-4 text-sm font-medium tracking-[-0.006em] flex items-center gap-2 w-[78px] bg-[#F4F4F5] rounded-[6px] font-['Inter'] text-[#18181B]"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {}}
          className="h-9 px-4 text-sm font-medium tracking-[-0.006em] flex items-center gap-2 w-[65px] bg-[#007AFF] rounded-[6px] font-['Inter'] text-[#E6F2FF]"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default YourProfile;
