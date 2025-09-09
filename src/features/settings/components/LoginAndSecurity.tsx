/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const LoginAndSecurity = () => {
  const [_email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid: hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar,
      error: !hasMinLength
        ? "Password must be at least 8 characters long"
        : !hasUpperCase
        ? "Password must contain at least one uppercase letter"
        : !hasLowerCase
        ? "Password must contain at least one lowercase letter"
        : !hasNumber
        ? "Password must contain at least one number"
        : !hasSpecialChar
        ? "Password must contain at least one special character"
        : "",
    };
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (newEmail && !validateEmail(newEmail)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleChangePassword = async () => {
    const { isValid, error } = validatePassword(newPassword);
    if (!isValid) {
      setPasswordError(error);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setIsChangingPassword(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPasswordError("");
      setIsChangePasswordOpen(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setPasswordError("Failed to change password. Please try again.");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsDeleteAccountOpen(false);
    } catch (error) {
      console.error("Failed to delete account");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div className="flex flex-col items-start w-[626px] flex-none order-2 flex-grow-0 space-y-6">
      {/* Email Section */}
      <div className="w-full">
        <div className="flex flex-col space-y-1.5">
          {/* Form Control Label */}
          <Label className="flex flex-row items-center p-0 w-[94px] h-5 font-['Inter'] font-style-normal font-medium text-sm leading-5 tracking-[-0.006em] text-[#09090B] dark:text-white flex-none order-0 flex-grow-0">
            Email Address
          </Label>
          <div className="flex items-center py-2 px-3 gap-3 w-[364px] sm:w-full h-10 bg-gray-100 dark:bg-gray-900 border border-[#E4E4E7] dark:border-gray-700 rounded-[6px] font-['Inter'] font-medium text-sm text-[#71717A] dark:text-gray-400">
            user@example.com
          </div>
          {emailError && (
            <Alert variant="destructive" className="mt-2 w-full bg-[#FEF2F2] border-[#FEE2E2] dark:bg-[#450A0A] dark:border-[#991B1B] transition-all duration-200 ease-in-out">
              <AlertCircle className="h-4 w-4 text-[#DC2626] dark:text-[#F87171]" />
              <AlertDescription className="text-[#991B1B] dark:text-[#FECACA] font-['Inter'] text-sm">{emailError}</AlertDescription>
            </Alert>
          )}
        </div>
        <p className="text-xs text-[#991B1B] w-[364px] sm:w-full dark:text-[#FECACA] font-['Inter'] mt-1">
          Your email address cannot be changed. Please contact your organization's administrator to update it.
        </p>
      </div>

      {/* Password Section */}
      <div className="w-full">
        <div className="flex flex-row justify-center items-center p-0 w-[65px] h-5">
          {/* Form Control Label */}
          <Label className="w-[65px] h-5 font-['Inter'] mb-3 font-style-normal font-medium text-sm leading-5 tracking-[-0.006em] text-[#09090B] dark:text-white flex-none order-0 flex-grow-0">
            Password
          </Label>
        </div>
        <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="flex flex-row justify-center items-center py-0 px-3 gap-3 w-[116px] h-8 bg-white dark:bg-black border border-[#E4E4E7] rounded-[6px] font-['Inter'] font-style-normal font-medium text-xs leading-4 tracking-[-0.006em] text-[#09090B] dark:text-white flex-none order-1 flex-grow-0 transition-colors duration-200 hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] hover:border-[#D4D4D8]"
            >
              Reset Password
            </Button>
          </DialogTrigger>
          <DialogContent className="transition-all duration-300 ease-in-out w-[364px] sm:w-full">
            <DialogHeader>
              <DialogTitle>Reset Password</DialogTitle>
              <DialogDescription>Enter your current and new password</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {passwordError && (
                <Alert variant="destructive" className="bg-[#FEF2F2] border-[#FEE2E2] dark:bg-[#450A0A] dark:border-[#991B1B] transition-all duration-200 ease-in-out">
                  <AlertCircle className="h-4 w-4 text-[#DC2626] dark:text-[#F87171]" />
                  <AlertDescription className="text-[#991B1B] dark:text-[#FECACA] font-['Inter'] text-sm">{passwordError}</AlertDescription>
                </Alert>
              )}
              <Input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={cn(
                  "flex flex-row items-center py-2 px-3 gap-3 h-10 bg-white dark:bg-black border rounded-[6px] font-['Inter'] font-style-normal font-medium text-sm leading-5 tracking-[-0.006em] text-[#09090B] dark:text-white transition-colors duration-200 ease-in-out",
                  passwordError && currentPassword === "" ? "border-red-500" : "border-[#E4E4E7]"
                )}
              />
              <Input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={cn(
                  "flex flex-row items-center py-2 px-3 gap-3 h-10 bg-white dark:bg-black border rounded-[6px] font-['Inter'] font-style-normal font-medium text-sm leading-5 tracking-[-0.006em] text-[#09090B] dark:text-white transition-colors duration-200 ease-in-out",
                  passwordError && !validatePassword(newPassword).isValid ? "border-red-500" : "border-[#E4E4E7]"
                )}
              />
              <Input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={cn(
                  "flex flex-row items-center py-2 px-3 gap-3 h-10 bg-white dark:bg-black border rounded-[6px] font-['Inter'] font-style-normal font-medium text-sm leading-5 tracking-[-0.006em] text-[#09090B] dark:text-white transition-colors duration-200 ease-in-out",
                  passwordError && newPassword !== confirmPassword ? "border-red-500" : "border-[#E4E4E7]"
                )}
              />
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => setIsChangePasswordOpen(false)}
                disabled={isChangingPassword}
                className="h-8 px-3 text-xs font-medium tracking-[-0.006em] flex items-center gap-2 bg-white dark:bg-black border border-[#E4E4E7] rounded-[6px] font-['Inter'] text-[#09090B] dark:text-white transition-colors duration-200 hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] hover:border-[#D4D4D8]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleChangePassword}
                disabled={isChangingPassword}
                className={cn(
                  "h-8 px-3 text-xs font-medium tracking-[-0.006em] flex items-center gap-2 bg-[#007AFF] rounded-[6px] font-['Inter'] text-white transition-colors duration-200",
                  !isChangingPassword && "hover:bg-[#0060CC]",
                  isChangingPassword && "opacity-50 cursor-not-allowed"
                )}
              >
                {isChangingPassword ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Delete Account Section */}
      <div className="w-full">
        <div className="flex flex-row justify-center items-center p-0 w-[108px] h-5 mb-3">
          {/* Form Control Label */}
          <Label className="w-[108px] h-5 font-['Inter'] font-style-normal font-medium text-sm leading-5 tracking-[-0.006em] text-[#09090B] dark:text-white flex-none order-0 flex-grow-0">
            Delete Account
          </Label>
        </div>
        <Dialog open={isDeleteAccountOpen} onOpenChange={setIsDeleteAccountOpen}>
          <DialogTrigger asChild>
            <Button
              variant="destructive"
              className="flex mb-3 flex-row justify-center items-center py-0 px-3 gap-2 w-[117px] h-8 bg-[#EF4444] rounded-[6px] font-['Inter'] font-style-normal font-medium text-xs leading-4 tracking-[-0.006em] text-white flex-none order-1 flex-grow-0 transition-colors duration-200 hover:bg-[#DC2626]"
            >
              Disable Account
            </Button>
          </DialogTrigger>
          <DialogContent className="transition-all duration-300 ease-in-out w-[364px] sm:w-full">
            <DialogHeader>
              <DialogTitle>Disable Account</DialogTitle>
              <DialogDescription>Are you sure you want to disable your account? This action cannot be undone.</DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => setIsDeleteAccountOpen(false)}
                disabled={isDeleting}
                className="h-8 px-3 text-xs font-medium tracking-[-0.006em] flex items-center gap-2 bg-white dark:bg-black border border-[#E4E4E7] rounded-[6px] font-['Inter'] text-[#09090B] dark:text-white transition-colors duration-200 hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] hover:border-[#D4D4D8]"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className={cn(
                  "h-8 px-3 text-xs font-medium tracking-[-0.006em] flex items-center gap-2 bg-[#EF4444] rounded-[6px] font-['Inter'] text-white transition-colors duration-200",
                  !isDeleting && "hover:bg-[#DC2626]",
                  isDeleting && "opacity-50 cursor-not-allowed"
                )}
              >
                {isDeleting ? "Deleting..." : "Disable Account"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* Caption */}
        <p className="h-10 font-['Inter'] w-[364px] sm:w-full font-style-normal font-normal text-sm leading-5 text-[#71717A] flex-none order-3 self-stretch flex-grow-0">
          This will temporarily disable your account and log you out from all sessions. You can reactivate it by logging in again.
        </p>
      </div>
    </div>
  );
};

export default LoginAndSecurity;
